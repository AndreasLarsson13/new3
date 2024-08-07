/** @type {import('next-i18next').UserConfig} */
const path = require("path");
module.exports = {
	i18n: {
		locales: ["en", "se"],
		defaultLocale: "se",
		localeDetection: false,
	},
	localePath: path.resolve("./public/locales"),
};
