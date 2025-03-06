import { GetResponsesData } from "@/api/responses";

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

export const convertDatesToWeekdays = (data: GetResponsesData | []) => {
  return data.map((item) => {
    const { response_date, ...rest } = item;
    const dateParts = response_date.split(".");
    const date = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = weekdays[date.getDay()];

    return { weekday, ...rest };
  });
};
