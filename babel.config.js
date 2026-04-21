module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Reanimated plugin MUST be last in the plugins array
    plugins: ["react-native-reanimated/plugin"],
  };
};
