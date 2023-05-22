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