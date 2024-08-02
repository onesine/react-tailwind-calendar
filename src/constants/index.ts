import { EventType } from "@/types";

export const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const EVENTS: EventType[] = [
    {
        id: "-4",
        title: "Event 0",
        description: "Event 0 description",
        type: "event",
        allDay: false,
        start: new Date("2024-06-20 14:00:00"),
        end: new Date("2024-08-10 15:00:00")
    },
    /*Task*/
    {
        id: "0",
        title: "Task 0",
        description: "Task 0 description",
        type: "task",
        allDay: false,
        start: new Date("2024-06-08 13:00:00"),
        end: undefined
    },
    {
        id: "1",
        title: "Task 1",
        description: "Task 1 description",
        type: "task",
        allDay: false,
        start: new Date("2024-07-01 13:00:00"),
        end: undefined
    },
    {
        id: "2",
        title: "Task 2",
        description: "Task 2 description",
        type: "task",
        allDay: false,
        start: new Date("2024-07-01 14:00:00"),
        end: undefined
    },
    {
        id: "3",
        title: "Task 3",
        description: "Task 3 description",
        type: "task",
        allDay: false,
        start: new Date("2024-07-01 15:00:00"),
        end: undefined
    },
    {
        id: "4",
        title: "Task 4",
        description: "Task 4 description",
        type: "task",
        allDay: false,
        start: new Date("2024-07-01 16:00:00"),
        end: undefined
    },

    /*Event*/
    {
        id: "5",
        title: "Event 5",
        description: "Event 5 description",
        type: "event",
        allDay: false,
        start: new Date("2024-07-04 14:00:00"),
        end: new Date("2024-07-04 15:00:00")
    },
    {
        id: "6",
        title: "Event 6",
        description: "Event 6 description",
        type: "event",
        allDay: false,
        start: new Date("2024-07-04 18:00:00"),
        end: new Date("2024-07-04 20:00:00")
    },

    /*Event all day*/
    {
        id: "7",
        title: "Event 7",
        description: "Event 7 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-09 00:00:00"),
        end: undefined
    },
    {
        id: "8",
        title: "Event 8",
        description: "Event 8 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-09 00:00:00"),
        end: undefined
    },
    {
        id: "9",
        title: "Event 9",
        description: "Event 9 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-09 00:00:00"),
        end: undefined
    },
    {
        id: "10",
        title: "Event 10",
        description: "Event 10 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-09 00:00:00"),
        end: undefined
    },

    /*All days multiple days event*/
    {
        id: "11",
        title: "Event 11",
        description: "Event 11 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-14 00:00:00"),
        end: new Date("2024-07-17 00:00:00")
    },
    {
        id: "12",
        title: "Event 12",
        description: "Event 12 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-14 00:00:00"),
        end: new Date("2024-07-18 00:00:00")
    },
    {
        id: "13",
        title: "Event 13",
        description: "Event 13 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-14 00:00:00"),
        end: new Date("2024-07-19 00:00:00")
    },
    {
        id: "14",
        title: "Event 14",
        description: "Event 14 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-14 00:00:00"),
        end: new Date("2024-07-20 00:00:00")
    },
    {
        id: "15",
        title: "Event 15",
        description: "Event 15 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-21 00:00:00"),
        end: new Date("2024-07-22 00:00:00")
    },
    {
        id: "16",
        title: "Event 16",
        description: "Event 16 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-21 00:00:00"),
        end: new Date("2024-07-23 00:00:00")
    },
    {
        id: "20",
        title: "Event 16 - 1",
        description: "Event 16 - 1 description",
        type: "event",
        allDay: true,
        start: new Date("2024-07-26 00:00:00"),
        end: new Date("2024-07-28 00:00:00")
    },

    /*Multiple days event*/
    {
        id: "17",
        title: "Event 17",
        description: "Event 17 description",
        type: "event",
        allDay: false,
        start: new Date("2024-07-21 13:00:00"),
        end: new Date("2024-07-25 08:00:00")
    },
    {
        id: "18",
        title: "Event 18",
        description: "Event 18 description",
        type: "event",
        allDay: false,
        start: new Date("2024-07-21 14:00:00"),
        end: new Date("2024-07-27 21:00:00")
    },
    {
        id: "18-1",
        title: "Event 18-1",
        description: "Event 18-1 description",
        type: "event",
        allDay: false,
        start: new Date("2024-07-23 14:00:00"),
        end: new Date("2024-07-23 21:00:00")
    },
    {
        id: "19",
        title: "Event 19",
        description: "Event 19 description",
        type: "event",
        allDay: false,
        start: new Date("2024-07-26 14:00:00"),
        end: new Date("2024-07-29 21:00:00")
    }
];

export const TIME_FIRST = "HH:MM";

export const DATE_WITHOUT_MONTH_FIRST = "dddd DD";

export const DATE_FIRST = "dddd, MMMM DD";

export const DATE_SECOND = "MMMM DD, YYYY";

export const DATE_THIRD = "dddd DD, YYYY";

export const DATE_TIME_FIRST = `${DATE_FIRST} ⋅ ${TIME_FIRST}`;

export const DATE_TIME_SECOND = `${DATE_SECOND} ⋅ ${TIME_FIRST}`;
