import { ChevronLeft, ChevronRight } from "lucide-react";

import CreateButton from "@/components/create-button.tsx";
import { Button } from "@/components/ui/button.tsx";
import { formatDate } from "@/lib/date.ts";

interface Props {
    currentMonth: Date;
    onNavigateInMonth: (position: "previous" | "next") => void;
}

const Header = (props: Props) => {
    const { onNavigateInMonth, currentMonth } = props;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 mb-3">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onNavigateInMonth("previous")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onNavigateInMonth("next")}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <CreateButton />
            </div>

            <div className="text-gray-600">
                {formatDate(currentMonth, "MMM")}{" "}
                {new Date(currentMonth).getFullYear()}
            </div>
        </div>
    );
};

export default Header;
