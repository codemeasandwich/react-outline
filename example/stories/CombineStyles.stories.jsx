import React from 'react';
import outline, { withOptions } from 'react-outline';

// Using the style function
const styles1 = outline({
    title: {
        base: { fontSize: '25px' },
        error: { color: '#f00' },
    },
});

// In a generated element
const styles2 = outline({
    title: {
        base: { fontSize: '25px' },
        error: { color: '#f00' },
    },
});
const Title2 = styles2.title`div`;

// Using a prop flag
const styles3 = outline({
    title: {
        base: { fontSize: '25px' },
        error: { color: '#f00' },
    },
});
const Title3 = styles3.title`div`;

// Pass style object to generated element
const styles4 = outline({ title: { fontSize: 25 } });
const Title4 = styles4.title`div`;

// Logic function with custom colors
const customOutline = withOptions({ colors: { CrazyRed: '#f00' } });
const styles5 = customOutline(
    { title: { fontSize: '25px' } },
    { title: (x) => x }
);
const Title5 = styles5.title`div`;

export default {
    title: 'Combine Styles',
};

export const UsingTheStyleFunction = {
    render: () => <div style={styles1.title({ error: true })}>basic</div>,
    name: 'Using the style function',
};

export const InAGeneratedElement = {
    render: () => <Title2 style={{ error: true }}>basic</Title2>,
    name: 'In a generated element',
};

export const UsingAPropFlag = {
    render: () => <Title3 error>basic</Title3>,
    name: 'Using a prop flag',
};

export const PassingStyleObjectToGeneratedElement = {
    render: () => <Title4 style={{ color: 'red' }}>basic</Title4>,
    name: 'Passing a Style object to a generated element',
};

export const LogicFunctionWithGenerateElement = {
    render: () => <Title5 style={{ color: 'CrazyRed' }}>basic</Title5>,
    name: 'Logic function With Generate Element',
};
