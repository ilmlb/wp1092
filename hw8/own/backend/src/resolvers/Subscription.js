const Subscription = {
    chatBox: {
      subscribe(parent, { key }, { db, pubsub }, info) {
        if (key === '') {
            throw new Error
            ("Missing chatBox name for Subscription");
        }
        const cb = validateChatBox(db, key);
        return pubsub.asyncIterator(`chatBox ${key}`);
      },
    },
  };

const validateChatBox = async (db, key) => {
    let box = await db.ChatBoxModel.findOne({ "name": key });
    if (!box) box = await new db.ChatBoxModel({ name: key }).save();
    return box
      .populate('users')
      .populate({ path: 'messages', populate: 'sender' })
      .execPopulate();
  };

export default Subscription;