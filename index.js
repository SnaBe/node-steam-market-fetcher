//Import the required node modules (dependencies)
const axios = require('axios');
const cheerio = require('cheerio');

//Require JS helper functions
const Utils = require('./bin/util');

class SteamMarketFetcher {
    /**
     * Creates a new instance of the Steam Market Fetcher
     * @param {Object} options an object containing valid constructor options
     * @param {Number} options.currency any currency used by the Steamcommunity market, defaults to USD
     * @param {String} options.format any data format accepted by Steam, defaults to json
     */
    constructor (options) {
        //Options for different user needs
        options = options || {};

        //The currency in which to return Steamcommunity market prices
        this.currency = Utils.setCurrency(options.currency); 

        //The format in which to return Steamcommunity market data
        this.format = Utils.setDataFormat(options.format);
    }
    
    /**
     * Get the Steamcommunity market price from the listing matching the market_hash_name
     * @param {String} market_hash_name the marketable item's name
     * @param {Number} appid the unique app to the item's market_hash name
     * @returns {Object} an object containing pricing for the found item
     */
    getItemPrice (market_hash_name, appid) {
        return new Promise(async (resolve, reject) => {
            //Attempt to make a GET request to the Steamcommunity market using Axios
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
     * @param {Number} px the size of the item image, this option is optional & defaults to 360px
     * @returns {String} a Steam CDN URL of the item image
     */
    getItemImage (market_hash_name, appid, px) {
        return new Promise(async (resolve, reject) => {
            //Attempt to make a GET request to the Steamcommunity market using Axios
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
     * Get the current Steamcommunity market listings for any giving app (experimental)
     * @param {Number} appid the app in which to fetch market listings for
     * @returns {Array} an array containg market listings matching the provided appid
     */
    getMarketListings (appid) {
        return new Promise(async (resolve, reject) => {
            //Attempt to make a GET request to the Steamcommunity market using Axios
            try {
                //Array containing fetched market listings
                var listings = [];

                //Keep count of start, pagesize & total listing count
                var counter = { start: 0, total_listings: 0, current_loop: 0, requests_to_make: 0 };

                //Execute this request loop at least once
                do {
                    //Our response object from the GET request
                    const response = await axios.get(`https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=${appid}&norender=1&start=${counter.start}&count=100`);

                    //Add up our listing start matching the pagesize
                    counter.start += 100;

                    //Add up our current loop count
                    counter.current_loop++;

                    //If the total listings count has not been set
                    if(counter.total_listings === 0) {
                        //Update the total listings count using the total count from the response data
                        counter.total_listings = response.data.total_count; 

                        //Calculate the amount of requests to make to the Steamcommunity market
                        counter.requests_to_make = Math.round(counter.total_listings / 100); 
                    }

                    //Merge our listings array with that of the response data results
                    listings = listings.concat(response.data.results);
                } while(counter.current_loop <= counter.requests_to_make);
                //Resolve the resized image url from the DOM selection
                resolve(listings);
            } catch (error) {
                //Reject the error we caught
                reject(error);
            }
        });
    }
}

//Export the module for further use
module.exports = SteamMarketFetcher;