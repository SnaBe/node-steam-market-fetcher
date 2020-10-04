//We'll use Mocha & Chai for testing the modules methods
const expect = require('chai').expect;

//Require the module itself
//Replace this with const SteamMarketFetcher = require('steam-market-fetcher'); if used outside of the module directory
const SteamMarketFetcher = require('../index');

//Our unit tests
describe('steam-market-fetcher tests', () => {
    //Test & verify that the target is an instance of the given constructor
    describe('instance of constructor', () => {
        it('should be instance of steam-market-fetcher', () => {
            expect(new SteamMarketFetcher()).to.be.an.instanceof(SteamMarketFetcher);
        });
    });
});