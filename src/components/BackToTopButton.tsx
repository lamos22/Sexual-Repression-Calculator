import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过 200px 时显示按钮
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      // 固定右下角，层级极高，保证覆盖掉评测页面内旧按钮
      className={`fixed bottom-6 right-6 z-[9999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="回到顶部"
        className="w-12 h-12 rounded-full 
                   bg-psychology-primary text-white 
                   shadow-lg hover:shadow-xl 
                   flex items-center justify-center 
                   transition-all duration-300 ease-out 
                   hover:scale-110 active:scale-95 
                   animate-in fade-in slide-in-from-bottom-4"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
