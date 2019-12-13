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

TaskDAO.prototype.onTaskUpdateData = function (task, callback) {
  let sql = `UPDATE tarefa SET description = '${task.description}' where id = ${task.id}`;
	this._conn.query(sql, callback);
}

TaskDAO.prototype.onTaskDelete = function (id, callback) {
  let sql = `DELETE FROM tb_tasks WHERE id = ${id}`;
	this._conn.query(sql, callback);
}

module.exports = function(){ 
	return TaskDAO;
}