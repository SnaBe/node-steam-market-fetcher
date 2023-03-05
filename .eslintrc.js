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
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "@typescript-eslint/no-explicit-any": [
            "off"
        ]
    }
}