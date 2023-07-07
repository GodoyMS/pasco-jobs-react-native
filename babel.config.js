module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@config": "./src/config",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@assets": "./assets",
            "@helpers": "./src/helpers",
            "@store": "./src/store",
            "@services": "./src/services",
            "@features": "./src/features",
            "@data": "./src/data",


            // Add your alias paths here
          },
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ]
        },
      ],
    ],
  };
};
