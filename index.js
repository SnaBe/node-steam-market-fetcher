// Import the required dependencies for the SteamMarketFetcher class
const axios = require('axios')

// Require some utility functions
const { setCurrency, setDataFormat, setCDN, getImageFromListing } = require('./lib/utils')

/**
 * A Node.js wrapper for the Steam Community Market API.
 */
class SteamMarketFetcher {
    /**
     * Creates a new SteamMarketFetcher instance.
     * @param { SteamMarketOptions } options An object of valid options for the SteamMarketFetcher class constructor.
     * @param { string } options.currency Any valid currency the Steam Community Market uses, defaults to USD.
     * @param { string } options.format Any valid data format accepted by Steam, defaults to JSON.
     * @param { SteamMarketCDN } options.CDN Steam CDN handler for CS:GO items and their image URLs.
     * @returns { SteamMarketFetcher } A new SteamMarketFetcher instance.
    */
    constructor ({ currency = 'USD', format = 'json', CDN = null } = {}) {
        // The currency in which to return Steam Community Market prices
        this.currency = setCurrency(currency) 

        // The format in which to return Steam Community Market data
        this.format = setDataFormat(format)

        // The CDN to use for CSGO items
        this.CDN = setCDN(CDN)
    }
    
    /**
     * Get the market price from the first listing that matches the `market_hash_name` and `appid` arguments.
     * @param { GetItemPriceParameters } params An object of valid parameters for the `getItemPrice` method. All are "optional" and have default values.
     * @param { string } params.market_hash_name The item's universal market name.
     * @param { number } params.appid The app that owns the item.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetItemPriceResponse> | void } An object that contains price data that matches the `market_hash_name` and `appid` arguments.
    */
    getItemPrice ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730, callback } = {}) {
        // Type check the market_hash_name argument for matching a string
        if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "market_hash_name" argument is not a valid string or missing.')
        }

        // Type check the appid argument for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" argument is not a number or missing.')
        }

        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`http://steamcommunity.com/market/priceoverview/?market_hash_name=${market_hash_name}&appid=${appid}&currency=${this.currency}`)

        // Make a GET request to the endpoint matching the market_hash_name and appid arguments
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Retrieves an image URL from the first market listing that matches the `market_hash_name` and `appid` arguments.
     * @param { GetItemImageParameters } params An object of valid arguments for the `getItemImage` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The item's universal market name.
     * @param { number } params.appid The app that owns the item.
     * @param { number } params.size Optional parameter for the desired image `size`, defaults to 360x360 pixels.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<string> | void } A Steam Community or Steam CDN image URL.
    */
    getItemImage ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730, size = 360, callback } = {}) {
        // Type check the market_hash_name argument for matching a string
        if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "market_hash_name" argument is not a valid string or missing.')
        }

        // Type check the appid argument for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" argument is not a number or missing.')
        }

        // Type check the size argument for matching a number
        if (typeof size !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "size" argument is not a number or missing.')
        }

        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`http://steamcommunity.com/market/listings/${appid}/${market_hash_name}/render?start=0&count=1&currency=${this.currency}&format=${this.format}`)

        // Make a GET request to the endpoint matching the market_hash_name and appid arguments
        return axios.get(endpoint).then(response => {
            // Get the item image from a Steam Community listing or Steam's CDN
            const listingImage = getImageFromListing(this.CDN, market_hash_name, appid, response.data.results_html, size)

            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Handle the callback parameter for returning the response object
                callback(null, listingImage)
            } else {
                // Return the image as a Promise
                return listingImage
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get an item's price history from the first market listing that matches the `market_hash_name` and `appid` arguments. 
     * @param { GetItemPriceHistoryParameters } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The item's universal market name.
     * @param { number } params.appid The app that owns the item.
     * @param { string } params.cookie A steamLoginSecure `cookie` from Steamcommunity.com session. This parameter is required as you must be logged into Steam to perform the request.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetItemPriceHistoryResponse> | void } The price history for the item matching the `market_hash_name` and `appid` arguments.
    */
    getItemPriceHistory ({ market_hash_name = 'AK-47 | Redline (Field-Tested)', appid = 730, cookie, callback } = {}) {
        // Type check the market_hash_name argument for matching a string
        if (typeof market_hash_name !== 'string' || market_hash_name.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "market_hash_name" argument is not a valid string or missing.')
        }

        // Type check the appid argument for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" argument is not a number or missing.')
        }

        // Type check the cookie argument for matching a string
        if (typeof cookie !== 'string' || cookie.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "cookie" argument is not a string or missing.')
        }

        // Encode the Steam Community Market endpoint for handling items with unique characters in their market_hash_name
        const endpoint = encodeURI(`https://steamcommunity.com/market/pricehistory/?currency=${this.currency}&appid=${appid}&market_hash_name=${market_hash_name}`)

        // Make a GET request to the endpoint matching the market_hash_name and appid arguments
        return axios.get(endpoint, { headers: { Cookie: `steamLoginSecure=${cookie}` }}).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get the current Steam Community Market listings for any given Steam app.
     * @param { GetMarketListingsParameters } params An object of valid arguments for the `getMarketListings` method. All are "optional" and have default values.
     * @param { string } params.query The query value narrows down the search, an optional parameter that defaults to an empty state.
     * @param { number } params.descriptions If set to 1, includes the query in the item's description when searching for matches.
     * @param { number } params.appid The app that owns the items.
     * @param { number } params.start The market listing from which to start the request, an optional parameter that defaults to 0 (the first items listed on the market for that app).
     * @param { number } params.count The maximum number of items to be returned by the request, an optional parameter that defaults to 100.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMarketListingsResponse> | void } An array of market listings matching the `query` and `appid` arguments.
    */
    getMarketListings ({ query = '', descriptions = 0, appid = 730, start = 0, count = 100, callback } = {}) {
        // Type check the query argument for matching a string
        if (typeof query !== 'string') {
            // Throw an error in case the check failed
            throw new Error('The "query" argument is not a string or missing.')
        }

        // Type check the descriptions argument for matching a string
        if (typeof descriptions !== 'number' || [0, 1].indexOf(descriptions) === -1) {
            // Throw an error in case the check failed
            throw new Error(`Unexpected value "${descriptions}" for the "descriptions" argument. Expected a numeric integer between 0 and 1.`)
        }

        // Type check the appid argument for matching a number
        if (typeof appid !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "appid" argument is not a number or missing.')
        }

        // Type check the start argument
        if (typeof start !== 'number' || !(start > -1)) {
            // Throw an error in case the check failed
            throw new Error('The "start" argument is an invalid number or missing.')
        }

        // Type check the count argument
        if (typeof count !== 'number' || !(count > -1 && count <= 100)) {
            // Throw an error in case the check failed
            throw new Error('The "count" argument is an invalid number or missing.')
        }

        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`https://steamcommunity.com/market/search/render/?query=${query}&search_descriptions=${descriptions}&appid=${appid}&start=${start}&count=${count}&norender=1`)

        // Make a GET request to the endpoint matching the market_hash_name and appid arguments
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get a list of Steam Community Market order activities for a specific item.
     * @param { GetItemActivityParameters } params An object of valid arguments for the `getItemActivity` method. All are "optional" and have default values.
     * @param { string } params.item_nameid The `nameid` of the item.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetItemActivityResponse> | void } An array of order activities that matches the `item_nameid` argument.
     */
    getItemActivity ({ item_nameid = '', callback }) {
        // Type check the item_nameid argument for matching a string
        if (typeof item_nameid !== 'string' || item_nameid === '' || item_nameid.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "item_nameid" argument is not a string or missing.')
        }
        
        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`https://steamcommunity.com/market/itemordersactivity?country=US&language=english&currency=${this.currency}&item_nameid=${item_nameid}&two_factor=0`)

        // Make a GET request to the endpoint matching the item_nameid argument
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get a Steam Community Market order histogram for a specific item.
     * @param { GetItemHistogramParameters } params An object of valid arguments for the `getItemHistogram` method. All are "optional" and have default values.
     * @param { string } params.item_nameid The `nameid` of the item.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetItemHistogramResponse> | void } A histogram object for buy and sell orders that matches the `item_nameid` argument.
     */
    getItemHistogram ({ item_nameid = '', callback }) {
        // Type check the item_nameid argument for matching a string
        if (typeof item_nameid !== 'string' || item_nameid === '' || item_nameid.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "item_nameid" argument is not a string or missing.')
        }
        
        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`https://steamcommunity.com/market/itemordershistogram?norender=1&country=US&language=english&currency=${this.currency}&item_nameid=${item_nameid}&two_factor=0`)

        // Make a GET request to the endpoint matching the item_nameid argument
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get your own Steam Community Market history.
     * @param { GetMyHistoryParameters } params An object of valid arguments for the `getMyHistory` method. All are "optional" and have default values.
     * @param { string } params.cookie A steamLoginSecure `cookie` obtained from Steamcommunity.com. This parameter is required as you must be logged into Steam to perform the request.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyHistoryResponse> | void } An object that contains your Steam Community Market history.
     */
    getMyHistory ({ cookie, callback }) {
        // Type check the cookie argument for matching a string
        if (typeof cookie !== 'string' || cookie.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "cookie" argument is not a string or missing.')
        }

        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI('https://steamcommunity.com/market/myhistory?norender=1')

        // Make a GET request to the endpoint matching the cookie argument
        return axios.get(endpoint, { headers: { Cookie: `steamLoginSecure=${cookie}` }}).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get your own Steam Community Market listings.
     * @param { GetMyListingsParameters } params An object of valid arguments for the `getMyListings` method. All are "optional" and have default values.
     * @param { string } params.cookie A steamLoginSecure `cookie` obtained from Steamcommunity.com. This parameter is required as you must be logged into Steam to perform the request.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyListingsResponse> | void } An object that contains your Steam Community Market listings.
     */
    getMyListings ({ cookie, callback }) {
        // Type check the cookie argument for matching a string
        if (typeof cookie !== 'string' || cookie.length === 0) {
            // Throw an error in case the check failed
            throw new Error('The "cookie" argument is not a string or missing.')
        }

        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI('https://steamcommunity.com/market/mylistings?norender=1')

        // Make a GET request to the endpoint matching the cookie argument
        return axios.get(endpoint, { headers: { Cookie: `steamLoginSecure=${cookie}` }}).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get the most popular Steam Community Market listings.
     * @param { GetMyListingsParameters } params An object of valid arguments for the `getPopularListings` method. All are "optional" and have default values.
     * @param { number } params.start The market listing from which to start the request, an optional parameter that defaults to 0 (the first popular item listed on the market).
     * @param { number } params.count The maximum number of items to be returned by the request, an optional parameter that defaults to 100.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyListingsResponse> | void } An object that contains the most popular Steam Community Market listings.
     */
    getPopularListings ({ start = 0, count = 100, callback }) {
        // Type check the start argument for matching a number
        if (typeof start !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "start" argument is not a number or missing.')
        }

        // Type check the count argument for matching a number
        if (typeof count !== 'number') {
            // Throw an error in case the check failed
            throw new Error('The "count" argument is not a number or missing.')
        }

        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`https://steamcommunity.com/market/popular?country=US&language=english&currency=${this.currency}&norender=1&start=${start}&count=${count}`)

        // Make a GET request to the endpoint matching the start and count arguments
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }

    /**
     * Get the most recent Steam Community Market listings.
     * @param { GetRecentListingsParameters } params An object of valid arguments for the `getItemHistogram` method. All are "optional" and have default values.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetRecentListingsResponse> | void } An object that contains the most recent Steam Community Market listings.
     */
    getRecentListings ({ callback }) {
        // Encode the endpoint URL to prevent unescaped characters
        const endpoint = encodeURI(`https://steamcommunity.com/market/recent?country=US&language=english&currency=${this.currency}&norender=1`)

        // Make a GET request to the endpoint matching the arguments
        return axios.get(endpoint).then(response => {
            // Handle the callback parameter for returning the response object
            if (typeof callback === 'function') {
                // Return the callback with the response data
                callback(null, response.data)
            } else {
                // Return the response data as a Promise
                return response.data
            }
        }).catch(error => {
            // Handle the callback parameter for returning the error
            if (typeof callback === 'function') {
                // Return the callback with the error
                callback(error, null)
            } else {
                // Throw the error
                throw error
            }
        })
    }
}

// Export the SteamMarketFetcher wrapper class
module.exports = SteamMarketFetcher
