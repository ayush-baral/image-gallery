import { useState } from "react";

import { ImageData } from "../types";

const ImageCard: React.FC<{ image: ImageData }> = ({ image }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-xl shadow-md transition-transform duration-500 ease-out hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white transition-opacity duration-300">
        <h3 className="text-lg font-medium">{image.author}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm opacity-80">
          <span>
            {image.width}x{image.height}
          </span>
          <span className="h-1 w-1 rounded-full bg-white/60"></span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
