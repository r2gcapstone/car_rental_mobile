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
            layouts: "./layouts",
            components: "./components",
            constants: "./constants",
            context: "./context",
            utils: "./utils",
            hooks: "./hooks",
            api: "./api",
            json: "./json",
          },
        },
      ],
    ],
  };
};
