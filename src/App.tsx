import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import LoadingSkeleton from "./components/LoadingSkeleton";
import ImageCard from "./components/ImageCard";
import { useAllImageList } from "./services";

const IMAGE_HEIGHT = 300;
const GAP = 16;

const getColumnCount = (width: number) => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  return 4;
};

const ImageGallery = () => {
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(getColumnCount(window.innerWidth));
  const limit = 100;
  const listRef = useRef<HTMLDivElement>(null);

  const { data: images, isLoading: isLoadingImages } = useAllImageList(
    page,
    limit
  );

  const totalRows = useMemo(
    () => Math.ceil((images?.data?.length || 0) / columns),
    [images?.data?.length, columns]
  );

  const virtualizer = useWindowVirtualizer({
    count: totalRows,
    estimateSize: () => IMAGE_HEIGHT + GAP,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  const handleResize = useCallback(() => {
    setColumns(getColumnCount(window.innerWidth));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
            Image Gallery
          </h1>
          <p className="mt-1 sm:mt-2 text-gray-600">
            A collection of beautiful random images
          </p>
        </header>

        <div ref={listRef} className="relative">
          {isLoadingImages ? (
            <div
              className={`grid gap-4 sm:gap-6 ${
                columns === 1
                  ? "grid-cols-1"
                  : columns === 2
                  ? "grid-cols-2"
                  : columns === 3
                  ? "grid-cols-3"
                  : "grid-cols-4"
              }`}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div
              className="relative w-full"
              style={{ height: `${virtualizer.getTotalSize()}px` }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const startIndex = virtualRow.index * columns;
                return (
                  <div
                    key={virtualRow.key}
                    className="absolute left-0 w-full"
                    style={{
                      transform: `translateY(${
                        virtualRow.start - virtualizer.options.scrollMargin
                      }px)`,
                      height: `${virtualRow.size}px`,
                    }}
                  >
                    <div
                      className={`grid gap-4 sm:gap-6 ${
                        columns === 1
                          ? "grid-cols-1"
                          : columns === 2
                          ? "grid-cols-2"
                          : columns === 3
                          ? "grid-cols-3"
                          : "grid-cols-4"
                      }`}
                    >
                      {Array.from({ length: columns }).map((_, colIndex) => {
                        const image = images?.data[startIndex + colIndex];
                        return image ? (
                          <ImageCard key={image.id} image={image} />
                        ) : null;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 flex justify-center items-center gap-4 sm:gap-6">
          <button
            className="px-3 sm:px-4 py-2 text-sm sm:text-base text-white bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={page === 1 || isLoadingImages}
          >
            Previous
          </button>
          <span className="text-sm sm:text-base text-gray-700">
            Page {page}
          </span>
          <button
            className="px-3 sm:px-4 py-2 text-sm sm:text-base text-white bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
