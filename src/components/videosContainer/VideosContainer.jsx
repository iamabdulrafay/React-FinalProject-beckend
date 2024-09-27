import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./VideosContainer.css";

const VideosContainer = () => {
  const { courseId, outlineId } = useParams();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://web-production-ddef.up.railway.app/api/course-outlines-videos/"
        );
        const outlineWithVideos = response.data.filter(
          (outline_video) => outline_video.course_outline === Number(outlineId)
        );

        if (outlineWithVideos.length > 0) {
          setVideos(outlineWithVideos);
          setSelectedVideo(outlineWithVideos[0]);
        } else {
          console.warn("No outlines found for the given outline ID");
        }
      } catch (error) {
        console.error("Error fetching course videos:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (courseId && outlineId) {
      fetchVideos();
    }
  }, [courseId, outlineId]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowFullContent(false);
  };

  const formatContent = (content, full = false) => {
    const lines = content.split("\n");
    const displayedLines = full ? lines : lines.slice(0, 2);

    return displayedLines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="videos-container">
      <div className="video-player">
        {loading ? (
          <p>Loading videos...</p>
        ) : selectedVideo ? (
          <div>
            <video key={selectedVideo.id} controls>
              <source src={selectedVideo.course_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <h2 className="selected-video">{selectedVideo.video_name}</h2>
            <p className="see-more">
              {formatContent(
                selectedVideo.course_video_description,
                showFullContent
              )}
              {!showFullContent && (
                <span
                  className="see-more"
                  onClick={() => setShowFullContent(true)}>
                  See more
                </span>
              )}
            </p>
          </div>
        ) : (
          <p>Select a video to play</p>
        )}
      </div>
      <div className="video-list">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="video-item"
              onClick={() => handleVideoClick(video)}>
              <div className="left">
                <video key={video.id} controls width="200" loading="lazy">
                  <source src={video.course_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="right">
                <h2>{video.video_name}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available for this course outline.</p>
        )}
      </div>
    </div>
  );
};

export default VideosContainer;
