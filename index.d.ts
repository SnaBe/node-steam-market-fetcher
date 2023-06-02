/** Custom any-type for Steam related CDNs. */
export type SteamMarketCDN = any;

/** Custom any-type for unknown array values. */
export type UnknownValue = any;

/** The PriceHistory array contains a date, a price and an unknown string. */
export type PriceHistory = [ string, number, string ];

/** Constructor options for the SteamMarketFetcher class. */
export interface SteamMarketOptions {
    currency?: string, // Currency options
    format?: string, // Data format options
    CDN?: SteamMarketCDN // Steam CDN options
}

/** Response object for the getItemPrice method. */
export interface GetItemPriceResponse {
    success: boolean, // If the request was a success
    lowest_price: string, // The lowest listing price
    volume: string, // Number of items listed
    median_price: string // The median listing price
}

/** Parameter options for the getItemPrice method. */
export interface GetItemPriceParameters {
    market_hash_name?: string, // The name of the item
    appid?: number, // The app id associated with the item
    callback?: (error: Error | null, response: GetItemPriceResponse | null) => void; // Callback function
}

/** Parameter options for the getItemImage method. */
export interface GetItemImageParameters {
    market_hash_name?: string, // The name of the item
    appid?: number, // The app id associated with the item
    size?: string, // The size of the image in pixels
    callback?: (error: Error | null, response: string | null) => void; // Callback function
}

/** Response object for the getItemPriceHistory method. */
export interface GetItemPriceHistoryResponse {
    success: boolean, // If the request was a success
    price_prefix: string, // For prices in USD or similar
    price_suffix: string, // For prices in Euro or similar
    prices: Array<PriceHistory> // The item's price history stored as a nested array
}

/** Parameter options for the getItemPriceHistory method. */
export interface GetItemPriceHistoryParameters {
    market_hash_name?: string, // The name of the item
    appid?: number, // The app id associated with the item
    cookie: string, // Steam Community session cookie
    callback?: (error: Error | null, response: GetItemPriceHistoryResponse | null) => void; // Callback function
}

/** An object that represents a listing on the Steam Community Market. */
export interface SteamMarketListing {
    name: string, // The item's display name
    hash_name: string, // The item's hash name
    sell_listings: number, // The number of sell listings
    sell_price: number, // The item's sell price
    sell_price_text: string, // The item's sell price as a string
    app_icon: string, // Link to the game's app icon
    app_name: string, // The name of the game
    asset_description: { // The asset's description object
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
        commodity: 0 | 1 // The number of commodities
    },
    sale_price_text: string // The sale price as a string
}

/** Response object for the getMarketListings method. */
export interface GetMarketListingsResponse {
    success: boolean, // If the request was a success
    start: number, // Current page number
    pagesize: number, // Current page size
    total_count: number // Total number of listings
    searchdata: { // Request search data
        query: string, // The query string from the request
        search_descriptions: boolean, // Include item description
        total_count: number, // Total number of listings
        page_size: number, // Current page size
        prefix: string, // Response prefix
        class_prefix: string // Class prefix
    },
    results: Array<SteamMarketListing> // An array of Steam Market listings
}

/** Parameter options for the getMarketListings method. */
export interface GetMarketListingsParameters {
    query?: string, // Query options
    descriptions?: 0 | 1, // Include item description in query
    appid?: number, // The app id associated with the item
    start?: number, // Starting index for listings
    count?: number // Maximum number of listings to return
    callback?: (error: Error | null, response: GetMarketListingsResponse | null) => void; // Callback function
}

/** Response object for the getItemActivity method. */
export interface GetItemActivityResponse {
    success: number, // If the request was a success
    activity: Array<string>, // Array of activities
    timestamp: number // Date for the last activity
}

/** Parameter options for the getItemActivity method. */
export interface GetItemActivityParameters {
    item_nameid?: string, // The nameid of the item
    callback?: (error: Error | null, response: GetItemActivityResponse | null) => void; // Callback function
}

/** Buy or sell order table for a market listing. */
export interface OrderTable {
    price: string, // Item price
    quantity: string // Item quantity
}

/** Custom array-type for orders displayed in Steam graphs. */
export type OrderGraph = [ number, number, string ];

