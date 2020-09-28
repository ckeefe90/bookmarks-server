module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "extends": [
        "eslint:recommended"
    ],
    "plugins": [
        "mocha"
    ],
    "globals": {
        "supertest": true,
        "expect": true,
        "describe": true,
        "it": true
    }
}