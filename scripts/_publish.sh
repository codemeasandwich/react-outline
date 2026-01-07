#!/bin/bash
set -e

PACKAGE_NAME=$(node -p "require('./package.json').name")

# ============================================
# Safety checks before release
# ============================================

# Check 1: Must be on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
  echo "❌ Error: You must be on the 'main' or 'master' branch to release."
  echo "   Current branch: $CURRENT_BRANCH"
  echo "   Run: git checkout main"
  exit 1
fi
echo "✅ On branch: $CURRENT_BRANCH"

# Check 2: Fetch latest from origin
git fetch origin "$CURRENT_BRANCH" --quiet

# Get commit hashes
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse "origin/$CURRENT_BRANCH")
BASE_COMMIT=$(git merge-base HEAD "origin/$CURRENT_BRANCH")

if [[ "$LOCAL_COMMIT" == "$REMOTE_COMMIT" ]]; then
  echo "✅ Local and origin are in sync"
elif [[ "$BASE_COMMIT" == "$REMOTE_COMMIT" ]]; then
  # Local is ahead of origin - can auto-push
  echo "⚠️  Local is ahead of origin. Pushing changes..."
  git push origin "$CURRENT_BRANCH"
  echo "✅ Pushed to origin/$CURRENT_BRANCH"
elif [[ "$BASE_COMMIT" == "$LOCAL_COMMIT" ]]; then
  # Origin is ahead of local - need to pull
  echo "❌ Error: Origin is ahead of local. You need to pull first."
  echo "   Run: git pull origin $CURRENT_BRANCH"
  exit 1
else
  # Diverged - need to resolve
  echo "❌ Error: Local and origin have diverged."
  echo "   You need to resolve this before releasing:"
  echo "   Run: git pull origin $CURRENT_BRANCH --rebase"
  exit 1
fi

# ============================================
# Check 3: Verify 100% test coverage locally
# ============================================
echo "🧪 Running tests with coverage check..."

OUTPUT=$(npm run test:cover 2>&1)
TEST_EXIT_CODE=$?

if [[ $TEST_EXIT_CODE -ne 0 ]]; then
  echo "❌ Tests failed! Cannot release."
  echo "$OUTPUT" | tail -50
  exit 1
fi

# Extract all coverage metrics from "All files" line
STMTS=$(echo "$OUTPUT" | grep "All files" | awk '{print $4}' | tr -d '%')
BRANCH=$(echo "$OUTPUT" | grep "All files" | awk '{print $6}' | tr -d '%')
FUNCS=$(echo "$OUTPUT" | grep "All files" | awk '{print $8}' | tr -d '%')
LINES=$(echo "$OUTPUT" | grep "All files" | awk '{print $10}' | tr -d '%')

FAILED=0
if [ -z "$STMTS" ] || [ $(echo "$STMTS < 100" | bc -l) -eq 1 ]; then
  echo "❌ Statement coverage is below 100% ($STMTS%)"
  FAILED=1
fi
if [ -z "$BRANCH" ] || [ $(echo "$BRANCH < 100" | bc -l) -eq 1 ]; then
  echo "❌ Branch coverage is below 100% ($BRANCH%)"
  FAILED=1
fi
if [ -z "$FUNCS" ] || [ $(echo "$FUNCS < 100" | bc -l) -eq 1 ]; then
  echo "❌ Function coverage is below 100% ($FUNCS%)"
  FAILED=1
fi
if [ -z "$LINES" ] || [ $(echo "$LINES < 100" | bc -l) -eq 1 ]; then
  echo "❌ Line coverage is below 100% ($LINES%)"
  FAILED=1
fi

if [ $FAILED -eq 1 ]; then
  echo ""
  echo "❌ Coverage check failed! All metrics must be 100% before release."
  exit 1
fi

echo "✅ All coverage metrics are 100% (Stmts: $STMTS%, Branch: $BRANCH%, Funcs: $FUNCS%, Lines: $LINES%)"

# ============================================
# Version detection and release
# ============================================

# Get local version from package.json
LOCAL_VERSION=$(node -p "require('./package.json').version")
echo "📦 Local version: $LOCAL_VERSION"

# Get published version from npm
NPM_VERSION=$(npm view "$PACKAGE_NAME" version 2>/dev/null || echo "0.0.0")
echo "🌐 npm version: $NPM_VERSION"

