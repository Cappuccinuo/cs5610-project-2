const { Socket } = require('phoenix-channels');
const Client = require('coinbase').Client;
const coinbase = new Client({
  'apiKey': 'API KEY',
  'apiSecret': 'API SECRET',
});
 
let socket = new Socket("ws://localhost:4000/socket"); //FIXME when deploying

let queue = [];
 
socket.connect();
 
let channel = socket.channel("prices:node", {});
channel.join()
  .receive("ok", resp => { 
    console.log("Joined successfully", resp);
  })
  .receive("error", resp => { console.log("Unable to join", resp) });

function updatePrice(i) {
  setTimeout(() => {
    coinbase.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, resp) {
      if(resp) {
        queue.push(resp.data.amount);
        if(queue.length > 100) {
          queue.shift();
        }
        channel.push("update", {prices: queue, base: resp.data.base})
              .receive("ok", resp => {
                console.log("server update success: "+resp.prices);
              });
      }
    });
    updatePrice(++i);
  }, 10000);
}

updatePrice(0);





