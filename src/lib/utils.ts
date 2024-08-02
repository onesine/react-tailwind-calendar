import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { EVENTS } from "@/constants";
import {
    dateIsAfter,
    dateIsBefore,
    dateIsBetween,
    dateIsSame,
    endOfDate,
    splitDatePeriodByWeek
} from "@/lib/date.ts";
import { EventType } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sorteEventsOrTasks(eventsOrTasks: EventType[]) {
    return eventsOrTasks.sort((a, b) => {
        if (dateIsSame(a.start, b.start, "milliseconds")) return 0;

        if (dateIsBefore(a.start, b.start, "milliseconds")) return -1;

        return 1;
    });
}

export function splitEventsOrTasks(eventOrTasks: EventType[]) {
    const newEventsOrTasks: EventType[] = [];

    eventOrTasks.forEach((item) => {
        const endWeek = endOfDate(item.start, "week");

        if (
            !!item.end &&
            dateIsAfter(item.end, item.start, "date") &&
            !!endWeek &&
            dateIsBefore(endWeek, item.end, "date")
        ) {
            splitDatePeriodByWeek({
                start: item.start,
                end: item.end
            })
                .map((period, index) => ({
                    ...item,
                    ...period,
                    id: `${item.id}-${index + 1}`,
                    parentId: item.id
                }))
                .forEach((item) => {
                    newEventsOrTasks.push(item);
                });
        } else {
            newEventsOrTasks.push(item);
        }
    });

    return newEventsOrTasks;
}

export function checkEvent(eventOrTasks: EventType) {
    const checkStartAndEndIsSameDate =
        !!eventOrTasks.end &&
        dateIsSame(eventOrTasks.end, eventOrTasks.start, "date");
    const allMultipleDayEvent =
        !!eventOrTasks.end &&
        dateIsAfter(eventOrTasks.end, eventOrTasks.start, "date");

    return {
        simpleTaskOrEvent:
            !eventOrTasks.allDay &&
            (!eventOrTasks.end || checkStartAndEndIsSameDate),
        allDaysTaskOrEvent: eventOrTasks.allDay && !eventOrTasks.end,
        multipleDaysEvent: {
            notAllDay: !eventOrTasks.allDay && allMultipleDayEvent,
            allDay: eventOrTasks.allDay && allMultipleDayEvent,
            anything: allMultipleDayEvent
        }
    };
}

export function checkEventTakePlaceOnDay(event: EventType, date: Date) {
    if (!event.end) {
        return dateIsSame(event.start, date, "date");
    }

    return dateIsBetween(date, event.start, event.end, "date", {
        start: true,
        end: true
    });
}

export function fillMultipleDayEventByStartDayEvent(
    eventsOrTasks: EventType[],
    allEvents = EVENTS
) {
    return eventsOrTasks.map((item) => {
        if (checkEvent(item).multipleDaysEvent.anything) {
            const eventStart = item.start;
            const events = sorteEventsOrTasks(
                allEvents.filter((event) => {
                    return checkEventTakePlaceOnDay(event, eventStart);
                })
            );

            if (events.length > 1) {
                return {
                    ...item,
                    startDayEvents: events
                };
            }

            return item;
        }

        return item;
    });
}
