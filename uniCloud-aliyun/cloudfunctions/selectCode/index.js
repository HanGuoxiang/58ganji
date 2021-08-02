'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('code')
	const res = await collection.where({
		phone: event.phone
	}).get()
	return res
};
