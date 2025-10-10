import React, { useEffect, useState } from 'react';

/*
Props:
- containerRef (optional)
- elementsRef: { id -> elementRef }
- attentionData: optional map id -> confidence (0..1)

This component reads element bounding boxes and render semi-transparent overlays
*/

export default function AttentionHeatmap({ elementsRef = { current: {} }, attentionData = {} }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const update = () => {
      const arr = [];
      for (const id in elementsRef.current) {
        try {
          const el = elementsRef.current[id];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const rootRect = el.ownerDocument.documentElement.getBoundingClientRect();
          // relative to viewport (device canvas is within its own container)
          arr.push({ 
            id, 
            left: rect.left, 
            top: rect.top, 
            w: rect.width, 
            h: rect.height, 
            conf: attentionData[id] ?? Math.random() * 0.4 + 0.3 
          });
        } catch (e) {
          // Element might not be available yet
        }
      }
      setBoxes(arr);
    };

    update();
    const t = setInterval(update, 600);
    return () => clearInterval(t);
  }, [elementsRef, attentionData]);

  return (
    <div style={{ position:'absolute', inset: 0, pointerEvents:'none' }}>
      {boxes.map(b => {
        const opacity = Math.min(0.75, b.conf + 0.05);
        const color = `rgba(0,227,255,${opacity})`;
        return (
          <div 
            key={b.id} 
            style={{ 
              position:'absolute', 
              left: b.left, 
              top: b.top, 
              width: b.w, 
              height: b.h, 
              borderRadius: 8, 
              boxShadow: `0 8px 30px ${color}`, 
              border: `2px solid rgba(0,227,255,${opacity})`, 
              mixBlendMode: 'screen',
              animation: `pulse 2s ease-in-out infinite ${Math.random() * 2}s`
            }} 
          />
        );
      })}
    </div>
  );
}
