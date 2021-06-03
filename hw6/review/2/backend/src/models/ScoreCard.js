// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scoreCardSchema = new Schema({
  name: {
    type: String,
    unique:false
  },
  subject: {
    type: String,
    unique: false
  },
  score: {
    type: Number
  }
}, {
  timestamps:true
});

export default mongoose.model('ScoreCard', scoreCardSchema);