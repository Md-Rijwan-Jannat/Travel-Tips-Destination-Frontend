import React from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
  isFetchingMore: boolean;
}

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  className,
  isFetchingMore,
}: InfiniteScrollContainerProps) {
  const { ref } = useInView({
    rootMargin: "200px", // Adjust this to trigger earlier or later
    onChange(inView) {
      if (inView && !isFetchingMore) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />{" "}
    </div>
  );
}
