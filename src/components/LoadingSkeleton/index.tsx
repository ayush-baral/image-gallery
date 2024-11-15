import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg animate-pulse">
      <div className="aspect-[4/3] overflow-hidden bg-gray-300 rounded-lg"></div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
        {/* Skeleton for Author */}
        <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="mt-2 flex items-center gap-2 text-sm opacity-80">
          {/* Skeleton for Image Dimensions */}
          <div className="flex gap-1">
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
            <span className="h-1 w-1 rounded-full bg-white/60"></span>
            <div className="h-4 w-12 bg-gray-300 rounded"></div>
          </div>
          {/* Skeleton for Image ID */}
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
