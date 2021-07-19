enum day {
    Monday = "Mo",
    Tuesday = "Tu",
    Wednesday = "We",
    Thursday = "Th",
    Friday = "Fr",
    Saturday = "Sa",
    Sunday = "Su"
}

enum shift {
    day = "day",
    night = "night"
}

export interface Scheduler {
    scheduler_id: number,
    day_of_week: day,
    shift_time: shift,
    cashier_id: number,
    shop_id: number
}
