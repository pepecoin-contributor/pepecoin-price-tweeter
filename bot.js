const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;
const fetch = require('node-fetch');

// Write the Env variables on Heroku or your server, to keep them save from Github
var Bot = new TwitterBot({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

// Function that builds and tweets the message
function runBot() {
   fetch('https://api.coingecko.com/api/v3/simple/price?ids=memetic&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&include_24hr_vol=true')
    .then(data => data.json())
    .then((data) => {
        const change24Hr = data.memetic.usd_24h_change.toFixed(2);
        const info = 
          `Pepecoin Price: $${data.memetic.usd.toFixed(5)} [USD]\n` +
           `Marketcap: $${data.memetic.usd_market_cap.toFixed(2)} [USD]\n` +
           `24hr change: ${change24Hr}% ${change24Hr < 0 ? '📉' : '📈'}\n` +
           `$meme #meme #pepecoin 🐸`;
        Bot.tweet(info);
    })
    .catch(error => console.log('Error ', error));
}

// run Bot
runBot();
