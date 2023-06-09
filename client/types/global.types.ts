export type datesType = {
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface metaType {
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

// Тип для изображений
export interface imageType {
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

export interface answersType extends metaType {
    data: answerItemType[]
}

export type answerItemType = {
    id: number,
    attributes: {
        Question: String,
        Answer: String
    } & datesType
}