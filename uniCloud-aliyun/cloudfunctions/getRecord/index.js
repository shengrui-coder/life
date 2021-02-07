'use strict';
const db = uniCloud.database()
const _ = db.command
const dbCol = db.collection('life')

exports.main = async (event, context) => {
	let res = await dbCol.orderBy("submitTime", "desc").limit(event.limit).get()
	// let res = await dbCol.orderBy("submitTime", "desc").skip(event.skip).limit(event.limit).get()
	// // let count await dbCol.where({_id: _.exists(true)}).count()
	 return res
};
