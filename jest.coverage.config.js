// Jest config for coverage testing - tests against source
module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|jpg|png)$": "<rootDir>/empty-module.js",
        "^raw-loader": "<rootDir>/empty-module.js",
        "react-outline": "<rootDir>/source/main.js",
        "^react-addons-css-transition-group$": "<rootDir>/empty-module.js"
    },
    testPathIgnorePatterns: [
        "/node_modules/",
        "example.test.js"
    ],
    coverageDirectory: "coverage",
    collectCoverageFrom: [
        "source/**/*.js",
        "!source/utils/index.js"
    ],
    verbose: true,
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.js"
    ]
};
