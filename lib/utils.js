// Import the required dependencies
const cheerio = require('cheerio')
const CSGOCdn = require('csgo-cdn')

// Import pre-written data related resources 
const currency = require('../resources/ESteamCurrency')
const data = require('../resources/ESteamDataFormat')

/**
 * Set the currency to use for Steam Community Market prices.
 * @param { string } option Any currency code used by the Steam Community Market represented as a String.
 * @returns { number } A number representing the matching currency code.
*/
function setCurrency(option) {
    // Return the currency code as a number
    return (Object.prototype.hasOwnProperty.call(currency, option)) ? currency[option] : currency['USD']
}

/**
 * Set the desired data format for a response object.
 * @param { string } option Any data format accepted or used by Steam represented as a String.
 * @returns { string } A valid data format for representing objects. 
 */
function setDataFormat(option) {
    // Return the data option as a formated String
    return (data && data.includes(option)) ? option : data[0]
}

/**
 * Sets the new CDN for CS:GO item images.
 * @param { CSGOCdn } option Any valid csgo-cdn instance.
 * @returns { CSGOCdn | null } Sets a custom CDN instance for CS:GO items.
 */
function setCDN(option) {
    // Set the value of the CDN object
    return (option instanceof CSGOCdn) ? option : null
}

/**
 * "Resize" a Steam Community Market listing URL to a preferred image size.
 * @param { string } image A default Steam Community Market listing image URL.
 * @param { number } pixels The preferred image size in pixels.
 * @returns { string } A new CDN URL with the preferred image size (Steam Community CDN only).
 */
function resizeImage(image, pixels) {
    // Check if the parsed image URL contains the default item listing size.
    // If true, replace the image urls default size with the preferred size.
    // If false, return the original image url.
    return (image.includes('62fx62f')) ? image.replace('62fx62f', `${pixels}fx${pixels}f`) : image
}

/**
 * Load an image from a HTML page.
 * @param { string | Buffer } html A HTML body represented as a String or Buffer.
 * @param { number } size The size of the raw image in pixels.
 * @returns { string } The image url from the Steam Community market listing.
 */
function loadImage(html, size) {
    // Load the HTML using Cheerio
    const $ = cheerio.load(html)

    // Get the image source url
    const image = $('img.market_listing_item_img').attr('src')

    // No image was loaded trough the HTML
    if (image === null || image === undefined) return 'No image available'

    // Return the image
    return resizeImage(image, size)
}

/**
 * Get an item's market image from a Steam Community Market listing.
 * @param { CSGOCdn } cdn An instance of csgo-cdn that is ready.
 * @param { string } market_hash_name A marketable item's name.
 * @param { number } appid The unique app to the item's market_hash name.
 * @param { string | Buffer } html The HTML from the Axios response object.
 * @param { number } size The desired image size in pixels (Non-CDN only).
 * @returns { string } The image retrieved from the Steam Community Market listing matching the market_hash_name and appid parameters.
 */
function getImageFromListing(cdn, market_hash_name, appid, html, size) {
    // Return the image
    return (cdn !== null && cdn.ready && appid === 730) ? cdn.getItemNameURL(market_hash_name) : loadImage(html, size)
}

// Export the utility functions
module.exports = {
    setCurrency,
    setDataFormat,
    setCDN,
    resizeImage,
    loadImage,
    getImageFromListing
}
