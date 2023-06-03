
import {datesType, metaType,imageType} from "~/types/global.types";


// Элемент из каталога
export interface CatalogItemType extends metaType {
    data: DetailItemType[]
}


// общий интерфейс для элементов из каталога
export interface DetailItemType {
    id: number,
    attributes: DealType
}

//интерфейс скутеров
export interface DealType {
    About: string
    Price: number
    Title: string
    Weight: number
    id: number
    oldPrice: number
    Services?: ServicesType
    Scooter: {
        max_speed: number,
        power: number,
        max_range: string,
        battery_capacity: number,
        charge_time: string,
        wheel_size: number,
        gabarits: string,
        maximum_load: number,
        lighting: string,
        guarantee: string,
        type_wheels: string,
        equipment: string,
        privod: string,
        stop_system: string,
        type_product: categoryType
        user_type: categoryType
    }

    images: imageType,
    badges: [string]
    category: {
        data: categoryItemType
    }
    OrderPrice: number | undefined
    OrderService: AdditionalType[]
}

// Интерфейс категорий товаров
export interface categoryType extends metaType {
    data: categoryItemType[]
}

type categoryItemType = {
    attributes: {
        Title: string,
        Slug: string,
        Image: imageType,
    } & datesType,
    id: number,
}

export interface sessionType {
    id: number,
    Price: number,
}
export interface filterPayloadType extends metaType{
    data:filterType[]
}
export interface filterType {
    id: number,
    attributes: {
        NameFilter: string,
        type_products?: categoryType
        user_types?: categoryType
        category: categoryType
        maxPrice: number
        minPrice: number
        Weight: weightType[]
    } & datesType
}


export interface weightType {
    id: number,
    Title: string,
    Value: number | string,
}


// Дополнительные услуги в деталке
export interface ServicesType extends metaType {
    data: ServicesItemType[]

}

export interface ServicesItemType {
    id: number
    attributes: {
        AdditionalService?: AdditionalType[]
        Name: string
        PackageColor?: [{
            Color: string

        } & AdditionalType]
        Warranty?: [{
            Length: string

        } & AdditionalType]

    } & datesType
}

export interface AdditionalType {
    Title: string
    Name: string
    Price: number
    id: number
    Uid: string
    Default?: boolean
}

export interface cookieOrderType {
    id: number
    OrderPrice?: number
    OrderService?: AdditionalType[]
}


export interface responseFilterType {
    price?: string
    type_product?: [string]
    user_type?: [string]
    weight?: string
}


export interface SelectFilterType {
    label: string,
    sort: string
}