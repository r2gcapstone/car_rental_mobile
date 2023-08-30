module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            assets: "./assets",
            components: "./components",
            constants: "./constants",
            context: "./context",
            hooks: "./hooks",
            api: "./api",
          },
        },
      ],
    ],
  };
};
