import React from 'react';

export default {
    title: 'Welcome',
};

export const ToStorybook = {
    render: () => (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Welcome to react-outline Storybook</h1>
            <p>
                react-outline is a utility for managing your inline styles in React.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Cleaner JSX markup (without the styles)</li>
                <li>Easy creation of styled elements</li>
                <li>Support for UI Color Palette</li>
                <li>Dynamically add vendor prefixes</li>
                <li>Cache calculated styles</li>
                <li>CSS pseudo-selectors (:hover, :focus, etc.)</li>
                <li>Media query support</li>
            </ul>
            <h2>Getting Started</h2>
            <pre
                style={{
                    background: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '5px',
                }}
            >
                {`import outline from 'react-outline'

const styles = outline({ 
  title: { fontSize: 25, color: 'red' } 
});

const Title = styles.title\`div\`

export default <Title>Hello World</Title>`}
            </pre>
            <p>
                Browse the stories in the sidebar to see more examples of what
                react-outline can do.
            </p>
        </div>
    ),
    name: 'to Storybook',
};
