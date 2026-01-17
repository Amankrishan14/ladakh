# Integration Instructions - Temple Video Swiper

## Quick Start (3 Options)

### Option 1: Replace Main App (Recommended for Testing)

Replace your entire app with the temple video swiper:

```jsx
// In src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import TempleVideoDemo from './TempleVideoDemo'
import './index.css'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <TempleVideoDemo />
  </React.StrictMode>
)
```

### Option 2: Add to Existing App

Add the swiper to your existing `App.jsx`:

```jsx
import { useState } from 'react'
import Scene from './Scene'
import TempleVideoSwiper from './components/TempleVideoSwiper'
// ... other imports

function App() {
  const [showTempleVideos, setShowTempleVideos] = useState(true)
  
  return (
    <div>
      {showTempleVideos ? (
        <TempleVideoSwiper />
      ) : (
        // Your existing Scene component
        <Scene />
      )}
      
      {/* Toggle button */}
      <button 
        onClick={() => setShowTempleVideos(!showTempleVideos)}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '2px solid white',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {showTempleVideos ? 'Show AR Scene' : 'Show Temple Videos'}
      </button>
    </div>
  )
}

export default App
```

### Option 3: Use Provided Demo Entry Point

Run with the pre-configured demo file:

```bash
# Update vite.config.js
# Change the main entry to: './src/main-temple-demo.jsx'

# Then run
npm run dev
```

## Testing Steps

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - The app should load at `http://localhost:5173` (or similar)

3. **Test interactions:**
   - ✅ Swipe left/right (mobile/touch)
   - ✅ Click and drag (desktop/mouse)
   - ✅ Click navigation arrows
   - ✅ Click dot indicators
   - ✅ Verify all 6 videos load and play
   - ✅ Check smooth animations
   - ✅ Test on different screen sizes

## Verify Video Paths

Make sure your video files are in the correct location:

```
public/
  videos/
    ✓ Bhavishya Badri.mp4
    ✓ Kalimath Temple.mp4
    ✓ Onkareshwar Temple Ukhimath.mp4
    ✓ Onkareshwar Temple.mp4
    ✓ Vishwanath Temple Guptakashi.mp4
    ✓ Yog dhyan mandir Pandukeshwar.mp4
```

## Component Files Created

### Main Component
- `src/components/TempleVideoSwiper.tsx` - The main swiper component

### Demo & Integration
- `src/TempleVideoDemo.jsx` - Demo usage example
- `src/main-temple-demo.jsx` - Alternative main entry point

### Documentation
- `TEMPLE_VIDEO_SWIPER_GUIDE.md` - Full usage guide
- `INTEGRATION_INSTRUCTIONS.md` - This file

## Removing Banner Components (Optional)

If you want to completely remove banner-related code from your project:

### Files to Delete (if not needed):
```bash
rm -rf src/components/ui/banner/
rm src/ui/GsrtcBanner.jsx
rm src/ui/SbmuUrbanBanner.jsx
rm src/ui/SbmUrbanBanner.jsx
rm src/ui/SbmuVideoCard.jsx
rm src/ui/sbmu-banner.css
rm src/ui/sbmu-video-card.css
rm -rf public/assets/banner/
```

### Files to Update:
1. `src/ui/ArVideoFrame.jsx` - Remove banner imports
2. `src/Scene.jsx` - Update if it imports banners

## Troubleshooting

### Issue: Videos not loading
**Solution:** 
- Check browser console for 404 errors
- Verify video files exist in `public/videos/`
- Check filenames match exactly (including spaces)

### Issue: TypeScript errors
**Solution:**
```bash
npm install --save-dev @types/react @types/react-dom typescript
```

### Issue: Swipe not smooth
**Solution:**
- Check GSAP is installed: `npm list gsap`
- If missing: `npm install gsap`

### Issue: Videos not playing on mobile
**Solution:**
- Videos must be muted for autoplay (already set)
- Add `playsInline` attribute (already set)
- Ensure mobile browser allows autoplay

## Browser Testing Checklist

- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Desktop
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Test in portrait mode
- [ ] Test in landscape mode
- [ ] Test swipe gestures
- [ ] Test click/drag
- [ ] Test navigation arrows
- [ ] Test dot indicators

## Performance Tips

1. **Video Optimization:**
   - Compress videos for web (H.264, MP4)
   - Keep file size under 10MB per video
   - Use appropriate resolution (720p or 1080p)

2. **Loading:**
   - Videos load on-demand
   - Autoplay is muted (required for modern browsers)
   - Loop is enabled for continuous playback

3. **Animation:**
   - GSAP uses hardware acceleration
   - Transforms are GPU-accelerated
   - Smooth 60fps on modern devices

## Next Steps

1. Test the component thoroughly
2. Customize colors/styling if needed
3. Add analytics tracking (optional)
4. Optimize video files for production
5. Deploy to production server

## Need Help?

- Check the main `TEMPLE_VIDEO_SWIPER_GUIDE.md` for detailed API docs
- Review the `TempleVideoDemo.jsx` for usage examples
- Check browser console for error messages

## Production Checklist

Before deploying:

- [ ] All videos load correctly
- [ ] Swipe works on touch devices
- [ ] Videos autoplay (muted)
- [ ] Navigation buttons work
- [ ] Dot indicators work
- [ ] Responsive on all screen sizes
- [ ] No console errors
- [ ] GSAP is included in build
- [ ] Video files are optimized
- [ ] Test on target browsers

## Deployment Notes

The component is production-ready and includes:
- ✅ TypeScript for type safety
- ✅ Proper error handling
- ✅ Responsive design
- ✅ Touch and mouse support
- ✅ Accessibility features (ARIA labels)
- ✅ Performance optimizations
- ✅ No external dependencies (uses existing GSAP)

Enjoy your temple video swiper! 🏛️✨

