'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('collection')
	const res = await collection.where({
		phone: event.phone,
		good: {
		  _id: event.good._id,
		}
	}).count()
	return res
};
