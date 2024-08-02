import { PlusIcon } from "lucide-react";

import EventForm from "@/components/event-form.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import { setStoreEditEvent, setStoreOpenEventForm, useAppStore } from "@/store";

const CreateButton = () => {
    const openEventForm = useAppStore((state) => state.openEventForm);

    return (
        <Dialog
            open={openEventForm}
            onOpenChange={(value) => {
                setStoreOpenEventForm(value);
                !value && setStoreEditEvent(null);
            }}
        >
            <DialogTrigger asChild>
                <Button size="icon">
                    <PlusIcon className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <EventForm
                    closeForm={() => {
                        setStoreOpenEventForm(false);
                        setStoreEditEvent(null);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default CreateButton;
