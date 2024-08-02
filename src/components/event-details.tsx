import { Clock2Icon, Edit2Icon, Trash2Icon } from "lucide-react";

import { PopoverContent } from "@/components/ui/popover.tsx";
import {
    DATE_FIRST,
    DATE_SECOND,
    DATE_THIRD,
    DATE_TIME_FIRST,
    DATE_TIME_SECOND,
    DATE_WITHOUT_MONTH_FIRST
} from "@/constants";
import { formatDate } from "@/lib/date.ts";
import { checkEvent } from "@/lib/utils.ts";
import {
    setStoreEditEvent,
    setStoreOpenConfirmAlertDialog,
    setStoreOpenEventForm,
    setStoreRemoveEvent
} from "@/store";
import { EventType } from "@/types";

interface Props {
    event: EventType;
}

const EventDetails = (props: Props) => {
    const { event } = props;

    return (
        <PopoverContent className="w-96 px-3 pt-1 pb-7">
            <div className="flex items-center justify-end">
                <button
                    onClick={() => {
                        setStoreEditEvent(event);
                        setStoreOpenEventForm(true);
                    }}
                    className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
                >
                    <Edit2Icon className="h-4 w-4 text-gray-500" />
                </button>

                <button
                    onClick={() => {
                        setStoreOpenConfirmAlertDialog(true);
                        setStoreRemoveEvent(event);
                    }}
                    className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
                >
                    <Trash2Icon className="h-4 w-4 text-gray-500" />
                </button>
            </div>

            <div className="flex items-start space-x-5 pl-6">
                <div className="bg-blue-500 w-4 h-4 rounded-md mt-2.5" />

                <div className="">
                    <h3 className="text-2xl font-light text-gray-600">
                        {event.title}
                    </h3>
                    <p className="text-sm text-gray-500">{event.description}</p>
                </div>
            </div>

            <br />

            <div className="flex items-center space-x-5 pl-6">
                <Clock2Icon className="w-4 h-4 rounded-md" />

                <div className="">
                    <p className="text-sm text-gray-800">
                        {(event.type === "task" || !event.end) && (
                            <>
                                {event.allDay ? (
                                    <>{formatDate(event.start, DATE_FIRST)}</>
                                ) : (
                                    <>
                                        {formatDate(
                                            event.start,
                                            DATE_TIME_FIRST
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {event.type === "event" && event.end && (
                            <>
                                {event.allDay ? (
                                    <>
                                        {checkEvent(event).multipleDaysEvent
                                            .anything ? (
                                            <>
                                                {formatDate(
                                                    event.start,
                                                    DATE_WITHOUT_MONTH_FIRST
                                                )}{" "}
                                                -{" "}
                                                {formatDate(
                                                    event.end,
                                                    DATE_THIRD
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                From{" "}
                                                {formatDate(
                                                    event.start,
                                                    DATE_SECOND
                                                )}{" "}
                                                to{" "}
                                                {formatDate(
                                                    event.end,
                                                    DATE_SECOND
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {checkEvent(event).multipleDaysEvent
                                            .anything ? (
                                            <>
                                                From{" "}
                                                {formatDate(
                                                    event.start,
                                                    DATE_TIME_SECOND
                                                )}{" "}
                                                to{" "}
                                                {formatDate(
                                                    event.end,
                                                    DATE_TIME_SECOND
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {formatDate(
                                                    event.start,
                                                    DATE_TIME_FIRST
                                                )}{" "}
                                                to{" "}
                                                {formatDate(event.end, "HH:MM")}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </PopoverContent>
    );
};

export default EventDetails;
