module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
    },
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            (process.platform === "win32" ? "windows" : "unix")
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
}