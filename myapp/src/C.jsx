import { useState } from 'react'
import React, { Component } from 'react'

import { Button, Layout, Menu } from 'antd';

import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Select } from 'antd';
import tags_src from './Tags';




// 영상 데이터 예시
const videos = [
	{
		id: 'video1',
		title: '매일 생기는 지출을 줄이기',
		description: '매일 생기는 지출에 대해 일반적으로 절약할 수 있는 방법을 알려줍니다.',
		embedId: 'GH_JLA-fkBY',
		tags: [tags_src[0], tags_src[1]]
	},
	{
		id: 'video2',
		title: '여행을 할 때 생기는 지출을 줄이기',
		description: '런던 여행에서 생기는 지출의 종류에 대해 알려주고, 절약 방법을 알려줍니다.',
		embedId: 'C1mpC251-9w',
		tags: [tags_src[0], tags_src[1], tags_src[2]]
	},
	{
		id: 'video3',
		title: '절약에 대한 다양한 생각들',
		description: '절약에 대한 다양한 긍정적, 부정적 생각들을 정리해서 알려줍니다.',
		embedId: 'Q0uXGQu55GM',
		tags: [tags_src[0], tags_src[1]]
	},
	{
		id: 'video4',
		title: '빌 게이츠의 돈 관리',
		description: '세계 최고의 부자, 빌 게이츠가 알려주는 돈을 많이 버는 방법',
		embedId: 'p0pgrq-DXCY',
		tags: [tags_src[0], tags_src[1]]
	},
	{
		id: 'video5',
		title: '연애와 돈의 연관성',
		description: '연애와 돈의 연관성, 연애할 때 드는 돈에 대한 설명',
		embedId: 'JtoEoYEcKqY',
		tags: [tags_src[0], tags_src[4]]
	},
	{
		id: 'video6',
		title: 'Microsoft에서 조사한 생활에 쓰이는 돈',
		description: '생활할 때 쓰는 돈의 종류와 각각에 대한 정보들',
		embedId: 'F16IitKBjH8',
		tags: [tags_src[0], tags_src[1], tags_src[2], tags_src[3], tags_src[4], tags_src[5]]
	},
	{
		id: 'video7',
		title: '영상 제목 7',
		description: '학비에 도움이 될 수 있는 국가장학금을 신청할 수 있는 방법',
		embedId: 'D-Y7Q3fi5B4',
		tags: [tags_src[0], tags_src[5]]
	},
	{
		id: 'video8',
		title: '적은 돈으로 맛있게 먹기',
		description: '식비를 절약하기 위해 적은 돈으로 쉽게 만들어 먹을 수 있는 음식들 추천',
		embedId: '6C5S6-IOE-s',
		tags: [tags_src[0], tags_src[3]]
	},
	
];

function YouTubeEmbed({ videoId }) {
	const embedUrl = `https://www.youtube.com/embed/${videoId}`;
	return (
		<iframe 
			width="100%"
			height="315"
			src={embedUrl}
			frameBorder="0"
			allowFullScreen
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
			
		</iframe>
	);
}
  
  
  // 영상 아이템 컴포넌트
function VideoItem({ video }) {
	return (
	  <Grid container spacing={2}>
		<Grid item xs={12} md={6}>
		  <YouTubeEmbed videoId={video.embedId} />
		</Grid>
		<Grid item xs={12} md={6}>
		  <h3>{video.title}</h3>
		  <p>{video.description}</p>
		</Grid>
	  </Grid>
	);
}
  
  // 태그 선택 컴포넌트
function TagSelector({ tags, onSelectTag }) {
	return (
	  <Select style={{ width: 200 }} onChange={onSelectTag} placeholder="태그 선택">
		{tags.map(tag => (
		  <Select.Option key={tag} value={tag}>{tag}</Select.Option>
		))}
	  </Select>
	);
}
  
  // 메인 페이지 컴포넌트
function VideoListPage() {
	const [selectedTag, setSelectedTag] = useState(null);

	const handleSelectTag = (tag) => {
		setSelectedTag(tag);
	};

	const filteredVideos = selectedTag
		? videos.filter(video => video.tags.includes(selectedTag))
		: videos;

	const uniqueTags = [...new Set(videos.flatMap(video => video.tags))];

	return (
		<div style={{ width: '100%' }}>
		<TagSelector tags={uniqueTags} onSelectTag={handleSelectTag} />
		{filteredVideos.map(video => (
			<VideoItem key={video.id} video={video} />
		))}
		</div>
	);
}

export default VideoListPage;