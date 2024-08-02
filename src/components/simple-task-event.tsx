import { CheckCircle2Icon } from "lucide-react";

import EventDetails from "@/components/event-details.tsx";
import { Popover, PopoverTrigger } from "@/components/ui/popover.tsx";
import { formatDate } from "@/lib/date.ts";
import { EventType } from "@/types";

interface Props {
    event: EventType;
}

const SimpleTaskEvent = (props: Props) => {
    const { event } = props;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="cursor-pointer overflow-hidden flex items-center flex-nowrap px-2 space-x-2 hover:bg-gray-100 rounded">
                    <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
                    <div className="flex-1 flex items-center space-x-1 text-[12px] flex-nowrap overflow-hidden truncate">
                        <span className="text-gray-500">
                            {formatDate(event.start, "HH:MM")}
                        </span>

                        {event.type === "task" && (
                            <CheckCircle2Icon className="h-3 w-3" />
                        )}

                        <span className="font-medium">{event.title}</span>
                    </div>
                </div>
            </PopoverTrigger>

            <EventDetails event={event} />
        </Popover>
    );
};

export default SimpleTaskEvent;
