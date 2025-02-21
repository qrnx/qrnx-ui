interface HeadlineProps {
  title: string;
  buttonsContainer: React.ReactNode;
}

export const Headline: React.FC<HeadlineProps> = ({
  title,
  buttonsContainer,
}) => {
  return (
    <div className="flex justify-between w-full">
      <div className="text-4xl font-semibold">{title}</div>
      <div>{buttonsContainer}</div>
    </div>
  );
};
