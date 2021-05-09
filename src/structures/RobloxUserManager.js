const fetch = require('node-fetch');
const User = require('./User');

class RobloxUserManager {
    constructor(client) {
        this.client = client
    }

    async get(id) {
        const r = await fetch(`https://users.roblox.com/v1/users/${id}`)
        const res = await r.json()
        return new User(this.client, res);
    }

    async search(query, limit=5) {
        let searchFor = 10
        if(limit > 10) searchFor = 25
        if(limit > 25) searchFor = 50
        if(limit > 50) searchFor = 100
        if(limit > 100) throw "Cannot search for more than 100 results"
        const r = await fetch(`https://users.roblox.com/v1/users/search?keyword=${query}&limit=${searchFor}`)
        const res = await r.json()
        let list = []
        for(const entry of res.data) {
            const user = await this.get(entry.id)
            list.push(user)
            if(res.data.indexOf(entry)+1 == limit) return list;
        }
    }
}

module.exports = RobloxUserManager
