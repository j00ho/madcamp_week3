// import React from 'react';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

// 로그인 
import React, { useState, useEffect } from 'react';

const App = () => {
  const [userPayments, setUserPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 나타내는 상태 추가

  useEffect(() => {
	//useEffect가 작동하는지 F12 켜서 확인해보기
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	// 서버에서 사용자의 지출 정보 가져오기
    fetch('http://localhost:3000/payment/getuserpayments', {
		credentials: 'include',
	  })
		.then(response => {
		  console.log('Server response:', response);
		  if (!response.ok) {
			throw new Error('Unauthorized');
		  }
		  setIsLoggedIn(true); // 서버로부터의 응답이 정상적인 경우에 로그인 상태를 true로 설정
		  return response.json();
		})
      .then(data => {
        setUserPayments(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user payments:', error);
        setIsLoading(false);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h1>사용자 지출 내역</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isLoggedIn ? ( // 로그인 상태에 따라 다른 메시지 표시
        <ul>
          {userPayments.map(payment => (
            <li key={payment.id}>
              <strong>Date:</strong> {payment.pay_date},{' '}
              <strong>Type:</strong> {payment.pay_type},{' '}
              <strong>Amount:</strong> {payment.amount},{' '}
              <strong>Memo:</strong> {payment.memo},{' '}
              <strong>Category:</strong> {payment.category_id}
            </li>
          ))}
        </ul>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
};

export default App;

// const C = () => {
// 	return (
// 		<>
// 			<h3>안녕하세요. C 입니다.</h3>
// 		</>
// 	);
// };

// export default C;