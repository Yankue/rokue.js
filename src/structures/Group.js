const GroupMemberManager = require("./GroupMemberManager");

class Group {
    constructor(client, result, owner) {
        this.client = client
        this.owner = owner
        this.name = result.name
        this.id = result.id
        this.membercount = result.memberCount
        this.description = result.description

        this.members = new GroupMemberManager(this.client, this)
    }
}

module.exports = Group;