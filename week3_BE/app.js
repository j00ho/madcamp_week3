const express = require('express')
const bodyParser = require('body-parser');
const db = require('./db');
const paymentRoutes = require('./payment');
const userRoutes = require('./user');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); 

app.use('/payment', paymentRoutes);
app.use('/user', userRoutes);

// 라우팅
app.get('/', (req, res) => {
  res.send('Hello, VM World!');
});

app.get('/test', (req, res) => {
  res.send('test');
});

app.get('/payment', (req, res) => {
  res.send('Payment endpoint is working!');
});

app.get('/user', (req, res) => {
  res.send('User endpoint is working!');
});

//특정 email을 받았을 때 그 email을 가진 user의 data를 돌려주는 query
// app.get('/users', async (req, res) => {   
//   const email = req.query.email;
//   try {
//     const [rows, fields] = await db.execute('SELECT * FROM madcamp_week3.user_table WHERE email = ?', [email]);
//     console.log('users에서 데이터 가져감!');
//     res.json(rows);
//   } catch (error) {
//     console.error('쿼리 실행 중 에러:', error);
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})