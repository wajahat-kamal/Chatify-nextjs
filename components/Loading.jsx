import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#531B81] to-[#29184B] text-white">
      {/* Spinner */}
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
          <div className="w-16 h-16 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
        </div>
      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}

export default Loading;
