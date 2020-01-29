
//import { LoremIpsum } from "lorem-ipsum";
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
/**
 * Registers the "foo" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */



module.exports = function(handlebars) {
  handlebars.registerHelper('lorem', function(arg1, arg2, options) {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
    });


    return new handlebars.SafeString(lorem.generateSentences(arg1));
  });
};
