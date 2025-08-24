# Text Highlighter - Chrome Extension

A Chrome extension that allows users to highlight text on any webpage and save highlights locally. Built with React, TypeScript, Material-UI, and Vite.

## Features

- 🖍️ **Text Selection & Highlighting**: Select any text on a webpage to see a "Save Highlight?" popup
- 💾 **Local Storage**: All highlights are saved locally using Chrome's storage API
- 📋 **Highlights Manager**: View all saved highlights in a beautiful popup interface
- 🗑️ **Delete Highlights**: Remove unwanted highlights with a single click
- 🔔 **Toast Notifications**: Get feedback when highlights are deleted using react-hot-toast
- ✨ **Visual Feedback**: Brief yellow flash animation when text is saved

## Tech Stack

- **React** with **TypeScript**
- **Material-UI (MUI)** for the popup interface
- **react-hot-toast** for notifications
- **Vite** for fast builds
- **Chrome Extension Manifest V3**

## Installation

### Prerequisites
- Node.js (v20+)
- npm or yarn
- Google Chrome browser

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd web-text-highlight
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `dist` folder from your project

## Usage

1. **Highlighting Text**:
   - Navigate to any webpage
   - Select the text you want to highlight
   - Click "Save Highlight?" in the popup that appears
   - The text will flash yellow briefly to confirm it's saved

2. **Viewing Highlights**:
   - Click the extension icon (H) in the Chrome toolbar
   - See all your saved highlights in a scrollable list
   - Each highlight shows:
     - The highlighted text
     - The source page title and URL
     - The timestamp when it was saved

3. **Deleting Highlights**:
   - Click the trash icon next to any highlight
   - A toast notification will confirm the deletion

## Project Structure

```
web-text-highlight/
├── public/
│   ├── manifest.json      # Chrome extension manifest
│   ├── content.js         # Content script for text selection
│   ├── content.css        # Styles for selection popup
│   ├── background.js      # Service worker for storage management
│   └── icon.svg          # Extension icon
├── src/
│   ├── App.tsx           # Main React component with MUI interface
│   ├── App.css           # App styles
│   ├── main.tsx          # React entry point
│   └── chrome.d.ts       # TypeScript definitions for Chrome API
├── dist/                 # Built extension files (generated)
└── package.json
```

## Development

To make changes to the extension:

1. Modify the source files
2. Run `npm run build` to rebuild
3. Go to `chrome://extensions/` and click the refresh icon on your extension
4. Test your changes

### Available Scripts

- `npm run dev` - Start Vite dev server (for testing React components)
- `npm run build` - Build the extension for production
- `npm run preview` - Preview the built app

## How It Works

1. **Content Script** (`content.js`): 
   - Injected into every webpage
   - Detects text selection
   - Shows the "Save Highlight?" popup
   - Sends highlight data to the background script

2. **Background Script** (`background.js`):
   - Manages Chrome storage
   - Handles save/delete/retrieve operations
   - Acts as a message broker between content script and popup

3. **Popup UI** (`App.tsx`):
   - React app with Material-UI components
   - Displays saved highlights
   - Handles user interactions

## Browser Permissions

The extension requires these permissions:
- `storage` - To save highlights locally
- `activeTab` - To interact with the current webpage

## License

MIT

## Contributing

Feel free to submit issues and pull requests!

## Future Enhancements

- [ ] Export highlights to various formats (CSV, JSON, TXT)
- [ ] Search and filter highlights
- [ ] Sync highlights across devices
- [ ] Categorize highlights with tags
- [ ] Add notes to highlights
- [ ] Highlight with different colors