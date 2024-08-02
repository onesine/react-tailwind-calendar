import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { z } from "zod";

import DatePicker from "@/components/date-picker.tsx";
import LoadingIcon from "@/components/loading-icon.tsx";
import SelectWrapper from "@/components/select-wrapper.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { dateIsAfter } from "@/lib/date.ts";
import { storeAddEvent, storeUpdateEvent, useAppStore } from "@/store";
import { EventType } from "@/types";

interface Props {
    closeForm?: () => void;
}

const EVENT_TYPE_OPTIONS = [
    {
        value: "task",
        label: "Task"
    },
    {
        value: "event",
        label: "Event"
    }
];

const eventSchema = z
    .object({
        title: z.string().min(3, {
            message: "Le champ title doit comporter au moins 3 caractères."
        }),
        description: z
            .string()
            .min(10, {
                message:
                    "Le champ description doit comporter au moins 10 caractères."
            })
            .optional(),
        type: z.enum(["task", "event"]),
        allDay: z.boolean(),
        start: z.date({ message: "The field start date is not a valid date." }),
        end: z
            .date({ message: "The field start date is not a valid date." })
            .optional()
    })
    .refine(
        (value) => {
            if (value.type === "task") return true;

            return (
                value.type === "event" &&
                value.end &&
                dateIsAfter(value.end, value.start, "date")
            );
        },
        {
            path: ["end"],
            message: "The end date must be after the start date."
        }
    );

const EventForm = (props: Props) => {
    const { closeForm } = props;

    const [loading, setLoading] = useState(false);
    const [eventType, setEventType] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [allDay, setAllDay] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const editEvent = useAppStore((state) => state.editEvent);

    useEffect(() => {
        if (editEvent) {
            setEventType(editEvent.type);
            setStartDate(new Date(editEvent.start));
            setEndDate(editEvent.end ? new Date(editEvent.end) : undefined);
        }
    }, [editEvent]);

    const addEvent = useCallback(
        (data: EventType, afterStore?: () => void) => {
            setLoading(true);
            setTimeout(() => {
                /* Update store */
                storeAddEvent(data);

                /* Reset load & form */
                setLoading(false);
                setEventType("");
                setStartDate(undefined);
                setEndDate(undefined);
                afterStore && afterStore();

                /* Close form */
                closeForm && closeForm();
            }, 3000);
        },
        [closeForm]
    );

    const updateEvent = useCallback(
        (data: EventType, afterUpdate?: () => void) => {
            if (editEvent) {
                setLoading(true);
                setTimeout(() => {
                    /* Update Store */
                    storeUpdateEvent(editEvent.id, data);

                    /* Reset load & form */
                    setLoading(false);
                    setEventType("");
                    setStartDate(undefined);
                    setEndDate(undefined);
                    afterUpdate && afterUpdate();

                    /* Close form */
                    closeForm && closeForm();
                }, 3000);
            }
        },
        [closeForm, editEvent]
    );

    const handleSubmit = useCallback(
        (e: ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const sendData = {
                id: editEvent ? editEvent.id : Date.now().toString(),
                title: formData.get("title")?.toString() || "",
                description: formData.get("description")?.toString() || "",
                type: eventType as "task" | "event",
                allDay: allDay,
                start: startDate as Date,
                end: endDate || undefined
            };

            try {
                eventSchema.parse(sendData);

                Object.values(errors).length > 0 && setErrors({});
                editEvent
                    ? updateEvent(sendData, () => e.target.reset())
                    : addEvent(sendData, () => e.target.reset());
            } catch (e) {
                if (e instanceof z.ZodError) {
                    const errors: { [key: string]: string } = {};
                    e.errors.forEach((error) => {
                        errors[error.path[0]] = error.message;
                    });
                    setErrors(errors);
                }
            }
        },
        [
            addEvent,
            allDay,
            editEvent,
            endDate,
            errors,
            eventType,
            startDate,
            updateEvent
        ]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg">
            <DialogHeader>
                <DialogTitle>Add event</DialogTitle>

                <DialogDescription />
            </DialogHeader>

            <div className="space-y-8">
                <Input
                    placeholder="New event title"
                    type="text"
                    name="title"
                    error={errors?.title}
                    defaultValue={editEvent?.title}
                />

                <Textarea
                    placeholder="New event description"
                    name="description"
                    error={errors?.description}
                    defaultValue={editEvent?.description}
                />

                <SelectWrapper
                    placeholder="Select event type"
                    options={EVENT_TYPE_OPTIONS}
                    value={eventType}
                    onValueChange={(value) => setEventType(value)}
                    error={errors?.type}
                />

                {["task", "event"].includes(eventType) && (
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox
                                id="all-day"
                                checked={allDay}
                                onCheckedChange={() => setAllDay(!allDay)}
                            />
                            <Label htmlFor="all-day" className="cursor-pointer">
                                All day {eventType}
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4">
                            <DatePicker
                                withTime={!allDay}
                                placeholder="Start date"
                                date={startDate}
                                onSelect={setStartDate}
                                error={errors?.start}
                            />

                            {eventType !== "task" && (
                                <DatePicker
                                    withTime={!allDay}
                                    placeholder="End date"
                                    date={endDate}
                                    onSelect={setEndDate}
                                    error={errors?.end}
                                    disabled={
                                        startDate
                                            ? { before: startDate }
                                            : undefined
                                    }
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <DialogFooter>
                <DialogClose asChild disabled={loading}>
                    <Button variant="secondary" type="button">
                        Cancel
                    </Button>
                </DialogClose>

                <Button type="submit" disabled={loading}>
                    {loading && <LoadingIcon />}
                    {editEvent ? "Edit" : "Save"}
                </Button>
            </DialogFooter>
        </form>
    );
};

export default EventForm;