# Function to compare semver versions
# Echoes: 0 if equal, 1 if first > second, 2 if first < second
compare_versions() {
  local v1=$1 v2=$2
  IFS='.' read -r v1_major v1_minor v1_patch <<< "$v1"
  IFS='.' read -r v2_major v2_minor v2_patch <<< "$v2"
  
  if [[ $v1_major -gt $v2_major ]]; then echo 1; return; fi
  if [[ $v1_major -lt $v2_major ]]; then echo 2; return; fi
  if [[ $v1_minor -gt $v2_minor ]]; then echo 1; return; fi
  if [[ $v1_minor -lt $v2_minor ]]; then echo 2; return; fi
  if [[ $v1_patch -gt $v2_patch ]]; then echo 1; return; fi
  if [[ $v1_patch -lt $v2_patch ]]; then echo 2; return; fi
  echo 0
}

# Check version relationship
VERSION_CMP=$(compare_versions "$LOCAL_VERSION" "$NPM_VERSION")

if [[ $VERSION_CMP -eq 1 ]]; then
  # Local version is higher than npm - use it as-is (manually set)
  echo "✅ Local version ($LOCAL_VERSION) is higher than npm ($NPM_VERSION). Using manually set version."
elif [[ $VERSION_CMP -eq 0 ]]; then
  # Versions match - need to bump based on commits
  echo "⚠️  Local version matches npm. Analyzing commits for semantic version bump..."
  
  # Get the previous tag to analyze commits
  PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
  
  if [[ -n "$PREV_TAG" ]]; then
    COMMIT_RANGE="$PREV_TAG..HEAD"
  else
    COMMIT_RANGE="HEAD"
  fi
  
  # Analyze commits to determine bump type
  HAS_BREAKING=false
  HAS_FEAT=false
  HAS_FIX=false
  
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    
    # Check for breaking changes (BREAKING CHANGE in message or ! after type)
    if [[ "$line" =~ BREAKING[[:space:]]CHANGE ]] || [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(feat|fix|refactor|chore)![:\(] ]]; then
      HAS_BREAKING=true
    fi
    
    # Check for features
    if [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(feat|feature)[:\(] ]]; then
      HAS_FEAT=true
    fi
    
    # Check for fixes
    if [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(fix|bugfix)[:\(] ]]; then
      HAS_FIX=true
    fi
  done < <(git log $COMMIT_RANGE --oneline)
  
  # Parse current version
  IFS='.' read -r MAJOR MINOR PATCH <<< "$LOCAL_VERSION"
  
  # Determine new version based on commit types
  if [[ "$HAS_BREAKING" == true ]]; then
    NEW_MAJOR=$((MAJOR + 1))
    NEW_VERSION="$NEW_MAJOR.0.0"
    BUMP_TYPE="major (breaking change)"
  elif [[ "$HAS_FEAT" == true ]]; then
    NEW_MINOR=$((MINOR + 1))
    NEW_VERSION="$MAJOR.$NEW_MINOR.0"
    BUMP_TYPE="minor (new feature)"
  elif [[ "$HAS_FIX" == true ]]; then
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
    BUMP_TYPE="patch (bug fix)"
  else
    # Default to patch if no recognized commit types
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
    BUMP_TYPE="patch (default)"
  fi
  
  echo "📝 Bumping version ($BUMP_TYPE): $LOCAL_VERSION → $NEW_VERSION"
  
  # Update package.json with new version
  node -e "
    const fs = require('fs');
    const pkg = require('./package.json');
    pkg.version = '$NEW_VERSION';
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  
  # Amend the last commit with the version bump
  git add package.json
  git commit --amend --no-edit
  git push --force-with-lease
  
  LOCAL_VERSION="$NEW_VERSION"
  echo "✅ Version bumped and commit amended"
