import {v4 as uuid4} from "uuid";


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

export function convertToAltUnits(value, ratio) {
  return Math.max(Math.floor(value / ratio * 10) / 10, 0.1);
}

export function convertToBaseUnits(altValue, ratio) {
  return Math.max(Math.floor(altValue * ratio), 1);
}

export function generateKeys(iterableWithNoKeys=[]) {
  const result = [];
  for (const el of iterableWithNoKeys) {
    result.push({
      id: uuid4(),
      value: el,
    });
  }
  return result;
}

export function dropKeys(iterableWithKeys=[]) {
  const result = [];
  for (const el of iterableWithKeys) {
    result.push(el["value"]);
  }
  return result;
}
