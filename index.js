//Import the required dependencies
const axios = require('axios');
const cheerio = require('cheerio');

//Require the utility functions
const Utils = require('./lib/utils');

//Main class
class SteamMarketFetcher {
    /**
     * Creates a new instance of Steam Market Fetcher.
     * @param {Object} options An object containing valid constructor options.
     * @param {String} options.currency Any currency used by the Steam Community Market defaults to USD.
     * @param {String} options.format Any data format accepted by Steam defaults to JSON.
     */
    constructor (options) {
        //Options for different user needs
        options = options || {};

        //The currency in which to return Steam Community Market prices
        this.currency = Utils.setCurrency(options.currency); 

        //The format in which to return Steam Community Market data
        this.format = Utils.setDataFormat(options.format);
    }
    
    /**
     * Get the Steam Community Market price from the listing matching the market_hash_name argument.
     * @param {String} market_hash_name The marketable item's name.
     * @param {Number} appid The unique app to the item's market_hash name.
     * @returns {Object} An object containing pricing data for the item if available.
     */
    getItemPrice (market_hash_name, appid) {
        return new Promise(async (resolve, reject) => {
            //Encode the endpoint URL to prevent unescaped characters
            const endpoint = encodeURI(`http://steamcommunity.com/market/priceoverview/?market_hash_name=${market_hash_name}&appid=${appid}&currency=${this.currency}`);

            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Our response object from the GET request
                const response = await axios.get(endpoint);

                //Resolve the response data from the Axios GET request
                resolve(response.data);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }

    /**
     * Retrieve an image from the first market listing matching the market_hash_name argument.
     * @param {String} market_hash_name The marketable item's name.
     * @param {Number} appid The unique app to the item's market_hash_name.
     * @param {Number} px The pixel size of the item image, this is optional and defaults to 360px.
     * @returns {String} A Steam CDN URL of the item image.
     */
    getItemImage (market_hash_name, appid, px) {
        return new Promise(async (resolve, reject) => {
            //Encode the endpoint URL to prevent unescaped characters
            const endpoint = encodeURI(`http://steamcommunity.com/market/listings/${appid}/${market_hash_name}/render?start=0&count=1&currency=${this.currency}&format=${this.format}`);

            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Our response object from the GET request
                const response = await axios.get(endpoint);

                //Load the HTML from the response data using Cheerio
                const $ = cheerio.load(response.data.results_html);

                //Select the element matching the provided class and get the src attribute
                const image = $('img.market_listing_item_img').attr('src');

                //The preferred image size defaults to 360px
                const image_size = px || 360;

                //Resize the item image 
                const resized_image = Utils.resizeImage(image, image_size);

                //Resolve the resized image URL from the DOM selection
                resolve(resized_image);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }

    /**
     * Get an item's price history from the listing matching the market_hash_name argument. Requires login!
     * @param {String} market_hash_name The marketable item's name.
     * @param {Number} appid The unique app to the item's market_hash_name.
     * @param {String} cookie A steamLoginSecure cookie from SteamCommunity.com  
     */
    getItemPriceHistory (market_hash_name, appid, cookie) {
        return new Promise(async (resolve, reject) => {
            //Encode the endpoint URL to prevent unescaped characters
            const endpoint = encodeURI(`https://steamcommunity.com/market/pricehistory/?country=DE&currency=${this.currency}&appid=${appid}&market_hash_name=${market_hash_name}`);

            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Our response object from the GET request
                const response = await axios.get(endpoint, {
                    //Request headers
                    headers: {
                        Cookie: `steamLoginSecure=${cookie}`
                    }
                });

                //Resolve the price history from the response data
                resolve(response.data);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }

    /**
     * Get the current Steam Community Market listings for any given Steam app. 
     * @param {Number} appid The app in which to fetch market listings for.
     * @param {Number} start The market listing from which to start the request, optional parameter that defaults to 0 (the first items listed on the market for that app).
     * @param {String} query The query value narrows down the search, optional parameter that defaults to none.
     * @param {Number} descriptions If set, includes the search in the item's description property.
     * @returns {Array} An array containg market listings matching the provided appid.
     */
    getMarketListings (appid, start, query, descriptions) {
        return new Promise(async (resolve, reject) => {
            //Use the provided start or set it to 0
            const listing_start = start || 0;

            //Use the provided query value or set it to be empty
            const query_search = query || '';

            //Check if the query is included in the item's description.
            const include_descriptions = descriptions || 0;

            //Encode the endpoint URL to prevent unescaped characters
            const endpoint = encodeURI(`https://steamcommunity.com/market/search/render/?query=${query_search}&search_descriptions=${include_descriptions}&appid=${appid}&start=${listing_start}&count=100&norender=1`);

            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Our response object from the GET request
                const response = await axios.get(endpoint);

                //Resolve the market listings from the response data
                resolve(response.data.results);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }
}

//Export the module for further use
module.exports = SteamMarketFetcher;