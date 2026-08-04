/**
 * Live service schedule.
 *
 * The indicator is driven by the service calendar rather than the stream
 * itself, so it needs no API and no polling of an external service. The
 * tradeoff: it will show "en vivo" during a scheduled service even if the
 * stream is late or the service was cancelled. Keep the windows honest.
 *
 * All checks run in America/New_York regardless of the visitor's device
 * timezone, so someone watching from Puerto Rico, the DR or Spain sees the
 * indicator when ICGG is actually live — not when it is 10am where they are.
 */

const CHURCH_TZ = 'America/New_York';

interface Service {
  /** 0 = Sunday, 4 = Thursday */
  day: number;
  startMinutes: number;
  durationMinutes: number;
}

const hm = (h: number, m = 0) => h * 60 + m;

/**
 * Each window opens 15 minutes early so people arriving before the countdown
 * still see it, and runs long enough to cover a service that goes over.
 */
export const SERVICES: Service[] = [
  { day: 0, startMinutes: hm(10, 0), durationMinutes: 150 },   // Sunday 10:00am
  { day: 4, startMinutes: hm(19, 30), durationMinutes: 120 },  // Thursday 7:30pm
];

const PRE_ROLL_MINUTES = 15;

/** Current weekday and minute-of-day in the church's timezone. */
function churchNow(now: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CHURCH_TZ,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '';
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  const day = dayMap[get('weekday')] ?? 0;
  // Intl can return "24" for midnight in hour12:false — normalise it.
  const hour = parseInt(get('hour'), 10) % 24;
  const minute = parseInt(get('minute'), 10);

  return { day, minutes: hour * 60 + minute };
}

/** True while a scheduled service window is open. */
export function isLiveNow(now: Date = new Date()): boolean {
  const { day, minutes } = churchNow(now);

  return SERVICES.some(s => {
    const open = s.startMinutes - PRE_ROLL_MINUTES;
    const close = s.startMinutes + s.durationMinutes;

    // Normal case: the window sits inside one day.
    if (close <= 24 * 60) {
      return day === s.day && minutes >= open && minutes < close;
    }

    // A service running past midnight spills into the following day.
    const spill = close - 24 * 60;
    const nextDay = (s.day + 1) % 7;
    return (day === s.day && minutes >= open) || (day === nextDay && minutes < spill);
  });
}
