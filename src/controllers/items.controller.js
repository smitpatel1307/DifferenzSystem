import { itemService } from "../mongoServices";

const addUpdateItems = async (req, res) => {
  let saveItem;
  try {
    let { body } = req;
    if (body._id) {
      let filter = {};

      let update = {
        ...body,
      };

      update = {
        ...update,
        updatedBy: _id,
      };
      saveItem = await itemService.updateOneQuery(filter, update);
      if (!saveItem) throw new Error("Something went wrong");
    } else {
      let data = {
        ...body,
        createdBy: _id,
      };
      saveItem = await itemService.insertOne(data);
      if (!saveItem) throw new Error("Something went wrong");
    }
    saveItem &&
      res.status(200).send({
        success: true,
        message: `Item ${body._id ? "Updated" : "Saved"} Successfully`,
      });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

const getItems = async (req, res) => {
  try {
    let response;
    let returnData = await itemService.findAllQuery({});
    response = {
      success: true,
      data: returnData,
    };
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    let { query } = req,
      { id } = query;
    let itemAvailable = await itemService.findOneQuery({ id });
    if (!itemAvailable) throw new Error("items not found");
    let itemDeleted = await itemService.itemDelete({ id });
    itemDeleted &&
      res.status(200).send({
        success: true,
        message: "Item Remove SuccessFully",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default {
  addUpdateItems,
  getItems,
  removeItem,
};
