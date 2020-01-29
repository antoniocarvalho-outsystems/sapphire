
//import { LoremIpsum } from "lorem-ipsum";
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
/**
 * Registers the "foo" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */



module.exports = function(handlebars) {
  handlebars.registerHelper('btnTypes', function(value) {
   const btnTypes = {
     button:'Primary',
     second:'Secondary',
     third:'Third',
     link:'Link',
     cancel:'Cancel'
   }


    return new handlebars.SafeString(btnTypes[value]);
  });
};
