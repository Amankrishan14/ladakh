import { useState, useEffect } from 'react'
import ArVideoFrame from './ui/ArVideoFrame'
import FloatingCTA from './ui/FloatingCTA'
import SwipeIndicator from './ui/SwipeIndicator'
import './ui/styles.css'
import './ui/frame-wrapper.css'

// Configure the "Know More" button URL here
const KNOW_MORE_URL = 'https://example.com' // Change this to your website URL

export default function Scene() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Track when video is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* DOM-based UI Overlay */}
      <div 
        className="ar-ui-layer"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          pointerEvents: "none",
          overflow: "visible"
        }}
      >
        {/* Frame Wrapper - contains canvas, indicator, and learn button */}
        <div className="frame-wrapper">
          {/* Canvas Holder - contains the video card */}
          <div className="canvas-holder">
            <ArVideoFrame />
          </div>

          {/* Swipe Indicator - dots above CTA */}
          <div className="swipe-indicator-wrapper">
            <SwipeIndicator />
          </div>

          {/* Learn More Button */}
          <FloatingCTA 
            url={KNOW_MORE_URL}
            text="Learn More"
            videoLoaded={videoLoaded}
          />
        </div>
      </div>
    </>
  )
}

