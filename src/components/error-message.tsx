import { cn } from "@/lib/utils.ts";

interface Props {
    message?: string;
    className?: string;
}

const ErrorMessage = (props: Props) => {
    const { message, className } = props;

    if (!message) return null;

    return <p className={cn("text-xs text-red-500", className)}>{message}</p>;
};

export default ErrorMessage;
