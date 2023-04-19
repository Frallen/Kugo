// общий интерфейс для элементов из каталога
export interface DetailItemType {
    id: number,
    attributes: ScooterItemType
}

export interface CatalogItemType {
    data: DetailItemType[]
    meta?: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        } | null
    }
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
    type_product: {
        data: productType
    },
    user_type: {
        data: userType
    },
    images: imageType,
    badges: badgesType,
    category: {
        data: categoryType
    },
}

export interface categoryType {
    attributes: {
        Title: string,
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
        Slug: string,
        Image: imageType,
    },
    id: number,
}

export interface productType {
    attributes: {
        Title: string,
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
    }
    id: number,
}

export interface userType {
    attributes: {
        Title: string,
        createdAt: string,
        publishedAt: string,
        updatedAt: string,
    }
    id: number,
}

interface badgesType {
    data: {
        id: number,
        attributes: {
            createdAt: string,
            publishedAt: string,
            title: string,
            updatedAt: string,
        }
    }
}

// Тип для изображений
interface imageType {
    data: {
        attributes: {
            alternativeText: null
            caption: null
            createdAt: string
            ext: ".png"
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

export interface Settings {
    id: number
    attributes: {
        Title: string
        Type: string
        Length?: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        Price?: number
        Default: boolean
    }
}

