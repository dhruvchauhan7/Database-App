import express from "express"
import { getMostItemsUsers, getProductsWithGoodRatings, getNoPoorReviews, getPoorReviews, twoCategories } from "../controllers/user.js";

const router = express.Router()

router.get("/mostitems", getMostItemsUsers);
router.get("/good_ratings", getProductsWithGoodRatings);
router.get("/no_poor_reviews", getNoPoorReviews);
router.get("/poor_reviews", getPoorReviews);
router.post("/two_categories", twoCategories);


export default router;