else
  # Local version is lower than npm - bump from npm version based on commit types
  echo "⚠️  Local version ($LOCAL_VERSION) is lower than npm ($NPM_VERSION). Bumping from npm version..."
  
  # Get the previous tag to analyze commits
  PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
  
  if [[ -n "$PREV_TAG" ]]; then
    COMMIT_RANGE="$PREV_TAG..HEAD"
  else
    COMMIT_RANGE="HEAD"
  fi
  
  # Analyze commits to determine bump type
  HAS_BREAKING=false
  HAS_FEAT=false
  HAS_FIX=false
  
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    
    # Check for breaking changes (BREAKING CHANGE in message or ! after type)
    if [[ "$line" =~ BREAKING[[:space:]]CHANGE ]] || [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(feat|fix|refactor|chore)![\:\(] ]]; then
      HAS_BREAKING=true
    fi
    
    # Check for features
    if [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(feat|feature)[\:\(] ]]; then
      HAS_FEAT=true
    fi
    
    # Check for fixes
    if [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(fix|bugfix)[\:\(] ]]; then
      HAS_FIX=true
    fi
  done < <(git log $COMMIT_RANGE --oneline)
  
  # Parse npm version (base for bumping)
  IFS='.' read -r MAJOR MINOR PATCH <<< "$NPM_VERSION"
  
  # Determine new version based on commit types
  if [[ "$HAS_BREAKING" == true ]]; then
    NEW_MAJOR=$((MAJOR + 1))
    NEW_VERSION="$NEW_MAJOR.0.0"
    BUMP_TYPE="major (breaking change)"
  elif [[ "$HAS_FEAT" == true ]]; then
    NEW_MINOR=$((MINOR + 1))
    NEW_VERSION="$MAJOR.$NEW_MINOR.0"
    BUMP_TYPE="minor (new feature)"
  elif [[ "$HAS_FIX" == true ]]; then
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
    BUMP_TYPE="patch (bug fix)"
  else
    # Default to patch if no recognized commit types
    NEW_PATCH=$((PATCH + 1))
    NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"
    BUMP_TYPE="patch (default)"
  fi
  
  echo "📝 Bumping version ($BUMP_TYPE): $NPM_VERSION → $NEW_VERSION"
  
  # Update package.json with new version
  node -e "
    const fs = require('fs');
    const pkg = require('./package.json');
    pkg.version = '$NEW_VERSION';
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
  "
  
  # Amend the last commit with the version bump
  git add package.json
  git commit --amend --no-edit
  git push --force-with-lease
  
  LOCAL_VERSION="$NEW_VERSION"
  echo "✅ Version bumped and commit amended"
fi

TAG="v$LOCAL_VERSION"

# Update README badge to match the new version
echo "📝 Updating README coverage badge to $TAG..."
if grep -q "coveralls.io.*badge.svg?branch=v" README.md; then
  # Update existing versioned badge
  sed -i.bak "s|badge.svg?branch=v[0-9.]*|badge.svg?branch=$TAG|g" README.md
  sed -i.bak "s|react-outline?branch=v[0-9.]*|react-outline?branch=$TAG|g" README.md
  rm -f README.md.bak
  
  # Check if README changed
  if ! git diff --quiet README.md; then
    git add README.md
    git commit -m "docs: update coverage badge to $TAG"
    git push origin "$CURRENT_BRANCH"
    echo "✅ README badge updated to $TAG"
  else
    echo "ℹ️  README badge already at $TAG"
  fi
else
  echo "⚠️  No versioned coverage badge found in README.md"
fi

# Check if tag already exists
TAG_EXISTS=false
if git rev-parse "$TAG" >/dev/null 2>&1; then
  TAG_EXISTS=true
  echo "🏷️  Tag $TAG already exists."
  
  # Check if release already exists for this tag
  if command -v gh &> /dev/null && gh release view "$TAG" &> /dev/null; then
    echo "❌ Error: Release $TAG already exists. Nothing to do."
    exit 1
  else
    echo "📝 No release found for $TAG. Creating release..."
  fi
fi

if [[ "$TAG_EXISTS" == false ]]; then
  # Create and push tag
  echo "🏷️  Creating tag $TAG..."
  git tag -a "$TAG" -m "Release $TAG"
  git push origin "$TAG" --quiet
  echo " * [new tag]         $TAG"
fi

# Generate changelog from commits since last release
echo "📋 Generating changelog..."

# Get the previous tag (most recent tag before the current one)
PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")

if [[ -n "$PREV_TAG" ]]; then
  COMMIT_RANGE="$PREV_TAG..HEAD"
  echo "   Commits from $PREV_TAG to HEAD"
else
  COMMIT_RANGE="HEAD"
  echo "   All commits (no previous tag found)"
fi

# Get commits and group by type
declare -a FEAT_COMMITS
declare -a FIX_COMMITS
declare -a REFACTOR_COMMITS
declare -a DOCS_COMMITS
declare -a STYLE_COMMITS
declare -a TEST_COMMITS
declare -a CHORE_COMMITS
declare -a OTHER_COMMITS

