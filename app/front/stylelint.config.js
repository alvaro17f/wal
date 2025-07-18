/** @type {import('stylelint').Config} */
export default {
	extends: [
		'stylelint-config-recess-order',
		'stylelint-prettier/recommended'
	],
	rules: {
		'block-no-empty': true,
		'prettier/prettier': true
	}
};
