export function convertToHoursString(timeInMinutes) {
  let minutes = +timeInMinutes;
  const hours = Math.floor(minutes / 60);
  minutes -= hours * 60;

  if (hours) {
    return `${hours}h${minutes === 0 ? "" : minutes}`
  } else {
    return `${minutes}min.`
  }
}
