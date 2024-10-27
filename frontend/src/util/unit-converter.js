export default function unitConverter(amount, ratio, units) {
  return (Math.round(amount * 10 / ratio) / 10) + " " + units + "(s).";
};
