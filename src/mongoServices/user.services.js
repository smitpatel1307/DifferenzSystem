import { userModel } from "../models";

const findOneQuery = async (filter) => {
  const data = await userModel.findOne(filter);
  return data;
};

export default {
  findOneQuery,
};
