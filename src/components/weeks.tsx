import { WEEK_DAYS } from "@/constants";
import { cn } from "@/lib/utils.ts";

const Weeks = () => {
    return (
        <>
            {WEEK_DAYS.map((item, index) => (
                <div
                    key={index}
                    className={cn({
                        "bg-[#FAFAFA] font-medium text-gray-500": true,
                        "px-2 py-4 text-center w-[160px] xl:w-auto": true,
                        "border-y border-r text-sm": true,
                        "border-x rounded-tl-lg": index === 0,
                        "rounded-tr-lg": index + 1 === WEEK_DAYS.length
                    })}
                >
                    {item}
                </div>
            ))}
        </>
    );
};

export default Weeks;
