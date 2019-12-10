module.exports = function () {

  this.getAll = async function(conn) {
    let sql = `SELECT * FROM tb_tasks`;
    return await conn.query(sql);
  }

  this.onUpdateProgress = async function(task, conn) {
    let sql = `UPDATE tb_tasks set PROGRESS = '${task.progress}' where id = ${task.id}`;
    return await conn.query(sql);
  }

  this.onUpdateTask = async function(task, conn) {
    let sql = `UPDATE tarefa SET description = '${task.description}' where id = ${task.id}`;
    return await conn.query(sql);
  }
  this.onDeleteTask = async function(id, conn) {
    let sql = `DELETE FROM tb_tasks WHERE id = ${id}`;
    return await conn.query(sql);
  }

  this.onInsertTask = async function(task, conn) {
    let sql = 'INSERT INTO tb_tasks SET ?';
    return await conn.query(sql, tarefa);
  }

  return this;
}
  