const { Socket } = require('phoenix-channels');
const Client = require('coinbase').Client;
const coinbase = new Client({
  'apiKey': 'API KEY',
  'apiSecret': 'API SECRET',
});
 
let socket = new Socket("ws://localhost:4000/socket"); //FIXME when deploying

let btc_queue = [];
let eth_queue = [];
let ltc_queue = [];
let time_queue = [];
const len_limit = 1000;
 
socket.connect();
 
let channel = socket.channel("prices:node", {});
channel.join()
  .receive("ok", resp => { 
    console.log("Joined successfully", resp);
  })
  .receive("error", resp => { console.log("Unable to join", resp) });

function updatePrice(i) {
  setTimeout(() => {
    let numDone = 0;
    let data = {};
    coinbase.getSpotPrice({'currencyPair': 'BTC-USD'}, function(err, resp) {
      if(resp) {
        btc_queue.push(resp.data.amount);
        if(btc_queue.length > len_limit) {
          btc_queue.shift();
        }
      }
      data.BTC = btc_queue;
      numDone++;
    });
    coinbase.getSpotPrice({'currencyPair': 'LTC-USD'}, function(err, resp) {
      if(resp) {
        ltc_queue.push(resp.data.amount);
        if(ltc_queue.length > len_limit) {
          ltc_queue.shift();
        }
      }
      data.LTC = ltc_queue;
      numDone++;
    });
    coinbase.getSpotPrice({'currencyPair': 'ETH-USD'}, function(err, resp) {
      if(resp) {
        eth_queue.push(resp.data.amount);
        if(eth_queue.length > len_limit) {
          eth_queue.shift();
        }
      }
      data.ETH = eth_queue;
      numDone++;
    });
    coinbase.getTime(function(err, resp) {
      if(resp) {
        time_queue.push(resp.data.iso);
        if(time_queue.length > len_limit) {
          time_queue.shift();
        }
      }
      data.time = time_queue;
      numDone++;
    });

    function detect() {
      // ensures all ajax calls are done
      if(numDone < 4) {
        setTimeout(() => {
          detect();    
        }, 200);
      } else {
        channel.push("update", data)
              .receive("ok", resp => {
                console.log("server update success: "+resp);
              });
      }
    }

    detect();

    updatePrice(++i);
  }, 10000);
}

updatePrice(0);





