const fetch = require('node-fetch');
const Group = require('./Group');

class RobloxGroupManager {
    constructor(client) {
        this.client = client;
    }

    async get(id) {
        const res_ = await fetch(`https://groups.roblox.com/v1/groups/${id}`)
        const res = await res_.json();
        const owner = await this.client.roblox.users.get(res.owner.userId);
        return new Group(this.client, res, owner);
    }
}

module.exports = RobloxGroupManager