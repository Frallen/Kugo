import {datesType, metaType} from "~/types/global.types";
import {DetailItemType} from "~/types/catalog.types";

export interface userType extends datesType {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    user_Favorites: {
        id: number
    }
}

export interface userResponseType {
    data: successUserType
    error: errorUserType
}

export interface successUserType {
    jwt: string,
    user: userType
}

export interface errorUserType {
    data: {
        data: null | {}
    }

    error: {
        details: {}
        message: string
        name: string
        status: number
    },
    fatal: boolean
    statusCode: number
    statusMessage: string
    unhandled: boolean
    __nuxt_error: boolean
}