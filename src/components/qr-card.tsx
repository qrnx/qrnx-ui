import { Card, CardTitle } from "./ui/card";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface QrCardProps {
  title: string;
  url: string;
  type: "affirmative" | "negative";
}

export const QrCard = ({ title, url, type }: QrCardProps) => {
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const [squareSide, setSquareSide] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleDownload = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.textContent = "download image";
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    link.href = canvas.toDataURL();
    link.download = `qrcode-${type}.png`;
    link.click();
  };

  return (
    <Link href={url}>
      <Card className="h-full p-4">
        <div className="relative flex flex-col justify-between gap-2 h-full">
          <CardTitle className="text-xl text-center font-semibold">
            {title}
          </CardTitle>
          <div ref={qrContainerRef} className="flex h-full justify-center">
            <QRCodeCanvas
              ref={canvasRef}
              value={url}
              size={squareSide}
              title={title}
            />
          </div>
          <Button
            size="icon"
            onClick={handleDownload}
            className="shrink-0 absolute top-0 left-0"
          >
            <Download />
          </Button>
          <ChevronRight className=" absolute top-0 right-0 text-gray-400" />
        </div>
      </Card>
    </Link>
  );
};
