export default {
  testMatch: [
    "**/src/**/*.test.js",
    "**/__tests__/**/*.test.js",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    "^.+\.js$": "babel-jest"
  },
  moduleFileExtensions: ["js", "json", "jsx", "node"],
};