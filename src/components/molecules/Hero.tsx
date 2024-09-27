"use client";
import { heroTexts } from "@/constants/texts";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { paths } from "@/constants/paths";

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const CHANGE_TEXT_INTERVAL = 9000;
  useEffect(() => {
    //CHange the text every n seconds
    const interval = setInterval(() => {
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
        setTextOpacity(1);
      }, 500);
    }, CHANGE_TEXT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative aspect-video bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl mx-auto'>
      <div className="absolute inset-0 ">
        <div className="w-full h-full bg-gray-900 opacity-80 hero-clip-diagonal relative" />
        <div
          className="absolute top-0 left-0 w-2/5 h-full flex flex-col justify-center items-center transition-opacity duration-500"
          style={{ left: "55%", opacity: textOpacity }}
        >
          <p className="text-grass-20 text-5xl">
            {heroTexts[currentTextIndex]}
          </p>
          <Button
            asLink
            href={paths.Map}
            text="Dołącz do gry!"
            classNames="px-5 py-3 text-3xl mt-8 mr-auto animate-shake"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
