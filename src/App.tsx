import { useCallback, useEffect, useMemo, useRef } from "react";

import Calendar from "@/components/calendar.tsx";
import ConfirmAlertDialog from "@/components/confirm-alert-dialog.tsx";
import Header from "@/components/header.tsx";
import { EVENTS } from "@/constants";
import {
    allDaysInMonth,
    dateIsAfter,
    dateIsBefore,
    dateIsBetween,
    dateIsSameOrAfter,
    dateIsSameOrBefore,
    dayIndexInWeek,
    endDayOfMonth,
    firstDayOfMonth,
    nextDaysInWeek,
    nextMonthBy,
    previousDaysInWeek,
    previousMonthBy
} from "@/lib/date.ts";
import {
    checkEventTakePlaceOnDay,
    fillMultipleDayEventByStartDayEvent,
    sorteEventsOrTasks
} from "@/lib/utils.ts";
import { setStoreCurrentMonth, setStoreEvents, useAppStore } from "@/store";
import { PeriodType } from "@/types";

const App = () => {
    const currentDate = useAppStore((state) => state.currentDate);
    const storeEvents = useAppStore((state) => state.events);
    const events = fillMultipleDayEventByStartDayEvent(
        storeEvents,
        storeEvents
    );

    const ref = useRef<boolean>(false);

    const findEventsByDays = useCallback(
        (date: Date) => {
            return events.filter((item) => {
                return checkEventTakePlaceOnDay(item, date);
            });
        },
        [events]
    );

    const calendarDays = useMemo(() => {
        const firstDateCurrentMonth = firstDayOfMonth(currentDate);
        const lastDateCurrentMonth = endDayOfMonth(currentDate);

        const previous = previousDaysInWeek(
            dayIndexInWeek(firstDateCurrentMonth),
            firstDateCurrentMonth
        );
        const current = allDaysInMonth(currentDate);
        const next = nextDaysInWeek(
            dayIndexInWeek(lastDateCurrentMonth),
            lastDateCurrentMonth
        );

        return [
            ...previous.map((item) => ({
                date: item,
                month: "previous",
                events: findEventsByDays(item)
            })),
            ...current.map((item) => ({
                date: item,
                month: "current",
                events: findEventsByDays(item)
            })),
            ...next.map((item) => ({
                date: item,
                month: "next",
                events: findEventsByDays(item)
            }))
        ];
    }, [currentDate, findEventsByDays]);

    const fetchEventsOrTasksByPeriod = useCallback((period: PeriodType) => {
        return EVENTS.filter((item) => {
            if (item.type === "task" || (item.type === "event" && !item.end)) {
                return dateIsBetween(
                    item.start,
                    period.start,
                    period.end,
                    "date",
                    { start: true, end: true }
                );
            }

            if (item.end) {
                const eventOutSide =
                    dateIsSameOrBefore(item.start, period.start, "date") &&
                    dateIsSameOrAfter(item.end, period.end, "date");

                const eventInSide =
                    dateIsAfter(item.start, period.start, "date") &&
                    dateIsBefore(item.end, period.end, "date");

                const endEventInside =
                    dateIsSameOrBefore(item.start, period.start, "date") &&
                    dateIsSameOrBefore(item.end, period.end, "date");

                const startEventInside =
                    dateIsSameOrAfter(item.start, period.start, "date") &&
                    dateIsSameOrAfter(item.end, period.end, "date");

                return (
                    eventOutSide ||
                    eventInSide ||
                    endEventInside ||
                    startEventInside
                );
            }

            return false;
        });
    }, []);

    useEffect(() => {
        if (calendarDays.length > 0 && !ref.current && events.length === 0) {
            ref.current = true;
            const currentCalendarPeriod = {
                start: calendarDays[0].date,
                end: calendarDays[calendarDays.length - 1].date
            };

            setStoreEvents(
                fillMultipleDayEventByStartDayEvent(
                    sorteEventsOrTasks(
                        fetchEventsOrTasksByPeriod(currentCalendarPeriod)
                    )
                )
            );
        }
    }, [calendarDays, events.length, fetchEventsOrTasksByPeriod]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB] pt-4 pb-12">
                <div className="min-w-[calc(100%-500px)] bg-white border border-gray-100 rounded-md shadow-sm">
                    <div className="mx-4 my-5">
                        <Header
                            currentMonth={currentDate}
                            onNavigateInMonth={(position) => {
                                if (position === "previous")
                                    setStoreCurrentMonth(
                                        previousMonthBy(currentDate)
                                    );

                                if (position === "next")
                                    setStoreCurrentMonth(
                                        nextMonthBy(currentDate)
                                    );
                            }}
                        />

                        <Calendar days={calendarDays} />
                    </div>
                </div>
            </div>

            <ConfirmAlertDialog />
        </>
    );
};

export default App;
