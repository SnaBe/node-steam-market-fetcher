// Require Mocha and Chai for unit testing class methods
const expect = require('chai').expect

// Require the module itself
// Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
const SteamMarketFetcher = require('../index')

// Create a new Steam Market Fetcher instance using the preferred dev options
const market = new SteamMarketFetcher({
    currency: 'EUR', // Prices should be in euros
    format: 'json' // Reponse data should be returned as JSON objects
})

// Test the Steam Community Market endpoints
describe('steam-market-fetcher tests', () => {
    // Test and verify that the target is an instance of the given constructor
    describe('instance of constructor', () => {
        // Instance should match class
        it('should be instance of steam-market-fetcher', () => {
            // Expect that the target is an instance of the given constructor
            expect(new SteamMarketFetcher()).to.be.an.instanceof(SteamMarketFetcher)
        })
    })

    // Get price data for a Steam Community Market item
    describe('getItemPrice', () => {
        // The function should return an object with the item's current price data
        it('should return the Steam Community market price for a Field-Tested AK-47 Asiimov', (done) => {
            // Get the market price for a Field-Tested AK-47 Asiimov
            market.getItemPrice({ market_hash_name: 'AK-47 | Asiimov (Field-Tested)', appid: 730, callback: (err, res) => {
                // Error getting the price data
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named median_price 
                expect(res).to.be.an('object')
                expect(res).to.have.property('median_price')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get the item image for a Steam Community Market item
    describe('getItemImage', () => {
        // The function should return a string with the item's in-game image 
        it('should return an image of a Factory New Gut Knife Doppler', (done) => {
            // Get the item image for a Factory New Gut Knife Doppler
            market.getItemImage({ market_hash_name: '★ Gut Knife | Doppler (Factory New)', appid: 730, callback: (err, res) => {
                // Error getting the image
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be a string and equal "No image available"
                expect(res).to.be.a('string')
                expect(res).to.not.equal('No image available')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get the price history for a Steam Community Market item
    // This test is skipped due to conflicts with the test workflow
    describe.skip('getItemPriceHistory', () => {
        // The function should return an array containing price history data for a Field-Tested AWP Wildfire
        it('should return the price history of a Field-Tested AWP Wildfire', (done) => {
            // Get the price history for a Field-Tested AWP Wildfire
            market.getItemPriceHistory({ market_hash_name: 'AWP | Wildfire (Field-Tested)', appid: 730, cookie: process.env.STEAM_COOKIE, callback: (err, res) => {
                // Error getting the price history
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "prices"
                // and it should be an array with any given length
                expect(res).to.be.an('object')
                expect(res).to.have.property('prices')
                expect(res.prices).to.be.an('array')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get a list of Steam Community Market listings
    describe('getMarketListings', () => {
        // The function should return an array of Steam Community Market listings
        it('should return an array of Steam Community market listings', (done) => {
            // The market listings descriptions should include the query: Unusual Burning Flames
            market.getMarketListings({ query: 'Unusual Burning Flames', descriptions: 1, appid: 440, start: 0, count: 10, callback: (err, res) => {
                // Error getting the Steam Community Market listings
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "results"
                // and it should also be an array with any given length
                expect(res).to.be.an('object')
                expect(res).to.have.property('results')
                expect(res.results).to.be.an('array')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get a list of market activities for a specific item
    describe('getItemActivity', () => {
        // The function should return an array of item activities
        it('should return an array of item activities', (done) => {
            // Get the order activity for the item matching the nameid
            market.getItemActivity({ item_nameid: '176042493', callback: (err, res) => {
                // Error getting the item activity
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "activity"
                // and it should also be an array with any given length
                expect(res).to.be.an('object')
                expect(res).to.have.property('activity')
                expect(res.activity).to.be.an('array')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get a market order histogram for a specific item
    describe('getItemHistogram', () => {
        // The function should return an item histogram object
        it('should return a histogram object', (done) => {
            // Get the order histogram for the item matching the nameid
            market.getItemHistogram({ item_nameid: '176000861', callback: (err, res) => {
                // Error getting the item histogram
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "price_suffix" 
                // and it should also be a string
                expect(res).to.be.an('object')
                expect(res).to.have.property('price_suffix')
                expect(res.price_suffix).to.be.a('string')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get your own Steam Community Market history
    // This test is skipped due to conflicts with the test workflow
    describe.skip('getMyHistory', () => {
        // The function should return an object with your market history
        it('should return my Steam Community Market history', (done) => {
            // Get the session user's market history by using their steamLoginSecure cookie
            market.getMyHistory({ cookie: process.env.STEAM_COOKIE, callback: (err, res) => {
                // Error getting their market history
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "assets"
                // and it should also be an object
                expect(res).to.be.an('object')
                expect(res).to.have.property('assets')
                expect(res.assets).to.be.an('object')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get your own Steam Community Market listings
    // This test is skipped due to conflicts with the test workflow
    describe.skip('getMyListings', () => {
        // The function should return an object with your market listings
        it('should return my Steam Community Market listings', (done) => {
            // Get the session user's market listings by using their steamLoginSecure cookie
            market.getMyListings({ cookie: process.env.STEAM_COOKIE, callback: (err, res) => {
                // Error getting their market listings
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "assets"
                // and it should also be an object
                expect(res).to.be.an('object')
                expect(res).to.have.property('assets')
                expect(res.assets).to.be.an('object')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })
    
    // Get popular Steam Community Market listings
    describe('getPopularListings', () => {
        // The function should return an array of popular market listings
        it('should return an array of popular listings', (done) => {
            // Get the 10 most popular Steam Community Market listings
            market.getPopularListings({ start: 0, count: 10, callback: (err, res) => {
                // Error getting the popular listings
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "stop"
                // and it should equal true
                expect(res).to.be.an('object')
                expect(res).to.have.property('stop')
                expect(res.stop).to.equal(true)

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })

    // Get the most recent Steam Community Market listings
    describe('getRecentListings', () => {
        // The function should return an object with recent market listings
        it('should return an object with recent listings', (done) => {
            market.getRecentListings({ callback: (err, res) => {
                // Error getting the recent listings
                if (err) return done(err)

                // The response should have status code 200 (ok),
                // it should also be an object
                // and must have a property named "assets"
                // and it should also be an object
                expect(res).to.be.an('object')
                expect(res).to.have.property('assets')
                expect(res.assets).to.be.an('object')
                expect(res).to.have.property('listinginfo')
                expect(res.listinginfo).to.be.an('object')

                // Call done to end the test when the callback is invoked
                done()
            }})
        })
    })
})
