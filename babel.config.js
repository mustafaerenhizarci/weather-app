module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ["tailwindcss-react-native/babel",[
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env"
      }
    ]],
    presets: ['babel-preset-expo'],
  };
};
