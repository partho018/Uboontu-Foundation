'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '@/image - 2026-07-14T145854.043.webp';
import image2 from '@/image - 2026-07-14T145920.440.webp';

export default function AwardsCarousel() {
  const images = [image1, image2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Auto-play feature
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000); // changes every 5 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="awards-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="awards-carousel-inner">
        {images.map((img, index) => (
          <div 
            key={index} 
            className={`awards-slide ${index === currentIndex ? 'active' : ''}`}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transform: `scale(${index === currentIndex ? 1 : 0.98})`,
            }}
          >
            <img 
              src={img.src || img} 
              alt={`Award Ceremony ${index + 1}`} 
              className="awards-carousel-image"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide} 
        className="carousel-control-btn prev"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide} 
        className="carousel-control-btn next"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Dots / Indicators */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
