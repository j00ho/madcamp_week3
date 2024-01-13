const express = require('express');
const db = require('./db');

const router = express.Router();

//특정 id를 받았을 때 그 id를 가진 user의 payment data를 돌려주는 query
// router.get('/id', async (req, res) => {   
//     const user_id = req.query.user_id;
//     try {
//       const [rows, fields] = await db.execute('SELECT * FROM madcamp_week3.payment_table WHERE user_id = ?', [user_id]);
//       console.log('users에서 데이터 가져감!');
//       res.json(rows);
//     } catch (error) {
//       console.error('쿼리 실행 중 에러:', error);
//       res.status(500).json({ error: '서버 오류' });
//     }
//   });

// 특정 사용자의 지출 정보 조회
router.get('/getuserpayments', async (req, res) => {   
  const { user_id } = req.query;
  
  try {
    // 해당 사용자의 지출 내역을 조회합니다.
    const userPayments = await db.execute('SELECT * FROM payment_table WHERE user_id = ?', [user_id]);

    if (userPayments.length === 0) {
      // 지출 내역이 없는 경우 에러 처리 또는 적절한 로직 수행
      res.status(404).json({ error: '조회할 지출 내역이 없음' });
      return;
    } else {
      // 지출 내역을 찾으면 해당 내역을 응답으로 반환
      res.json(userPayments);
      console.log('사용자 지출 내역 조회 완료!');
    }
  } catch (error) {
    console.error('getuserpayments 쿼리 실행 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 지출 정보 추가
router.post('/addpayment', async (req, res) => {  
  const {user_id, pay_date, pay_type, amount, memo, category_id} = req.body;
  
  try {
    // 사용자가 존재하는지 확인
    const [userRows, userFields] = await db.execute('SELECT * FROM user_table WHERE user_id = ?', [user_id]);

    if (userRows.length === 0) {
      res.status(404).json({ error: '사용자를 찾을 수 없음' });
      return;
    }

    // 지출 정보 추가
    const [result, fields] = await db.execute(
      'INSERT INTO payment_table (user_id, pay_date, pay_type, amount, memo, category_id) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, pay_date, pay_type, amount, memo, category_id]
    );

    res.json({ message: '지출 내역이 추가되었습니다.' });
    console.log('지출 정보 추가 완료!!!!');
  } catch (error) {
    console.error('addpayment 쿼리 실행 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;

//지출 정보 업데이트
router.put('/updatepayment', async (req, res) => {  
  const {paydate, paytype, amount, memo, category} = req.body;
  console.log(paydate);
  try {
      // const changingpayment = await db.execute('SELECT * FROM payment_table WHERE pay_date = ?', [paydate]);
      
      // if (changingpayment.length === 0) {
      //     // 가게가 없는 경우 에러 처리 또는 적절한 로직 수행
      //     res.status(404).json({ error: '정보를 찾을 수 없음' });
      //     return;
      // } else {
      //     // 가게를 찾으면 해당 가게의 정보를 업데이트
          await db.execute('UPDATE payment_table SET pay_type = ?, amount = ?, memo = ?, category_id = ? WHERE pay_date = ?', [paytype, amount, memo, category, paydate]);
          res.json({ message: '지출 내역이 수정되었습니다.'});
          console.log('지출 정보 업데이트 완료!!!!');
      // }

  } catch (error) {
      console.error('reservation 쿼리 실행 중 에러:', error);
      res.status(500).json({ error: '서버 오류' });
  }
});

// 지출 정보 삭제
router.delete('/deletepayment', async (req, res) => {  
  const { paydate } = req.body;
  console.log(paydate);

  try {
    // 해당 날짜의 지출 정보를 찾습니다.
    const existingPayment = await db.execute('SELECT * FROM payment_table WHERE pay_date = ?', [paydate]);

    if (existingPayment.length === 0) {
      // 지출 정보가 없는 경우 에러 처리 또는 적절한 로직 수행
      res.status(404).json({ error: '삭제할 지출 정보를 찾을 수 없음' });
      return;
    } else {
      // 지출 정보를 찾으면 해당 지출 정보를 삭제
      await db.execute('DELETE FROM payment_table WHERE pay_date = ?', [paydate]);
      res.json({ message: '지출 내역이 삭제되었습니다.' });
      console.log('지출 정보 삭제 완료!!!!');
    }
  } catch (error) {
    console.error('deletepayment 쿼리 실행 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

  
module.exports = router;