/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-outline': require('path').join(__dirname, '../../dist/main.js'),
        };
        return config;
    },
};

export default config;
