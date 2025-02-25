import { Card, CardTitle } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface QrCardProps {
  title: string;
  url: string;
}

export const QrCard = ({ title, url }: QrCardProps) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [squareSide, setSquareSide] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        const minVal = Math.min(width, height);

        setSquareSide(minVal);
      }
    });

    if (qrContainerRef.current) {
      observer.observe(qrContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Link href={url}>
      <Card className="h-full p-4">
        <div className="relative flex flex-col justify-between gap-2 h-full">
          <CardTitle className="text-xl text-center font-semibold">
            {title}
          </CardTitle>
          <div ref={qrContainerRef} className="flex h-full justify-center">
            <QRCodeSVG value={url} size={squareSide} title={title} />
          </div>
          <ChevronRight className=" absolute top-0 right-0 text-gray-400" />
        </div>
      </Card>
    </Link>
  );
};
