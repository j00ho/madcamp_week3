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
import tags_items from './Tags_item';

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

  // 폼 컴포넌트
  const itemFormComponent = (
    <div>
      <FormControl fullWidth margin="normal">
        <InputLabel>유형</InputLabel>
        <Select
          name="type"
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
      <Button onClick={handleSubmit} variant="contained" color="primary">
        {editingId ? '수정' : '추가'}
      </Button>
    </div>
  );

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