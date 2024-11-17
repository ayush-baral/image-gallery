import { useState } from "react";

import LoadingSkeleton from "./components/LoadingSkeleton";
import ImageCard from "./components/ImageCard";

import { useAllImageList } from "./services";

const ImageGallery = () => {
  const [page, setPage] = useState(1);

  const limit = 100;

  const { data: images, isLoading: isLoadingImages } = useAllImageList(
    page,
    limit
  );

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

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

        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 text-white bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={page === 1 || isLoadingImages}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {page}</span>
          <button
            className="px-4 py-2 text-white bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={
              isLoadingImages ||
              (images?.data?.length ? images?.data?.length < limit : false)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
