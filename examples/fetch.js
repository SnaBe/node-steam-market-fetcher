// Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
const SteamMarketFetcher = require('../index');

// Create a new Steam Market Fetcher instance using our preferred dev options
const Fetcher = new SteamMarketFetcher({
    currency: 'EUR',
    format: 'json'
});

// Get the price & image for the AK-47 | Redline (Field-Tested) from CS:GO (appid 730)
Fetcher.getItemPrice({ market_hash_name: 'AK-47 | Redline (Field-Tested)', appid: 730 }).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage({ market_hash_name: 'AK-47 | Redline (Field-Tested)', appid: 730 }).then((image) => console.log(image)).catch((err) => console.log(err.message));

// Get the price & image for the Fractal Horns of Inner Abysm from Dota 2 (appid 570)
Fetcher.getItemPrice({ market_hash_name: 'Fractal Horns of Inner Abysm', appid: 570 }).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage({ market_hash_name: 'Fractal Horns of Inner Abysm', appid: 570 }).then((image) => console.log(image)).catch((err) => console.log(err.message));

// Get the price & image for the Mann Co. Supply Crate Key from Team Fortress 2 (appid 440)
Fetcher.getItemPrice({ market_hash_name: 'Mann Co. Supply Crate Key', appid: 440 }).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage({ market_hash_name: 'Mann Co. Supply Crate Key', appid: 440 }).then((image) => console.log(image)).catch((err) => console.log(err.message));

// Get the price history for a Factory New Gut Knife | Doppler
Fetcher.getItemPriceHistory({ market_hash_name: '★ Gut Knife | Doppler (Factory New)', appid: 730, cookie: 'YOUR_COOKIE' }).then((prices) => console.log(prices)).catch((err) => console.log(err.message));

// Fetch Steam Community Market listings for Team Fortress 2 items that are Unusual hats with Burning Flames effect. 
Fetcher.getMarketListings({ query: 'Unusual Burning Flames', descriptions: 1, appid: 440, start: 0 }).then((market_listings) => console.log(`Found ${market_listings.length} market listings that include Unusual & Burning Flames.`)).catch((err) => console.log(err.message));