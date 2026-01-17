/**
 * Performance Monitoring Utility
 * Tracks loading times and helps identify bottlenecks
 */

class PerformanceMonitor {
  constructor() {
    this.marks = new Map()
    this.measures = new Map()
  }

  /**
   * Mark the start of a performance measurement
   * @param {string} name - Name of the mark
   */
  mark(name) {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name)
      this.marks.set(name, performance.now())
    } else {
      this.marks.set(name, Date.now())
    }
  }

  /**
   * Measure time between two marks
   * @param {string} name - Name of the measurement
   * @param {string} startMark - Start mark name
   * @param {string} endMark - End mark name (optional, uses current time if not provided)
   * @returns {number} Duration in milliseconds
   */
  measure(name, startMark, endMark) {
    if ('performance' in window && 'measure' in performance) {
      try {
        if (endMark) {
          performance.measure(name, startMark, endMark)
        } else {
          performance.measure(name, startMark)
        }
        
        const measures = performance.getEntriesByName(name, 'measure')
        if (measures.length > 0) {
          const duration = measures[measures.length - 1].duration
          this.measures.set(name, duration)
          return duration
        }
      } catch (err) {
        console.warn('Performance measurement failed:', err)
      }
    }
    
    // Fallback for browsers without Performance API
    const start = this.marks.get(startMark)
    const end = endMark ? this.marks.get(endMark) : (performance?.now() || Date.now())
    if (start && end) {
      const duration = end - start
      this.measures.set(name, duration)
      return duration
    }
    
    return 0
  }

  /**
   * Get all measurements
   * @returns {Object} Object with all measurements
   */
  getMeasurements() {
    return Object.fromEntries(this.measures)
  }

  /**
   * Log performance metrics to console
   */
  logMetrics() {
    console.group('⚡ Performance Metrics')
    this.measures.forEach((duration, name) => {
      const color = duration < 1000 ? 'green' : duration < 3000 ? 'orange' : 'red'
      console.log(`%c${name}: ${duration.toFixed(2)}ms`, `color: ${color}; font-weight: bold`)
    })
    console.groupEnd()
  }

  /**
   * Clear all marks and measures
   */
  clear() {
    if ('performance' in window) {
      performance.clearMarks()
      performance.clearMeasures()
    }
    this.marks.clear()
    this.measures.clear()
  }

  /**
   * Get navigation timing metrics
   * @returns {Object} Navigation timing data
   */
  getNavigationTiming() {
    if (!('performance' in window) || !performance.timing) {
      return {}
    }

    const timing = performance.timing
    return {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart,
      dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
      tcpConnectTime: timing.connectEnd - timing.connectStart,
      serverResponseTime: timing.responseEnd - timing.requestStart,
      domProcessingTime: timing.domComplete - timing.domLoading,
      resourceLoadTime: timing.loadEventEnd - timing.domContentLoadedEventEnd
    }
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor()

// Export for use in components
export default performanceMonitor

/**
 * React Hook for performance monitoring
 */
export function usePerformanceMonitor() {
  return {
    mark: (name) => performanceMonitor.mark(name),
    measure: (name, start, end) => performanceMonitor.measure(name, start, end),
    getMeasurements: () => performanceMonitor.getMeasurements(),
    logMetrics: () => performanceMonitor.logMetrics(),
    clear: () => performanceMonitor.clear()
  }
}

