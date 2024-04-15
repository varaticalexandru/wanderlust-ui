export function daysNumberInRange (date1: Date, date2: Date): number {
    const dayInMs = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
    return Math.round(differenceInMilliseconds / dayInMs) + 1;
  }