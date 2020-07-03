module.exports = api => {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        store: './store',
                        reducers: './reducers',
                        api: './api',
                        hooks: './hooks',
                    },
                },
            ],
        ],
    };
};
