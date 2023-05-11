const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");
const {
  isGuest,
  authenticated,
  isAddedBy,
  isSavedBy,
  isOfferedBy,
} = require("../middlewares/auth");
const {
  validateId,
  validateLogin,
  validateSignup,
  validationresult,
  cartquantity,
} = require("../middlewares/validator");
const { Limiter } = require("../middlewares/rateLimiters");
//renders about.ejs page
router.get("/about", controller.about);

//renders contact.ejs page
router.get("/contact", controller.contact);

//renders login.ejs page
router.get("/login", isGuest, controller.login);

router.post(
  "/login",
  Limiter,
  isGuest,
  validateLogin,
  validationresult,
  controller.authenticate
);

//renders signup.ejs page
router.get("/signup", isGuest, controller.signup);

router.post(
  "/signup",
  Limiter,
  isGuest,
  validateSignup,
  validationresult,
  controller.create
);

// renders signup.ejs page
router.get("/profile", authenticated, controller.profile);

// renders signup.ejs page
router.get("/logout", authenticated, controller.logout);

//get /main/msg renders message.ejs page
router.get("/msg", controller.msg);

// renders items which are already in cart
router.get("/cart", authenticated, controller.cartitems);

// renders details of particular item in cart
router.get("/cart/:id", validateId, authenticated, controller.cartitem);

// renders edit form (only quantity)
router.get(
  "/cart/:id/edit",
  validateId,
  authenticated,
  isAddedBy,
  controller.cartedit
);

//updates the particular item in cart
router.put(
  "/cart/:id",
  validateId,
  authenticated,
  isAddedBy,
  cartquantity,
  validationresult,
  controller.cartupdate
);

//deletes items from the cart
router.delete(
  "/cart/:id",
  validateId,
  isAddedBy,
  authenticated,
  controller.cartdelete
);




module.exports = router;
