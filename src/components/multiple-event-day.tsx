import EventDetails from "@/components/event-details.tsx";
import { Popover, PopoverTrigger } from "@/components/ui/popover.tsx";
import {
    dateDiff,
    dateIsBefore,
    dateIsSame,
    endOfDate,
    formatDate,
    isSunday
} from "@/lib/date.ts";
import { checkEvent, cn } from "@/lib/utils.ts";
import { EventType } from "@/types";

interface Props {
    day: Date;
    event: EventType;
}

const MultipleEventDay = (props: Props) => {
    const { event, day } = props;

    if (!event.end) return null;

    let endWeek = endOfDate(event.start, "week");

    let numberDayShowEvent = 1;
    let openLeftAndRight = false;
    let openLeft = false;
    let openRight = false;

    if (endWeek && dateIsBefore(endWeek, event.end, "date")) {
        if (!isSunday(day) && !dateIsSame(day, event.start, "date"))
            return null;

        if (isSunday(day) && !dateIsSame(day, event.start, "date")) {
            if (dateIsSame(day, event.end, "date")) {
                openLeft = true;
                numberDayShowEvent = 0;
            } else {
                endWeek = endOfDate(day, "week") || endWeek;
                if (dateIsBefore(endWeek, event.end, "date")) {
                    openLeftAndRight = true;
                    numberDayShowEvent = dateDiff(endWeek, day, "day");
                } else {
                    openLeft = true;
                    numberDayShowEvent = dateDiff(event.end, day, "day");
                }
            }
        } else {
            openRight = true;
            numberDayShowEvent = dateDiff(endWeek, event.start, "day");
        }
    } else {
        if (!dateIsSame(day, event.start, "date")) return null;

        numberDayShowEvent = dateDiff(event.end, event.start, "day");
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div
                    className={cn({
                        "relative z-10 hover:bg-blue-500": true,
                        "text-[12px] text-white font-medium": true,
                        "px-2 rounded cursor-pointer bg-blue-400": true,
                        "flex items-center space-x-1 truncate": true,
                        "rounded-l-none": openLeft,
                        "rounded-r-none": openRight,
                        "rounded-none": openLeftAndRight
                    })}
                    style={{
                        width: cn({
                            [`calc(100% + ${1}px)`]: numberDayShowEvent === 0,
                            [`calc(200% + ${isSunday(day) ? 2 : 1}px)`]:
                                numberDayShowEvent === 1,
                            [`calc(300% + ${isSunday(day) ? 4 : 3}px)`]:
                                numberDayShowEvent === 2,
                            [`calc(400% + ${isSunday(day) ? 6 : 5}px)`]:
                                numberDayShowEvent === 3,
                            [`calc(500% + ${isSunday(day) ? 8 : 7}px)`]:
                                numberDayShowEvent === 4,
                            [`calc(600% + ${isSunday(day) ? 10 : 9}px)`]:
                                numberDayShowEvent === 5,
                            [`calc(700% + ${isSunday(day) ? 12 : 11}px)`]:
                                numberDayShowEvent === 6
                        })
                    }}
                >
                    {checkEvent(event).multipleDaysEvent.notAllDay && (
                        <span>{formatDate(event.start, "HH:MM")}</span>
                    )}

                    <span>{event.title}</span>
                </div>
            </PopoverTrigger>

            <EventDetails event={event} />
        </Popover>
    );
};

export default MultipleEventDay;
