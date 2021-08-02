'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('task')
	const res = await collection.where({
		auth:{
			phone:event.phone
		}
	}).get()
	return res
};
