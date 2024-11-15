import React, { useState } from "react";
import { useAllImageList } from "./services";
import LoadingSkeleton from "./components/LoadingSkeleton";

export interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

// const generateRandomImages = (count: number): ImageData[] => {
//   const images: ImageData[] = [];
//   for (let i = 0; i < count; i++) {
//     images.push({
//       id: `img-${i}`,
//       author: `Author ${i}`,
//       width: Math.floor(Math.random() * 1000),
//       height: Math.floor(Math.random() * 1000),
//       url: `https://picsum.photos/id/${i}/500/300`,
//       download_url: `https://picsum.photos/id/${i}/500/300`,
//     });
//   }
//   return images;
// };

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
          src={image.url}
          alt={image.author}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          } ${isLoading ? "opacity-0" : "opacity-100"}`}
          onLoad={() => setIsLoading(false)}
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

const ImageGallery = () => {
  // const images = generateRandomImages(100);

  const { data: images, isLoading: isLoadingImages } = useAllImageList();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Image Gallery</h1>
          <p className="mt-2 text-gray-600">
            A collection of beautiful random images
          </p>
        </header>

        {isLoadingImages ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images?.data?.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
