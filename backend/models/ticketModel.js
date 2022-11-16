const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      required: true,
      //which collection I'm talking about when I say "ObjectId"
      ref: 'User'
    },
    product: {
      type: String, 
      required: [true, 'Please, select a product.'],
      enum: ['iPhone', 'iPad', 'Macbook', 'iWatch']
    },
    description: {
      type: String, 
      required: [true, "Please, write a description of the issue."]
    },
    status: {
      type: String, 
      required: true,
      enum: ['pending', 'in process', 'closed'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)