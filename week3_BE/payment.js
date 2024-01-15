const express = require('express');
const db = require('./db');

const router = express.Router();

// 로그인한 사용자의 지출 정보 조회
router.get('/getuserpayments', async (req, res) => {
  try {
    // 세션에 저장된 사용자 정보 확인
    const loggedinuser = req.session.user;
    // console.log(loggedinuser);

    if (!loggedinuser) {
      // 사용자가 로그인되지 않은 경우
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }

    // 사용자의 지출 내역을 조회
    const userPayments = await db.execute('SELECT * FROM payment_table WHERE user_id = ?', [loggedinuser.user_id]);

    if (userPayments[0].length === 0) {
      // 지출 내역이 없는 경우
      res.status(404).json({ error: '조회할 지출 내역이 없음' });
      return;
    }

    // 지출 내역이 있는 경우 응답 반환
    res.json(userPayments[0]);
    console.log('사용자 지출 내역 조회 완료!');
  } catch (error) {
    console.error('getuserpayments 쿼리 실행 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 로그인한 사용자의 지출 내역 추가
router.post('/addpayment', async (req, res) => {  
  const {pay_date, pay_type, amount, memo, category_id} = req.body;
  
  try {
    // 사용자가 로그인했는지 확인
    const loggedinuser = req.session.user;
    // const [userRows, userFields] = await db.execute('SELECT * FROM user_table WHERE user_id = ?', [loggedinuser.user_id]);

    // if (userRows.length === 0) {
    //   res.status(404).json({ error: '사용자를 찾을 수 없음' });
    //   return;
    // }
    if (!loggedinuser) {
      // 사용자가 로그인되지 않은 경우
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }

    // 지출 정보 추가
    await db.execute(
      'INSERT INTO payment_table (user_id, pay_date, pay_type, amount, memo, category_id) VALUES (?, ?, ?, ?, ?, ?)',
      [loggedinuser.user_id, pay_date, pay_type, amount, memo, category_id]
    );

    res.json({ message: '지출 내역이 추가되었습니다.' });
    console.log('지출 정보 추가 완료!!!!');
  } catch (error) {
    console.error('addpayment 쿼리 실행 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 로그인한 사용자의 지출 내역 업데이트 (날짜 선택 시)
router.put('/updatepayment', async (req, res) => {
  try {
    // 사용자가 로그인했는지 확인
    const loggedinuser = req.session.user;
    if (!loggedinuser) {
      // 사용자가 로그인되지 않은 경우
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }

    // 클라이언트에서 전송한 데이터 확인
    const { pay_date, pay_type, amount, memo, category_id } = req.body;
    
    // paydate 값이 존재하는지 확인
    if (!pay_date) {
      res.status(400).json({ error: 'paydate가 정의되지 않았습니다.' });
      return;
    }

    // 지출 내역 업데이트 쿼리 실행
    const updateResult = await db.execute(
      'UPDATE payment_table SET pay_type = ?, amount = ?, memo = ?, category_id = ? WHERE pay_date = ? AND user_id = ?',
      [pay_type, amount, memo, category_id, pay_date, loggedinuser.user_id]
    );
    // console.log(updateResult);
    
    // table에 없는 pay_date가 입력되었을 시
    if (updateResult[0].affectedRows === 0) {
      res.status(404).json({ error: '업데이트할 지출 내역이 존재하지 않습니다.' });
    } else {
      // console.log(loggedinuser.user_id);
      res.json({ message: '지출 내역이 수정되었습니다.' });
    }
    
  } catch (error) {
    console.error('updatepayment 쿼리 실행 중 에러:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 로그인한 사용자의 지출 내역 삭제 (날짜 선택 시)
router.delete('/deletepayment', async (req, res) => {  
  const { paydate } = req.body;
  //console.log(paydate);

  try {
    // 사용자가 로그인했는지 확인
    const loggedinuser = req.session.user;
    if (!loggedinuser) {
      // 사용자가 로그인되지 않은 경우
      res.status(401).json({ error: '로그인이 필요합니다.' });
      return;
    }

    // 해당 날짜의 지출 정보를 찾습니다.
    const existingPayment = await db.execute('SELECT * FROM payment_table WHERE pay_date = ? AND user_id = ?', [paydate, loggedinuser.user_id]);
    console.log(loggedinuser.user_id);
    console.log(existingPayment);

    if (existingPayment[0].length === 0) {
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