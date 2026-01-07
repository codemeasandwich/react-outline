import React from 'react';
import outline, { Styles } from 'react-outline';

// Hover
const styles1 = outline({
    title: {
        base: { background: 'lightblue', color: 'black' },
        ':hover': { background: 'darkblue', color: 'white' },
    },
});
const HoverTitle = styles1.title`div`;

// Media Query
const styles2 = outline({
    title: {
        base: { background: 'lightgreen', color: 'black' },
        '@media (max-width: 600px)': { background: 'darkgreen', color: 'white' },
    },
});
const MediaTitle = styles2.title`div`;

// CSS Selector
const styles3 = outline({
    title: {
        base: { background: 'lightblue', color: 'black' },
        'div:nth-child(even)': { background: 'darkblue', color: 'white' },
    },
});
const SelectorTitle = styles3.title`div`;

// Dynamic CSS Selector
const styles4 = outline({
    title: {
        base: { background: 'lightblue', color: 'black' },
        'div:nth-child(even)': { background: 'darkblue', color: 'white' },
    },
});
const DynamicTitle = styles4.title`div`;

// Vendor Prefix
const styles5 = outline({
    title: {
        display: 'flex',
        transition: 'all .5s',
        userSelect: 'none',
        fontSize: '40px',
        background: 'linear-gradient(to bottom, lightblue, darkblue)',
    },
});

export default {
    title: 'CSS Helpers',
};

export const MediaQuery = {
    render: () => (
        <div>
            <Styles />
            <MediaTitle>Resize window to less than 600px</MediaTitle>
        </div>
    ),
    name: 'Media Query',
    parameters: {
        docs: {
            description: {
                story: 'Resize your screen to less than 600px to see the color change',
            },
        },
    },
};

export const MouseHover = {
    render: () => (
        <div>
            <Styles />
            <HoverTitle>Hover over me</HoverTitle>
        </div>
    ),
    name: 'Mouse hover',
    parameters: {
        docs: {
            description: {
                story:
                    'You need to include a react-outline Style tag at the top of your page',
            },
        },
    },
};

export const CssSource = {
    render: () => (
        <div>
            <Styles>
                {`
        .title {
          font-size: 25px;
          background-color: yellow;
        }
      `}
            </Styles>
            <div className="title">basic</div>
        </div>
    ),
    name: 'Css Source',
};

export const CssSelector = {
    render: () => (
        <div>
            <Styles />
            <SelectorTitle>
                <div>foo</div>
                <div>bar</div>
                <div>baz</div>
            </SelectorTitle>
        </div>
    ),
    name: 'Css Selector',
};

export const DynamicCssSelector = {
    render: () => (
        <div>
            <Styles />
            <DynamicTitle css={{ 'div:nth-child(even)': { color: 'red' } }}>
                <div>foo</div>
                <div>bar</div>
                <div>baz</div>
            </DynamicTitle>
        </div>
    ),
    name: 'Dynamic Css Selector',
};

export const VendorAutoPrefix = {
    render: () => <div style={styles5.title()}>basic</div>,
    name: 'Vendor Auto-Prefix',
    parameters: {
        docs: {
            description: {
                story:
                    'CSS vendor prefixes are automatically added for properties that still need them',
            },
        },
    },
};

// Prop Flags with CSS - Issue #3
const styles6 = outline({
    title: {
        base: { color: 'blue' },
        ':hover': { color: 'green', fontWeight: 'bold' },
        error: { color: 'red' },
    },
});
const PropFlagTitle = styles6.title`p`;

export const PropFlagsWithCss = {
    render: () => (
        <div>
            <Styles />
            <PropFlagTitle>basic - blue, green on hover</PropFlagTitle>
            <PropFlagTitle error>error - red, green on hover</PropFlagTitle>
        </div>
    ),
    name: 'Prop Flags with CSS',
    parameters: {
        docs: {
            description: {
                story:
                    'Prop flags like "error" work alongside CSS selectors like :hover. The error prop overrides base color to red, and hover turns it green.',
            },
        },
    },
};

// Scoped CSS Prop - Issue #2
// Each instance gets its own scoped css overrides
const styles7 = outline({
    title: {
        base: { background: 'lightblue', color: 'black' },
        'div:nth-child(even)': { background: 'darkblue', color: 'white' },
    },
});
const ScopedTitle = styles7.title`div`;

export const ScopedCssProp = {
    render: () => (
        <div>
            <Styles />
            <p>First Title - even items should be RED:</p>
            <ScopedTitle css={{ 'div:nth-child(even)': { color: 'red' } }}>
                <div>foo</div>
                <div>bar (should be red)</div>
                <div>baz</div>
            </ScopedTitle>
            <p>Second Title - even items should be GREEN:</p>
            <ScopedTitle css={{ 'div:nth-child(even)': { color: 'green' } }}>
                <div>foo</div>
                <div>bar (should be green)</div>
                <div>baz</div>
            </ScopedTitle>
        </div>
    ),
    name: 'Scoped CSS Prop',
    parameters: {
        docs: {
            description: {
                story:
                    'Issue #2 fix: Each instance\'s css prop is scoped independently. The first Title has red even items, the second has green.',
            },
        },
    },
};
