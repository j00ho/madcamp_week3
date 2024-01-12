import React from 'react';

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
  return (
    <div>
      <h1>YouTube Video Example</h1>
      <YouTubeVideo videoId="3LILV0dK9ys" /> {/* 여기에 원하는 YouTube 비디오 ID를 넣습니다. */}
    </div>
  );
};

export default E;