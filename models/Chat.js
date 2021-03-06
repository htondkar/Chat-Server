const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      text: String,
      data: Date
    }
  ],
  date: Date
})

module.exports = mongoose.model('Chat', chatSchema)
