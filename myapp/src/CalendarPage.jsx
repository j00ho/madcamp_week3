import React, { useState } from 'react';
import MyCalendar from '@/components/CalendarComponent';
import { Link } from 'react-router-dom';

const CalendarPage = () => {
	// 금액과 메모 상태
	const [amount, setAmount] = useState('');
	const [memo, setMemo] = useState('');
	const [transactionType, setTransactionType] = useState('deposit'); // 초기값: 입금
  
	// 폼 제출 핸들러
	const handleSubmit = (e) => {
	  e.preventDefault();
	  // 여기에서 등록(DB에 저장) 로직을 추가할 수 있습니다.
	  alert(`유형: ${transactionType}, 금액: ${amount}, 메모: ${memo}`);
	  // 상태 초기화
	  setAmount('');
	  setMemo('');
	  setTransactionType('deposit'); // 등록 후 기본값으로 초기화
	};

	const handleCancel = () => {
		// 취소 버튼을 누를 경우 상태 초기화
		setAmount('');
		setMemo('');
		setTransactionType('deposit'); // 취소 후 기본값으로 초기화
	};

	return (
		<div>
			<h2>캘린더</h2>
			<MyCalendar />
			<h2>내역 입력</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="radio"
						id="deposit"
						value="deposit"
						checked={transactionType === 'deposit'}
						onChange={() => setTransactionType('deposit')}
					/>
					<button type="deposit">입금</button>
					</div>
					<div>
					<input
						type="radio"
						id="withdrawal"
						value="withdrawal"
						checked={transactionType === 'withdrawal'}
						onChange={() => setTransactionType('withdrawal')}
					/>
					<button type="withdrawal">출금</button>
					{/* <label htmlFor="withdrawal">출금</label> */}
					</div>
				<label>
				금액:
				<input
					type="text"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				</label>
				<br />
				<label>
				메모:
				<textarea
					value={memo}
					onChange={(e) => setMemo(e.target.value)}
				/>
				</label>
				<br />
				<button type="submit">등록</button>
        		<button type="button" onClick={handleCancel}>취소</button>
			</form>
		</div>
	);
};

export default CalendarPage;
