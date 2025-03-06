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

export const convertDatesToWeekdays = (
  data: GetResponsesData | [],
  dateTranslations: (key: string) => string
) => {
  return data.map((item) => {
    const { response_date, ...rest } = item;
    const dateParts = response_date.split(".");
    const date = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    const weekdays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const weekday = weekdays[date.getDay()];

    const translatedWeekday = dateTranslations(`weekdays.${weekday}`);

    return { weekday: translatedWeekday, ...rest };
  });
};

export const convertDatesToMonths = (
  data: GetResponsesData | [],
  dateTranslations: (key: string) => string
) => {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return data.map((item) => {
    const dateParts = item.response_date.split(".");
    const monthIndex = Number(dateParts[1]) - 1;
    const month = months[monthIndex];

    const translatedMonth = dateTranslations(`months.${month}`);

    return { ...item, month: translatedMonth }; // Добавляем поле month
  });
};
