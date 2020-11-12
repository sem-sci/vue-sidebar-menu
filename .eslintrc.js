module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': ['standard', 'plugin:vue/essential'],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'vue'
  ],
  "rules": {
    "quotes": [
      "error",
      "single",
      "avoid-escape"
    ],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "semi": "error",
    "semi-spacing": "error",
    "func-call-spacing": "error",
    "camelcase": [
      "warn",
      {
        "properties": "always"
      }
    ],
    "@typescript-eslint/camelcase": "off",
    "comma-dangle": "error",
    "space-before-function-paren": "error",
    "space-before-blocks": "error",
    "spaced-comment": "error",
    "curly": "error",
    "default-case": "error",
    "vue/html-indent": [
      "error",
      2,
      {
        "attribute": 1,
        "baseIndent": 1,
        "closeBracket": 0,
        "alignAttributesVertically": true,
        "ignores": []
      }
    ],
    "vue/valid-v-for": "off",
    "vue/require-v-for-key": "off",
    "no-inferrable-types": "off",
  }
}

