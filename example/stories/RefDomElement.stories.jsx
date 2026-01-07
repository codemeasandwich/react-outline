import React from 'react';
import { findDOMNode } from 'react-dom';
import outline, { Styles } from 'react-outline';

const styles = outline({
    textarea: {
        base: {
            border: '2px solid transparent',
            borderBottom: '2px solid lightgray',
        },
        ':focus': {
            outline: 'none',
            borderBottom: '2px solid red',
        },
    },
});

const Textarea = styles.textarea``;

// Ref by function
class RefByFnPanel extends React.Component {
    constructor(props) {
        super(props);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
        this.state = { scrollTop: 0 };
    }

    componentDidMount() {
        if (this.domElem) {
            this.domElem.addEventListener('scroll', this.listenScrollEvent);
        }
    }

    componentWillUnmount() {
        if (this.domElem) {
            this.domElem.removeEventListener('scroll', this.listenScrollEvent);
        }
    }

    listenScrollEvent() {
        this.setState({ scrollTop: this.domElem.scrollTop });
    }

    render() {
        return (
            <div>
                <Styles />
                Scroll me - {this.state.scrollTop}
                <br />
                <Textarea
                    style={{ width: 450 }}
                    ref={(reactElem) => (this.domElem = findDOMNode(reactElem))}
                    defaultValue={'1\n2\n3\n4\n5'}
                />
            </div>
        );
    }
}

// On DOM Event
class OnEventPanel extends React.Component {
    constructor(props) {
        super(props);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
        this.state = { scrollTop: 0 };
    }

    listenScrollEvent(domElem) {
        this.setState({ scrollTop: domElem.scrollTop });
    }

    render() {
        return (
            <div>
                <Styles />
                Scroll me - {this.state.scrollTop}
                <br />
                <Textarea
                    onDomEvent={{ scroll: this.listenScrollEvent }}
                    style={{ width: 450 }}
                    defaultValue={'1\n2\n3\n4\n5'}
                />
            </div>
        );
    }
}

export default {
    title: 'Reference DOM Element',
};

export const FunctionWithDomEvents = {
    render: () => <OnEventPanel />,
    name: 'function with Dom Events',
    parameters: {
        docs: {
            description: {
                story:
                    "Pass an Object (mapping 'event' names to functions) as the 'onDomEvent' prop",
            },
        },
    },
};

export const RefByFunction = {
    render: () => <RefByFnPanel />,
    name: 'ref by function',
};
