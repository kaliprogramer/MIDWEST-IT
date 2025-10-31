import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // ✅ Fetch slides from Django API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/slidebar/');
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();
        setSlides(data);
        console.log('Slides loaded:', data);
      } catch (error) {
        console.error('Error fetching slides:', error);
        fetchSlides();
      }
    };
    fetchSlides();
  }, []);

  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // ✅ Auto slide every 5s
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // ✅ Navigation
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  // ✅ Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide(); // swipe left
    if (touchStartX.current - touchEndX.current < -50) prevSlide(); // swipe right
  };

  // ✅ Loading fallback
  if (slides.length === 0) {
    return (
      <div className="w-full h-80 flex justify-center items-center text-gray-400">
        Loading slider...
      </div>
    );
  }

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-80 md:h-96 lg:h-[500px] mb-8 rounded-xl overflow-hidden shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white max-w-md">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 glow">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl mb-6 text-gray-200">
              {slide.subtitle}
            </p>
            {slide.buttonText && (
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                {slide.buttonText}
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
