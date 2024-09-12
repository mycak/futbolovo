import Link from "next/link";
import { paths } from "@/constants/paths";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href={paths.Map}>
      <div className="max-w-max px-6 pt-3 mt-4 mx-auto border border-ivory-150 flex gap-6">
        <p className="text-5xl">Futbolovo</p>
        <Image
          src="/icons/football-field.png"
          width={60}
          height={60}
          alt="football field"
          className="-translate-y-2"
        />
      </div>
    </Link>
  );
};

export default Logo;
