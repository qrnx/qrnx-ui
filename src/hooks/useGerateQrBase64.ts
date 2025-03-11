import { AnswerOption } from "@/types/answerOptions";
import React from "react";
import { useEffect } from "react";

interface UseGerateQrBase64Props {
  affirmativeRef: React.RefObject<HTMLCanvasElement | null>;
  negativeRef: React.RefObject<HTMLCanvasElement | null>;
  affirmativeOption: AnswerOption | undefined;
  negativeOption: AnswerOption | undefined;
}

export const useGerateQrBase64 = ({
  affirmativeRef,
  negativeRef,
  affirmativeOption,
  negativeOption,
}: UseGerateQrBase64Props) => {
  const [affirmativeImage, setAffirmativeImage] = React.useState<string | null>(
    null
  );
  const [negativeImage, setNegativeImage] = React.useState<string | null>(null);

  const generateQRBase64 = (ref: React.RefObject<HTMLCanvasElement | null>) => {
    const link = document.createElement("a");
    link.textContent = "download image";
    const canvas = ref.current;
    if (!canvas) {
      return null;
    }

    return canvas.toDataURL("image/png");
  };

  useEffect(() => {
    if (!affirmativeRef.current || !affirmativeOption) {
      return;
    }

    const image = generateQRBase64(affirmativeRef);
    setAffirmativeImage(image);
  }, [affirmativeRef, affirmativeOption]);

  useEffect(() => {
    if (!negativeRef.current || !negativeOption) {
      return;
    }

    const image = generateQRBase64(negativeRef);
    setNegativeImage(image);
  }, [negativeRef, negativeOption]);

  return { affirmativeImage, negativeImage };
};
