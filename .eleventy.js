const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy("src/images");

  // Filter out drafts in production
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink(data) {
      if (data.draft && process.env.NODE_ENV !== "development") return false;
      return data.permalink;
    },
    eleventyExcludeFromCollections(data) {
      if (data.draft && process.env.NODE_ENV !== "development") return true;
      return data.eleventyExcludeFromCollections;
    },
  });

  return {
    dir: { input: "src", output: "_site" },
  };
};
