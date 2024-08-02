import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Matcher } from "react-day-picker";

import ErrorMessage from "@/components/error-message.tsx";
import { TimePicker } from "@/components/time-picker.tsx";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

interface Props {
    withTime?: boolean;
    placeholder?: string;
    date?: Date;
    onSelect?: (date: Date | undefined) => void;
    error?: string;
    disabled?: Matcher | Matcher[] | undefined;
}

const DatePicker = (props: Props) => {
    const {
        placeholder = "Pick a date",
        date,
        onSelect,
        error,
        disabled,
        withTime = false
    } = props;

    const currentMonth = useAppStore((state) => state.currentDate);

    return (
        <Popover>
            <div className="relative w-full">
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                            format(date, `PPP${withTime ? " HH:mm:ss" : ""}`)
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>

                <ErrorMessage className="absolute" message={error} />
            </div>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onSelect}
                    initialFocus
                    defaultMonth={currentMonth}
                    disabled={disabled}
                />

                {withTime && (
                    <div className="p-3 border-t border-border">
                        <TimePicker setDate={onSelect} date={date} />
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;
