export const getLastWeekRange = (): string => {
  const today = new Date();

  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
    });

  return `${formatDate(weekAgo)} - ${formatDate(today)}`;
};
