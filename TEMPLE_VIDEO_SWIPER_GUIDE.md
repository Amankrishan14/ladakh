# Temple Video Swiper - Usage Guide

## Overview

`TempleVideoSwiper.tsx` is a fully functional, production-ready React component that displays 6 temple videos in a beautiful, swipeable carousel interface.

## Features

✅ **Horizontal Swipe/Slide** - Smooth touch and mouse swipe gestures
✅ **Snap to Center** - Each video snaps perfectly to center
✅ **GSAP Animations** - Buttery smooth transitions using GSAP
✅ **Autoplay Videos** - All videos autoplay, muted, and loop
✅ **Responsive Design** - Works on mobile, tablet, and desktop
✅ **Handles Spaces in Filenames** - Properly encodes video filenames with spaces
✅ **No Banner Logic** - Clean implementation without any banner components

## Video Files

The component automatically loads these 6 videos from `/public/videos/`:

1. `Bhavishya Badri.mp4`
2. `Kalimath Temple.mp4`
3. `Onkareshwar Temple Ukhimath.mp4`
4. `Onkareshwar Temple.mp4`
5. `Vishwanath Temple Guptakashi.mp4`
6. `Yog dhyan mandir Pandukeshwar.mp4`

## Installation

No additional packages needed! The component uses:
- `react` (already installed)
- `gsap` (already installed)

## Usage

### Basic Usage

```jsx
import TempleVideoSwiper from './components/TempleVideoSwiper'

function App() {
  return <TempleVideoSwiper />
}
```

### With Props

```jsx
import TempleVideoSwiper from './components/TempleVideoSwiper'

function App() {
  return (
    <TempleVideoSwiper 
      autoplay={true}      // Auto-play videos (default: true)
      showLabels={true}    // Show video labels (default: true)
    />
  )
}
```

### Full Page Example

```jsx
import TempleVideoSwiper from './components/TempleVideoSwiper'

export default function TempleVideosPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TempleVideoSwiper />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoplay` | `boolean` | `true` | Auto-play videos when they come into view |
| `showLabels` | `boolean` | `true` | Show video labels at the bottom of each video |

## Controls

### Touch/Mobile
- **Swipe Left** - Next video
- **Swipe Right** - Previous video
- **Tap Dot** - Jump to specific video

### Mouse/Desktop
- **Click & Drag** - Swipe to change videos
- **Click Arrows** - Navigate prev/next
- **Click Dots** - Jump to specific video

## File Structure

```
src/
  components/
    TempleVideoSwiper.tsx       ← Main component
  TempleVideoDemo.jsx            ← Demo usage example
public/
  videos/
    Bhavishya Badri.mp4
    Kalimath Temple.mp4
    Onkareshwar Temple Ukhimath.mp4
    Onkareshwar Temple.mp4
    Vishwanath Temple Guptakashi.mp4
    Yog dhyan mandir Pandukeshwar.mp4
```

## Customization

### Change Video List

To add/remove videos, edit the `templeVideos` array in `TempleVideoSwiper.tsx`:

```typescript
const templeVideos = [
  { id: 1, filename: 'Your Video.mp4', label: 'Your Video' },
  { id: 2, filename: 'Another Video.mp4', label: 'Another Video' },
  // Add more videos here
]
```

### Styling

All styles are embedded in the component. To customize:

1. Modify colors in the CSS section at the bottom of the component
2. Adjust dimensions (width, height, border-radius)
3. Change animation timings and easing functions

### Key Style Variables

```css
/* Background gradient */
background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);

/* Swiper dimensions */
width: 90%;
max-width: 600px;
height: 70vh;
max-height: 700px;

/* Border radius */
border-radius: 24px;

/* Animation duration */
duration: 0.6s;
ease: 'power2.out';
```

## How It Works

### Video Loading
Videos are loaded using `encodeURIComponent()` to properly handle spaces in filenames:

```typescript
src={`/videos/${encodeURIComponent(video.filename)}`}
```

### Swipe Detection
The component calculates swipe distance and triggers navigation when the user swipes more than 20% of the container width.

### Animation
GSAP handles all animations:
- Slide transitions
- Floating effect
- Scale and opacity changes
- Smooth snapping

## Testing

To test the component:

1. **In development mode:**
   ```bash
   npm run dev
   ```

2. **Navigate to the demo:**
   - Update `src/main.jsx` to import `TempleVideoDemo`
   - Or integrate into your existing routing

3. **Test interactions:**
   - Try swiping on mobile
   - Try click-dragging on desktop
   - Test navigation arrows
   - Test dot indicators

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android)

## Performance

The component is optimized for performance:
- Videos are lazy-loaded by the browser
- GSAP uses hardware-accelerated transforms
- Only the current video scales to 1, others scale to 0.95
- Smooth 60fps animations

## Troubleshooting

### Videos Not Loading
- Check that video files exist in `/public/videos/`
- Verify filenames match exactly (including spaces)
- Check browser console for 404 errors

### Swipe Not Working
- Ensure container has proper dimensions
- Check that `touch-action: pan-y` is set
- Verify GSAP is installed: `npm list gsap`

### TypeScript Errors
- Make sure `@types/react` is installed
- Run: `npm install --save-dev @types/react @types/react-dom`

## Migration Notes

### Removed Components
This component **replaces** all banner-related components:
- ❌ `BannerARLayout.jsx`
- ❌ `GsrtcBanner.jsx`
- ❌ `SbmuUrbanBanner.jsx`
- ❌ `SbmuVideoCard.jsx`
- ❌ All banner imports

### Clean Implementation
The component is completely standalone with:
- No banner dependencies
- No external state management (except internal useState)
- All styles embedded
- Self-contained logic

## License

Same as the parent project.

## Support

For issues or questions, refer to the main project README or create an issue in the repository.

