import Link from "next/link";
import { paths } from "@/constants/paths";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <Link href={paths.Map} className="max-w-max mx-auto">
        <div className="px-6 pt-3 max-w-max border border-ivory-150 flex gap-6">
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
    </div>
  );
};

export default Logo;