/** Response object for the getItemHistogram method. */
export interface GetItemHistogramResponse {
    success: number, // If the request was a success
    sell_order_count: number, // Number of sell orders
    sell_order_price: string | null, // Sell order price
    sell_order_table: Array<OrderTable> | null, // Sell orders table data
    buy_order_count: string, // The number of buy orders
    buy_order_price: string, // Buy order price
    buy_order_table: Array<OrderTable>, // Buy orders table data
    highest_buy_order: string | null, // The highest buy order
    lowest_sell_order: string | null, // The lowest sell order
    buy_order_graph: Array<OrderGraph>, // Buy order graph data
    sell_order_graph: Array<OrderGraph>, // Sell order graph data
    graph_max_y: number, // Height of the y axis on the order graph
    graph_min_x: number, // Min width of the x axis on the order graph
    graph_max_x: number, // Max width of the x axis on the order graph
    price_prefix: string, // Item price prefix
    price_suffix: string, // Item price suffix
}

/** Parameter options for the getItemHistogram method. */
export interface GetItemHistogramParameters {
    item_nameid?: string, // The nameid of the item
    callback?: (error: Error | null, response: GetItemHistogramResponse | null) => void; // Callback function
}

/** A Steam Community Market asset. */
export interface SteamMarketAsset {
    currency: number, // Currency value
    appid: number, // The asset's appid
    contextid: string, // The asset's context id
    id: string, // The asset's id
    classid: string, // Class id
    instanceid: string, // Instance id
    amount: string, // The number of assets
    status: number, // Market listing status
    original_amount: string, // The original amount of assets
    unowned_id: string, // The asset's unowned id
    unowned_contextid: string, // The asset's unowned context id
    background_color: string, // The asset's background color
    icon_url: string, // The asset's icon url
    icon_url_large: string, // The asset's large icon url
    descriptions: Array<{ type?: string, value: string, color?: string }>, // Asset descriptions
    tradable: 0 | 1, // If the asset is tradable
    owner_actions: Array<{ link: string, name: string }>, // Actions the asset owner can take
    actions?: Array<{ link: string, name: string }>, // Market actions
    name: string, // The asset's name
    name_color?: string, // The asset's name color
    type: string, // The asset type
    market_name: string, // The asset's market name
    market_hash_name: string, // The asset's market hash name
    market_fee_app: number, // Market listing fee
    commodity: 0 | 1, // Is the asset a commodity
    market_tradable_restriction: number, // If the asset has trade restrictions
    market_marketable_restriction: number, // If the asset has market restrictions
    marketable: 0 | 1, // If the asset is marketable
    app_icon: string, // The asset's app icon
    owner: number // The asset's owner
}

/** A Steam Community Market listing as seen by the owner. */
export interface PersonalMarketListing {
    listingid: string, // The listing's unique id
    time_created: number // The date the listing was created
    asset: SteamMarketAsset, // The market asset object
    steamid_lister: string, // The steamid of the lister
    price: number, // The listing price
    original_price: number, // The original listing price
    fee: number, // Listing fee
    currencyid: string, // Currency id
    converted_price: number, // The converted price
    converted_fee: number, // The converted fee
    converted_currencyid: string, // The converted currency id
    status: number, // The listing's market status
    active: number, // If the listing is active
    steam_fee: number, // Steam listing fee
    converted_steam_fee: number, // The converted Steam fee
    publisher_fee: number, // The publisher fee
    converted_publisher_fee: number, // The converted publisher fee
    publisher_fee_percent: string, // The publisher fee percent
    publisher_fee_app: number, // The app fee
    cancel_reason: number, // Reason for cancellation
    item_expired: number, // If the item has expired
    original_amount_listed: number, // Original amount of items listed
    original_price_per_unit: number, // Original price per item unit
    fee_per_unit: number, // Fee per item unit
    steam_fee_per_unit: number, // Steam fee per item unit
    publisher_fee_per_unit: number, // Publisher fee per item unit
    converted_price_per_unit: number, // The converted price per item unit
    converted_fee_per_unit: number, // The converted fee per item unit
    converted_steam_fee_per_unit: number, // The converted Steam fee per item unit
    converted_publisher_fee_per_unit: number, // The converted publisher fee per unit
    time_finish_hold: number, // Time finish hold?
    time_created_str: string // The date the listing was created
}

/** A Steam Community Market event. */
export interface SteamMarketEvent {
    listingid: string, // The market listing's id
    purchaseid: string, // The purchase id
    event_type: number, // The type of event
    time_event: number, // The time of the event
    time_event_fraction: number, // The time event fraction
    steamid_actor: string, // The actor's steamid
    date_event: string // The date of the event
}

