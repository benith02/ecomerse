import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

// --- CSS ---
const EMBEDDED_CSS = `
  .cascade-slider_container {
    position: relative;
    width: 100%;
    max-width: 1100px;
    margin: 10px auto;
    margin-top: 4%;
    z-index: 20;
    user-select: none;
    touch-action: pan-y;
    overflow: hidden;
    padding:0;
  }

  .cascade-slider_slides {
    position: relative;
    width: 100%;
    aspect-ratio:16/9;
    max-height: 350px;
  }

  .cascade-slider_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.4);
    transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), 
              opacity 1.5s ease;
    opacity: 0;
    will-change: transform, opacity;
  }

  .cascade-slider_item.next {
    transform: translate(-110%, -50%) scale(0.85);
    opacity: 1;
    z-index: 2;
  }

  .cascade-slider_item.prev {
    transform: translate(10%, -50%) scale(0.85);
    opacity: 1;
    z-index: 2;
  }

  .cascade-slider_item.now {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
    z-index: 3;
  }

  .cascade-slider_slides img {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: 20px;
  }

  .cascade-slider_arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 10;
    color: white;
  }

  .cascade-slider_arrow-left { left: 3%; }
  .cascade-slider_arrow-right { right: 3%; }

 @media (min-width: 768px) and (max-width: 1024px) {
  .cascade-slider_container {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }
  .cascade-slider_slides {
    height: 200px;
    max-height: unset;
    aspect-ratio: unset;
    margin: 20% 0 2% 0;
  }

  .cascade-slider_item {
    width: 50%;
  }

  .cascade-slider_item.now {
    transform: translate(-50%, -50%) scale(1);
    z-index: 3;
  }

  .cascade-slider_item.next {
    transform: translate(-95%, -50%) scale(0.82);
    opacity: 0.85;
  }

  .cascade-slider_item.prev {
    transform: translate(-5%, -50%) scale(0.82);
    opacity: 0.85;
  }

  .cascade-slider_slides img {
    width: 100%;
    max-width: 100% !important;
    height: auto;
    border-radius: 16px;
  }
  .cascade-slider_arrow-left { left: 2%; top: 70%; }
  .cascade-slider_arrow-right { right: 2%; top: 70%; }
  .cascade-slider_arrow svg {
    width: 40px;
    height: 40px;
  }
  .cascade-slider_arrow {
    display: block !important;
    z-index: 10;
    color: white;
    border-radius: 50%;
    padding: 4px;
  }
}

  @media (max-width: 767px) {
    .cascade-slider_slides {
      height: 150px;
      max-height: unset;
      aspect-ratio: unset;
      margin: 43% 0 0% 0;
    }
    .cascade-slider_item {
      width: 85%;
    }
    .cascade-slider_item.next,
    .cascade-slider_item.prev {
      display: none;
    }
    .cascade-slider_item.now {
      transform: translate(-50%, -50%) scale(1);
      z-index: 3;
    }
    .cascade-slider_slides img {
      width: 100%;
      max-width: 100% !important;
      height: auto;
      border-radius: 14px;
    }
    .cascade-slider_arrow {
      display: block !important;
      z-index: 10;
      color: white;
      border-radius: 50%;
      padding: 4px;
      top: 38%;
      transform: translateY(-50%);
    }
    .cascade-slider_arrow-left {
      left: 3%;
      top: 75%;
    }
    .cascade-slider_arrow-right {
      right: 3%;
      top: 75%;
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
  const [currentDelay, setCurrentDelay] = useState(delay); // ✅ INSIDE component
  const autoplayRef = useRef(null);
  const total = slides.length;

  // ✅ Update delay based on screen size
  useEffect(() => {
    const updateDelay = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setCurrentDelay(6);
      } else if (width <= 1024) {
        setCurrentDelay(5);
      } else {
        setCurrentDelay(delay);
      }
    };
    updateDelay();
    window.addEventListener("resize", updateDelay);
    return () => window.removeEventListener("resize", updateDelay);
  }, [delay]);

  const navigate = useCallback(
    (dir) => {
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % total : (prev - 1 + total) % total
      );
    },
    [total]
  );

 // ✅ Clear old interval BEFORE starting new one when delay changes
const startAutoplay = useCallback(() => {
  if (autoplayRef.current) clearInterval(autoplayRef.current); // ✅ clear first
  if (autoplay && total > 1) {
    autoplayRef.current = setInterval(() => {
      navigate("next");
    }, currentDelay * 1000);
  }
}, [autoplay, currentDelay, navigate, total]);

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

// ✅ Restart autoplay whenever currentDelay changes
useEffect(() => {
  stopAutoplay();        // kill old interval
  startAutoplay();       // start fresh with new delay
  return stopAutoplay;
}, [startAutoplay]);     // startAutoplay already depends on currentDelay

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