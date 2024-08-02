import Day from "@/components/day.tsx";
import Weeks from "@/components/weeks.tsx";
import { DayType } from "@/types";

interface Props {
    days: DayType[];
}

const Calendar = (props: Props) => {
    const { days } = props;

    return (
        <div className="grid grid-cols-7 gap-0 text-sm rounded-lg">
            <Weeks />

            {days.map((item, index) => (
                <Day key={index} day={item} />
            ))}
        </div>
    );
};

export default Calendar;
