// app.js
const express = require('express')
const app = express()
const port = 3000

const myLogger = function (req, res, next) {
  const start_time = Date.now()
  const start_format = Date(Date.now())
  res.on("finish", () => {
    const finish_time = Date.now()
    duration = finish_time - start_time
    server_message = start_format +
      " | " + req.method + " from " +
      req.originalUrl + " | total time: " + duration + "ms"
    console.log(server_message);
  })
  next()
}

app.use(myLogger)


app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})