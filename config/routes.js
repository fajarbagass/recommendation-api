const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();
const validations = require("../app/validations");
const checkValidate = require("../app/middlewares/checkValidate");
const authorization = require("../app/middlewares/authorization");

/** Route Users */
// login user
apiRouter.post(
  "/api/v1/login",
  validations.userValidations.loginDataValidate,
  checkValidate,
  controllers.api.v1.userController.login
);
// mencari data user
apiRouter.get(
  "/api/v1/auth/user",
  authorization.authorize,
  controllers.api.v1.userController.getCurrentUser
);
// register user
apiRouter.post(
  "/api/v1/register",
  validations.userValidations.registerDataValidate,
  checkValidate,
  controllers.api.v1.userController.register
);
// mencari semua data user
apiRouter.get(
  "/api/v1/auth/user-list",
  authorization.authorize,
  controllers.api.v1.userController.findAll
);
// mengubah data user
apiRouter.patch(
  "/api/v1/auth/user",
  authorization.authorize,
  validations.userValidations.updateDataValidate,
  checkValidate,
  controllers.api.v1.userController.update
);
// menghapus data user
apiRouter.delete(
  "/api/v1/auth/user/:id",
  authorization.authorize,
  controllers.api.v1.userController.delete
);
// mengubah kata sandi
apiRouter.put(
  "/api/v1/auth/user/password",
  authorization.authorize,
  validations.userValidations.changePasswordDataValidate,
  checkValidate,
  controllers.api.v1.userController.changePassword
);

/** Route Brand */
// membuat data brand
apiRouter.post(
  "/api/v1/auth/brand",
  authorization.authorize,
  validations.brandValidations.brandData,
  checkValidate,
  controllers.api.v1.brandController.create
);
// mencari semua data brand
apiRouter.get("/api/v1/brand", controllers.api.v1.brandController.findAll);
// mengubah data brand
apiRouter.put(
  "/api/v1/auth/brand/:id",
  authorization.authorize,
  validations.brandValidations.brandData,
  checkValidate,
  controllers.api.v1.brandController.update
);
// menghapus data brand
apiRouter.delete(
  "/api/v1/auth/brand/:id",
  authorization.authorize,
  controllers.api.v1.brandController.delete
);

/** Route Produk */
// membuat data produk
apiRouter.post(
  "/api/v1/auth/product",
  authorization.authorize,
  validations.productValidations.productData,
  checkValidate,
  controllers.api.v1.productController.create
);
// mengubah data produk
apiRouter.patch(
  "/api/v1/auth/product/:id",
  authorization.authorize,
  validations.productValidations.productData,
  checkValidate,
  controllers.api.v1.productController.update
);
// mencari semua data produk
apiRouter.get("/api/v1/product", controllers.api.v1.productController.findAll);
// menghapus data produk
apiRouter.delete(
  "/api/v1/auth/product/:id",
  authorization.authorize,
  controllers.api.v1.productController.delete
);
// mencari data produk berdasarkan id
apiRouter.get(
  "/api/v1/product/:id",
  controllers.api.v1.productController.findById
);

/** Routes Variant */
// membuat data variasi
apiRouter.post(
  "/api/v1/auth/variant",
  authorization.authorize,
  validations.variantValodations.variantData,
  checkValidate,
  controllers.api.v1.variantController.create
);
// mencari semua data variasi
apiRouter.get("/api/v1/variant", controllers.api.v1.variantController.findAll);
// mencari semua data variasi berdasarkan id
apiRouter.get(
  "/api/v1/variant/:id",
  controllers.api.v1.variantController.findById
);
// mencari data variasi berdasarkan produk id
apiRouter.get(
  "/api/v1/variant/product/:id",
  controllers.api.v1.variantController.findByProduct
);
// mengubah data variasi
apiRouter.put(
  "/api/v1/auth/variant/:id",
  authorization.authorize,
  validations.variantValodations.variantData,
  checkValidate,
  controllers.api.v1.variantController.update
);
// mengubah data stok variasi
apiRouter.put(
  "/api/v1/auth/variant/stock/:id",
  authorization.authorize,
  controllers.api.v1.variantController.updateStock
);
// menghapus data variasi
apiRouter.delete(
  "/api/v1/auth/variant/:id",
  authorization.authorize,
  controllers.api.v1.variantController.delete
);

