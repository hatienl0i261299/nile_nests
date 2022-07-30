export const formatDatetime = (datetime: Date) => {
  return `${datetime.getUTCHours()}:${datetime.getMinutes()}:${datetime.getSeconds()} ${datetime.getDate()}-${
    datetime.getMonth() + 1
  }-${datetime.getFullYear()}`;
};
