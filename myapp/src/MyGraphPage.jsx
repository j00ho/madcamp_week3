import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Chart from 'react-apexcharts';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OpenAI from 'openai';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const MyGraphPage = () => {
  // 상단 그래프 데이터
  const dailyData = {
    series: [{ name: '일별 소비', data: [10, 50, 30, 40, 60, 20, 70] }],
    options: {
      chart: { type: 'line' },
      xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'] },
    },
  };
  const weeklyData = {
    series: [{ name: '주간별 소비', data: [100, 200, 300, 400, 500] }],
    options: {
      chart: { type: 'bar' },
      xaxis: { categories: ['1주', '2주', '3주', '4주', '5주'] },
    },
  };
  const monthlyData = {
    series: [{ name: '월별 소비', data: [1000, 2000, 3000, 4000, 5000] }],
    options: {
      chart: { type: 'bar' },
      xaxis: { categories: ['1월', '2월', '3월', '4월', '5월'] },
    },
  };

  // Stacked Chart 데이터
  const [selectedTag, setSelectedTag] = useState('');
  const [chartData, setChartData] = useState([]);
  const tags = ['식비', '교통비', '기타']; // 가정된 태그 목록

  useEffect(() => {
    // 선택된 태그에 따라 그래프 데이터 업데이트 로직
    if (selectedTag === '식비') {
      setChartData([44, 55, 41, 67, 22, 43]);
    } else if (selectedTag === '교통비') {
      setChartData([13, 23, 20, 8, 13, 27]);
    } else if (selectedTag === '기타') {
      setChartData([11, 17, 15, 15, 21, 14]);
    }
  }, [selectedTag]);

  // ChatGPT 연동
  const [gptResponse, setGptResponse] = useState('');

  const handleButtonClick = async () => {
    
    const randomText = 'I love ChatGPT'; // 랜덤 텍스트 생성 로직 추가
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: randomText }],
        model: "gpt-3.5-turbo",
      });
    setGptResponse(completion.choices[0].message.content);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Chart
            options={dailyData.options}
            series={dailyData.series}
            type="line"
          />
        </Grid>
        <Grid item xs={4}>
          <Chart
            options={weeklyData.options}
            series={weeklyData.series}
            type="bar"
          />
        </Grid>
        <Grid item xs={4}>
          <Chart
            options={monthlyData.options}
            series={monthlyData.series}
            type="bar"
          />
        </Grid>
      </Grid>

      <Select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="">
          <em>태그 선택</em>
        </MenuItem>
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </Select>

      <Chart
        options={{ chart: { type: 'bar' }, xaxis: { categories: tags } }}
        series={[{ name: selectedTag, data: chartData }]}
        type="bar"
      />

      <Button variant="contained" onClick={handleButtonClick}>
        ChatGPT에 물어보기
      </Button>
      <div>{gptResponse}</div>
    </div>
  );
};

export default MyGraphPage;
