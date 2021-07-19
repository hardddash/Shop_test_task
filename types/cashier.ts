enum sex {
    female = "female",
    male = "male"
}

export interface Cashier {
    cashier_id: number,
    cashier_name: string,
    cashier_surname: string,
    sex: sex,
    age: number,
    years_of_experience: number,
    previous_place_of_work: null | string,
    shop_id: number
}