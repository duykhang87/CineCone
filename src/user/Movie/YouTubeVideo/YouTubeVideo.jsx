import React from 'react';

function YouTubeVideo({ videoId }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-container">
      <iframe
        width="540" // Set the width of the video player
        height="315" // Set the height of the video player
        src={embedUrl}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    
      ></iframe>
    </div>
  );
}

export default YouTubeVideo;
