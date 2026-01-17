import { create } from 'zustand'

export const useVideoStore = create((set) => ({
  activeVideoId: 1, // Start with first video active
  visitedVideos: [1], // Track which videos have been visited
  setActiveVideo: (id) => set((state) => ({
    activeVideoId: id,
    visitedVideos: state.visitedVideos.includes(id) 
      ? state.visitedVideos 
      : [...state.visitedVideos, id]
  })),
  clearActiveVideo: () => set({ activeVideoId: 1, visitedVideos: [1] }),
}))

