import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

// --- CSS ---
const EMBEDDED_CSS = `
.cascade-slider_container {
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  z-index: 20;
  user-select: none;
  touch-action: pan-y;
  
 
}

.cascade-slider_slides {
  margin-top: 13%;
  position: relative;
  width: 100%;
  height: 100%;
}

.cascade-slider_item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.3);
  transition: all 0.8s ease;
  opacity: 0;
}

/* Bigger slides */
.cascade-slider_item.next {
  transform: translate(-130%, -50%) scale(0.75);
  opacity: 1;   
  z-index:2;
}

.cascade-slider_item.prev {
  transform: translate(30%, -50%) scale(0.75);
  opacity: 1;
  z-index:2;
}

.cascade-slider_item.now {
  transform: translate(-50%, -50%) scale(1.1);
  opacity: 1;
  z-index:3;
}

/* arrows */
.cascade-slider_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  color: white;
}

.cascade-slider_arrow-left { left: -4%; }
.cascade-slider_arrow-right { right: -4%; }

/* Bigger images */
.cascade-slider_slides img {
  max-width: 520px;
  height: 320px;
  object-fit: cover;
  border-radius: 24px;
}

@media (max-width: 768px) {
  .cascade-slider_slides img {
    width: 320px;
  }

  .cascade-slider_item.next,
  .cascade-slider_item.prev {
    display: none;
  }
}
`;

const getSlideClasses = (index, activeIndex, total) => {
  const diff = index - activeIndex;
  if (diff === 0) return "now";
  if (diff === 1 || diff === -total + 1) return "next";
  if (diff === -1 || diff === total - 1) return "prev";
  return "";
};

export default function ThreeDImageCarousel({
  slides,
  autoplay = false,
  delay = 3,
  pauseOnHover = true,
  className = ""
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const total = slides.length;

  const navigate = useCallback(
    (dir) => {
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [total]
  );

  const startAutoplay = useCallback(() => {
    if (autoplay && total > 1) {
      autoplayRef.current = setInterval(() => {
        navigate("next");
      }, delay * 1000);
    }
  }, [autoplay, delay, navigate, total]);

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EMBEDDED_CSS }} />

      <div
        className={`cascade-slider_container ${className}`}
        onMouseEnter={() => pauseOnHover && stopAutoplay()}
        onMouseLeave={() => pauseOnHover && startAutoplay()}
      >
        <div className="cascade-slider_slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`cascade-slider_item ${getSlideClasses(
                index,
                activeIndex,
                total
              )}`}
            >
              <img src={slide.src} alt={`slide-${index}`} />
            </div>
          ))}
        </div>

        <span
          className="cascade-slider_arrow cascade-slider_arrow-left"
          onClick={() => navigate("prev")}
        >
          <ArrowLeftCircle size={40} />
        </span>

        <span
          className="cascade-slider_arrow cascade-slider_arrow-right"
          onClick={() => navigate("next")}
        >
          <ArrowRightCircle size={40} />
        </span>
      </div>
    </>
  );
}
