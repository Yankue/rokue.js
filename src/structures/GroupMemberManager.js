class GroupMemberManager {
    constructor(client, group) {
        this.group = group;
        this.client = client
    }

    async get(id) {
        const res_ = fetch(``)
    }

    async list(limit=100, page=1) {
        let searchFor = 10
        if(limit > 10) searchFor = 25
        if(limit > 25) searchFor = 50
        if(limit > 50) searchFor = 100
        if(limit > 100) throw "Cannot list more than 100 results"
        const r = await fetch(`https://groups.roblox.com/v1/groups/${this.group.id}/users?limit=${searchFor}&sortOrder=Asc`)
        const res = await r.json()
        let list = []
        for(const entry of res.data) {
            const user = await this.get(entry.user.userId);
            list.push(user)
            if(res.data.indexOf(entry)+1 == limit) return list;
        }
    }
}

module.exports = GroupMemberManager