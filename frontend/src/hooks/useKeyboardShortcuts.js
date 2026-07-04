import { useEffect } from "react";

export default function useKeyboardShortcuts(handler) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      handler(event);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handler]);
}