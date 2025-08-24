// Simple script to create placeholder icons
const fs = require('fs');

const svgContent = (size) => `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1976d2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="${size * 0.5}" font-weight="bold" font-family="Arial">H</text>
</svg>`;

[16, 48, 128].forEach(size => {
  fs.writeFileSync(`public/icon${size}.png`, Buffer.from(svgContent(size)));
});

console.log('Icons created successfully!');