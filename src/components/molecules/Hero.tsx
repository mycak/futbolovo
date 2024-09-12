"use client";
import { heroTexts } from "@/constants/texts";
import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import { paths } from "@/constants/paths";

const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState<number>(1);

  useEffect(() => {
    //CHange the text every n seconds
    const interval = setInterval(() => {
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
        setTextOpacity(1);
      }, 500);
    }, 6500);
    return () => clearInterval(interval);
  }, []);
  //TODO: make smaller text on lowe media queries
  return (
    <div className='-mx-8 relative aspect-video bg-[url("/images/football-pitch.jpg")] bg-cover'>
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
            classNames="px-5 py-3 text-3xl mt-8 mr-auto opacity-90 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
