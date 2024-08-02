import { Fragment, useCallback, useMemo } from "react";

import AllDaysTaskEvent from "@/components/all-days-task-event.tsx";
import MultipleEventDay from "@/components/multiple-event-day.tsx";
import OtherDayEvent from "@/components/other-day-event.tsx";
import SimpleTaskEvent from "@/components/simple-task-event.tsx";
import { dateIsBefore, dayOfDate, isCurrentDay, isSunday } from "@/lib/date.ts";
import { checkEvent, cn } from "@/lib/utils.ts";
import { DayType, EventType } from "@/types";

interface Props {
    day: DayType;
}

const Day = (props: Props) => {
    const { day } = props;

    const multipleEventInOtherEvent = useCallback((event: EventType) => {
        if (event?.startDayEvents && event.startDayEvents.length > 4) {
            return !![...event.startDayEvents]
                .splice(3, event.startDayEvents.length)
                .find((item) => item.id === event.id);
        }

        return false;
    }, []);

    const showMetaData = useMemo(() => {
        let otherEventNumber = 0;
        const positionUse: number[] = [];

        const filterEvent = day.events.filter((item) => {
            if (
                checkEvent(item).multipleDaysEvent.anything &&
                dateIsBefore(item.start, day.date, "date")
            ) {
                const eventInOtherEvent = multipleEventInOtherEvent(item);
                if (eventInOtherEvent) {
                    otherEventNumber++;
                }
                return !eventInOtherEvent;
            }

            return true;
        });

        let showEvent = [...filterEvent].splice(0, 3);

        if (day.events.length <= 4) showEvent = filterEvent;

        otherEventNumber =
            otherEventNumber +
            (filterEvent.length === day.events.length && filterEvent.length <= 4
                ? 0
                : [...filterEvent].splice(3, day.events.length).length);

        const formatShowEvent: {
            [key: string]: { usePosition: boolean; event: EventType };
        } = {};

        showEvent.forEach((item, index) => {
            if (
                checkEvent(item).multipleDaysEvent.anything &&
                dateIsBefore(item.start, day.date, "date")
            ) {
                if (!item.startDayEvents) {
                    formatShowEvent[index] = { usePosition: true, event: item };
                } else {
                    const filterEvent = item?.startDayEvents?.filter(
                        (item) => !multipleEventInOtherEvent(item)
                    );

                    const foundIndex = filterEvent?.findIndex(
                        (event) => event.id === item.id
                    );

                    if (foundIndex > -1) {
                        formatShowEvent[foundIndex] = {
                            usePosition: true,
                            event: item
                        };
                    }
                }
                positionUse.push(index);
            } else {
                let indexUse = index;

                if (formatShowEvent[index]?.usePosition) {
                    for (let i = index; i >= 0; i--) {
                        if (formatShowEvent[i] === undefined) {
                            indexUse = i;
                            break;
                        }
                    }
                }

                formatShowEvent[indexUse] = { usePosition: false, event: item };
            }
        });

        return {
            events: {
                all: filterEvent,
                show: showEvent,
                formatShowEvent
            },
            otherEventNumber,
            positionUse
        };
    }, [day.date, day.events, multipleEventInOtherEvent]);

    return (
        <div
            className={cn({
                "border-b border-r py-2 h-[129px] w-[160px] xl:w-auto": true,
                "flex flex-col": true,
                "text-gray-400": ["previous", "next"].includes(day.month),
                "border-x": isSunday(day.date)
            })}
        >
            <h3
                className={cn({
                    "flex items-center justify-center": true,
                    "h-6 w-6 rounded-full mb-0.5": true,
                    "mx-auto text-xs": true,
                    "bg-primary text-white": isCurrentDay(day.date)
                })}
            >
                {dayOfDate(day.date)}
            </h3>

            <div className="space-y-0.5 flex flex-col justify-between flex-1">
                {showMetaData.events.show.length > 0 && (
                    <div className="space-y-0.5 text-gray-800">
                        {Object.values(showMetaData.events.formatShowEvent).map(
                            (item, index) => (
                                <Fragment key={index}>
                                    {showMetaData.events.show.length >
                                        showMetaData.positionUse.length &&
                                        !isSunday(day.date) &&
                                        item.usePosition && (
                                            <Fragment>
                                                {item.usePosition && (
                                                    <div className="px-2">
                                                        -
                                                    </div>
                                                )}
                                            </Fragment>
                                        )}

                                    {checkEvent(item.event).multipleDaysEvent
                                        .allDay && (
                                        <MultipleEventDay
                                            day={day.date}
                                            event={item.event}
                                        />
                                    )}

                                    {checkEvent(item.event).multipleDaysEvent
                                        .notAllDay && (
                                        <MultipleEventDay
                                            day={day.date}
                                            event={item.event}
                                        />
                                    )}

                                    {checkEvent(item.event)
                                        .allDaysTaskOrEvent && (
                                        <AllDaysTaskEvent event={item.event} />
                                    )}

                                    {checkEvent(item.event)
                                        .simpleTaskOrEvent && (
                                        <SimpleTaskEvent event={item.event} />
                                    )}
                                </Fragment>
                            )
                        )}
                    </div>
                )}

                <OtherDayEvent
                    otherNumber={showMetaData.otherEventNumber}
                    day={day}
                />
            </div>
        </div>
    );
};

export default Day;
