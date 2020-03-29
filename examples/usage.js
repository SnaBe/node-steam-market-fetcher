const SteamMarketFetcher = require('../index');

const Fetcher = new SteamMarketFetcher();

//AK-47 | Redline (Field-Tested) from CS:GO (appid 730)
Fetcher.getItemPrice('AK-47 | Redline (Field-Tested)', 730).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage('AK-47 | Redline (Field-Tested)', 730).then((image) => console.log(image)).catch((err) => console.log(err.message));

//Fractal Horns of Inner Abysm from Dota 2 (appid 570)
Fetcher.getItemPrice('Fractal Horns of Inner Abysm', 570).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage('Fractal Horns of Inner Abysm', 570).then((image) => console.log(image)).catch((err) => console.log(err.message));

//Mann Co. Supply Crate Key from Team Fortress 2 (appid 440)
Fetcher.getItemPrice('Mann Co. Supply Crate Key', 440).then((price) => console.log(price)).catch((err) => console.log(err.message));
Fetcher.getItemImage('Mann Co. Supply Crate Key', 440).then((image) => console.log(image)).catch((err) => console.log(err.message));