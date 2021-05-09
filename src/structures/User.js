const fetch = require('node-fetch');

const groupManager = require('./RobloxGroupManager');

const formats = ["png", "jpeg"]
const sizes = ["30x30", "48x48", "60x60", "75x75", "100x100", "110x110", "140x140", "150x200", "180x180", "250x250", "352x352", "420x420", "720x720"]

class User {
    constructor(client, res) {
        this.username = res.name
        this.description = res.description
        this.created = res.created
        this.id = res.id
        this.displayname = res.displayName
        this.client = client;
    }

    async getThumbnail(options={}) {
        const format = options.format || "png"
        if(formats.indexOf(format.toLowerCase()) == -1) throw "Invalid image format provided"

        const circular = Boolean(options.circular) || false
        if(circular !== true && circular !== false) throw "Invalid choice for circular"

        const size = options.size || "110x110"
        if(formats.indexOf(format) == -1) throw "Invalid image size provided"
        


        const r = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?format=${format}&isCircular=${circular}&size=${size}&userIds=${this.id}`)
        const res = await r.json()
        return res.data[0].imageUrl;
    }

    async getGroups() {
        const groups_ = await fetch(`https://groups.roblox.com/v2/users/${this.id}/groups/roles`);
        const groupsRes = await groups_.json();

        let groups = [];
        for(const groupObject of groupsRes.data) {
            const group = await this.client.roblox.groups.get(groupObject.group.id);
            groups.push(group);
            if(groupsRes.data.length-1 == groupsRes.data.indexOf(groupObject)) return groups;
        }
    }
}

module.exports = User;