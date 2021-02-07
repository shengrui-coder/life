'use strict';
const db = uniCloud.database()
const dbCol = db.collection('life')
exports.main = async (event, context) => {
	let addRecord = await dbCol.add(event)
	return addRecord
};
