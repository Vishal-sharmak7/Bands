import express, { Router } from "express";
import concertInfo from "../controllers/concert.user.js";
import merchItem from "../controllers/merch.js";
import songInfo from "../controllers/songInfo.js";
import bookingInfo from "../controllers/bookingInfo.user.js";

import userAuth from "../controllers/useregister.js";
import validations from "../middlewares/AuthValidation.js";
import cartController from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import address from "../controllers/handleaddress.js";
import {createOrder ,verifyPayment} from "../controllers/Razorpay.js"
import getOrderDetails from "../controllers/orders.js";

const router = express.Router();

router.route("/").get(concertInfo);
router.route("/merch").get(merchItem);
router.route("/songs").get(songInfo);
router.route("/booking").post(bookingInfo);
router
  .route("/register")
  .post(validations.registerValidation, userAuth.userregister);
router.route("/login").post(validations.loginValidation, userAuth.userlogin);
router.route("/add").post(cartController.handleCart);
// cart
router.route("/cart/:userId").get(cartController.handleGetCart);
router.route("/cart/update").put(cartController.handleUpdate);
router.route("/cart/remove").delete(cartController.handleRemove);
router.route("/cart/delete/:userId").delete(cartController.handledeleteCart);
// address
router.route("/address").post(auth, address.handleAddress);
router.route("/address/:userId").get(auth, address.handleGetAddress);
router.route("/address/update").put(auth , address.handleupdate);
// payment
router.route("/order").post(auth,createOrder)
router.route("/payment/verify").post(auth,verifyPayment)
// orders
router.route("/order/:userId").get( getOrderDetails)


export default router;
