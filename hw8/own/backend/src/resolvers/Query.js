const Query = {
    users(parent, args, { db }, info) {
        if (!args.name) {
            return db.UserModel.find()
        }
        return db.UserModel.find({"name": args.name})
    },

    chatboxes(parent, args, { db }, info) {
        // if (!args.name) {
        //     return db.ChatBoxModel.find()
        // }
        return db.ChatBoxModel.find({"name": args.name})
    }
}

export default Query;