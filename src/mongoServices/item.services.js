import { itemsModel } from "../models";

const insertOne = async (data) => {
  const itemModel = new itemsModel(data);
  const saveItem = await itemModel.save();
  return saveItem;
};

const findOneQuery = async (filter) => {
  filter = { ...filter, isDeleted: false, isActive: true };
  const item = await itemsModel.findOne(filter);
  return item;
};

const updateOneQuery = async (filter, update) => {
  let options = { new: true };
  const updateItem = await itemsModel.updateOne(filter, update, options);
  return updateItem;
};

const findAllQuery = async (itemsIds) => {
  const items = await itemsModel
    .find({ itemsIds })
    .skip(page > 0 ? +limit * (+page - 1) : 0)
    .limit(limit ? +limit : 0);
  return items;
};

const itemDelete = async (_id) => {
  const itemDelete = await itemsModel.deleteOne({ _id });
  return itemDelete;
};
export default {
  insertOne,
  findOneQuery,
  updateOneQuery,
  findAllQuery,
  itemDelete,
};
