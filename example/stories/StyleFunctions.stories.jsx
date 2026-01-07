import React from 'react';
import outline from 'react-outline';

// Dynamic styles
const styles1 = outline(
    { content: { backgroundColor: 'gray' }, cell: { fontSize: 10 } },
    { content: (numberOfCells) => ({ height: `${numberOfCells * 50}px` }) }
);

const data1 = [{ name: 'foo' }, { name: 'bar' }, { name: 'cat' }];

// Modifying styles
const styles2 = outline(
    { content: { backgroundColor: 'lightgray' }, cell: { fontSize: 10 } },
    {
        cell: (style, important) => ({
            fontSize: style.fontSize + (important ? 5 : -5),
        }),
    }
);

const data2 = [
    { name: 'foo', important: true },
    { name: 'bar', important: false },
    { name: 'baz', important: true },
    { name: 'qux', important: false },
    { name: 'quux' },
];

// Function without style
const styles3 = outline(
    { cell: { fontSize: 10 } },
    { content: () => ({ backgroundColor: 'green' }) }
);

const data3 = [{ name: 'foo' }, { name: 'bar' }, { name: 'cat' }];

// With generated elements
const styles4 = outline(
    { content: {}, cell: { fontSize: 10 } },
    {
        content: (numberOfCells) => ({
            backgroundColor: 'red',
            height: `${numberOfCells * 100}px`,
        }),
        cell: (style, important) => ({
            fontSize: style.fontSize + (important ? 5 : -5),
        }),
    }
);

const data4 = [
    { name: 'foo', important: true },
    { name: 'bar', important: false },
    { name: 'cat' },
];

const Group = styles4.content`div`;
const CellComp = styles4.cell`span`;

export default {
    title: 'Style Functions',
};

export const DynamicStyles = {
    render: () => (
        <div style={styles1.content(data1.length)}>
            {data1.map((cellData, i) => (
                <span key={i} style={styles1.cell()}>
                    {cellData.name}
                </span>
            ))}
        </div>
    ),
    name: 'Run-time control over your styles',
};

export const ModifyingStyles = {
    render: () => (
        <div style={styles2.content()}>
            {data2.map((cellData, i) => (
                <span key={i} style={styles2.cell(cellData.important)}>
                    {cellData.name}{' '}
                </span>
            ))}
        </div>
    ),
    name: 'Modify existing styles',
    parameters: {
        docs: {
            description: {
                story:
                    "If your function has 1 argument, it will be passed only the incoming arguments. With 2 arguments, the first will be the corresponding style and the second will be the incoming arguments.",
            },
        },
    },
};

export const FunctionWithoutStyle = {
    render: () => (
        <div style={styles3.content(data3.length)}>
            {data3.map((cellData, i) => (
                <span key={i} style={styles3.cell()}>
                    {cellData.name}
                </span>
            ))}
        </div>
    ),
    name: "Function don't need a style",
};

export const WithGeneratedElements = {
    render: () => (
        <Group style={data4.length}>
            {data4.map((cellData, i) => (
                <CellComp key={i} style={cellData.important}>
                    {cellData.name}
                </CellComp>
            ))}
        </Group>
    ),
    name: 'Function with generated elements',
};
