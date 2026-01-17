import { useEffect, useRef, useState } from 'react'
import { useVideoStore } from '../store'
import TempleVideoCard from './TempleVideoCard'

// Temple video configurations
const videoConfigs = [
  { 
    id: 1, 
    videoSrc: '/videos/1.mp4',
    templeName: 'Video'
  }
]

export default function ArVideoFrame({ onVideoPlaying }) {
  const { activeVideoId, setActiveVideo } = useVideoStore()
  const activeIndex = videoConfigs.findIndex(v => v.id === activeVideoId)
  const activeConfig = videoConfigs[activeIndex] || videoConfigs[0]
  const preloadedVideosRef = useRef(new Map())

  // OPTIMIZED: Simplified preloading for 2 videos - load both immediately but prioritize current
  useEffect(() => {
    const preloadVideo = (config, priority = 'auto') => {
      if (!preloadedVideosRef.current.has(config.id)) {
        const preloadVideo = document.createElement('video')
        preloadVideo.src = config.videoSrc
        preloadVideo.preload = priority
        preloadVideo.muted = true
        preloadVideo.playsInline = true
        // Don't call load() - browser handles it with preload attribute
        preloadedVideosRef.current.set(config.id, preloadVideo)
      }
    }

    // OPTIMIZED: With only 2 videos, preload both immediately but prioritize current
    const currentConfig = videoConfigs[activeIndex]
    const nextIndex = (activeIndex + 1) % videoConfigs.length
    const nextConfig = videoConfigs[nextIndex]

    // Preload current video immediately (high priority)
    if (currentConfig) {
      preloadVideo(currentConfig, 'auto')
    }

    // Preload next video immediately as well (we only have 2 videos total)
    // Use a small delay to not block initial render
    const nextVideoTimer = requestAnimationFrame(() => {
      if (nextConfig) {
        preloadVideo(nextConfig, 'auto')
      }
    })

    return () => {
      cancelAnimationFrame(nextVideoTimer)
    }
  }, [activeIndex])

  // With only 2 videos, both are already preloaded - no need for additional loading on change

  // Swipe functionality to switch between videos
  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0
    let isSwiping = false

    const goToNextVideo = () => {
      const currentActiveIndex = videoConfigs.findIndex(v => v.id === activeVideoId)
      if (currentActiveIndex < videoConfigs.length - 1) {
        const nextVideoId = videoConfigs[currentActiveIndex + 1].id
        setActiveVideo(nextVideoId)
      }
    }

    const goToPrevVideo = () => {
      const currentActiveIndex = videoConfigs.findIndex(v => v.id === activeVideoId)
      if (currentActiveIndex > 0) {
        const prevVideoId = videoConfigs[currentActiveIndex - 1].id
        setActiveVideo(prevVideoId)
      }
    }

    function handleStart(e) {
      isSwiping = true
      touchStartX = e.touches ? e.touches[0].clientX : e.clientX
      touchEndX = touchStartX
    }

    function handleMove(e) {
      if (!isSwiping) return
      touchEndX = e.touches ? e.touches[0].clientX : e.clientX
    }

    function handleEnd() {
      if (!isSwiping) return
      isSwiping = false

      const deltaX = touchEndX - touchStartX
      const threshold = 40

      if (Math.abs(deltaX) < threshold) {
        return
      }

      if (deltaX < 0) {
        goToNextVideo()
      } else {
        goToPrevVideo()
      }
    }

    // Touch events
    window.addEventListener("touchstart", handleStart, { passive: true })
    window.addEventListener("touchmove", handleMove, { passive: true })
    window.addEventListener("touchend", handleEnd, { passive: true })

    // Mouse events for laptop
    let mouseDown = false
    const handleMouseDown = (e) => {
      mouseDown = true
      handleStart(e)
    }

    const handleMouseMove = (e) => {
      if (mouseDown) {
        handleMove(e)
      }
    }

    const handleMouseUp = () => {
      if (mouseDown) {
        mouseDown = false
        handleEnd()
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener("touchstart", handleStart)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleEnd)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [activeVideoId, setActiveVideo])

  return (
    <TempleVideoCard 
      videoSrc={activeConfig.videoSrc}
      templeName={activeConfig.templeName}
      onVideoPlaying={onVideoPlaying}
    />
  )
}

