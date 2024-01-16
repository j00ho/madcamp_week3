import React, { useState } from 'react';
import { List, ListItem, ListItemText, Button, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function MyCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [items, setItems] = useState([]);
  const [itemForm, setItemForm] = useState({ type: '', amount: 0, tags: [], memo: '' });

  // 날짜 변경 핸들러
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // 아이템 추가 핸들러
  const handleAddItem = () => {
    const newItem = { ...itemForm, id: Math.random(), date: selectedDate.toISOString().split('T')[0] };
    setItems([...items, newItem]);
    setItemForm({ type: '', amount: 0, tags: [], memo: '' }); // 폼 초기화
  };

  // 아이템 수정 핸들러
  const handleUpdateItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, ...itemForm } : item));
  };

  // 아이템 삭제 핸들러
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // 날짜별 아이템 필터링 및 렌더링
  const filteredItems = items.filter(item => item.date === selectedDate.toISOString().split('T')[0]);
  const itemList = filteredItems.length > 0 ? filteredItems.map((item) => (
    <ListItem 
      key={item.id} 
      secondaryAction={
        <>
          <Button onClick={() => handleUpdateItem(item.id)}>수정</Button>
          <Button onClick={() => handleDeleteItem(item.id)}>삭제</Button>
        </>
      }>
      <ListItemText
        primary={`${item.type} - ${item.amount}`}
        secondary={`태그: ${item.tags.join(', ')}, 메모: ${item.memo}`}
      />
    </ListItem>
  )) : <ListItem>아이템이 없습니다.</ListItem>;

  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={handleDateChange}
                components={{
                  OpenPickerIcon: 'keyboard_arrow_down',
                  textField: TextField,
                }}
            />
        </LocalizationProvider>
        <List>
            {itemList}
        </List>
        {/* 아이템 추가 및 수정 폼은 여기에 구현 */}
        <Button onClick={handleAddItem}>아이템 추가</Button>
    </div>
  );
}

export default MyCalendarPage;