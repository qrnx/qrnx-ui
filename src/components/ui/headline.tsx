import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface HeadlineProps {
  title: string;
  buttonsContainer: React.ReactNode;
}

export const Headline: React.FC<HeadlineProps> = ({
  title,
  buttonsContainer,
}) => {
  const { pollId } = useParams();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-1 sm:gap-2">
        {Boolean(pollId) ? (
          <Link href={"/dashboard"}>
            <ChevronLeft size={30} className="hover:opacity-70" />
          </Link>
        ) : null}
        <div className="text-xl sm:text-4xl font-semibold">{title}</div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">{buttonsContainer}</div>
    </div>
  );
};