/** Details for a Steam Community Market purchase. */
export interface SteamMarketPurchaseDetails {
    listingid: string, // The market listing's id
    purchaseid: string, // The purchase id
    time_sold: number, // The time of the sale
    steamid_purchaser: string, // The buyer's steamid
    needs_rollback: number, // If the purchase requires a rollback
    failed: number, // If the purchase failed
    asset: { // The asset details
        currency: number, // Currency value
        appid: number, // The asset's appid
        contextid: string, // The asset's context id
        id: string, // The asset's id
        classid: string, // The class id
        instanceid: string, // The instance id
        amount: string, // The asset amount
        status: number, // The status for the asset
        new_id: string, // The asset's new id
        new_contextid: string // The asset's new id
    },
    paid_amount: number, // The amount paid for the asset
    paid_fee: number, // The amount of fees paid
    currencyid: string, // The currency's id
    steam_fee: number, // Purchase fee for Steam
    publisher_fee: number, // Publisher fee
    publisher_fee_percent: string, // Publisher fee percent
    publisher_fee_app: number, // The app fee
    received_amount: number, // The amount received
    received_currencyid: string, // The currency received
    funds_held?: number, // If the funds are being held
    time_funds_held_until?: number, // The date the funds become available
    funds_revoked?: number, // If the funds have been revoked
    funds_returned: number, // If the funds have been returned
    avatar_actor: string, // The actor's avatar
    persona_actor: string // The actor's persona
}

/** Response object for the getMyHistory method. */
export interface GetMyHistoryResponse {
    success: boolean, // If the request was a success
    pagesize: number, // The number of request listings
    total_count: number, // The total number of listings
    start: number, // The current listing number
    assets: { // Steam Market assets
        [appid: string]: { // The asset's appid
            [contextid: string]: { // The asset's context id
                [id: string]: SteamMarketAsset // The Steam asset
            }
        }
    },
    events: Array<SteamMarketEvent>, // An array of Steam Market events
    purchases: { // Purchases done by the session user
        [purchaseid: string]: SteamMarketPurchaseDetails // Purchase details
    },
    listings: { // Steam Market listings
        [listingid: string]: { // The listing's id
            listingid: string, // The listing's id
            price: number, // Listing price
            fee: number, // Listing fee
            publisher_fee_app: number, // The app fee
            publisher_fee_percent: string, // Percent publisher fee
            currencyid: number, // The currency id
            asset: { // The asset listed
                currency: number, // The asset currency
                appid: number, // The asset's appid
                contextid: string, // The asset's context id
                id: string, // The asset id
                amount: string // The amout of assets 
            },
            original_price: number // The original price of the asset
        }
    }
}

/** Parameter options for the getMyHistory method. */
export interface GetMyHistoryParameters {
    cookie: string, // Steam Community session cookie
    callback?: (error: Error | null, response: GetMyHistoryResponse | null) => void; // Callback function
}

/** Response object for the getMyListings method. */
export interface GetMyListingsResponse {
    success: boolean, // If the request was a success
    pagesize: number, // The number of request listings
    total_count: number, // The total number of listings
    assets: { // Object of Steam Community Market assets
        [appid: string]: { // Asset's app id
            [contextid: string]: { // Asset's context id
                [assetid: string]: SteamMarketAsset // Asset id -> asset object
            }
        }
    },
    start: number, // Page number
    num_active_listings: number, // Active number of listings
    listings: Array<PersonalMarketListing>, // An array of market listings
    listings_on_hold: Array<UnknownValue>, // An array of market listings on hold
    listings_to_confirm: Array<UnknownValue>, // An array of market listings to confirm
    buy_orders: Array<UnknownValue> // An array of buy orders
}

/** Parameter options for the getMyListings method. */
export interface GetMyListingsParameters {
    cookie: string, // Steam Community session cookie
    callback?: (error: Error | null, response: GetMyListingsResponse | null) => void; // Callback function
}

/** Response object for the getPopularListings method. */
export interface GetPopularListingsResponse {
    stop?: boolean, // If the request was stopped
    success: boolean // If the request was a success
}

/** Parameter options for the getPopularListings method. */
export interface GetPopularListingsParameters {
    start?: number, // Start of the listings page
    count?: number, // The page count
    callback?: (error: Error | null, response: GetPopularListingsResponse | null) => void; // Callback function
}

