function TaskDAO(connection) {
	this._conn = connection;
}

TaskDAO.prototype.getAll = function (callback) {
	let sql = `SELECT * FROM tb_tasks`;
	this._conn.query(sql, callback);
}

TaskDAO.prototype.onTaskInsert = function (task, callback) {
	this._conn.query('INSERT INTO tb_tasks SET ?', task, callback);
}

TaskDAO.prototype.onUpdateTask = function (task, callback) {
	let sql = `UPDATE tb_tasks SET title = '${task.title}', description = '${task.description}', progress = '${task.progress}' where id = ${task.id}`;
	this._conn.query(sql, callback);
}

TaskDAO.prototype.onTaskDelete = function (id, callback) {
	let sql = `DELETE FROM tb_tasks WHERE id = ${id}`;
	this._conn.query(sql, callback);
}

module.exports = function () {
	return TaskDAO;
}