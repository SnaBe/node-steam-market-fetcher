// Import the required dependencies
const cheerio = require('cheerio');
const CSGOCdn = require('csgo-cdn');

// Import pre-written data related resources 
const currency = require('../resources/ESteamCurrency');
const data = require('../resources/ESteamDataFormat');

/**
 * Helper class with a wide array of functions.
 */
class Helpers {
    /**
     * Set the currency to use for Steamcommunity market prices.
     * @param { string } option Any currency code used by the Steam Community Market represented as a String.
     * @returns { number } A number representing the matching currency code.
    */
    static setCurrency(option) {
        // Return the currency code as a number
        return (currency.hasOwnProperty(option)) ? currency[option] : currency['USD'];
    }

    /**
     * Set the desired data format for a response object.
     * @param { string } option Any data format accepted or used by Steam represented as a String.
     * @returns { string } A valid data format for representing objects. 
     */
    static setDataFormat(option) {
        // Return the data option as a formated String
        return (data && data.includes(option)) ? option : data[0];
    }

    /**
     * Sets the new CDN for CS:GO item images.
     * @param { CSGOCdn } option Any valid csgo-cdn instance.
     * @returns { CSGOCdn | null } Sets a custom CDN instance for CS:GO items.
     */
    static setCDN(option) {
        // Set the value of the CDN object
        return (option instanceof CSGOCdn) ? option : null;
    }

    /**
     * "Resize" a Steamcommunity Market listing URL to a preferred image size.
     * @param { string } image A default Steamcommunity Market listing image URL.
     * @param { number } pixels The preferred image size in pixels.
     * @returns { string } A new CDN URL with the preferred image size (Steamcommunity CDN only).
     */
    static resizeImage(image, pixels) {
        // Check if the parsed image URL contains the default item listing size.
        // If true, replace the image urls default size with the preferred size.
        // If false, return the original image url.
        return (image.includes('62fx62f')) ? image.replace('62fx62f', `${pixels}fx${pixels}f`) : image;
    }

    /**
     * Load an image froma HTML page.
     * @param { string | Buffer } html A HTML body represented as a String or Buffer.
     * @param { number } size The sife of the raw image in pixels.
     * @returns { string } The image url from the Steamcommunity market listing.
     */
    static loadImage(html, size) {
        // Load the HTML using Cheerio
        const $ = cheerio.load(html);

        // Get the image source url
        const image = $('img.market_listing_item_img').attr('src');

        // No image was loaded trough the HTML
        if (image === null || image === undefined) return 'No image available';

        // Return the image
        return this.resizeImage(image, size);
    }

    /**
     * Get an item's market image from a Steamcommunity Market listing.
     * @param { CSGOCdn } cdn An instance of csgo-cdn that is ready.
     * @param { string } market_hash_name A marketable item's name.
     * @param { number } appid The unique app to the item's market_hash name.
     * @param { string | Buffer } html The HTML from the Axios response object.
     * @param { number } size The desired image size in pixels (Non-CDN only).
     * @returns { string } The image retrieved from the Steamcommunity Market listing matching the market_hash_name and appid parameters.
     */
    static getImageFromListing(cdn, market_hash_name, appid, html, size) {
        // Return the image
        return (cdn !== null && cdn.ready && appid === 730) ? cdn.getItemNameURL(market_hash_name) : this.loadImage(html, size);
    }
}

// Export the Helper class and its static functions
module.exports = Helpers;