/** A recent Steam Community Market listing. */
export interface RecentMarketListing {
    listingid: string, // The listing's unique id
    price: number, // The listing price
    fee: number, // The listing fee
    publisher_fee_app: number, // The app fee
    publisher_fee_percent: string, // The publisher fee percent
    currencyid: number, // The currency id
    steam_fee?: number, // Additional Steam fee
    publisher_fee?: number, // Additional publisher fee
    converted_price?: number, // Price converted
    converted_fee?: number, // Fee converted
    converted_currencyid?: number, // Currency converted
    converted_steam_fee?: number, // Steam fee converted
    converted_publisher_fee?: number, // Publisher fee converted
    converted_price_per_unit?: number, // Price per item unit converted
    converted_fee_per_unit?: number, // Fee per item unit converted
    converted_steam_fee_per_unit?: number, // Steam fee per item unit converted
    converted_publisher_fee_per_unit?: number, // Publisher fee per item unit converted
    asset: { // The Steam Market asset
        currency: number, // Asset currency
        appid: number, // The asset's appid
        contextid: string, // The asset's context id
        id: string, // The asset's id
        amount: string, // The number of assets
        market_actions?: Array<{ link: string, name: string }> // Steam market actions
    }
}

/** Response object for the getRecentListings method. */
export interface GetRecentListingsResponse {
    success: boolean, // If the request was a success
    more: boolean, // If more data is available
    results_html: boolean, // If the results is available in HTML
    listinginfo: { // Information about the listings
        [listingid: string]: RecentMarketListing // The recent market listings
    },
    purchaseinfo: Array<UnknownValue>, // Purchase information
    assets: { // Steam Market assets
        [appid: string]: { // Asset's app id
            [contextid: string]: { // Asset's context id
                [assetid: string]: SteamMarketAsset // The Steam market asset
            }
        }
    },
    currency: Array<UnknownValue>, // Currency values
    hovers: boolean, // Hovers enabled?
    app_data: { // Listing app data
        [appid: string]: { // The app id
            appid: number, // The app id (nested)
            name: string, // The name of the app
            icon: string, // The app icon
            link: string // Link to the app on Steam
        }
    },
    last_time: number, // The date of the most recent listing
    last_listing: string // The last listing
}

/** Parameter options for the getRecentListings method. */
export interface GetRecentListingsParameters {
    callback?: (error: Error | null, response: GetRecentListingsResponse | null) => void; // Callback function
}

// Export the SteamMarketFetcher class as default
export default SteamMarketFetcher;
/**
 * A Node.js wrapper for the Steam Community Market API.
 */
declare class SteamMarketFetcher {
    /**
     * Creates a new SteamMarketFetcher instance.
     * @param { SteamMarketOptions } options An object of valid options for the SteamMarketFetcher class constructor.
     * @param { string } options.currency Any valid currency the Steam Community Market uses, defaults to USD.
     * @param { string } options.format Any valid data format accepted by Steam, defaults to JSON.
     * @param { SteamMarketCDN } options.CDN Steam CDN handler for CS:GO items and their image URLs.
     * @returns { SteamMarketFetcher } A new SteamMarketFetcher instance.
    */
    constructor({ currency, format, CDN }?: SteamMarketOptions);

