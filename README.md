# Lucy Low - Mobile Responsive Portfolio

A modern, fully responsive portfolio website built with **React**, **Tailwind CSS**, and **Vite**. This website is **Lovable-compatible** and adapts seamlessly to all screen sizes, from mobile phones to desktop computers.

## 🎯 Lovable Compatibility

This project is fully compatible with [Lovable.dev](https://lovable.dev):
- ✅ Built with **React 18** - Lovable's primary framework
- ✅ Styled with **Tailwind CSS** - Lovable's styling framework
- ✅ Uses **Vite** - Lovable's build tool
- ✅ Component-based architecture
- ✅ Modern ES6+ JavaScript
- ✅ Fully responsive design
- ✅ Ready for OpenAPI backend integration

## 🚀 Features

### Responsive Design
- **Mobile-First Approach**: Designed for mobile devices first, enhanced for larger screens
- **Fluid Layouts**: Uses CSS Grid and Flexbox via Tailwind utilities
- **Responsive Breakpoints**: Optimized for all screen sizes (sm, md, lg, xl)
- **Touch-Friendly**: Optimized for mobile interactions

### Interactive Components
- **Header**: Fixed navigation with hamburger menu for mobile
- **Hero**: Eye-catching introduction with gradient background
- **About**: Two-column layout with skills showcase
- **Projects**: Grid layout with hover effects and project cards
- **Contact**: Functional form with validation
- **Footer**: Multi-column footer with social links
- **Back to Top**: Smooth scroll button

### Modern Tech Stack
- ⚛️ React 18 with Hooks (useState, useEffect, useRef)
- 🎨 Tailwind CSS for styling
- ⚡ Vite for fast development and building
- 🎭 Lucide React for icons
- 📱 Fully responsive design
- ♿ Accessible navigation and forms

## 📂 Project Structure

```
├── index.html              # Main HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind customization
├── postcss.config.js       # PostCSS configuration
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main App component
│   ├── index.css          # Tailwind imports & global styles
│   └── components/
│       ├── Header.jsx     # Navigation header
│       ├── Hero.jsx       # Hero section
│       ├── About.jsx      # About section
│       ├── Projects.jsx   # Projects showcase
│       ├── Contact.jsx    # Contact form
│       ├── Footer.jsx     # Footer
│       └── BackToTop.jsx  # Scroll to top button
└── README.md              # Documentation
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open in browser**:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization

### Colors
Update Tailwind colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#6c63ff',
      secondary: '#4a44b5',
      accent: '#ff6584',
    }
  }
}
```

### Content
Edit mock data directly in the component files:
- **Hero**: Edit `src/components/Hero.jsx`
- **About**: Update skills array in `src/components/About.jsx`
- **Projects**: Modify projects array in `src/components/Projects.jsx`
- **Contact**: Update contact info in `src/components/Contact.jsx`

### Styling
All components use Tailwind utility classes. Modify classes directly in JSX:
```jsx
<div className="bg-primary text-white p-4 rounded-lg hover:bg-secondary">
  Content
</div>
```

## 📱 Responsive Breakpoints

Tailwind breakpoints used:
- **sm**: 640px (small devices)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)

## 🎓 Key React Features Used

### Hooks
- `useState` - Managing component state (menu, form, visibility)
- `useEffect` - Side effects (scroll listeners, intersection observers)
- `useRef` - DOM references for scroll animations

### Features
- Intersection Observer API for scroll animations
- Smooth scrolling navigation
- Form handling with controlled components
- Event listeners for interactivity
- Conditional rendering and styling

## 📝 Mock Data

All sections display **real mock data** to showcase the design:

### About Section
- Professional description
- 8 skill tags (HTML/CSS, JavaScript, React, etc.)
- Profile image

### Projects Section
- 3 complete project cards with:
  - Title and description
  - Technology tags
  - Project images
  - Demo and source code links

### Contact Section
- Email, phone, location info
- Social media links (GitHub, LinkedIn, Twitter, Dribbble)
- Functional contact form

## 🌟 Lovable Integration Tips

To use this project in Lovable:

1. **Import the project** directly into Lovable
2. **Connect a backend** using OpenAPI endpoints
3. **Add database integration** with Supabase (if needed)
4. **Deploy** directly from Lovable platform

All components are modular and easy to extend with additional features.

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
npm run build
# Deploy the 'dist' folder
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📧 Contact

For questions or customization requests, feel free to reach out!

## 📄 License

This project is open source and available for personal and commercial use.

---

**Built with ❤️ using React, Tailwind CSS, and Vite**
