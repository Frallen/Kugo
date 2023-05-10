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
    Basic: {
        About: string
        Price: number
        Title: string
        Weight: number
        id: number
        oldPrice: number
        Services?:ServicesType
    }
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
    images: imageType,
    badges: [string]
    category: {
        data: categoryItemType
    }
    OrderPrice?: number
    OrderService?: AdditionalType[]
}

// Интерфейс категорий товаров
export interface categoryType extends metaType {
    data: categoryItemType
}

type categoryItemType = {
    attributes: {
        Title: string,
        Slug: string,
        Image: imageType,
    } & datesType,
    id: number,
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
        weight: weightType[]
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
    Price: number
    id: number
    Uid: string
    Default?: boolean
}


// Тип для изображений
interface imageType {
    data: [{
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
    ]
}


export interface responseFilterType {
    price?: string
    type_product?: [string]
    user_type?: [string]
    weight?: string
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

export interface SelectFilterType {
    label: string,
    sort: string
}