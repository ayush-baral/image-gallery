import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import LoadingSkeleton from "./components/LoadingSkeleton";
import ImageCard from "./components/ImageCard";
import { useAllImageList } from "./services";

const IMAGE_HEIGHT = 300;
const GAP = 16;
const LIMIT = 100;

const getColumnCount = (width: number): number => {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  if (width < 1280) return 3;
  return 4;
};

const ImageGallery: React.FC = () => {
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const {
    data: images = { data: [] },
    isLoading: isLoadingImages,
    error: fetchError,
  } = useAllImageList(page, LIMIT);

  const rowCount = useMemo(
    () => Math.max(Math.ceil((images?.data?.length || 0) / columns), 1),
    [images?.data?.length, columns]
  );

  const handleResize = useCallback(() => {
    setColumns(getColumnCount(window.innerWidth));
  }, []);

  const handlePageChange = useCallback((direction: "next" | "prev") => {
    setPage((prevPage) => {
      if (direction === "next") return prevPage + 1;
      return Math.max(prevPage - 1, 1);
    });
  }, []);

  useEffect(() => {
    const initialColumns = getColumnCount(window.innerWidth);
    setColumns(initialColumns);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (fetchError) {
      setError("Failed to load images: " + fetchError.message);
    }
  }, [fetchError]);

  const Cell = useCallback(
    ({
      columnIndex,
      rowIndex,
      style,
    }: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    }) => {
      const index = rowIndex * columns + columnIndex;
      const image = images?.data?.[index];

      return (
        <div
          style={{
            ...style,
            padding: `${GAP}px`,
            boxSizing: "border-box",
          }}
        >
          {image ? <ImageCard image={image} /> : <LoadingSkeleton />}
        </div>
      );
    },
    [images?.data, columns]
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <header ref={headerRef} className="py-4 sm:py-5 bg-white shadow-md">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Image Gallery
          </h1>
          <p className="text-sm text-gray-600">
            Discover stunning random images
          </p>
        </div>
      </header>

      <main
        ref={mainRef}
        className="flex-grow px-4 sm:px-6 py-4 overflow-hidden"
        style={{
          height:
            headerRef.current && footerRef.current
              ? `calc(100vh - ${
                  headerRef.current.offsetHeight +
                  footerRef.current.offsetHeight
                }px)`
              : "auto",
          maxHeight:
            headerRef.current && footerRef.current
              ? `calc(100vh - ${
                  headerRef.current.offsetHeight +
                  footerRef.current.offsetHeight
                }px)`
              : "auto",
        }}
      >
        <div className="relative h-full">
          {isLoadingImages ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <Grid
                  columnCount={columns}
                  columnWidth={Math.floor(
                    (width - (columns - 1) * GAP) / columns
                  )}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={IMAGE_HEIGHT + GAP + 10}
                  width={width}
                  overscanRowCount={2}
                  className="hide-scrollbar"
                >
                  {Cell}
                </Grid>
              )}
            </AutoSizer>
          )}
        </div>
      </main>

      <footer ref={footerRef} className="py-3 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-center items-center space-x-4">
          <button
            aria-label="Previous page"
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange("prev")}
            disabled={page === 1 || isLoadingImages}
          >
            Previous
          </button>
          <span className="text-gray-700 text-sm">
            Page <strong>{page}</strong>
          </span>
          <button
            aria-label="Next page"
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange("next")}
            disabled={
              isLoadingImages ||
              (images?.data?.length ? images?.data?.length < LIMIT : false)
            }
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ImageGallery;
