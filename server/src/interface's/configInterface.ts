export interface usersBasketRowInterface extends configInterface{
    user_id: number,
    model_id: number,
    hashConfig: string,
}

interface configInterface {
    exterior_color: string,
    exterior_color_img: string,

    interior_color: string,
    interior_color_img: string,

    wheels: string,
    wheels_img: string,

    package_title: string,
    package_description: string,

    exhaust_title: string,
    exhaust_description: string,

    model_price: number,
}

