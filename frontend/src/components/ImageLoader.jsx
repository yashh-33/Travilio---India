import React, { useState } from 'react';

export default function ImageLoader({ src, alt, className, style, photographer, source }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Styling for the shimmering skeleton loader
  const skeletonStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-glow) 50%, var(--bg-tertiary) 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
    borderRadius: 'inherit',
    zIndex: 1
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    ...style
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
    transition: 'opacity 0.4s ease-in-out',
    opacity: loaded ? 1 : 0
  };

  // Fallback image if Unsplash fails or URL is broken
  const fallbackSrc = 'https://images.unsplash.com/photo-1477584322902-471a53b474b7?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="image-loader-container" style={containerStyle}>
      {/* Shimmering Skeleton Loader */}
      {!loaded && !error && <div style={skeletonStyle} className="shimmer-block" />}
      
      {/* Real Image */}
      <img
        src={error ? fallbackSrc : src}
        alt={alt || "Real travel photograph"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        style={imgStyle}
        className={className}
      />

      {/* Photographer Hover Credit Badge */}
      {loaded && photographer && (
        <div 
          className="photographer-credit-badge"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            color: 'rgba(255, 255, 255, 0.9)',
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '0.65rem',
            fontFamily: 'var(--font-sans)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          📷 {photographer} / {source || "Unsplash"}
        </div>
      )}

      {/* Add custom CSS shimmer keyframe to document dynamically if not already present */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .image-loader-container:hover .photographer-credit-badge {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
