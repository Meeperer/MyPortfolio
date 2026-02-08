import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom cursor elements + animation. Rendered once at layout level
 * so the cursor is visible on all routes (including /projects).
 */
export function CursorElements() {
  return (
    <>
      <div className="cursor-dot" />
      <div className="cursor-outline" />
    </>
  );
}

/**
 * Custom cursor animation logic. Re-queries hover targets when route changes.
 */
export function useCursor() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window) return;

    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot) return;

    const cursorPos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const outlinePos = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      cursorPos.x = e.clientX;
      cursorPos.y = e.clientY;
    };

    const hoverSelectors = 'a, button, .magnetic-btn, .project-card, .dock-item, .flowing-menu__link, .menu__item-link, .why-lagging-hint';
    let hoverElements = [];

    const handleEnter = () => {
      document.body.classList.add('cursor-hover');
    };
    const handleLeave = () => {
      document.body.classList.remove('cursor-hover');
    };

    const attachHoverListeners = () => {
      hoverElements = Array.from(document.querySelectorAll(hoverSelectors));
      hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    attachHoverListeners();

    let rafId;
    const animate = () => {
      dotPos.x += (cursorPos.x - dotPos.x) * 0.2;
      dotPos.y += (cursorPos.y - dotPos.y) * 0.2;
      outlinePos.x += (cursorPos.x - outlinePos.x) * 0.2;
      outlinePos.y += (cursorPos.y - outlinePos.y) * 0.2;

      dot.style.left = `${dotPos.x}px`;
      dot.style.top = `${dotPos.y}px`;
      if (outline) {
        outline.style.left = `${outlinePos.x}px`;
        outline.style.top = `${outlinePos.y}px`;
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove('cursor-hover');
    };
  }, [location.pathname]);
}