# Function to strip commit type prefix from message
# e.g., "feat: Add feature" -> "Add feature"
#       "fix(scope): Fix bug" -> "Fix bug"
strip_prefix() {
  local msg="$1"
  # Remove type prefix like "feat:", "fix:", "feat(scope):", etc.
  echo "$msg" | sed -E 's/^(feat|feature|fix|bugfix|refactor|docs|doc|style|test|tests|chore|build|ci)(\([^)]*\))?[!]?:[[:space:]]*//'
}

while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  
  # Skip automated coverage badge updates (internal housekeeping)
  if [[ "$line" =~ update[[:space:]]coverage[[:space:]]badge ]]; then
    continue
  fi
  
  # Extract the message (without git hash)
  msg="${line#* }"
  
  # Extract the type and store stripped message
  if [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(feat|feature)[:\(] ]]; then
    FEAT_COMMITS+=("$(strip_prefix "$msg")")
  elif [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(fix|bugfix)[:\(] ]]; then
    FIX_COMMITS+=("$(strip_prefix "$msg")")
  elif [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(refactor)[:\(] ]]; then
    REFACTOR_COMMITS+=("$(strip_prefix "$msg")")
  elif [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(docs|doc)[:\(] ]]; then
    DOCS_COMMITS+=("$(strip_prefix "$msg")")
  elif [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(style)[:\(] ]]; then
    STYLE_COMMITS+=("$(strip_prefix "$msg")")
  elif [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(test|tests)[:\(] ]]; then
    TEST_COMMITS+=("$(strip_prefix "$msg")")
  elif [[ "$line" =~ ^[a-f0-9]+[[:space:]]+(chore|build|ci)[:\(] ]]; then
    CHORE_COMMITS+=("$(strip_prefix "$msg")")
  else
    OTHER_COMMITS+=("$msg")
  fi
done < <(git log $COMMIT_RANGE --oneline)

# Build changelog
CHANGELOG=""

if [[ ${#FEAT_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Features\n"
  for commit in "${FEAT_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#FIX_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Bug Fixes\n"
  for commit in "${FIX_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#REFACTOR_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Refactoring\n"
  for commit in "${REFACTOR_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#DOCS_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Documentation\n"
  for commit in "${DOCS_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#STYLE_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Styling\n"
  for commit in "${STYLE_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#TEST_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Tests\n"
  for commit in "${TEST_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#CHORE_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Chores\n"
  for commit in "${CHORE_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

if [[ ${#OTHER_COMMITS[@]} -gt 0 ]]; then
  CHANGELOG+="## Other Changes\n"
  for commit in "${OTHER_COMMITS[@]}"; do
    CHANGELOG+="- $commit\n"
  done
  CHANGELOG+="\n"
fi

# Fallback if no commits found
if [[ -z "$CHANGELOG" ]]; then
  CHANGELOG="No notable changes in this release."
fi

echo "   Changelog generated!"

# Create GitHub release (triggers the publish workflow)
echo "🚀 Creating GitHub release..."

REPO_OWNER="codemeasandwich"
REPO_NAME="react-outline"

# Try gh CLI first, fall back to curl
if command -v gh &> /dev/null; then
  echo -e "$CHANGELOG" | gh release create "$TAG" \
    --title "$TAG" \
    --notes-file -
else
  # Use GitHub API with curl
  if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "❌ Error: GITHUB_TOKEN environment variable is required."
    echo "   Set it with: export GITHUB_TOKEN=your_token"
    echo "   Or install GitHub CLI: brew install gh && gh auth login"
    exit 1
  fi
  
  # Escape the changelog for JSON
  CHANGELOG_ESCAPED=$(echo -e "$CHANGELOG" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')
  
  # Create release via GitHub API
  RESPONSE=$(curl -s -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
    -d "{
      \"tag_name\": \"$TAG\",
      \"name\": \"$TAG\",
      \"body\": $CHANGELOG_ESCAPED
    }")
  
  # Check if release was created
  if echo "$RESPONSE" | grep -q '"id"'; then
    echo "✅ Release created via GitHub API"
  else
    echo "❌ Failed to create release:"
    echo "$RESPONSE"
    exit 1
  fi
fi

echo "✅ Release $TAG created! The GitHub Action will publish to npm with provenance."
echo "   Watch the workflow at: https://github.com/$REPO_OWNER/$REPO_NAME/actions"
