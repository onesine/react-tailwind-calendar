import { useCallback, useRef, useState } from "react";

import LoadingIcon from "@/components/loading-icon.tsx";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button.tsx";
import {
    setStoreOpenConfirmAlertDialog,
    storeRemoveEvent,
    useAppStore
} from "@/store";

const ConfirmAlertDialog = () => {
    const open = useAppStore((state) => state.openConfirmAlertDialog);
    const removeEventId = useAppStore((state) => state.removeEvent?.id);
    const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

    const [loading, setLoading] = useState(false);

    const handleRemove = useCallback(() => {
        if (removeEventId) {
            setLoading(true);
            setTimeout(() => {
                storeRemoveEvent(removeEventId);
                setLoading(false);
                if (cancelButtonRef?.current) {
                    cancelButtonRef?.current.click();
                }
            }, 3000);
        }
    }, [removeEventId]);

    return (
        <AlertDialog open={open} onOpenChange={setStoreOpenConfirmAlertDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        remove this event or task from our server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel ref={cancelButtonRef}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="danger"
                        onClick={handleRemove}
                        disabled={loading}
                    >
                        {loading && <LoadingIcon />}
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmAlertDialog;
