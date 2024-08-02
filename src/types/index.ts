export interface EventType {
    id: string;
    title: string;
    description?: string;
    type: "task" | "event";
    allDay: boolean;
    start: Date;
    end?: Date;
    startDayEvents?: EventType[];
}

export interface DayType {
    date: Date;
    month: string;
    events: EventType[];
}

export interface PeriodType {
    start: Date;
    end: Date;
}
