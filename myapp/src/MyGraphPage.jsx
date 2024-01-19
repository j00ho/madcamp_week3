import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Chart from 'react-apexcharts';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OpenAI from 'openai';
import Box from '@mui/material/Box';

const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const MyGraphPage = () => {
  const datasets = [
    // datasets[0]
    [
      {
        name: '식비',
        data: [31500, 0, 2500, 31000, 0, 0],
      },
      {
        name: '교통',
        data: [0, 20000, 0, 0, 0, 0],
      },
      {
        name: '쇼핑',
        data: [2500, 0, 31500, 0, 0, 0],
      },
      {
        name: '연애',
        data: [31000, 0, 0, 61000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],

    // datasets[1]
    [
      {
        name: '식비',
        data: [65000, 0, 0, 0, 0, 0],
      },
      {
        name: '교통',
        data: [0, 3000, 1000, 16000, 0, 0],
      },
      {
        name: '쇼핑',
        data: [0, 1000, 34000, 0, 0, 0],
      },
      {
        name: '연애',
        data: [0, 16000, 0, 76000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],

    // datasets[2]
    [
      {
        name: '식비',
        data: [62500, 0, 2500, 0, 0, 0],
      },
      {
        name: '교통',
        data: [0, 17000, 3000, 0, 0, 0],
      },
      {
        name: '쇼핑',
        data: [2500, 3000, 13500, 15000, 0, 0],
      },
      {
        name: '연애',
        data: [0, 0, 15000, 77000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],

    // datasets[3]
    [
      {
        name: '식비',
        data: [65000, 0, 0, 0, 0, 0],
      },
      {
        name: '교통',
        data: [0, 20000, 0, 0, 0, 0],
      },
      {
        name: '쇼핑',
        data: [0, 0, 34000, 0, 0, 0],
      },
      {
        name: '연애',
        data: [0, 0, 0, 92000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],

    // datasets[4]
    [
      {
        name: '식비',
        data: [65000, 0, 0, 0, 0, 0],
      },
      {
        name: '교통',
        data: [0, 20000, 0, 0, 0, 0],
      },
      {
        name: '쇼핑',
        data: [0, 0, 34000, 0, 0, 0],
      },
      {
        name: '연애',
        data: [0, 0, 0, 92000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],

    // datasets[5]
    [
      {
        name: '식비',
        data: [65000, 0, 0, 0, 0, 0],
      },
      {
        name: '교통',
        data: [0, 20000, 0, 0, 0, 0],
      },
      {
        name: '쇼핑',
        data: [0, 0, 34000, 0, 0, 0],
      },
      {
        name: '연애',
        data: [0, 0, 0, 92000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],

    // datasets[6]
    [
      {
        name: '식비',
        data: [65000, 0, 0, 0, 0, 0],
      },
      {
        name: '교통',
        data: [0, 20000, 0, 0, 0, 0],
      },
      {
        name: '쇼핑',
        data: [0, 0, 34000, 0, 0, 0],
      },
      {
        name: '연애',
        data: [0, 0, 0, 92000, 0, 0],
      },
      {
        name: '교육',
        data: [0, 0, 0, 0, 25200, 0],
      },
      {
        name: '기타',
        data: [0, 0, 0, 0, 0, 70010],
      },
    ],
  ];

  const stackedChartOptions = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    xaxis: {
      categories: ['식비', '교통', '쇼핑', '연애', '교육', '기타'],
    }
  };

  // 상단 그래프 데이터
  const dailyData = {
    series: [{ name: '일별 소비', data: [10100, 52340, 35200, 12000, 1200, 42000, 18200] }],
    options: {
      chart: { type: 'line' },
      xaxis: { categories: ['월', '화', '수', '목', '금', '토', '일'] },
    },
  };
  const weeklyData = {
    series: [{ name: '주간별 소비', data: [130000, 19000, 23300, 4400, 55500] }],
    options: {
      chart: { type: 'bar' },
      xaxis: { categories: ['1주', '2주', '3주', '4주', '5주'] },
    },
  };
  const monthlyData = {
    series: [{ name: '월별 소비', data: [704000, 201100, 300430, 403500, 500300] }],
    options: {
      chart: { type: 'bar' },
      xaxis: { categories: ['1월', '2월', '3월', '4월', '5월'] },
    },
  };

  // Stacked Chart 데이터
  const [selectedTag, setSelectedTag] = useState('');
  const [chartData, setChartData] = useState([]);
  const tags = ['식비', '교통', '쇼핑', '연애', '교육', '기타', '태그 선택 안함']; // 가정된 태그 목록

  useEffect(() => {
    // Update chartData based on selectedTag
    const index = tags.indexOf(selectedTag);
    if (index !== -1) {
      setChartData(datasets[index]);
    } else {
      setChartData([]);
    }
  }, [selectedTag]);

  // ChatGPT 연동
  const [gptResponse, setGptResponse] = useState('');

  const handleButtonClick = async () => {
    
    const randomText = '나는 10월, 11월, 12월에 연애에 돈을 각각 10만원, 20만원, 100만원 썼어. 나는 식비로 매달 30만원 정도 썼어. 나는 교통비로 10월, 11월, 12월에 돈을 각각 5만원, 1만원, 10만원 썼어. 나는 알바로 매달 50만원씩 모으고 있어. 돈 관리에 대해 조언을 해줘'; // 랜덤 텍스트 생성 로직 추가
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
        options={stackedChartOptions}
        series={chartData}
        type="bar"
      />

      <Button variant="contained" onClick={handleButtonClick} >
        ChatGPT에게 조언 구하기
      </Button>
      <Box p={2} border={1} mt={2}>
        {gptResponse}
      </Box>
    </div>
  );
};

export default MyGraphPage;
