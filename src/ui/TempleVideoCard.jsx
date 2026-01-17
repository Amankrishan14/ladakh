import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

export default function TempleVideoCard({ videoSrc, templeName, onVideoPlaying }) {
  const videoRef = useRef(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const previousVideoRef = useRef(null)

  // Enable audio on user interaction
  useEffect(() => {
    if (audioEnabled) return

    const videoEl = videoRef.current
    if (!videoEl) return

    const enableAudioOnReady = async () => {
      if (videoEl.readyState >= 3 && videoEl.paused === false) {
        try {
          videoEl.muted = false
          videoEl.volume = 1.0
          setAudioEnabled(true)
        } catch (err) {
          const enableOnInteraction = async () => {
            try {
              if (videoEl) {
                videoEl.muted = false
                videoEl.volume = 1.0
                await videoEl.play()
                setAudioEnabled(true)
              }
            } catch (e) {
              // Still blocked
            }
          }
          const events = ['touchstart', 'touchend', 'mousedown', 'click']
          events.forEach(event => {
            document.addEventListener(event, enableOnInteraction, { once: true, passive: true })
          })
        }
      }
    }

    if (videoEl.readyState >= 3 && !videoEl.paused) {
      enableAudioOnReady()
    } else {
      const handlePlaying = () => {
        enableAudioOnReady()
      }
      videoEl.addEventListener('playing', handlePlaying, { once: true })
      return () => {
        videoEl.removeEventListener('playing', handlePlaying)
      }
    }
  }, [audioEnabled])

  // Update video source when videoSrc changes
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return

    const videoEl = videoRef.current
    
    if (videoEl.src && videoEl.src !== videoSrc) {
      previousVideoRef.current = videoEl.src
    }

    setVideoReady(false)
    
    // Smooth transition: maintain visibility during switch
    if (videoEl.src && videoEl.src !== videoSrc) {
      videoEl.style.opacity = '0.95'
      videoEl.style.transition = 'opacity 0.2s ease-out'
    }
    
    // OPTIMIZED: Set source and preload strategy for smooth rendering
    videoEl.src = videoSrc
    videoEl.preload = 'auto' // Use auto for active video
    videoEl.muted = !audioEnabled
    // Browser handles loading efficiently with preload="auto"
    
    // Add error handling for video loading failures
    const handleError = (e) => {
      console.error('Video loading error:', e, 'Video source:', videoSrc)
      setVideoReady(true) // Set to true to hide loader even on error
      // Video element will show its default error state
    }
    
    videoEl.addEventListener('error', handleError, { once: true })
    
    const playVideo = () => {
      // Use readyState >= 2 (canplay) instead of >= 3 (canplaythrough) for faster initial display
      // This allows video to start playing with partial buffering for smooth rendering
      if (videoEl.readyState >= 2) {
        requestAnimationFrame(() => {
          videoEl.style.opacity = '1'
          videoEl.style.transition = 'opacity 0.3s ease-in'
        })
        setVideoReady(true)
        
        const playPromise = videoEl.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (!audioEnabled) {
                try {
                  videoEl.muted = false
                  videoEl.volume = 1.0
                  setAudioEnabled(true)
                } catch (err) {
                  videoEl.muted = true
                }
              } else {
                videoEl.muted = false
              }
              if (onVideoPlaying) onVideoPlaying()
            })
            .catch(() => {
              videoEl.muted = true
              videoEl.play().then(() => {
                if (onVideoPlaying) onVideoPlaying()
              }).catch(err => {
                console.warn('Video play failed:', err)
              })
            })
        }
      }
    }

    // OPTIMIZED: Use canplay instead of canplaythrough for faster initial display
    // readyState >= 2 means enough data loaded to start playing
    if (videoEl.readyState >= 2) {
      playVideo()
    } else {
      const handleReady = () => {
        if (videoEl.readyState >= 2) {
          playVideo()
        }
      }
      
      // Listen to multiple events for fastest possible start
      videoEl.addEventListener('canplay', handleReady, { once: true })
      videoEl.addEventListener('loadeddata', handleReady, { once: true })
      videoEl.addEventListener('loadstart', () => {
        // Try to play as soon as loading starts if readyState allows
        if (videoEl.readyState >= 1) {
          handleReady()
        }
      }, { once: true })
      
      // Add timeout fallback to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn('Video loading timeout, attempting to play anyway')
        if (videoEl.readyState >= 1) {
          setVideoReady(true)
          videoEl.play().catch(err => {
            console.error('Video play after timeout failed:', err)
          })
        }
      }, 10000) // 10 second timeout
      
      // Cleanup timeout when video loads
      const cleanupTimeout = () => {
        clearTimeout(timeoutId)
        videoEl.removeEventListener('canplay', cleanupTimeout)
        videoEl.removeEventListener('loadeddata', cleanupTimeout)
      }
      videoEl.addEventListener('canplay', cleanupTimeout, { once: true })
      videoEl.addEventListener('loadeddata', cleanupTimeout, { once: true })
    }
    
    return () => {
      // Cleanup error listener on unmount or source change
      videoEl.removeEventListener('error', handleError)
    }
  }, [videoSrc, audioEnabled, onVideoPlaying])

  return (
    <div className="temple-video-card">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="temple-video-player"
          autoPlay
          loop
          muted={!audioEnabled}
          playsInline
          preload="metadata"
          volume={1}
        />
        
        {!videoReady && (
          <div className="video-loader">
            <div className="spinner"></div>
            <div className="loader-text">Loading Experience...</div>
          </div>
        )}
        
      </div>

      <style>{`
        .temple-video-card {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .video-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .temple-video-player {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .video-loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loader-text {
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          opacity: 0.9;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

TempleVideoCard.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  templeName: PropTypes.string.isRequired,
  onVideoPlaying: PropTypes.func
}

