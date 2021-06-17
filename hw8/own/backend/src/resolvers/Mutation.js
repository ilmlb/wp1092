const Mutation = {
    async createChatBox(parent, { from, to },
                                { db, pubsub }, info)
    {
      if (!from || !to)
        throw new Error
        ("Missing chatBox from for CreateChatBox");
      // if (!(await checkUser(db, from, "createChatBox"))) {
      //   console.log
      //   ("User does not exist for CreateChatBox: " + from);
      //   await newUser(db, from);
      // }
      const chatBoxName = makefrom(from, to);
      const sender = await validateUser(db, from);
      const receiver = await validateUser(db, to);
      const chatBox = await validateChatBox(db, chatBoxName);
      return chatBox;
    },

    async createMessage(parent, { key, from, body }, { db, pubsub }, info) {
      const chatBox = await validateChatBox(db, key);
      const sender = await validateUser(db, from);
      const newMessage = new db.MessageModel({ sender, body });
      await newMessage.save();
  
      chatBox.messages.push(newMessage);
      await chatBox.save();
  
      pubsub.publish(`chatBox ${key}`, {
        chatBox: {
          mutation: 'CREATE_MESSAGE',
          key: key,
          sender: from,
          body: body,
        },
      });
      return newMessage
    }
  }
  
const makefrom = (from, to) => {
  return [from, to].sort().join('_');
};

const validateUser = async (db, name) => {
  const existing = await db.UserModel.findOne({ name });
  if (existing) return existing;
  return new db.UserModel({ name }).save();
};

const validateChatBox = async (db, key) => {
  let box = await db.ChatBoxModel.findOne({ "name": key });
  if (!box) box = await new db.ChatBoxModel({ name: key }).save();
  return box
    .populate('users')
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};

export default Mutation;
