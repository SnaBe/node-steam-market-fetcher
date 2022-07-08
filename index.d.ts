/**
 * Steam Community Market class wrapper for fetching item prices, images and listings from the Steam Community Market.
 */
export declare class SteamMarketFetcher {
    /**
     * Creates a new instance of the Steam Market Fetcher.
     * @param { any } options An object containing valid constructor options.
     * @param { string } options.currency Any currency used by the Steam Community Market, defaults to USD.
     * @param { string } options.format Any data format accepted by Steam, defaults to JSON.
     * @param { any } options.CDN Steam CDN handler for CS:GO items and their image URLs.
     * @returns { SteamMarketFetcher } A fresh Steam Market Fetcher instance.
    */
    constructor(options: any): SteamMarketFetcher;
    /**
     * Get the Steam Community Market price from the listing matching the `market_hash_name` argument.
     * @param { any } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's name.
     * @param { number } params.appid The unique app to the item's market_hash name.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<any> | Function } An object containing Steam Community price data matching the market_hash_name parameter.
    */
    getItemPrice({ market_hash_name, appid, callback }?: any): Promise<any> | Function;
    /**
     * Fetches an image from the first Steam Community market listing matching the `market_hash_name` argument.
     * @param { any } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's name.
     * @param { number } params.appid The unique app to the item's market_hash_name.
     * @param { number } params.px The desired size of the item image in pixels, this is optional and defaults to 360px.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<string> | Function } A Steam Community or Steam CDN URL of the item image.
    */
    getItemImage({ market_hash_name, appid, px, callback }?: any): Promise<string> | Function;
    /**
     * Get an item's price history from the Steam Community listing matching the `market_hash_name` argument.
     * @param { any } params An object of valid arguments for the `getItemPriceHistory` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The marketable item's name.
     * @param { number } params.appid The unique app to the item's market_hash_name.
     * @param { string } params.cookie A steamLoginSecure cookie from Steam Community.com session.
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<any> | Function } The price history for the item matching the parameters.
    */
    getItemPriceHistory({ market_hash_name, appid, cookie, callback }?: any): Promise<any> | Function;
    /**
     * Get the current Steam Community Market listings for any given Steam app.
     * @param { any } params An object of valid arguments for the getMarketListings method. All are "optional" and have default values.
     * @param { string } params.query The query value narrows down the search, optional parameter that defaults to none.
     * @param { number } params.descriptions If set to 1, includes the query in the item's description property.
     * @param { number } params.appid The app in which to fetch market listings for.
     * @param { number } params.start The market listing from which to start the request, optional parameter that defaults to 0 (the first items listed on the market for that app).
     * @param { Function } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<array> | Function } An array containg market listings matching the provided appid.
    */
    getMarketListings({ query, descriptions, appid, start, callback }?: any): Promise<any[]> | Function;
}
