/**
 * Adds `.jsx`, `.ts` and `.tsx` as an extension, and enables JSX/TSX parsing.
 */
const jsExtensions = [".js", ".jsx"];
const tsExtensions = [".ts", ".tsx"];
const allExtensions = jsExtensions.concat(tsExtensions);

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
		tsconfigRootDir: "./",
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": tsExtensions,
		},
		"import/resolver": {
			typescript: {
				project: "./tsconfig.json",
			},
		},
	},
	rules: {
		"react/jsx-filename-extension": [1, { extensions: allExtensions }],
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
		// WHEN RELEASED > 7.29.4
		// "react/require-default-props": [2, { functions: "defaultArguments" }],
		"react/require-default-props": [
			2,
			{ ignoreFunctionalComponents: true, forbidDefaultForRequired: true },
		],
	},
	globals: {
		window: true,
		document: true,
	},
};
