import { cartService, itemService } from "../services";

const addToCart = async (req, res) => {
  let emptyCart = false;
  try {
    const { currentUser, body } = req,
      _id = currentUser ? currentUser._id : undefined,
      { isAdd } = body;

    let cart = null,
      item = null,
      itemDetails = null,
      optionDetails = null,
      cartByUser = null,
      saveCart = null,
      filter = {
        userId: _id,
      },
      filterByUser = {
        userId: _id,
      };

    cart = await cartService.findOneQuery(filter);

    if (cart) {
      let sameItemsInCart = cart.items.filter(
        (ele) => ele.itemId.toString() === body.item.itemId.toString()
      );

      let updateBody = {};
      if (sameItemsInCart && sameItemsInCart.length > 0) {
        let findIndex = cart.items.findIndex(
          (ele) => ele.itemId.toString() === body.item.itemId.toString()
        );

        cart.items[findIndex].quantity = isAdd
          ? cart.items[findIndex].quantity + 1
          : cart.items[findIndex].quantity - 1;

        if (cart.items[findIndex].quantity == 0) {
          cart.items = cart.items.filter(
            (ele) => ele._id !== cart.items[findIndex]._id
          );

          updateBody = {
            items: [...cart.items],
          };
        }
      } else {
        updateBody = {
          items: [...cart.items, body.item],
        };
      }

      delete updateBody.storeId;
      saveCart = await cartService.updateOneQuery(filter, updateBody);
      if (!saveCart) throw new Error("Error while adding to cart.");
    } else {
      cartByUser = await cartService.findOneQuery(filterByUser);
      if (cartByUser) {
        emptyCart = true;
        return res.status(200).send({
          success: true,
          emptyCart,
          message:
            "Your cart have some items, Do you wish to start over new cart ?",
        });
      }

      const { storeId, item } = body;

      let saveBody = {
        userId: _id,
        storeId,
        items: [item],
      };

      if (!currentUser) {
        delete saveBody.userId;
        saveBody = {
          ...saveBody,
          sessionId,
        };
      }
      saveCart = await cartService.insertOneQuery(saveBody);
      if (!saveCart) throw new Error("Error while adding to cart.");
    }
    const responseObj = await getCartByUser(currentUser, sessionId, storeId);
    return res
      .status(200)
      .send({ success: true, emptyCart, data: responseObj });
  } catch (error) {
    res.status(400).send({
      success: false,
      emptyCart,
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { currentUser } = req,

    const responseObj = await getCartByUser(currentUser);
    return res.status(200).send({ success: true, data: responseObj || [] });
  } catch (error) {
    // errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//remove specific item from cart
const removeItemFromCart = async (req, res) => {
  try {
    const { currentUser, query, sessionId } = req,
      { storeId, itemId } = query;

    let filter = {};
    if (!currentUser) {
      filter = {
        sessionId,
        storeId,
      };
    } else {
      filter = {
        userId: currentUser._id,
        storeId,
      };
    }
    await cartService.removeOneItemQuery(filter, itemId); // find cart by user and store id for latest data
    return res
      .status(200)
      .send({ success: true, message: "Item removed from your cart!" });
  } catch (error) {
    // errorLogger(error.message, req.originalUrl);
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default {
  addToCart,
  getCart,
  removeItemFromCart,
};
