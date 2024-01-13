const express = require('express');
const session = require('express-session');
const db = require('./db');

const router = express.Router();

// 세션 설정
router.use(session({
  secret: 'your-secret-key', // 세션 암호화를 위한 키, 실제 프로젝트에서는 보안에 신경쓰고 설정해야 합니다.
  resave: false,
  saveUninitialized: true
}));

//특정 email을 받았을 때 그 email을 가진 user의 data를 돌려주는 query
router.get('/getusers', async (req, res) => {   
    const email = req.query.email;
    try {
      const [rows, fields] = await db.execute('SELECT * FROM madcamp_week3.user_table WHERE email = ?', [email]);
      console.log('users에서 데이터 가져감', rows);
      res.json(rows);
    } catch (error) {
      console.error('쿼리 실행 중 에러:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  });

// GET 요청에 대한 핸들러 추가
// router.get('/signup', (req, res) => {
//     res.status(404).json({ error: 'Not Found' });
//   });

//회원가입
router.post('/signup', async (req, res) => {
    
    try {
      const { username, email, password, gender, campus_info, yes_income, age } = req.body;

      console.log('데이터가 왔니?:', username, email, password, gender, campus_info, yes_income, age)
      // 이메일 중복 확인
      const [existingUser] = await db.execute('SELECT * FROM madcamp_week3.user_table WHERE email = ?', [email]);
      console.log('이메일 중복 확인 결과:', existingUser);

      if (existingUser.length > 0) {
        // 이미 존재하는 이메일인 경우
        res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
      } else {
        // 사용자 정보 삽입
        await db.execute('INSERT INTO madcamp_week3.user_table (username, email, password, gender, campus_info, yes_income, age) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [username, email, password, gender, campus_info, yes_income, age]);
        console.log('사용자 정보 삽입 완료');

        res.json({ message: '회원가입이 완료되었습니다.' });
      }
    } catch (error) {
      console.error('회원가입 중 에러:', error);
      res.status(500).json({ error: '서버 오류' });
    }
  });

//로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // 입력된 이메일과 비밀번호가 일치하는 사용자 확인
    const [user] = await db.execute('SELECT * FROM madcamp_week3.user_table WHERE email = ? AND password = ?', [email, password]);

    if (user.length > 0) {
      // 로그인 성공
      // 세션에 user_id 저장
      req.session.user_id = user[0].user_id;
      // console.log(req.session.user_id);
      res.json({ message: '로그인 성공', user: user[0] });
    } else {
      // 로그인 실패
      res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 로그아웃
// router.post('/logout', async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('로그아웃 중 에러:', err);
//       res.status(500).json({ error: '서버 오류 '});
//     } else{
//       res.json({ message: '로그아웃 성공'});
//     }
//   })
// });

// 업데이트
router.put('/updateuser', async (req, res) => {
  // 세션 또는 토큰에서 현재 로그인한 사용자의 정보를 가져옴
  const loggedInUserId = req.session.user_id; // 예시: 세션에서 userId를 가져오는 방법

  if (!loggedInUserId) {
      return res.status(401).json({ error: '로그인이 필요합니다.' });
  }

  const { username, email, password, gender, campus_info, yes_income, age } = req.body;
  
  try {
      // userId에 해당하는 사용자 정보 업데이트
      await db.execute('UPDATE madcamp_week3.user_table SET username = ?, email = ?, password = ?, gender = ?, campus_info = ?, yes_income = ?, age = ? WHERE user_id = ?',
          [username, email, password, gender, campus_info, yes_income, age, loggedInUserId]);

      res.json({ message: '사용자 정보가 업데이트되었습니다.' });
  } catch (error) {
      console.error('사용자 정보 업데이트 중 에러:', error);
      res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;

  