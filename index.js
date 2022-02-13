// Import the required dependencies for this class
const axios = require('axios');

// The csgo-cdn module provides the option for an alternative source for CS:GO item images.
const CSGOCdn = require('csgo-cdn');

// Require some helper functions
const Helpers = require('./helpers/index');

/**
 * Steamcommunity Market class wrapper for fetching item prices, images and listings from the Steamcommunity Market.
 */
class SteamMarketFetcher {
    /**
     * Creates a new instance of the Steam Market Fetcher.
     * @param { object } options An object containing valid constructor options.
     * @param { string } options.currency Any currency used by the Steam Community Market, defaults to USD.
     * @param { string } options.format Any data format accepted by Steam, defaults to JSON.
     * @param { CSGOCdn } options.CDN Steam CDN handler for CS:GO items and their image URLs.
     * @returns { SteamMarketFetcher } A fresh Steam Market Fetcher instance.
    */
    constructor (options) {
        // Options for different user needs
        options = options || {};

        // The currency in which to return Steam Community Market prices
        this.currency = Helpers.setCurrency(options.currency); 

        // The format in which to return Steam Community Market data
        this.format = Helpers.setDataFormat(options.format);

        // The CDN to use for CSGO items
        this.CDN = Helpers.setCDN(options.CDN);
    }
    
    /**
     * Get the Steamcommunity Market price from the listing matching the `market_hash_name` argument.
     * @param { object } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's name.
     * @param { number } params.appid The unique app to the item's market_hash name.
     * @param { function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<object> | function } An object containing Steamcommunity price data matching the market_hash_name parameter.
    */
    getItemPrice ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730, callback } = {}) {
        // Type check the market_hash_name parameter for matching a string
        if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "market_hash_name" parameter is not a valid string or missing.');
        }

        // Type check the appid parameter for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" parameter is not a number or missing.');
        }

        // Encode the Steamcommunity Market endpoint for handling items with unique characters in their market_hash_name
        const endpoint = encodeURI(`http://steamcommunity.com/market/priceoverview/?market_hash_name=${market_hash_name}&appid=${appid}&currency=${this.currency}`);

        // Make a GET request to the endpoint matching the market_hash_name and appid parameters
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data);
            }

            // Return the response data as a Promise
            return response.data;
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null);
            } else {
                // Throw the error 
                throw error;
            }            
        });
    }

    /**
     * Fetches an image from the first Steamcommunity market listing matching the `market_hash_name` argument.
     * @param { object } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's name.
     * @param { number } params.appid The unique app to the item's market_hash_name.
     * @param { number } params.px The desired size of the item image in pixels, this is optional and defaults to 360px.
     * @param { function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<string> | Function } A Steamcommunity or Steam CDN URL of the item image.
    */
    getItemImage ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730, px = 360, callback } = {}) {
        // Type check the market_hash_name parameter for matching a string
        if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "market_hash_name" parameter is not a valid string or missing.');
        }

        // Type check the appid parameter for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" parameter is not a number or missing.');
        }

        // Type check the px parameter for matching a number
        if (typeof px !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "px" parameter is not a number or missing.');
        }

        // Encode the Steamcommunity Market endpoint for handling items with unique characters in their market_hash_name
        const endpoint = encodeURI(`http://steamcommunity.com/market/listings/${appid}/${market_hash_name}/render?start=0&count=1&currency=${this.currency}&format=${this.format}`);

        // Make a GET request to the endpoint matching the market_hash_name and appid parameters
        return axios.get(endpoint).then(response => {
            // Get the item image from a Steamcommunity listing or the Steam CDN
            const listingImage = Helpers.getImageFromListing(this.CDN, market_hash_name, appid, response.data.results_html, px); 

            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Handle the callback parameter for returning the response object
                callback(null, listingImage);
            }

            // Return the image as a Promise
            return listingImage;
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null);
            } else {
                // Throw the error 
                throw error;
            }
        });
    }

    /**
     * Get an item's price history from the Steamcommunity listing matching the `market_hash_name` argument. 
     * @param { object } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's name.
     * @param { number } params.appid The unique app to the item's market_hash_name.
     * @param { string } params.cookie A steamLoginSecure cookie from Steamcommunity.com session.
     * @param { function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise. 
     * @returns { Promise<object> | Function } The price history for the item matching the parameters.
    */
    getItemPriceHistory ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730, cookie, callback } = {}) {
        // Type check the market_hash_name parameter for matching a string
        if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "market_hash_name" parameter is not a valid string or missing.');
        }

        // Type check the appid parameter for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" parameter is not a number or missing.');
        }

        // Type check the cookie parameter for matching a string
        if (typeof cookie !== 'string' || cookie.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "cookie" parameter is not a string or missing.');
        }

        // Encode the Steamcommunity Market endpoint for handling items with unique characters in their market_hash_name
        const endpoint = encodeURI(`https://steamcommunity.com/market/pricehistory/?currency=${this.currency}&appid=${appid}&market_hash_name=${market_hash_name}`);

        // Make a GET request to the endpoint matching the market_hash_name and appid parameters
        return axios.get(endpoint, { headers: { Cookie: `steamLoginSecure=${cookie}` }}).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data);
            }

            // Return the response data as a Promise
            return response.data;
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null);
            } else {
                // Throw the error 
                throw error;
            }            
        });
    }

    /**
     * Get the current Steam Community Market listings for any given Steam app. 
     * @param { object } params An object of valid arguments for the getMarketListings method. All are "optional" and have default values.
     * @param { string } params.query The query value narrows down the search, optional parameter that defaults to none.
     * @param { number } params.descriptions If set to 1, includes the query in the item's description property.
     * @param { number } params.appid The app in which to fetch market listings for.
     * @param { number } params.start The market listing from which to start the request, optional parameter that defaults to 0 (the first items listed on the market for that app).
     * @param { function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<array> | Function } An array containg market listings matching the provided appid.
    */
    getMarketListings ({ query = '', descriptions = 0, appid = 730, start = 0, callback } = {}) {
        // Type check the query parameter for matching a string
        if (typeof query !== 'string') {
            // Throw an error in case the check failed
            throw new Error('The "query" parameter is not a string or missing.');
        }

        // Type check the descriptions parameter for matching a string
        if (typeof descriptions !== 'number' || [0, 1].indexOf(descriptions) === -1) {
            // Throw an error in case the check failed
            throw new Error(`Unexpected value "${descriptions}" for the "descriptions" parameter. Expected a numeric integer between 0 and 1.`);
        }

        // Type check the appid parameter for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" parameter is not a number or missing.');
        }

        // Type check the start parameter
        if (typeof start !== 'number' || !(start > -1)) {
            throw new Error('The "start" parameter is an invalid number or missing.');
        }

        //Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`https://steamcommunity.com/market/search/render/?query=${query}&search_descriptions=${descriptions}&appid=${appid}&start=${start}&count=100&norender=1`);

        // Make a GET request to the endpoint matching the market_hash_name and appid parameters.
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data.results);
            }

            // Return the response data as a Promise
            return response.data.results;
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null);
            } else {
                // Throw the error 
                throw error;
            }            
        });
    }
}

// Export the SteamMarketFetcher Wrapper class
module.exports = SteamMarketFetcher;