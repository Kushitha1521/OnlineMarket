import express from "express";
import CartItem from "../models/cartModel.js";

const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
   

   

    // Check if the item already exists in the user's cart
    let cartItem = await CartItem.findOne({ productId, userId });

    if (cartItem) {
      cartItem.quantity += quantity; // Increase quantity if already in cart
    } else {
      cartItem = new CartItem({ productId, userId, quantity });
    }

    await cartItem.save();
    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's cart items
router.get("/:{userId}", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const cartItems = await CartItem.find({ userId }).populate("productId");
    
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove item from cart
router.delete("/remove/:cartItemId", async (req, res) => {
  try {
    const { cartItemId } = req.params;
    await CartItem.findByIdAndDelete(cartItemId);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
