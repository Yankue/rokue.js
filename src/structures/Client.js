const fetch = require('node-fetch')
const robloxManager = require('./Roblox.js');

class Client {
    constructor(options={}) {
        if(typeof options.cookie !== 'undefined') {
            this.cookie = options.cookie;
        }
        this.hello = "hi"
        this.roblox = new robloxManager(this);
    }


}

module.exports = Client;