module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["tailwindcss-react-native/babel", ["module:react-native-dotenv"]],
    presets: ["babel-preset-expo"],
  };
};
