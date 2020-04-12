//Import pre-written data related resources 
const currency = require('../resources/currency');
const data = require('../resources/data');

/**
 * Set the currency for a new instance based on the parsed currency option
 * @param {String} option any currency code used by the Steam Community Market, as a String
 * @returns {Number} a Number representing the currency code
 */
function setCurrency (option) {
    //Return the currency code as a number
    return (currency.hasOwnProperty(option)) ? currency[option] : currency['USD'];
}

/**
 * Set the data format for a new instance based on the parsed data option
 * @param {String} option any data format accepted by Steam, as a String
 * @returns {String} a String representing the data format
 */
function setDataFormat (option) {
    //Return the data format String
    return (data.includes(option)) ? option : data[0];
}

/**
 * Resize a Steam Community Market listing url to a preferred image size
 * @param {String} image_url a default Steam Community Market listing image
 * @param {Number} px the size of the image in pixels
 * @returns {String} the resized image url
 */
function resizeImage (image_url, px) {
    //Check if the parsed image url contains the default item listing size
    //If true, replace the image urls default size with the preferred size
    //If false, return the original image url
    return (image_url.includes('62fx62f')) ? image_url.replace('62fx62f', `${px}fx${px}f`) : image_url;
}

//Export the functions
module.exports = {
    setCurrency,
    setDataFormat,
    resizeImage
}