/** Routes Keranjang */
// membuat data keranjang
apiRouter.post(
  "/api/v1/auth/cart",
  authorization.authorize,
  validations.cartValidations.createCartData,
  checkValidate,
  controllers.api.v1.cartController.create
);
// mencari semua data keranjang
apiRouter.get(
  "/api/v1/auth/cart",
  authorization.authorize,
  controllers.api.v1.cartController.findAll
);
// mencari data keranjang berdasarkan id user
apiRouter.get(
  "/api/v1/auth/cart/user",
  authorization.authorize,
  controllers.api.v1.cartController.findByUser
);
// mengubah data keranjang
apiRouter.put(
  "/api/v1/auth/cart/:id",
  authorization.authorize,
  validations.cartValidations.updateCartData,
  checkValidate,
  controllers.api.v1.cartController.update
);
// menghapus data keranjang
apiRouter.delete(
  "/api/v1/auth/cart/:id",
  authorization.authorize,
  controllers.api.v1.cartController.delete
);

/** Routes Order */
// membuat data order
apiRouter.post(
  "/api/v1/auth/order",
  authorization.authorize,
  validations.orderValidations.createOrderData,
  checkValidate,
  controllers.api.v1.orderController.create
);
// mencari semua data order
apiRouter.get(
  "/api/v1/auth/order",
  authorization.authorize,
  controllers.api.v1.orderController.findAll
);
// mencari data order berdasarkan user id
apiRouter.get(
  "/api/v1/auth/order/user",
  authorization.authorize,
  controllers.api.v1.orderController.findByUser
);
// mencari data order berdasarkan id
apiRouter.get(
  "/api/v1/auth/order/:id",
  authorization.authorize,
  controllers.api.v1.orderController.findById
);
// mengubah pembayaran data order
apiRouter.patch(
  "/api/v1/auth/order/:id",
  authorization.authorize,
  controllers.api.v1.orderController.update
);
// mengubah status data order
apiRouter.put(
  "/api/v1/auth/order/:id",
  authorization.authorize,
  controllers.api.v1.orderController.update
);
// menghapus data order
apiRouter.delete(
  "/api/v1/auth/order/:id",
  authorization.authorize,
  controllers.api.v1.orderController.delete
);

/** Routes Order Item */
// membuat data item pesanan
apiRouter.post(
  "/api/v1/auth/order-item",
  authorization.authorize,
  validations.orderItemValidations.createOrderItemData,
  checkValidate,
  controllers.api.v1.orderItemController.create
);
// mencari semua data item pesanan
apiRouter.get(
  "/api/v1/order-item",
  controllers.api.v1.orderItemController.findAll
);
// mencari data item pesanan berdasarkan id
apiRouter.get(
  "/api/v1/auth/order-item/:id",
  authorization.authorize,
  controllers.api.v1.orderItemController.findById
);
// mencari data item pesanan berdasarkan order id
apiRouter.get(
  "/api/v1/auth/order-item/order/:id",
  authorization.authorize,
  controllers.api.v1.orderItemController.findByOrder
);

/** Routes Review */
// membuat data ulasan
apiRouter.post(
  "/api/v1/auth/review",
  authorization.authorize,
  validations.reviewValidations.reviewData,
  checkValidate,
  controllers.api.v1.reviewController.create
);
// mencari semua data ulasan
apiRouter.get("/api/v1/review", controllers.api.v1.reviewController.findAll);
// mencari data ulasan berdasarkan user id
apiRouter.get(
  "/api/v1/auth/review/user",
  authorization.authorize,
  controllers.api.v1.reviewController.findByUser
);
// mencari data ulasan berdasarkan id
apiRouter.get(
  "/api/v1/review/:id",
  controllers.api.v1.reviewController.findById
);
// mengubah data ulasan
apiRouter.patch(
  "/api/v1/auth/review/:id",
  authorization.authorize,
  validations.reviewValidations.reviewData,
  checkValidate,
  controllers.api.v1.reviewController.update
);
// menghapus data ulasan
apiRouter.delete(
  "/api/v1/auth/review/:id",
  authorization.authorize,
  controllers.api.v1.reviewController.delete
);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */ apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
