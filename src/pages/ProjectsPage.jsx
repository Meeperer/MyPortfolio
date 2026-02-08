import React from 'react';
import { Link } from 'react-router-dom';
import Dither from '../components/Dither';
import FlowingMenu from '../components/FlowingMenu';
import { DefaultDock } from '../components/Dock';
import { projectsForMenu } from '../data/projects';

export default function ProjectsPage() {
  return (
    <>
      <div className="grain-overlay" />
      <div className="site-dither-wrapper" aria-hidden="true">
        <Dither
          waveColor={[0.8, 0.7, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.1}
          colorNum={40}
          waveAmplitude={0.32}
          waveFrequency={1.9}
          waveSpeed={0.05}
        />
      </div>

      <div className="projects-page">
        <Link to="/" className="projects-page-back magnetic-btn">
          <span className="projects-page-back-icon">←</span>
          <span className="projects-page-back-label">Back</span>
        </Link>
        <div className="projects-page-center">
          <FlowingMenu
            items={projectsForMenu}
            speed={18}
          />
        </div>
      </div>

      <DefaultDock />
    </>
  );
}
