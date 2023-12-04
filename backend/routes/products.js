import express from "express"
import { getProducts, getProduct, addProduct, addReview, Review } from "../controllers/product.js"

const router = express.Router()

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/home", addProduct);
//router.post("/products/addReview", addReview);
router.post("/products/:p_id/addReview", addReview);
router.post("/reviews", Review);

export default router;