const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req,  file, cb) => {
    cb(null,'uploads/');
  },
  filename: (req,  file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
  fileSize: 1024 * 1024 * 5
  },
  fileFilter
});
const prodCntrls = require("../cntrls/productsCntrl");

// get several products
router.get("/products", prodCntrls.get_Products);

// create new products
router.post("/products", upload.single("productImage"), prodCntrls.post_Products);

// get one product
router.get("/products/:prodId", prodCntrls.get_Product);

// edit a product
router.put("/products/:prodId", prodCntrls.put_Product);

// delete a product
router.delete("/products/:prodId", prodCntrls.delete_Product);

module.exports = router;
