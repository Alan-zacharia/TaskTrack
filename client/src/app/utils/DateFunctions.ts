export function getDateFunction(date: string) {
  const today = new Date();
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  let displayDate = "";
  let color = "";

  if (normalizedDate.toDateString() === today.toDateString()) {
    displayDate = "Today";
    color = "green";
  } else if (
    normalizedDate.toDateString() ===
    new Date(today.setDate(today.getDate() + 1)).toDateString()
  ) {
    displayDate = "Tomorrow";
    color = "blue";
  } else if (
    normalizedDate.toDateString() ===
    new Date(today.setDate(today.getDate() - 2)).toDateString()
  ) {
    displayDate = "Yesterday";
    color = "red";
  } else if (
    normalizedDate.toDateString() ===
    new Date(today.setDate(today.getDate() + 2)).toDateString()
  ) {
    displayDate = normalizedDate.toLocaleDateString();
    color = "orange";
  } else {
    displayDate = normalizedDate.toLocaleDateString();
    color = "gray";
  }

  return { displayDate, color };
}

export const getTodayDate = () => {
  const today = new Date();
  const day: string | number = today.getDate();
  const month: string | number = today.getMonth() + 1;
  const year: string | number = today.getFullYear();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  return `${year}-${formattedMonth}-${formattedDay}`;
};
