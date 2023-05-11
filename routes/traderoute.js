const express = require("express");
const router = express.Router();
const controller = require("../controllers/tradeController");
const {
  authenticated,
  isCreatedBy,
  isOfferedBy,
  isSavedBy,
} = require("../middlewares/auth");
const {
  validateId,
  validateitem,
  validationresult,
  cartquantity,
  saveitem,
} = require("../middlewares/validator");
//gives all items
router.get("/", controller.index);

//sends a form to create a new item (join us!)
router.get("/new", authenticated, controller.new);

//creates a new item
router.post(
  "/",
  authenticated,
  validateitem,
  validationresult,
  controller.create
);

//gives an item with that particular id
router.get("/:id", validateId, controller.show);

// sends a form to edit the item of that particular id
router.get(
  "/:id/edit",
  validateId,
  authenticated,
  isCreatedBy,
  controller.edit
);

// updates the particular item of that id
router.put(
  "/:id",
  validateId,
  authenticated,
  isCreatedBy,
  validateitem,
  validationresult,
  controller.update
);

// deletes the particular item of that id
router.delete(
  "/:id",
  validateId,
  authenticated,
  isCreatedBy,
  controller.delete
);

// posts items to cart
router.post(
  "/:id",
  validateId,
  authenticated,
  cartquantity,
  validationresult,
  controller.cart
);

//save posts ietms to whishlist
router.post(
  "/:id/save",
  validateId,
  authenticated,
  saveitem,
  validationresult,
  controller.save
);

router.get("/:id/trade", validateId, authenticated, controller.trade);

router.get("/:id/tradeitem", authenticated, controller.tradeitem);

router.get("/:id/manage", validateId, authenticated, controller.manage);

router.get("/:id/accept", validateId, authenticated, controller.accept);

router.get("/:id/reject", validateId, authenticated, controller.reject);

////deletes items from the whishlist
router.delete(
  "/:id/savedelete",
  validateId,
  authenticated,
  isSavedBy,
  controller.savedelete
);

router.delete(
  "/:id/offerdelete",
  validateId,
  authenticated,
  isOfferedBy,
  controller.offerdelete
);

router.delete(
  "/:id/manageofferdelete",
  validateId,
  controller.manageofferdelete
);

module.exports = router;
