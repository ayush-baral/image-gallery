import { useState } from "react";

import { ImageData } from "../types";

const ImageCard: React.FC<{ image: ImageData }> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-4px)" : "none",
      }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.download_url}
          alt={image.author}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          } ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white transition-transform duration-300">
        <h3 className="text-lg font-semibold tracking-wide">{image.author}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm opacity-80">
          <span>
            {image.width}x{image.height}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/60"></span>
          <span>ID: {image.id}</span>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ImageCard;
