// Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
const SteamMarketFetcher = require('../index');

// Import the required dependencies
const csgoCDN = require('csgo-cdn');
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');

// Steam client
const client = new SteamUser({ enablePicsCache: true });

// CS:GO CDN instance
const CDN = new csgoCDN(client, { musicKits: true, cases: true, tools: true, statusIcons: true, logLevel: 'debug' });

// Create a new Steam Market Fetcher instance using our preferred dev options
const Fetcher = new SteamMarketFetcher({
    CDN // Parse our custom CDN to the SteamMarketFetcher constructor
});

// Event for when the CS:GO CDN is ready for use
Fetcher.CDN.on('ready', () => {
    // The CDN is ready, perform the request
    Fetcher.getItemImage({ market_hash_name: 'M4A1-S | Player Two (Field-Tested)', appid: 730 }).then((image) => console.log(image)).catch((err) => console.log(err.message));
});

// Get the Steam auth code 
SteamTotp.getAuthCode('YOUR_SHARED_SECRET', (err, code) => {
    if (err) {
        throw err;
    }

    // Steam account's login details
    const loginDetails = {
        accountName: 'USERNAME',
        password: 'PASSWORD',
        rememberPassword: true,
        twoFactorCode: code
    };

    // Login to Steam
    client.logOn(loginDetails);
});

// The client logged onto the Steam network
client.on('loggedOn', () => {
    console.log('Logged onto Steam, data download should begin shortly.');
});

// The Steam content server are ready
client.on('contentServersReady', () => {
    console.log('Content servers are ready!');
});