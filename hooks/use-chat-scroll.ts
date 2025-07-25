import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  loadMore,
  shouldLoadMore,
  count,
}: ChatScrollProps) => {
  const [hashInitialized, setHashInitialized] = useState(false);

  useEffect(() => {
    const topDiv = chatRef?.current;
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop;
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };
    topDiv?.addEventListener("scroll", handleScroll);
    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomDiv = bottomRef?.current;
    const topDiv = chatRef.current;
    const shouldAutoScroll = () => {
      if (!hashInitialized && bottomDiv) {
        setHashInitialized(true);
        return true;
      }
      if (!topDiv) {
        return false;
      }
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };
    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, count, hashInitialized]);
};
