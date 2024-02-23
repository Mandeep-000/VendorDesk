import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, 'Please provide quantity'],
        default: '1',
      },
    revisedStock: {
        type: Number,
        required: [true, 'Please provide quantity'],
      },
      price: {  
        type: Number,
        required: [true, 'Please provide price'],
      },
    exchangeType: {
        type: String,
        enum: ['sales', 'purchase'],
        required: [true, 'Please provide type of exchange'],
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Please provide product'],
      },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
},
{ timestamps: true }
)

export default mongoose.model('Sales', SalesSchema);