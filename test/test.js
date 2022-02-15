// We'll use Mocha & Chai for testing the modules methods
const expect = require('chai').expect;

// Require the module itself
// Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
const SteamMarketFetcher = require('../index');

// Create a new Steam Market Fetcher instance using our preferred dev options
const Fetcher = new SteamMarketFetcher({
    currency: 'EUR',
    format: 'json'
});

// Our unit tests
describe('steam-market-fetcher tests', () => {
    // Test & verify that the target is an instance of the given constructor
    describe('instance of constructor', () => {
        // Instance should match class
        it('should be instance of steam-market-fetcher', () => {
            // Expect that the target is an instance of the given constructor
            expect(new SteamMarketFetcher()).to.be.an.instanceof(SteamMarketFetcher);
        });
    });

    // Get price data for a Steamcommunity market item
    describe('getItemPrice', () => {
        // The function should return an object with the item's current price data
        it('should return the Steamcommunity market price for a Field-Tested AK-47 Asiimov', (done) => {
            // Get the price of the Field-Tested AK-47 Asiimov
            Fetcher.getItemPrice({ market_hash_name: 'AK-47 | Asiimov (Field-Tested)', appid: 730, callback: (err, data) => {
                // Error getting currency data
                if (err) return done(err);

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named median_price 
                expect(data).to.be.an('object');
                expect(data).to.have.property('median_price');

                // Call done to end the test when the callback is invoked
                done();
            }});
        });
    });

    // Gets the item image  for a Steamcommunity market item
    describe('getItemImage', () => {
        // The function should return a string with item's in-game image 
        it('should return an image of a Factory New Gut Knife Doppler', (done) => {
            // Get the item image for a Factory New Gut Knife Doppler
            Fetcher.getItemImage({ market_hash_name: '★ Gut Knife | Doppler (Factory New)', appid: 730, callback: (err, data) => {
                // Error getting the item's image
                if (err) return done(err);

                // The response should have status code 200 (ok),
                // it should also be a string
                expect(data).to.be.a('string');
                expect(data).to.not.equal('No image available');

                // Call done to end the test when the callback is invoked
                done();
            }});
        });
    });

    // Gets the price history for a Steamcommunity market item
    // This test is skipped due to conflicts with the test workflow
    describe.skip('getItemPriceHistory', () => {
        // The function should return an array containing price history data for a Field-Tested AWP Wildfire
        it('should return the price history of a Field-Tested AWP Wildfire', (done) => {
            // Get the price history for a Field-Tested AWP Wildfire
            Fetcher.getItemPriceHistory({ market_hash_name: 'AWP | Wildfire (Field-Tested)', appid: 730, cookie: 'YOUR_COOKIE', callback: (err, data) => {
                // Error getting the item's price history
                if (err) return done(err);

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named prices
                // The prices property should be an array with any given length
                expect(data).to.be.an('object');
                expect(data).to.have.property('prices');
                expect(data.prices).to.be.an('array');

                // Call done to end the test when the callback is invoked
                done();
            }});
        });
    });

    // Gets a size of Steamcommunity market listings
    describe('getMarketListings', () => {
        // The function should return an array of Steamcommunity market listings
        it('should return an array of Steamcommunity market listings', (done) => {
            // The market listings descriptions should include the query: Unusual Burning Flames
            Fetcher.getMarketListings({ query: 'Unusual Burning Flames', descriptions: 1, appid: 440, start: 0, callback: (err, data) => {
                // Error getting Steamcommunity market listings
                if (err) return done(err);

                // The response should have status code 200 (ok),
                // it should also be an array with any given length
                expect(data).to.be.an('array');

                // Call done to end the test when the callback is invoked
                done();
            }});
        });
    });
});