'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	// const collection = db.collection('task')
	// const total = await db.collection('task').where({}).count()//总数
	// console.log(total)
	const list = await db.collection('task')
	  .skip((event.page - 1) * event.pageSize) // 跳过结果集中的前 10 条，从第 11 条开始返回
	  .limit(event.pageSize) // 限制返回数量为 10 条
	  .get()
	// console.log(list)
	return {
	    list: list
		// total: total
	}
	// const res = await collection.where({
	// 	phone: event.phone
	// }).get()
	// return res
};
