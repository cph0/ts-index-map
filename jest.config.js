module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "<rootDir>/src/__mocks__/styleMock.js"
    }
};