export default [
    {
        "rules": {
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
            "camelcase": [
                "error",
                {
                    "allow": [
                        "market_hash_name",
                        "item_nameid"
                    ]
                }
            ],
            "eqeqeq": [
                "error"
            ],
            "no-process-env": [
                "off"
            ]
        },
        "ignores": [
            "data",
            "test/**/*.js",
            "eslint.config.js",
            "node_modules/"
        ]
    }
]
