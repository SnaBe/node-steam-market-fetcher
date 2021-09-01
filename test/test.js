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
        it('should be instance of steam-market-fetcher', () => {
            expect(new SteamMarketFetcher()).to.be.an.instanceof(SteamMarketFetcher);
        });
    });

    describe('getItemPrice', () => {
        it('should return the Steamcommunity market price for a Field-Tested AK-47 Asiimov', (done) => {
            Fetcher.getItemPrice({ market_hash_name: 'AK-47 | Asiimov (Field-Tested)', appid: 730, callback: (err, data) => {
                if (err) return done(err);

                expect(data).to.be.an('object');
                expect(data).to.have.property('median_price');

                // Call done to end the test when the callback is invoked
                done();
            }});
        });
    });

    describe('getItemImage', () => {
        it('should return an image of a Factory New Gut Knife Doppler', (done) => {
            Fetcher.getItemImage({ market_hash_name: '★ Gut Knife | Doppler (Factory New)', appid: 730, callback: (err, data) => {
                if (err) return done(err);

                expect(data).to.be.a('string');

                // Call done to end the test when the callback is invoked
                done();
            }});
        });
    });
});