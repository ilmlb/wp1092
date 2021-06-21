import mongoose from 'mongoose'

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  // chatBoxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
});

const messageSchema = new Schema({
  // chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' },
  sender: { type: String, required: true },
  body: { type: String, required: true },
});

const chatBoxSchema = new Schema({
  name: { type: String, required: true },
  // users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  messages: [{ type: String, required: true}],
  senders: [{ type: String, required: true}],
});

const UserModel = mongoose.model('User', userSchema);
const ChatBoxModel = mongoose.model('ChatBox', chatBoxSchema);
const MessageModel = mongoose.model('Message', messageSchema);


const db = {
  UserModel,
  ChatBoxModel,
  MessageModel,
};

export { db as default };
