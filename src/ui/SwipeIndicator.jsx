import { useVideoStore } from '../store'

// Video configuration (must match ArVideoFrame.jsx)
const videoConfigs = [
  { 
    id: 1, 
    videoSrc: '/videos/1.mp4',
    templeName: 'Video'
  }
]

export default function SwipeIndicator() {
  const { activeVideoId, visitedVideos } = useVideoStore()
  const totalVideos = videoConfigs.length
  
  // Current video index (1-based IDs, so subtract 1 for index)
  const currentIndex = activeVideoId - 1
  const isFirstVideo = currentIndex === 0
  const isLastVideo = currentIndex === totalVideos - 1
  
  // Check if a video has been visited
  const isVisited = (videoId) => visitedVideos.includes(videoId)
  
  return (
    <div className="swipe-indicator">
      {/* Left Arrow */}
      <span 
        className="swipe-arrow swipe-arrow-left"
        style={{ opacity: isFirstVideo ? 0.3 : 1 }}
      >
        ←
      </span>
      
      {/* Dots - dynamically generated based on video count */}
      <div className="swipe-dots">
        {videoConfigs.map((config, index) => {
          const videoId = config.id
          const isCurrent = videoId === activeVideoId
          const filled = isVisited(videoId)
          
          return (
            <span
              key={videoId}
              className={`swipe-dot ${filled ? 'filled' : ''} ${isCurrent ? 'current' : ''}`}
            />
          )
        })}
      </div>
      
      {/* Right Arrow */}
      <span 
        className="swipe-arrow swipe-arrow-right"
        style={{ opacity: isLastVideo ? 0.3 : 1 }}
      >
        →
      </span>
      
      <style>{`
        .swipe-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          pointer-events: none;
          user-select: none;
        }
        
        .swipe-arrow {
          color: white;
          font-size: 15px;
          line-height: 1;
          transition: opacity 150ms linear;
        }
        
        .swipe-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .swipe-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: white;
          opacity: 0.6;
          transition: all 200ms ease-out;
          display: block;
        }
        
        .swipe-dot.filled {
          opacity: 1;
        }
        
        .swipe-dot.current {
          transform: scale(1.2);
          opacity: 1;
        }
        
        /* Mobile adjustments */
        @media (max-width: 480px) {
          .swipe-indicator {
            gap: 10px;
          }
          
          .swipe-arrow {
            font-size: 14px;
          }
          
          .swipe-dot {
            width: 6px;
            height: 6px;
          }
          
          .swipe-dots {
            gap: 5px;
          }
        }
      `}</style>
    </div>
  )
}

