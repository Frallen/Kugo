// Элемент из каталога
export interface CatalogItemType extends metaType {
    data: DetailItemType[]
}


// общий интерфейс для элементов из каталога
export interface DetailItemType {
    id: number,
    attributes: ScooterItemType
}

//интерфейс скутеров
export interface ScooterItemType {
    Title: string,
    About?: string,
    weight: number,
    max_speed: number,
    power: number,
    max_range: string,
    Price: number,
    discount_percent: number | null,
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
    type_product: commonFilterType

    user_type: commonFilterType

    images: imageType,
    badges: {
        data: badgesType
    },
    category: {
        data: categoryType
    }
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

export interface commonFilterType extends metaType {
    data: catalogType[]
}

// Интерфейс фильра
// Беру все из интерфейса categoryType кроме ключа Image
interface catalogType extends Omit<categoryType, "Image"> {

}


interface badgesType {
    id: number,
    attributes: {
        Title: string,
    } & datesType
}

// Дополнительные услуги в деталке
export interface Settings extends metaType {
    data: SettingsItemType[]

}

export interface SettingsItemType {
    id: number
    attributes: {
        Title: string
        Type: string
        Length?: string
        Price?: number
        Default: boolean
    } & datesType
}

// Тип для изображений
interface imageType {
    data: {
        attributes: {
            alternativeText: null
            caption: null
            createdAt: string
            ext: string
            formats: {}
            hash: string
            height: number
            mime: string
            name: string
            previewUrl: null
            provider: string
            provider_metadata: {}
            size: number
            updatedAt: string
            url: string
            width: number
        }
        id: number
    }
}


export interface responseFilterType {
    type_product?: [string]
    user_type?: [string]
    weight?: string | [number, number]
}

type datesType = {
    createdAt: string
    updatedAt: string
    publishedAt: string
}

interface metaType {
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}