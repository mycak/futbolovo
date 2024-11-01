"use client";

import Link from "next/link";
import { paths } from "@/constants/paths";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link
      href={pathname.includes("map") ? paths.Dashboard : paths.Map}
      className="max-w-max mx-auto flex flex-col items-center"
    >
      <Image
        src="/icons/logo-futbolovo.svg"
        width={320}
        height={60}
        alt="football field"
        className="w-[60%] min-w-[200px] md:w-[320px]"
      />
    </Link>
  );
};

export default Logo;
