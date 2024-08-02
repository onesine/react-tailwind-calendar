import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { EventType } from "@/types";

export const useAppStore = create(
    devtools(
        persist(
            () => ({
                currentDate: new Date(),
                editEvent: null as null | EventType,
                openEventForm: false,
                events: [] as EventType[],
                removeEvent: null as null | EventType,
                openConfirmAlertDialog: false
            }),
            {
                name: "app-storage"
            }
        )
    )
);

export function setStoreCurrentMonth(date: Date) {
    useAppStore.setState({ currentDate: date });
}

export function storeAddEvent(event: EventType) {
    useAppStore.setState((state) => ({
        events: [...state.events, { ...event, id: Date.now().toString() }]
    }));
}

export function setStoreEvents(events: EventType[]) {
    useAppStore.setState({ events });
}

export function setStoreOpenEventForm(value: boolean) {
    useAppStore.setState(() => ({ openEventForm: value }));
}

export function setStoreOpenConfirmAlertDialog(value: boolean) {
    useAppStore.setState(() => ({ openConfirmAlertDialog: value }));
}

export function setStoreEditEvent(event: EventType | null) {
    useAppStore.setState(() => ({ editEvent: event }));
}

export function setStoreRemoveEvent(event: EventType | null) {
    useAppStore.setState(() => ({ removeEvent: event }));
}

export function storeRemoveEvent(id: string) {
    useAppStore.setState((state) => ({
        events: state.events.filter((item) => item.id !== id)
    }));
}

export function storeUpdateEvent(id: string, newEventData: EventType) {
    useAppStore.setState((state) => ({
        events: state.events.map((item) => {
            if (item.id !== id) return item;

            return {
                ...newEventData,
                id
            };
        })
    }));
}
