export default function dateChanger(od) {
  const date = new Date(od);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  const hours = date.getHours();
  const minute = date.getMinutes();
  const day = dt < 10 ? "0" + dt : dt;
  const mon = month < 10 ? "0" + month : month;
  const hou = hours < 10 ? "0" + hours : hours;
  const min = minute < 10 ? "0" + minute : minute;
  return hou + ":" + min + " / " + day + "-" + mon + "-" + year;
}

export function orderCode() {
  const digitAt = (val, index) => {
    return Math.floor(
      (val /
        Math.pow(10, Math.floor(Math.log(Math.abs(val)) / Math.LN10) - index)) %
        10
    );
  };
  const date = new Date();
  const alphabet = [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dt = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (
    "Z" +
    digitAt(year, 3) +
    "-" +
    alphabet[month] +
    alphabet[dt] +
    alphabet[hours] +
    alphabet[minutes] +
    "-" +
    Math.floor(Math.random() * 1000)
  );
}
