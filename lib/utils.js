//Import pre-written data related resources 
const currency = require('../resources/currency');
const data = require('../resources/data');

/**
 * Set the currency for a new instance based on the parsed argument.
 * @param {String} option Any currency code used by the Steam Community Market as a String.
 * @returns {Number} A number representing the matching currency code.
 */
function setCurrency (option) {
    //Return the currency code as a number
    return (currency.hasOwnProperty(option)) ? currency[option] : currency['USD'];
}

/**
 * Set the data format for a new instance based on the parsed argument.
 * @param {String} option any data format accepted by Steam as a String.
 * @returns {String} A string representing the matching data format.
 */
function setDataFormat (option) {
    //Return the data formated as a String
    return (data.includes(option)) ? option : data[0];
}

/**
 * "Resize" a Steam Community Market listing URL to a preferred image size.
 * @param {String} image_url A default Steam Community Market listing image URL.
 * @param {Number} px The preferred image size in pixels.
 * @returns {String} A new CDN URL with the preferred image size.
 */
function resizeImage (image_url, px) {
    //Check if the parsed image URL contains the default item listing size.
    //If true replace the image urls default size with the preferred size.
    //If false return the original image url.
    return (image_url.includes('62fx62f')) ? image_url.replace('62fx62f', `${px}fx${px}f`) : image_url;
}

//Export the utility functions
module.exports = {
    setCurrency,
    setDataFormat,
    resizeImage
}