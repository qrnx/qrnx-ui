interface HeadlineProps {
  title: string;
  buttonsContainer: React.ReactNode;
}

export const Headline: React.FC<HeadlineProps> = ({
  title,
  buttonsContainer,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-xl sm:text-4xl font-semibold">{title}</div>
      <div className="flex items-center gap-2 sm:gap-3">{buttonsContainer}</div>
    </div>
  );
};
