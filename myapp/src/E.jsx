import React, { useState } from 'react';

const videos = [
  { id: 'KyAL64yDw_U', title: 'title_A', category: 'C1'},
  { id: 'EYB7NOSY-hI', title: 'title_B', category: 'C3'},
  { id: '3LILV0dK9ys', title: 'title_C', category: 'C1'},
  { id: 'XSbqwzDIPg8', title: 'title_D', category: 'C1'},
  { id: '3ajHeLHbRlY', title: 'title_E', category: 'C2'},
  { id: 'iEimdVXyLug', title: 'title_F', category: 'C2'},
  { id: 'MMGtUOdox2A', title: 'title_G', category: 'C2'},
  { id: 'C-DXAaSiGxA', title: 'title_H', category: 'C3'},
];

const YouTubeVideo = ({ videoId }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      width="560"
      height="315"
      src={videoSrc}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
};

const E = () => {
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All' ? videos : videos.filter(video => video.category === selectedCategory);
  
  return (
    /*
    <div>
      <h1>YouTube Video Example</h1>
      <YouTubeVideo videoId="3LILV0dK9ys" />
    </div>
    */
    <div>
    <button onClick={() => setSelectedCategory('All')}>All</button>
    <button onClick={() => setSelectedCategory('C1')}>Category 1</button>
    <button onClick={() => setSelectedCategory('C2')}>Category 2</button>
    <button onClick={() => setSelectedCategory('C3')}>Category 2</button>
    
      <div>
        {filteredVideos.map(video => (
          <div key={video.id}>
            <h3>{video.title}</h3>
            <YouTubeVideo videoId={video.id} />
          </div>
        ))}
      </div>
    

    </div>
    

    
  );
};

export default E;