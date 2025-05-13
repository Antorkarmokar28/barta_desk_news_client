"use client";

import { useEffect, useRef } from "react";

const Headline = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let scrollInterval: NodeJS.Timeout;

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth) {
          scrollElement.scrollLeft = 0;
        } else {
          scrollElement.scrollLeft += 1;
        }
      }, 20);
    };

    startScroll();

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="w-full bg-gray-100 py-2">
      <div className="container mx-auto flex">
        {/* Left Label */}
        <div className="bg-black text-white px-6 py-2 flex flex-col justify-center">
          <h4 className="font-bold text-sm">News Updates</h4>
          <p className="text-xs text-gray-300">(Update 12 minutes ago)</p>
        </div>

        {/* Scrolling Text */}
        <div
          className="flex-1 overflow-hidden whitespace-nowrap px-4 py-2"
          ref={scrollRef}
        >
          <div className="inline-block min-w-full">
            <span className="mx-4 text-gray-700">
              Govt Announces New Infrastructure Projects for 2025
            </span>
            <span className="mx-4 text-gray-700">
              Tech Giants Battle for AI Dominance in 2025
            </span>
            <span className="mx-4 text-gray-700">
              Massive Floods Displace Thousands in Northern Regions
            </span>
            <span className="mx-4 text-gray-700">
              National Cricket Team Wins Asian Championship
            </span>
            <span className="mx-4 text-gray-700">
              Elections 2025: What You Need to Know
            </span>
            <span className="mx-4 text-gray-700">
              Stock Market Sees Record Growth
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headline;
