import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { tags_items, tagMappings } from './Tags_item';
import Axios from "axios";

function MyCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [items, setItems] = useState([]);
  const [itemForm, setItemForm] = useState({
    type: '',
    amount: 0,
    tags: [],
    memo: '',
  });
  const [editingId, setEditingId] = useState(null);

  // 날짜 변경 핸들러
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // 아이템 추가 핸들러
  const handleAddItem = () => {
    const newItem = {
      ...itemForm,
      id: Math.random(),
      date: selectedDate.toISOString().split('T')[0],
    };
    setItems([...items, newItem]);
    setItemForm({ type: '', amount: 0, tags: [], memo: '' }); // 폼 초기화
  };

  // 아이템 수정 핸들러
  const handleUpdateItem = (id) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...itemForm } : item)),
    );
    setEditingId(null); // 편집 상태 초기화
  };

  // 아이템 삭제 핸들러
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // 폼 입력 핸들러
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({ ...prev, [name]: value }));
  };

  // 태그 선택 핸들러
  const handleTagChange = (event) => {
    const { value } = event.target;
    if (value.length > 2) return; // 최대 2개의 태그만 선택 가능
    setItemForm((prev) => ({ ...prev, tags: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    if (editingId) {
      handleUpdateItem(editingId);
    } else {
      handleAddItem();
    }
    setEditingId(null); // 편집 상태 초기화
  };

  // 아이템 리스트 렌더링
  const itemList = items
    .filter((item) => item.date === selectedDate.format('YYYY-MM-DD'))
    .map((item) => (
      <ListItem
        key={item.id}
        secondaryAction={
          <>
            <Button
              onClick={() => {
                setEditingId(item.id);
                setItemForm(item);
              }}
            >
              수정
            </Button>
            <Button onClick={() => handleDeleteItem(item.id)}>삭제</Button>
          </>
        }
      >
        <ListItemText
          primary={`${item.type} - ${item.amount}`}
          secondary={`태그: ${item.tags.join(', ')}, 메모: ${item.memo}`}
        />
      </ListItem>
    ));

  // handleButtonClick 함수 정의
  const handleButtonClick = () => {
    console.log("버튼 클릭");
    handleSubmit();
    handleAddPayment();
  };
  
  // 폼 컴포넌트
  const itemFormComponent = (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>유형</InputLabel>
        <Select
          name="type"
          type="number"
          value={itemForm.type}
          onChange={handleFormChange}
          label="유형"
        >
          <MenuItem value="수입">수입</MenuItem>
          <MenuItem value="지출">지출</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="amount"
        type="number"
        label="금액"
        value={itemForm.amount}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>태그</InputLabel>
        <Select
          name="tags"
          multiple
          value={itemForm.tags}
          onChange={handleTagChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {tags_items.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="memo"
        label="메모"
        value={itemForm.memo}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleButtonClick} variant="contained" color="primary">
        {editingId ? '수정' : '추가'}
      </Button>
    </div>
  );

  // 클라이언트 측 코드
  const handleAddPayment = async () => {
    // console.log("handleAddPayment 함수 실행 중");
    try {
      const payTypeValue = itemForm.type === '지출' ? "1" : "0";
      const category_id = Array.from(itemForm.tags).map(tag => tagMappings[tag]).join('');
      
      console.log(selectedDate.toISOString().split('T')[0]);
      console.log(payTypeValue);
      console.log(itemForm.amount);
      console.log(itemForm.memo);
      console.log(category_id);
      
      const response = await Axios.post(
        "http://localhost:3000/payment/addpayment",
        {
          pay_date: selectedDate.toISOString().split('T')[0],
          pay_type: payTypeValue,
          amount: itemForm.amount,
          memo: itemForm.memo,
          category_id: category_id,
        },
        { withCredentials: true }  // CORS 이슈를 해결하기 위해 credentials 옵션을 설정
      );
      
      console.log(response)

      if (response && response.message) {
        console.log(response.message);
        // 예를 들어, 추가 성공 후의 처리를 할 수 있습니다.
      } else {
        console.error("서버 응답에 'data' 속성 또는 'message' 속성이 없습니다.");
      }
    } catch (error) {
      console.error("지출 내역 추가 실패:", error);
      // 예를 들어, 에러 메시지를 화면에 표시할 수 있습니다.
    }
  };

  // ...

  //   <Button onClick={() => { console.log("버튼 클릭"); handleAddPayment(); }} variant="contained" color="primary">
  //   {editingId ? '수정' : '추가'}
  // </Button>


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <List>
        {itemList.length > 0 ? (
          itemList
        ) : (
          <ListItem>아이템이 없습니다.</ListItem>
        )}
      </List>
      {itemFormComponent}
    </div>
  );
}

export default MyCalendarPage;
