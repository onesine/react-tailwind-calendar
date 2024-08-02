import { CheckCircle2Icon } from "lucide-react";

import EventDetails from "@/components/event-details.tsx";
import { Popover, PopoverTrigger } from "@/components/ui/popover.tsx";
import { EventType } from "@/types";

interface Props {
    event: EventType;
}

const AllDaysTaskEvent = (props: Props) => {
    const { event } = props;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500 text-[12px] text-white font-medium px-2 rounded cursor-pointer">
                    {event.type === "task" && (
                        <CheckCircle2Icon className="h-3 w-3" />
                    )}

                    <span className="truncate">{event.title}</span>
                </div>
            </PopoverTrigger>

            <EventDetails event={event} />
        </Popover>
    );
};

export default AllDaysTaskEvent;
