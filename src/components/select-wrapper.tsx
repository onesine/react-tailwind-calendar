import ErrorMessage from "@/components/error-message.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

interface OptionType {
    value: string;
    label: string;
}

interface Props {
    value?: string;
    onValueChange?: (value: string) => void;
    options?: OptionType[];
    placeholder?: string;
    name?: string;
    error?: string;
}

const SelectWrapper = (props: Props) => {
    const {
        options = [],
        onValueChange,
        placeholder = "Placeholder",
        name,
        value,
        error
    } = props;

    return (
        <div className="relative">
            <Select onValueChange={onValueChange} name={name} value={value}>
                <SelectTrigger className="">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item, index) => (
                        <SelectItem
                            key={index}
                            value={item.value}
                            className="cursor-pointer"
                        >
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <ErrorMessage className="absolute" message={error} />
        </div>
    );
};

export default SelectWrapper;
