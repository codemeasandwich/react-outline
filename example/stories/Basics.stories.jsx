import React from 'react';
import outline from 'react-outline';

// Creating and applying a style
const styles1 = outline({ title: { backgroundColor: 'red' } });
const BasicTitle = <div style={styles1.title()}>basic</div>;

// Using the tag creator
const styles2 = outline({ title: { backgroundColor: 'red' } });
const TagTitle = styles2.title`div`;

// Implied tags (table, tr, td)
const styles3 = outline({
    table: { borderCollapse: 'collapse', width: '100%' },
    tr: { borderBottom: 'thick solid red' },
    td: { border: '1px solid #dddddd', padding: '8px' },
});
const Table = styles3.table``;
const Row = styles3.tr``;
const Cell = styles3.td``;

// Wrapping existing element
class HelloMessage extends React.Component {
    render() {
        return <div style={this.props.style}>Hello, {this.props.name}</div>;
    }
}
const styles4 = outline({ title: { backgroundColor: 'red' } });
const WrappedTitle = styles4.title`${HelloMessage}`;

// Reusing elements
const styles5 = outline({ title: { backgroundColor: 'red' } });
const ReusableTitle = styles5.title`span`;

// Passing style and function
const styles6 = outline(
    { title: { backgroundColor: 'red' } },
    { title: () => ({ color: 'white' }) }
);
const FunctionTitle = styles6.title`div`;

// Sharing styles
const styles7 = outline({
    title: { backgroundColor: 'red' },
    'title, content': { textShadow: '2px 2px 2px black' },
    content: { color: 'red' },
});
const SharedTitle = styles7.title`div`;

export default {
    title: 'Basics',
};

export const CreatingAndApplyingAStyle = {
    render: () => BasicTitle,
    name: 'Creating and applying a style',
};

export const GenerateElementFromStyle = {
    render: () => <TagTitle>basic</TagTitle>,
    name: 'Generate element from style',
};

export const ImpliedNamedElements = {
    render: () => (
        <Table>
            <Row>
                <Cell>Maria Anders</Cell>
                <Cell>Germany</Cell>
            </Row>
            <Row>
                <Cell>Francisco Chang</Cell>
                <Cell>Mexico</Cell>
            </Row>
            <Row>
                <Cell>Roland Mendel</Cell>
                <Cell>Austria</Cell>
            </Row>
        </Table>
    ),
    name: 'Generate an implied named element',
};

export const WrappingAnExistingElement = {
    render: () => <WrappedTitle name="basic" />,
    name: 'Wrapping an existing element',
};

export const ReusingElements = {
    render: () => (
        <div>
            <ReusableTitle>foo</ReusableTitle>
            <ReusableTitle>bar</ReusableTitle>
        </div>
    ),
    name: 'Reusing elements',
};

export const PassingStyleAndFunction = {
    render: () => <FunctionTitle>basic</FunctionTitle>,
    name: 'Passing Style and Function as arguments',
};

export const SharingStyle = {
    render: () => (
        <div>
            <SharedTitle>basic</SharedTitle>
            <span style={styles7.content()}>content</span>
        </div>
    ),
    name: 'Sharing Style',
};
