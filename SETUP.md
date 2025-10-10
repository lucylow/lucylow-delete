# Setup Guide - Lucy Low Portfolio

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** version 16 or higher
- **npm** (comes with Node.js) or **yarn**

Check your versions:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

If you encounter any errors, try:
```bash
npm install --legacy-peer-deps
```

Or clear the cache first:
```bash
npm cache clean --force
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 3. Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## Troubleshooting Common Issues

### Issue: "Cannot find module" errors

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 is already in use

**Solution:**
Edit `vite.config.js` and change the port:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000, // Change to any available port
  },
});
```

### Issue: Tailwind styles not loading

**Solution:**
1. Make sure `src/index.css` has the Tailwind imports at the top
2. Restart the dev server
3. Clear browser cache

### Issue: Icons not showing

**Solution:**
Make sure `lucide-react` is installed:
```bash
npm install lucide-react
```

### Issue: Hot reload not working

**Solution:**
1. Stop the server (Ctrl+C)
2. Delete `.vite` folder if it exists
3. Restart with `npm run dev`

## Lovable.dev Import

To import this project into Lovable:

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Lovable:**
   - Go to [Lovable.dev](https://lovable.dev)
   - Click "Import Project"
   - Connect your GitHub repository
   - Lovable will automatically detect the Vite + React + Tailwind setup

## Project Structure

```
lucylow-portfolio/
├── src/
│   ├── components/       # React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── BackToTop.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind + global styles
├── index.html           # HTML entry point
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── .eslintrc.cjs       # ESLint configuration
```

## Customization Guide

### Changing Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
      accent: '#YOUR_COLOR',
    }
  }
}
```

### Adding New Components

1. Create a new file in `src/components/`
2. Import it in `src/App.jsx`
3. Add it to the component tree

### Modifying Mock Data

- **Projects**: Edit the `projects` array in `src/components/Projects.jsx`
- **Skills**: Edit the `skills` array in `src/components/About.jsx`
- **Contact Info**: Edit the `contactInfo` array in `src/components/Contact.jsx`

## Deployment

### Deploy to Netlify

1. Push to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy site"

### Deploy to Vercel

1. Push to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will auto-detect the settings
6. Click "Deploy"

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Add to `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/YOUR_REPO_NAME/',
     // ... rest of config
   });
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Need Help?

- Check [Vite Documentation](https://vitejs.dev)
- Check [React Documentation](https://react.dev)
- Check [Tailwind CSS Documentation](https://tailwindcss.com)
- Check [Lovable Documentation](https://docs.lovable.dev)

## License

This project is open source and free to use.