    /**
     * Get the market price from the first listing that matches the `market_hash_name` and `appid` arguments.
     * @param { GetItemPriceParameters } params An object of valid parameters for the `getItemPrice` method. All are "optional" and have default values.
     * @param { string } params.market_hash_name The item's universal market name.
     * @param { number } params.appid The app that owns the item.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<GetItemPriceResponse> | void } An object that contains price data that matches the `market_hash_name` and `appid` arguments.
    */
    getItemPrice({ market_hash_name, appid, callback }?: GetItemPriceParameters): Promise<GetItemPriceResponse> | void;
    /**
     * Retrieves an image URL from the first market listing that matches the `market_hash_name` and `appid` arguments.
     * @param { GetItemImageParameters } params An object of valid arguments for the `getItemImage` function. All are "optional" and have default values.
     * @param { string } params.market_hash_name The item's universal market name.
     * @param { number } params.appid The app that owns the item.
     * @param { number } params.size Optional parameter for the desired image `size`, defaults to 360x360 pixels.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<string> | void } A Steam Community or Steam CDN image URL.
    */
    getItemImage({ market_hash_name, appid, size, callback }?: GetItemImageParameters): Promise<string> | void;
    /**
     * Get an item's price history from the first market listing that matches the `market_hash_name` and `appid` arguments.
     * @param { GetItemPriceHistoryParameters } params An object of valid parameters for the `getItemPriceHistory` method. All are "optional" and have default values.
     * @param { string } params.market_hash_name The item's universal market name.
     * @param { number } params.appid The app that owns the item.
     * @param { string } params.cookie A steamLoginSecure `cookie` obtained from Steamcommunity.com. This parameter is required as you must be logged into Steam to perform the request.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<GetItemPriceHistoryResponse> | void } The price history for the item matching the `market_hash_name` and `appid` arguments.
    */
    getItemPriceHistory({ market_hash_name, appid, cookie, callback }?: GetItemPriceHistoryParameters): Promise<GetItemPriceHistoryResponse> | void;
    /**
     * Get the current Steam Community Market listings for any given Steam app.
     * @param { GetMarketListingsParameters } params An object of valid arguments for the `getMarketListings` method. All are "optional" and have default values.
     * @param { string } params.query The query value narrows down the search, an optional parameter that defaults to an empty state.
     * @param { number } params.descriptions If set to 1, includes the query in the item's description when searching for matches.
     * @param { number } params.appid The app in which to fetch market listings for.
     * @param { number } params.start The market listing from which to start the request, an optional parameter that defaults to 0 (the first items listed on the market for that app).
     * @param { number } params.count The maximum number of items to be returned by the request, an optional parameter that defaults to 100.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the method returns a promise.
     * @returns { Promise<GetMarketListingsResponse> | void } An array of market listings matching the `query` and `appid` arguments.
    */
    getMarketListings({ query, descriptions, appid, start, callback }?: GetMarketListingsParameters): Promise<GetMarketListingsResponse> | void;
    /**
     * Get a list of Steam Community Market order activities for a specific item.
     * @param { GetItemActivityParameters } params An object of valid arguments for the `getItemActivity` method. All are "optional" and have default values.
     * @param { string } params.item_nameid The `nameid` of the item.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetItemActivityResponse> | void } An array of order activities that matches the `item_nameid` argument.
    */
    getItemActivity({ item_nameid, callback }?: GetItemActivityParameters): Promise<GetItemActivityResponse> | void;
    /**
     * Get a Steam Community Market order histogram for a specific item.
     * @param { GetItemHistogramParameters } params An object of valid arguments for the `getItemHistogram` method. All are "optional" and have default values.
     * @param { string } params.item_nameid The `nameid` of the item.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetItemHistogramResponse> | void } A histogram object for buy and sell orders that matches the `item_nameid` argument.
     */
    getItemHistogram({ item_nameid, callback }?: GetItemHistogramParameters): Promise<GetItemHistogramResponse> | void;
    /**
     * Get your own Steam Community Market history.
     * @param { GetMyHistoryParameters } params An object of valid arguments for the `getMyHistory` method. All are "optional" and have default values.
     * @param { string } params.cookie A steamLoginSecure `cookie` obtained from Steamcommunity.com. This parameter is required as you must be logged into Steam to perform the request.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyHistoryResponse> | void } An object that contains your Steam Community Market history.
     */
    getMyHistory({ cookie, callback }?: GetMyHistoryParameters): Promise<GetMyHistoryResponse> | void;
    /**
     * Get your own Steam Community Market listings.
     * @param { GetMyListingsParameters } params An object of valid arguments for the `getMyListings` method. All are "optional" and have default values.
     * @param { string } params.cookie A steamLoginSecure `cookie` obtained from Steamcommunity.com. This parameter is required as you must be logged into Steam to perform the request.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetMyListingsResponse> | void } An object that contains your Steam Community Market listings.
     */
    getMyListings({ cookie, callback }?: GetMyListingsParameters): Promise<GetMyListingsResponse> | void;
    /**
     * Get the most popular Steam Community Market listings.
     * @param { GetPopularListingsParameters } params An object of valid arguments for the `getPopularListings` method. All are "optional" and have default values.
     * @param { number } params.start The market listing from which to start the request, an optional parameter that defaults to 0 (the first popular item listed on the market).
     * @param { number } params.count The maximum number of items to be returned by the request, an optional parameter that defaults to 100.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetPopularListingsResponse> | void } An object that contains the most popular Steam Community Market listings.
     */
    getPopularListings({ start, count, callback }?: GetPopularListingsParameters): Promise<GetPopularListingsResponse> | void;
    /**
     * Get the most recent Steam Community Market listings.
     * @param { GetRecentListingsParameters } params An object of valid arguments for the `getItemHistogram` method. All are "optional" and have default values.
     * @param { void } [params.callback] Optional, called when a response is available. If omitted the function returns a promise.
     * @returns { Promise<GetRecentListingsResponse> | void } An object that contains the most recent Steam Community Market listings.
     */
    getRecentListings({ callback }?: GetRecentListingsParameters): Promise<GetRecentListingsResponse> | void;
}
