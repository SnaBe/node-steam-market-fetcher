//Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
const SteamMarketFetcher = require('../index');

//Create a new Steam Market Fetcher instance using our preferred dev options
const Fetcher = new SteamMarketFetcher({
    currency: 'EUR',
    format: 'json'
});

//Get the price & image for the AK-47 | Redline (Field-Tested) from CS:GO (appid 730)
Fetcher.getItemPrice('AK-47 | Redline (Field-Tested)', 730).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage('AK-47 | Redline (Field-Tested)', 730).then((image) => console.log(image)).catch((err) => console.log(err.message));

//Get the price & image for the Fractal Horns of Inner Abysm from Dota 2 (appid 570)
Fetcher.getItemPrice('Fractal Horns of Inner Abysm', 570).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage('Fractal Horns of Inner Abysm', 570).then((image) => console.log(image)).catch((err) => console.log(err.message));

//Get the price & image for the Mann Co. Supply Crate Key from Team Fortress 2 (appid 440)
Fetcher.getItemPrice('Mann Co. Supply Crate Key', 440).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage('Mann Co. Supply Crate Key', 440).then((image) => console.log(image)).catch((err) => console.log(err.message));

//Fetch Steam Community Market listings for Team Fortress 2
Fetcher.getMarketListings(440).then((market_listings) => console.log(`Got ${market_listings.length} market listings.`)).catch((err) => console.log(err.message));