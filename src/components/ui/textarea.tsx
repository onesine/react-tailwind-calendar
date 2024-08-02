import * as React from "react";

import ErrorMessage from "@/components/error-message.tsx";
import { cn } from "@/lib/utils";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <div className="relative">
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-950/20 focus:border-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
                        className
                    )}
                    ref={ref}
                    {...props}
                />

                <ErrorMessage className="absolute" message={error} />
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
