import { Fragment, useState } from "react";

import AllDaysTaskEvent from "@/components/all-days-task-event.tsx";
import EventDetails from "@/components/event-details.tsx";
import SimpleTaskEvent from "@/components/simple-task-event.tsx";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover.tsx";
import { dateIsSame, formatDate } from "@/lib/date.ts";
import { checkEvent, cn } from "@/lib/utils.ts";
import { setStoreEditEvent, setStoreOpenEventForm } from "@/store";
import { DayType } from "@/types";

interface Props {
    otherNumber: number;
    day: DayType;
}

const OtherDayEvent = (props: Props) => {
    const [open, setOpen] = useState(false);
    const { otherNumber, day } = props;

    if (otherNumber <= 0) return null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="cursor-pointer text-gray-800 overflow-hidden flex items-center flex-nowrap px-2 space-x-2 hover:bg-gray-100 rounded font-medium text-[12px]">
                {otherNumber} other{otherNumber > 1 ? "s" : ""}
            </PopoverTrigger>

            <PopoverContent className="w-52 px-3">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="text-center text-muted-foreground text-sm font-light leading-none">
                            {formatDate(day.date, "dddd")}
                        </h4>
                        <h3 className="text-center font-medium text-gray-700 text-3xl">
                            {new Date(day.date).getDate()}
                        </h3>
                    </div>

                    <div className="text-[12px] space-y-0.5">
                        {day.events.map((item, index) => (
                            <Fragment key={index}>
                                {checkEvent(item).multipleDaysEvent
                                    .anything && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div
                                                className={cn({
                                                    "bg-blue-400 hover:bg-blue-500 text-[12px]":
                                                        true,
                                                    "text-white font-medium px-2 rounded cursor-pointer":
                                                        true,
                                                    "rounded-r-none": !(
                                                        item.end &&
                                                        dateIsSame(
                                                            item.end,
                                                            day.date,
                                                            "date"
                                                        )
                                                    ),
                                                    "rounded-l-none":
                                                        !dateIsSame(
                                                            item.start,
                                                            day.date,
                                                            "date"
                                                        )
                                                })}
                                                onClick={() => {
                                                    setStoreEditEvent(item);
                                                    setStoreOpenEventForm(true);
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                        </PopoverTrigger>

                                        <EventDetails event={item} />
                                    </Popover>
                                )}

                                {checkEvent(item).allDaysTaskOrEvent && (
                                    <AllDaysTaskEvent event={item} />
                                )}

                                {checkEvent(item).simpleTaskOrEvent && (
                                    <SimpleTaskEvent event={item} />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default OtherDayEvent;
