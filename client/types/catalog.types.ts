// общий интерфейс для элементов из каталога
export interface CatalogItemType {
    id: number,
    attributes: ScooterItemType
}

//интерфейс скутеров
export interface ScooterItemType {
    Title: string;
    weight: number;
    max_speed: number;
    power: number;
    max_range: string;
    Price: number;
    discount_percent: number | null;
    battery_capacity: number;
    charge_time: string;
    wheel_size: number;
    gabarits: string;
    maximum_load: number;
    lighting: string;
    guarantee: string;
    type_wheels: string;
    equipment: string;
    privod: string;
    stop_system: string;
    type: string
    user_type: string;
    images: imageType;
    badges: badgesType;
    category: {
        data: categoryType
    };
}

export interface categoryType {
    attributes: {
        Title: string
        createdAt: string
        publishedAt: string
        updatedAt: string
        DefaultCategory?: boolean
    },
    id: number
}


interface badgesType {
    data: {
        id: number,
        attributes: {
            createdAt: string
            publishedAt: string
            title: string
            updatedAt: string
        }
    }
}

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