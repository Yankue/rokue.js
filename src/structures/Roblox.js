const RobloxCatalogManager = require("./RobloxCatalogManager");
const RobloxUserManager = require("./RobloxUserManager");
const RobloxGroupManager = require('./RobloxGroupManager');

class Roblox {
    constructor(client) {
        this.client = client;
        this.catalog = new RobloxCatalogManager(this.client)
        this.users = new RobloxUserManager(this.client)
        this.groups = new RobloxGroupManager(this.client);
    }
}

module.exports = Roblox;
