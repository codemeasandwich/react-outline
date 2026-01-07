import React from 'react';
import outline, { Styles } from 'react-outline';
import 'animate.css';

const styles = outline({
    list: { listStyleType: 'none' },
    item: {
        base: {
            textShadow: '1px 1px 10px #000',
            color: 'white',
            cursor: 'pointer',
        },
        ':hover': { color: 'blue' },
    },
});

const List = styles.list`ul`;
const Item = styles.item`li`;

class AnimatePanel extends React.Component {
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
        this.state = { data: [], name: '' };
    }

    render() {
        return (
            <div>
                <Styles />
                <input
                    placeholder="Type something here"
                    type="text"
                    onChange={({ target }) => this.setState({ name: target.value })}
                    value={this.state.name}
                />
                <input onClick={this.add} type="button" value="Add" />
                {!!this.state.data.length && <div>click on item to remove</div>}
                <List>
                    {this.state.data.map((player, i) => (
                        <Item
                            key={player.id}
                            onClick={() => this.remove(i)}
                            className="animate__animated animate__fadeIn"
                        >
                            {player.name}
                        </Item>
                    ))}
                </List>
            </div>
        );
    }

    add() {
        const arr = this.state.data.slice();
        arr.push({ id: new Date().getTime(), name: this.state.name });
        this.setState({ data: arr, name: '' });
    }

    remove(index) {
        const data = this.state.data.slice(0);
        data.splice(index, 1);
        this.setState({ data });
    }
}

export default {
    title: 'Animate',
};

export const AnimateCss = {
    render: () => <AnimatePanel />,
    name: 'Animate.css',
    parameters: {
        docs: {
            description: {
                story:
                    "Using animate.css for CSS animations. Add items and click to remove them.",
            },
        },
    },
};
