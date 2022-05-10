module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: ["airbnb", "plugin:import/typescript", "prettier"],
	env: {
		node: true,
		jest: true,
	},
	plugins: ["@typescript-eslint", "import"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: ["./tsconfig.json"],
	},
	rules: {
		"react/jsx-filename-extension": [
			1,
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] },
		],
		"import/no-unresolved": [1, { ignore: ["react", "prop-types"] }],
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["warn"],
		"react/static-property-placement": ["off"],
	},
	globals: {
		window: true,
		document: true,
	},
};
