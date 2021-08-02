'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('goods')
	const list = await collection.where({
		isNew:true
	})
	.skip((event.page - 1) * event.pageSize) // 跳过结果集中的前 10 条，从第 11 条开始返回
	.limit(event.pageSize) // 限制返回数量为 10 条
	.get()
	return {
	    list: list
		// total: total
	}
};
