//Import the required node modules (dependencies)
const axios = require('axios');
const cheerio = require('cheerio');

//Require JS helper functions
const Utils = require('./bin/util');

class SteamMarketFetcher {
    /**
     * Creates a new instance of the Steam Market Fetcher
     * @param {Object} options an object containing valid constructor options
     * @param {String} options.currency any currency used by the Steam Community Market, defaults to USD
     * @param {String} options.format any data format accepted by Steam, defaults to json
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
     * Get the Steam Community Market price from the listing matching the market_hash_name
     * @param {String} market_hash_name the marketable item's name
     * @param {Number} appid the unique app to the item's market_hash name
     * @returns {Object} an object containing pricing for the found item
     */
    getItemPrice (market_hash_name, appid) {
        return new Promise(async (resolve, reject) => {
            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Our response object from the GET request
                const response = await axios.get(`http://steamcommunity.com/market/priceoverview/?market_hash_name=${market_hash_name}&appid=${appid}&currency=${this.currency}`);

                //Resolve the response data from the Axios GET request
                resolve(response.data);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }

    /**
     * Retrieve an item image from the first market listing matching the market_hash_name
     * @param {String} market_hash_name the marketable item's name
     * @param {Number} appid the unique app to the item's market_hash_name
     * @param {Number} px the pixel size of the item image, this option is optional & defaults to 360px
     * @returns {String} a Steam CDN URL of the item image
     */
    getItemImage (market_hash_name, appid, px) {
        return new Promise(async (resolve, reject) => {
            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Our response object from the GET request
                const response = await axios.get(`http://steamcommunity.com/market/listings/${appid}/${market_hash_name}/render?start=0&count=1&currency=${this.currency}&format=${this.format}`);

                //Load the HTML from the response data using Cheerio
                const $ = cheerio.load(response.data.results_html);

                //Select the element matching the provided class and get the src attribute
                const image = $('img.market_listing_item_img').attr('src');

                //The preferred image size, defaults to 360px
                const image_size = px || 360;

                //Resize the item image from the default size
                const resized_image = Utils.resizeImage(image, image_size);

                //Resolve the resized image url from the DOM selection
                resolve(resized_image);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }

    /**
     * Get the current Steam Community Market listings for any given Steam app 
     * @param {Number} appid the app in which to fetch market listings for
     * @param {Number} start the market listing from which to start the request, optional paraneter that defaults to 0 (the first item listed on the market for that app)
     * @returns {Array} an array containg market listings matching the provided appid
     */
    getMarketListings (appid, start) {
        return new Promise(async (resolve, reject) => {
            //Attempt to make a GET request to the Steam Community Market using Axios
            try {
                //Use the provided start or set it to 0
                const listing_start = start || 0;

                //Our response object from the GET request
                const response = await axios.get(`https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=${appid}&norender=1&start=${listing_start}&count=100`);

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