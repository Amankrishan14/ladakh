# Testing Checklist - Performance Optimizations

## Quick Testing Guide

Use this checklist to verify the performance optimizations are working correctly.

---

## ✅ Pre-Testing Setup

### 1. Clean Build
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Build the project
npm run build

# Preview production build
npm run preview
```

### 2. Open DevTools
- **Chrome**: F12 or Cmd+Option+I (Mac) / Ctrl+Shift+I (Windows)
- Enable: **Network**, **Console**, **Performance** tabs

---

## ✅ Visual Testing

### Test 1: Initial Load Experience
**Expected Result**: Smooth loading with progress bar

- [ ] Click "anywhere to start" button
- [ ] Progress bar appears and animates smoothly
- [ ] Progress percentage shows (0% → 100%)
- [ ] Loading messages update:
  - "Click anywhere to start"
  - "Initializing AR Experience..."
- [ ] NO frame drops or stuttering
- [ ] Camera feed appears within 1-2 seconds

**Pass Criteria**: 
- Loading completes in < 3 seconds on good connection
- Progress bar reaches 100% before AR appears
- No visible stuttering

---

### Test 2: Video Loading
**Expected Result**: First video loads quickly, swipe is smooth

- [ ] First video (Bhavishya Badri) appears immediately
- [ ] Video plays without buffering
- [ ] "Loading Experience..." spinner brief or not visible
- [ ] Swipe to next video is smooth
- [ ] Adjacent videos load without delay
- [ ] No blank frames during swipe

**Pass Criteria**:
- First video shows within 500ms
- Smooth transitions between videos
- No loading spinners after initial load

---

### Test 3: Performance Monitoring
**Expected Result**: Console shows performance metrics

**Steps**:
1. Open Console tab
2. Reload page
3. Click to start AR
4. Wait for initialization

**Look for**:
```
⚡ Performance Metrics
camera-permission-time: XXXms
camera-play-time: XXXms
total-camera-init-time: XXXms
total-app-load-time: XXXms
```

- [ ] Metrics appear in console
- [ ] `total-app-load-time` < 3000ms (3 seconds)
- [ ] `camera-permission-time` < 2000ms
- [ ] All metrics shown in green or orange (not red)

**Pass Criteria**:
- Total load time under 3 seconds
- Metrics logged successfully

---

## ✅ Network Testing

### Test 4: Network Tab Analysis
**Expected Result**: Progressive video loading

**Steps**:
1. Open Network tab
2. Filter: "media" or ".mp4"
3. Reload page and start AR

**Check**:
- [ ] First video (`Bhavishya Badri.mp4`) starts loading immediately
- [ ] Other videos load progressively (not all at once)
- [ ] Only 1-3 videos loading at the same time
- [ ] Remaining videos load after delay

**Pass Criteria**:
- First video loads first
- Not all 6 videos loading simultaneously
- Staggered loading pattern visible

---

### Test 5: Throttled Network
**Expected Result**: App still works on slow connections

**Steps**:
1. Network tab → Throttling → "Slow 3G"
2. Reload page
3. Test AR initialization

**Check**:
- [ ] App loads (may take longer)
- [ ] Progress bar works
- [ ] First video eventually loads
- [ ] App doesn't freeze or crash
- [ ] Error messages clear if issues occur

**Pass Criteria**:
- No crashes
- Clear loading feedback
- Eventually functional

---

### Test 6: Resource Preloading
**Expected Result**: First video preloaded via HTML hint

**Steps**:
1. Network tab
2. Reload page (before clicking to start)
3. Check for early video request

**Check**:
- [ ] `Bhavishya Badri.mp4` appears in network tab
- [ ] Request made early (within first few requests)
- [ ] Marked as "preload" or high priority

**Pass Criteria**:
- Video preload hint working
- First video downloading before AR starts

---

## ✅ Performance Profiling

### Test 7: Chrome Performance Profile
**Expected Result**: No long tasks during load

**Steps**:
1. Performance tab → Record
2. Reload page
3. Click to start AR
4. Wait until loaded
5. Stop recording

**Check**:
- [ ] No red bars in main thread (long tasks > 50ms)
- [ ] Camera initialization clearly visible
- [ ] Video loading doesn't block main thread
- [ ] Frame rate stays around 60fps

**Pass Criteria**:
- No long tasks > 100ms
- Smooth main thread activity
- Consistent frame rate

---

### Test 8: Memory Usage
**Expected Result**: Reasonable memory consumption

**Steps**:
1. Performance Monitor (Cmd+Shift+P → "Show Performance Monitor")
2. Observe during initialization

**Check**:
- [ ] Memory doesn't spike dramatically
- [ ] Gradual memory increase (not sudden)
- [ ] Memory stabilizes after load

**Pass Criteria**:
- No memory leaks
- Reasonable memory usage (< 200MB)

---

## ✅ Mobile Device Testing

### Test 9: Mobile Device (if available)
**Expected Result**: Works smoothly on mobile

**Devices to Test**:
- iOS (iPhone)
- Android

**Check**:
- [ ] Loading screen works
- [ ] Progress bar visible and smooth
- [ ] Camera permission request works
- [ ] First video loads quickly
- [ ] Swipe gestures work smoothly
- [ ] No lag or stuttering

**Pass Criteria**:
- Smooth on real devices
- Good perceived performance
- Touch interactions responsive

---

## ✅ Regression Testing

### Test 10: Existing Features Still Work
**Expected Result**: All features functional

- [ ] Camera background displays correctly
- [ ] Video swipe left/right works
- [ ] Video names display correctly
- [ ] "Learn More" button works
- [ ] All 6 videos accessible
- [ ] Audio toggles on interaction
- [ ] AR frame sizing correct
- [ ] No console errors

**Pass Criteria**:
- All features working
- No broken functionality
- No new console errors

---

## ✅ Edge Cases

### Test 11: Denied Camera Permission
**Expected Result**: Clear error message

**Steps**:
1. Block camera permission
2. Reload and try to start

**Check**:
- [ ] Clear error message shown
- [ ] "Reload Page" button appears
- [ ] No crashes or blank screen

**Pass Criteria**:
- Graceful error handling
- User knows what to do

---

### Test 12: No Camera Available
**Expected Result**: Clear error message

**Steps**:
1. Test on device without camera (if possible)

**Check**:
- [ ] Appropriate error message
- [ ] App doesn't crash

**Pass Criteria**:
- Graceful degradation

---

## 📊 Performance Benchmarks

### Target Metrics (Good Connection):
- **Initial Page Load**: < 1 second
- **Camera Permission**: < 2 seconds
- **First Video Display**: < 500ms after camera
- **Total Time to Interactive**: < 3 seconds
- **Video Swap Time**: < 200ms
- **Frame Rate**: 60fps (no drops)

### Target Metrics (Slow 3G):
- **Initial Page Load**: < 5 seconds
- **Camera Permission**: < 5 seconds
- **First Video Display**: < 2 seconds after camera
- **Total Time to Interactive**: < 10 seconds
- **Frame Rate**: 30fps minimum

---

## 🐛 Known Issues to Watch For

### Issue 1: Loading Stuck at XX%
**Symptom**: Progress bar stops
**Check**: Console for errors, network tab for failed requests
**Solution**: Check camera permissions, refresh page

### Issue 2: Videos Don't Load
**Symptom**: Blank video frames
**Check**: Network tab, console errors
**Solution**: Check video file paths, ensure videos exist

### Issue 3: Performance Still Poor
**Symptom**: Slow loading, frame drops
**Check**: Network speed, video file sizes, console metrics
**Solution**: Review Performance Optimizations doc

---

## 📝 Reporting Issues

If you find issues during testing, document:
1. **Browser & Version**: (e.g., Chrome 120)
2. **Device**: (e.g., iPhone 13, Desktop)
3. **Network**: (e.g., 4G, WiFi, Slow 3G)
4. **Steps to Reproduce**: Clear steps
5. **Console Logs**: Copy any errors
6. **Performance Metrics**: Copy from console
7. **Network Tab Screenshot**: If relevant

---

## ✅ Final Verification

All tests passing?
- [ ] Visual tests (1-3) ✓
- [ ] Network tests (4-6) ✓
- [ ] Performance tests (7-8) ✓
- [ ] Mobile test (9) ✓
- [ ] Regression test (10) ✓
- [ ] Edge cases (11-12) ✓

**If all checked**: ✅ Optimizations working correctly!

**If some failed**: 📋 Review PERFORMANCE_OPTIMIZATIONS.md for troubleshooting

---

## 🚀 Production Deployment Checklist

Before deploying to production:
- [ ] All tests passing
- [ ] Performance metrics logged and reviewed
- [ ] Tested on multiple devices
- [ ] Tested on slow networks
- [ ] No console errors
- [ ] Error handling working
- [ ] Video files optimized
- [ ] Build size acceptable
- [ ] Analytics tracking added (optional)

---

**Last Updated**: December 2025
**Status**: Ready for Testing

