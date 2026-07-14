'use client';

import { useState } from 'react';

export default function ExpandableCard({ title, imageSrc, shortText, fullText }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="project-overview-card glass-panel">
      <div className="project-overview-img-wrap">
        <img src={imageSrc} alt={title} />
      </div>
      <div className="project-overview-info">
        <h3 className="project-overview-title">{title}</h3>
        <p className="project-overview-desc">
          {shortText}
          {fullText && isExpanded && <span className="fade-in">{fullText}</span>}
        </p>
        {fullText && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="project-more-btn"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show less' : 'More'}
          </button>
        )}
      </div>
    </div>
  );
}
