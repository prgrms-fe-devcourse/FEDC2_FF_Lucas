import { useEffect, useState } from "react";

const useInfiniteScroll = ({ onIntersecting, options }) => {
  const [lastIntersectingImage, setLastIntersectingImage] = useState(null);
  const onIntersect = entries => {
    if (!entries) {
      return;
    }

    if (entries[0].isIntersecting) {
      onIntersecting();
    }
  };
  useEffect(() => {
    let observer;
    if (lastIntersectingImage) {
      observer = new IntersectionObserver(onIntersect, options);
      observer.observe(lastIntersectingImage);
    }
    return () => observer && observer.disconnect();
  }, [lastIntersectingImage]);

  return { setLastIntersectingImage };
};

export default useInfiniteScroll;
