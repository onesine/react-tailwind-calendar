import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

type WeekIndexType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface PeriodType {
    start: Date;
    end: Date;
}

export function daysInMonth(date?: dayjs.ConfigType) {
    const daysNumber = dayjs(date || dayjs()).daysInMonth();

    if (!daysNumber) return 0;

    return daysNumber;
}

export function allDaysInMonth(date?: Date) {
    if (!dateIsValid(date || new Date())) return [];

    const maxDaysInMonth = daysInMonth(date);

    const days: Date[] = [];

    for (let i = 1; i <= maxDaysInMonth; i++) {
        days.push(dayjs(date).date(i).toDate());
    }

    return days;
}

export function firstDayOfMonth(date?: Date) {
    return dayjs(date || dayjs())
        .startOf("month")
        .toDate();
}

export function endDayOfMonth(date?: Date) {
    return dayjs(date || dayjs())
        .endOf("month")
        .toDate();
}

export function dayIndexInWeek(date?: Date) {
    return dayjs(date || dayjs()).day();
}

export function dateIsValid(date: Date) {
    return dayjs(date).isValid();
}

export function previousDaysInWeek(dayInWeek: WeekIndexType, date: Date) {
    if (!dateIsValid(date)) return [];

    const previousDays: Date[] = [];

    for (let i = 0; i < dayInWeek; i++) {
        previousDays.push(dayjs(date).day(i).toDate());
    }

    return previousDays;
}

export function nextDaysInWeek(dayInWeek: WeekIndexType, date: Date) {
    if (!dateIsValid(date)) return [];

    const nextDays: Date[] = [];

    for (let i = dayInWeek + 1; i <= 6; i++) {
        nextDays.push(dayjs(date).day(i).toDate());
    }

    return nextDays;
}

export function previousMonthBy(date: Date) {
    if (!dateIsValid(date)) return dayjs().toDate();

    const parseDate = dayjs(date);

    return dayjs(parseDate)
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
        .month(parseDate.month() - 1)
        .toDate();
}

export function nextMonthBy(date: Date) {
    if (!dateIsValid(date)) return dayjs().toDate();

    const parseDate = dayjs(date);

    return dayjs(parseDate)
        .date(1)
        .hour(0)
        .minute(0)
        .second(0)
        .month(parseDate.month() + 1)
        .toDate();
}

export function dayOfDate(date: Date) {
    if (!dateIsValid(date)) return null;

    return dayjs(date).date();
}

export function isCurrentDay(date: Date) {
    if (!dateIsValid(date)) return false;

    return dayjs(date).isToday();
}

export function formatDate(date: Date, format: string) {
    if (!dateIsValid(date)) return null;

    return dayjs(date).format(format);
}

export function isSunday(date: Date) {
    return dayIndexInWeek(date) === 0;
}

export function dateIsSame(a: Date, b: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(a) || !dateIsValid(b)) return false;

    return dayjs(a).isSame(dayjs(b), unit);
}

export function dateIsSameOrBefore(a: Date, b: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(a) || !dateIsValid(b)) return false;

    return dayjs(a).isSameOrBefore(dayjs(b), unit);
}

export function dateIsBefore(a: Date, b: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(a) || !dateIsValid(b)) return false;

    return dayjs(a).isBefore(dayjs(b), unit);
}

export function dateIsAfter(a: Date, b: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(a) || !dateIsValid(b)) return false;

    return dayjs(a).isAfter(dayjs(b), unit);
}

export function dateIsSameOrAfter(a: Date, b: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(a) || !dateIsValid(b)) return false;

    return dayjs(a).isSameOrAfter(dayjs(b), unit);
}

export function dateIsBetween(
    whoIsBetween: Date,
    start: Date,
    end: Date,
    unit: dayjs.OpUnitType,
    include?: { start?: boolean; end?: boolean }
) {
    if (
        !dateIsValid(whoIsBetween) ||
        !dateIsValid(start) ||
        !dateIsValid(end)
    ) {
        return false;
    }

    return dayjs(whoIsBetween).isBetween(
        dayjs(start),
        dayjs(end),
        unit,
        `${include?.start ? "[" : "("}${include?.end ? "]" : ")"}`
    );
}

export function sortDates(dates: Date[]) {
    return dates.sort((a, b) => {
        if (dayjs(a).isSame(dayjs(b), "date")) return 0;

        if (dayjs(a).isSameOrBefore(dayjs(b), "date")) return -1;

        return 1;
    });
}

export function dateDiff(a: Date, b: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(a) || !dateIsValid(b)) return 0;

    return dayjs(a).diff(dayjs(b), unit);
}

export function endOfDate(date: Date, unit: dayjs.OpUnitType) {
    if (!dateIsValid(date)) return null;

    return dayjs(date).endOf(unit).toDate();
}

export function dateAdd(date: Date, value: number, unit: dayjs.ManipulateType) {
    if (!dateIsValid(date)) return date;

    return dayjs(date).add(value, unit).toDate();
}

export function splitDatePeriodByWeek(period: PeriodType) {
    if (!dateIsValid(period.start) || !dateIsValid(period.end)) return [];

    const splitPeriods: PeriodType[] = [];

    let currentStart = period.start;
    let endWeek = endOfDate(currentStart, "week");

    while (!!endWeek && dateIsBefore(endWeek, period.end, "date")) {
        splitPeriods.push({
            start: currentStart,
            end: endWeek
        });

        currentStart = dateAdd(endWeek, 1, "day");
        endWeek = endOfDate(currentStart, "week");
    }

    splitPeriods.push({
        start: currentStart,
        end: period.end
    });

    return splitPeriods;
}
