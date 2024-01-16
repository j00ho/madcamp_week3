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
		title: '영상 제목 1',
		description: '영상 설명 1',
		embedId: 'KyAL64yDw_U',
		tags: [tags_src[0], tags_src[1], tags_src[2], tags_src[3]]
	},
	{
		id: 'video2',
		title: '영상 제목 2',
		description: '영상 설명 2',
		embedId: 'EYB7NOSY-hI',
		tags: [tags_src[0]]
	},
	{
		id: 'video3',
		title: '영상 제목 3',
		description: '영상 설명 3',
		embedId: '3LILV0dK9ys',
		tags: [tags_src[1]]
	},
	{
		id: 'video4',
		title: '영상 제목 4',
		description: '영상 설명 4',
		embedId: 'XSbqwzDIPg8',
		tags: [tags_src[2]]
	},
	{
		id: 'video5',
		title: '영상 제목 5',
		description: '영상 설명 5',
		embedId: '3ajHeLHbRlY',
		tags: [tags_src[3]]
	},
	{
		id: 'video6',
		title: '영상 제목 6',
		description: '영상 설명 6',
		embedId: 'iEimdVXyLug',
		tags: [tags_src[1], tags_src[2]]
	},
	{
		id: 'video7',
		title: '영상 제목 7',
		description: '영상 설명 7',
		embedId: 'MMGtUOdox2A',
		tags: [tags_src[0], tags_src[1], tags_src[2]]
	},
	{
		id: 'video8',
		title: '영상 제목 8',
		description: '영상 설명 8',
		embedId: 'C-DXAaSiGxA',
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
		<div>
		<TagSelector tags={uniqueTags} onSelectTag={handleSelectTag} />
		{filteredVideos.map(video => (
			<VideoItem key={video.id} video={video} />
		))}
		</div>
	);
}

export default VideoListPage;