// Custom any-type for Steam related CDNs
export type SteamMarketCDN = any;

// The PriceHistory array should contain a date, a price and an unknown string
export type PriceHistory = [ string, number, string ];

// Constructor options for the SteamMarketFetcher class
export interface SteamMarketOptions {
    currency: string, // Currency options
    format?: string, // Data format options
    CDN?: SteamMarketCDN // Steam CDN options
}

// Response object for the getItemPrice method
export interface GetItemPriceResponse {
    success: boolean, // If the request was a success
    lowest_price: string, // The lowest listing price
    volume: string, // Number of items listed
    median_price: string // The median listing price
}

// Options for the getItemPrice method
export interface GetItemPriceParameters {
    market_hash_name?: string, // The name of the item
    appid?: number, // The app id associated with the item
    callback?: (error: Error | null, response: GetItemPriceResponse | null) => void // Callback function
}

// Options for the getItemImage method
export interface GetItemImageParameters {
    market_hash_name?: string, // The name of the item
    appid?: number, // The app id associated with the item
    size?: string, // The size of the image in pixels
    callback?: (error: Error | null, response: string | null) => void // Callback function
}

// Response object for the getItemPriceHistory method
export interface GetItemPriceHistoryResponse {
    success: boolean, // If the request was a success
    price_prefix: string, // For prices in USD or similar
    price_suffix: string, // For prices in Euro or similar
    prices: Array<PriceHistory> // The item's price history stored as a nested array
}

// Options for the getItemPriceHistory method
export interface GetItemPriceHistoryParameters {
    market_hash_name?: string, // The name of the item
    appid?: number, // The app id associated with the item
    cookie: string, // Steam Community session cookie
    callback?: (error: Error | null, response: GetItemPriceHistoryResponse | null) => void // Callback function
}

// Steam Community Market listing object
export interface SteamMarketListing {
    name: string, // The item's display name
    hash_name: string, // The item's hash name
    sell_listings: number, // The number of sell listings
    sell_price: number, // The item's sell price
    sell_price_text: string, // The item's sell price as a string
    app_icon: string, // Link to the game's app icon
    app_name: string, // The name of the game
    asset_description: {
        appid: number, // The app id associated with the item
        classid: string, // The class id associated with the item
        instanceid: string, // The item's instance id
        background_color: string, // The item's background color on Steam
        icon_url: string, // The item's icon url on Steam
        tradable: 0 | 1, // The item's tradable status
        name: string, // The name of the asset
        name_color: string, // The item's name color on Steam
        type: string, // Item type or category
        market_name: string, // The item's market name
        market_hash_name: string, // The item's market hash name
        commodity: number // The number of commodities
    },
    sale_price_text: string // The sale price as a string
}

// Options for the getMarketListings method
export interface GetMarketListingsParameters {
    query?: string, // Query options
    descriptions?: 0 | 1, // Include item description in query
    appid?: number, // The app id associated with the item
    start?: number, // Starting index for listings
    callback?: (error: Error | null, response: Array<SteamMarketListing> | null) => void // Callback function
}

// Export the SteamMarketFetcher class as default
export default SteamMarketFetcher;
/**
 * A Node.js wrapper for the Steam Community Market API. 
 */
declare class SteamMarketFetcher {
    /**
     * Creates a new SteamMarketFetcher instance.
     * @param { any } options An object containing valid constructor options.
     * @param { string } options.currency Any currency used by the Steam Community Market, defaults to USD.
     * @param { string } options.format Any data format accepted by Steam, defaults to JSON.
     * @param { SteamMarketCDN } options.CDN Steam CDN handler for CS:GO items and their image URLs.
     * @returns { SteamMarketFetcher } A new Steam Market Fetcher instance.
    */
    constructor({ currency, format, CDN }: SteamMarketOptions);

    /**
     * Get the Steam Community Market price from the listing matching the `market_hash_name` parameter.
     * @param { any } params An object of valid parameters for the `getItemPriceHistory` method. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's hash name.
     * @param { number } params.appid The unique app associated with the item's market_hash_name.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<GetItemPriceResponse> | void } An object containing Steam Community price data matching the market_hash_name parameter.
    */
    getItemPrice({ market_hash_name, appid, callback }?: GetItemPriceParameters): Promise<GetItemPriceResponse> | void;
    /**
     * Fetches an image from the first Steam Community market listing matching the `market_hash_name` parameter.
     * @param { any } params An object of valid parameters for the `getItemPriceHistory` method. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's hash name.
     * @param { number } params.appid The unique app associated with the item's market_hash_name.
     * @param { number } params.size The desired size of the item image in pixels, this is optional and defaults to 360px.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<string> | void } A Steam Community or csgo-cdn URL of the item image.
    */
    getItemImage({ market_hash_name, appid, size, callback }?: GetItemImageParameters): Promise<string> | void;
    /**
     * Get an item's price history from the Steam Community listing matching the `market_hash_name` parameter.
     * @param { any } params An object of valid parameters for the `getItemPriceHistory` method. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's hash name.
     * @param { number } params.appid The unique app associated with the item's market_hash_name.
     * @param { string } params.cookie A steamLoginSecure session cookie from Steamcommunity.com
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<GetItemPriceHistoryResponse> | void } The price history for the item matching the parameters.
    */
    getItemPriceHistory({ market_hash_name, appid, cookie, callback }?: GetItemPriceHistoryParameters): Promise<GetItemPriceHistoryResponse> | void;
    /**
     * Get the current Steam Community Market listings for any given Steam app.
     * @param { any } params An object of valid parameters for the getMarketListings method. All are "optional" and have default values.
     * @param { string } params.query The query value narrows down the search, optional parameter that defaults to none.
     * @param { number } params.descriptions If set to 1, includes the query in the item's description property.
     * @param { number } params.appid The app in which to fetch market listings for.
     * @param { number } params.start The market listing from which to start the request, optional parameter that defaults to 0 (the first items listed on the market for that app).
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<Array<SteamMarketListing>> | void } An array containg market listings matching the appid parameter.
    */
    getMarketListings({ query, descriptions, appid, start, callback }?: GetMarketListingsParameters): Promise<Array<SteamMarketListing>> | void;
}
