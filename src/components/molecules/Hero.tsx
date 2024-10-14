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
    <div className='relative aspect-video bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl w-full mx-auto md:rounded-lg'>
      <div className="absolute inset-0 ">
        <div className="w-full h-full bg-gray-900 opacity-80 hero-clip-diagonal relative" />
        <div
          className="absolute left-[38%] md:left-[55%] top-0 w-3/5 md:w-2/5 h-full flex flex-col justify-center items-center transition-opacity duration-500"
          style={{ opacity: textOpacity }}
        >
          <p
            className="text-grass-20"
            style={{ fontSize: "clamp(1.5rem, 3vw, 4rem)" }}
          >
            {heroTexts[currentTextIndex]}
          </p>
          <Button
            asLink
            href={paths.Map}
            text="Dołącz do gry!"
            classNames="px-2 py-1 md:px-5 md:py-3 text-xl md:text-2xl lg:text-3xl mt-8 mr-auto animate-shake"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
