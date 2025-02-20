import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between justify-items-center w-full h-full py-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col grow items-center justify-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            className="dark:invert"
            src="logo.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-6xl font-extrabold">Landing Page</h1>
        </div>
      </main>
    </div>
  );
}
