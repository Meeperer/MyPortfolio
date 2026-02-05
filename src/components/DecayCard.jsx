import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './DecayCard.css';

const DecayCard = ({ width = 300, height = 400, image = 'https://picsum.photos/300/400?grayscale', hoverImage, children }) => {
  const cardRef = useRef(null);
  const svgRef = useRef(null);
  const displacementMapRef = useRef(null);
  const cursor = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const cachedCursor = useRef({ ...cursor.current });
  const winsize = useRef({ width: typeof window !== 'undefined' ? window.innerWidth : 800, height: typeof window !== 'undefined' ? window.innerHeight : 600 });
  const isHovered = useRef(false);
  
  // Responsive sizing
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);

    const handleResize = () => {
      winsize.current = { width: window.innerWidth, height: window.innerHeight };
    };

    const handleMouseMove = (ev) => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
      const el = cardRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const inside = ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom;
        isHovered.current = inside;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const imgValues = { imgTransforms: { x: 0, y: 0, rz: 0 }, displacementScale: 0 };

    const render = () => {
      const { width: ww, height: wh } = winsize.current;
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, ww, -80, 80), 0.12);
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, wh, -80, 80), 0.12);
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, ww, -8, 8), 0.12);
      const bound = 40;
      targetX = Math.max(-bound, Math.min(bound, targetX));
      targetY = Math.max(-bound, Math.min(bound, targetY));
      targetRz = Math.max(-8, Math.min(8, targetRz));
      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      const cursorTravelledDistance = distance(cachedCursor.current.x, cursor.current.x, cachedCursor.current.y, cursor.current.y);
      const movementScale = map(Math.min(cursorTravelledDistance, 120), 0, 120, 0, 90);
      const useHoverImage = hoverImage && isHovered.current;
      const hoverBaseScale = useHoverImage ? 0 : (isHovered.current ? 18 : 0);
      const targetScale = useHoverImage ? 0 : Math.max(hoverBaseScale, movementScale);
      imgValues.displacementScale = lerp(imgValues.displacementScale, targetScale, 0.08);

      const fe = displacementMapRef.current;
      if (fe && typeof fe.setAttribute === 'function') {
        fe.setAttribute('scale', String(Math.round(imgValues.displacementScale)));
      }

      cachedCursor.current = { x: cursor.current.x, y: cursor.current.y };
      requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoverImage]);

  // Use CSS for mobile sizing (100% width with aspect-ratio)
  const cardStyle = isMobile 
    ? { width: '100%', maxWidth: `${width}px`, aspectRatio: `${width}/${height}` }
    : { width: `${width}px`, height: `${height}px` };

  return (
    <div className="decay-card content" style={cardStyle} ref={(el) => { cardRef.current = el; svgRef.current = el; }}>
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="svg">
        <defs>
          <clipPath id="decayCardImageClip">
            <rect x="0" y="0" width="600" height="750" rx="20" ry="20" />
          </clipPath>
        </defs>
        <filter id="decayCardFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#decayCardFilter)"
            clipPath="url(#decayCardImageClip)"
            preserveAspectRatio="xMidYMid slice"
          />
          {hoverImage ? (
            <image
              href={hoverImage}
              x="0"
              y="0"
              width="600"
              height="750"
              clipPath="url(#decayCardImageClip)"
              preserveAspectRatio="xMidYMid slice"
              className="decay-card-hover-image"
            />
          ) : null}
          <rect
            x="0"
            y="0"
            width="600"
            height="750"
            rx="20"
            ry="20"
            fill="none"
            className="decay-card-image-border"
          />
        </g>
      </svg>
      {children ? (
        <div className="card-text-wrap">
          <div className="card-text">{children}</div>
        </div>
      ) : null}
    </div>
  );
};

export default DecayCard;
