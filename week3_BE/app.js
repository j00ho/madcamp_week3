const express = require('express')
const app = express()
const port = 3000

// 라우팅
app.get('/', (req, res) => {
  res.send('Hello, VM World!');
});

app.get('/test', (req, res) => {
  res.send('test');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
