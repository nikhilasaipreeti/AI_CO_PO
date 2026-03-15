import { useEffect } from "react";
import vignanLogo from "@/assets/vignan-logo.png";

interface VignanLoaderProps {
  onComplete: () => void;
}

const VignanLoader = ({ onComplete }: VignanLoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center ivory-gradient bg-background">
      <img src={vignanLogo} alt="Vignan University" className="h-40 w-80 mb-5 background-white" />
      <h1 className="text-xl font-bold text-brown text-center px-4">
        Vignan's Foundation for Science, Technology & Research
      </h1>
      <div className="vignan-gold-stripe w-24 rounded mt-4 mb-3" />
      <p className="text-sm text-gold/80 text-center">
        Department of Computer Science and Engineering
      </p>
      <p className="text-xs text-secondary font-semibold tracking-wide uppercase mt-3">
        AI-Based OBE Attainment System
      </p>
      <div className="mt-8 h-7 w-7 rounded-full border-2 border-white/20 border-t-secondary animate-spin" />
    </div>
  );
};

export default VignanLoader;
