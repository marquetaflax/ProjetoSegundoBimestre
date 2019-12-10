var app = require('./config/server.js')
let port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function () {
  console.log('Servidor rodando com express na porta:', port)
})