import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  userId: {
    email: { type: String, required: true }
    
  },
  productId: {
    type: String,  // Assuming productId is also a string
    required: true,
  }, 
  quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  
);

const Cart = mongoose.model('CartItem', CartSchema); // Optionally, you can change the model name from Cart to CartItem

export default Cart;
