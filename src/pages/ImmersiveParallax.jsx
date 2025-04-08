import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const ImmersiveParallax = () => {
  const [scroll, setScroll] = useState(0);
  const [activeBarIndex, setActiveBarIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScroll(scrollY);

      const finalBarThreshold = 200;
      if (scrollY > finalBarThreshold && !completed) {
        setCompleted(true);
        navigate("/landing", {
          state: { fromParallax: true },
          replace: false,
        });
      }

      const newIndex = Math.min(Math.floor(scrollY / 20), 4);
      setActiveBarIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigate, completed]);

  const bars = Array.from({ length: 5 }, (_, index) => ({
    height: 200 + index * 50,
    value: 0,
    targetValue: Math.floor(Math.random() * 100) + 50,
  }));

  return (
    <div className="min-h-[200vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full flex flex-col items-center justify-center px-4 sm:px-6">
          {/* Scroll Down Text */}
          <div
            className="absolute top-6 sm:top-10 text-center text-base sm:text-xl font-semibold text-gray-700 bg-white/80 px-4 py-2 rounded-lg shadow-md max-w-[90%]"
            style={{
              opacity: Math.max(1 - scroll / 50, 0),
              transform: `translateY(${scroll * 0.4}px)`,
            }}
          >
            Scroll down to start <span className="text-orange-500">PREDICTION</span>
          </div>

          {/* Central title */}
          <div
            className="text-center mb-6 sm:mb-8"
            style={{
              transform: `translateY(${scroll * 0.6}px)`,
              opacity: Math.max(1 - scroll / 300, 0),
            }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-orange-500 whitespace-nowrap">
              StockWisely
            </h1>
          </div>

          {/* Trending Arrow */}
          <div
            className="mb-8 sm:mb-12"
            style={{
              transform: `translateY(${scroll * 0.8}px)`,
              opacity: Math.max(1 - scroll / 300, 0),
            }}
          >
            <TrendingUp
              className="text-orange-500 h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              style={{
                filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.4))",
              }}
            />
          </div>

          {/* Bars container */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 flex-wrap sm:flex-nowrap">
            {bars.map((bar, index) => (
              <div key={index} className="relative group">
                <div
                  className="rounded-t-xl transition-all duration-150 mx-auto"
                  style={{
                    width: "clamp(40px, 4vw, 80px)",
                    height: index <= activeBarIndex
                      ? `${Math.min(scroll * 3, bar.height)}px`
                      : "40px",
                    backgroundColor: index <= activeBarIndex ? "#f97316" : "#f4f4f5",
                    transform: `scaleY(${index <= activeBarIndex ? 1 : 0.3})`,
                    transformOrigin: "bottom",
                    opacity: index <= activeBarIndex ? 1 : 0.5,
                    boxShadow: index <= activeBarIndex
                      ? "0 0 20px rgba(249, 115, 22, 0.4)"
                      : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveParallax;
