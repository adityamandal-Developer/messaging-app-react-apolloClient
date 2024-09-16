export const convertDate = (date: string) => {
  const messageTime = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return messageTime;
};
