
//import { LoremIpsum } from "lorem-ipsum";
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
/**
 * Registers the "foo" Handlebars helper.
 *
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */



module.exports = function(handlebars) {
  handlebars.registerHelper('colorCodes', function(color) {
    // const colorArr ={       
    //     background: '#f7f4e1',
    //     black: '#000',
    //     gray_dark: '#7c7f7f',
    //     gray_darker:' #333',
    //     gray_light: '#d9d9d9',
    //     gray_lighter: '#f2f2f2',
    //     orange: '#da6802',
    //     red_dark: '#b10000',
    //     red:' #d01a1a',
    //     primary_darker: "#0A2D40",
    //     primary_dark: "#0E4056",
    //     primary: "#11455D",
    //     primary_light: "#006185",
    //     primary_lighter: "#00698E",
    //     secondary_darker: "#16979F",
    //     secondary_dark: "#08A6AF",
    //     secondary:" #0CB3BF",
    //     secondary_light: "#0EBEC8",
    //     secondary_lighter: "#7BB2BF", 
    //   }

    const arrColor =[
      "Beige",
      "Black",
      "Blue",
      "BlueLight",
      "BlueNavy",
      "BodyColor",
      "Brown",
      "DarkBeige",
      "DarkBlue",
      "DarkGrey",
      "DarkOrange",
      "DarkPlum",
      "DarkRed",
      "Gray",
      "Green",
      "Grey",
      "Light",
      "LightBlue",
      "LightGreen",
      "LightGrey",
      "LightOrange",
      "LightRed",
      "LightTurquoise",
      "LightYellow",
      "Orange",
      "Pink",
      "PinkLight",
      "Plum",
      "Red",
      "SapphireBackground",
      "SapphireBlue",
      "SapphireBlue",
      "SapphireClinician",
      "SapphireDarkBlue1",
      "SapphireDarkBlue2",
      "SapphireDarkGrey",
      "SapphireDarkText",
      "SapphireFemale",
      "SapphireInactive",
      "SapphireLight",
      "SapphireLightBoard",
      "SapphireLightContainer",
      "SapphireLightText",
      "SapphireLightText2",
      "SapphireMale",
      "SapphireSilver",
      "SapphireWarning",
      "SapphireWhite",
      "Silver",
      "Transparent",
      "Turquoise",
      "White",
      "Yellow"
  ]
    console.log(arrColor);
  return arrColor.join('');     

    // return new handlebars.SafeString(colorArr[color]);
  });
};
