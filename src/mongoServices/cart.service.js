import { cartModel } from '../models';

const findOneQuery = async (filter) => {
	filter = { ...filter };
	const cart = await cartModel.findOne(filter, { createdAt: 0, updatedAt: 0 });
	return cart;
};

const insertOneQuery = async (body) => {
	const data = new cartModel(body);
	const cart = await data.save();
	return cart;
};

const emptyCartQuery = async (filter) => {
	const cart = await cartModel.deleteOne(filter);
	return cart;
};

const updateOneQuery = async (filter, update) => {
	let options = { new: true };
	const updateCart = await cartModel.updateOne(filter, update, options);
	return updateCart;
};

const removeOneItemQuery = async (filter, itemId) => {
	let options = { new: true };
	const updateCart = await cartModel.findOneAndUpdate(
		filter,
		{
			$pull: { items: { _id: itemId } },
		},
		options,
	);
	return updateCart;
};

const replaceSessionIdByUserId = async (filter, sessionId, userId) => {
	let options = { new: true };
	const updateCart = await cartModel.findOneAndUpdate(
		filter,
		{
			$unset: { sessionId: 1 },
			userId,
		},
		options,
	);
	return updateCart;
};

export default {
	findOneQuery,
	insertOneQuery,
	emptyCartQuery,
	updateOneQuery,
	removeOneItemQuery,
	replaceSessionIdByUserId,
};
