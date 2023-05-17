import {useSessionStorage} from "@vueuse/core";
import {sessionType} from "~/types/catalog.types";
import {useMain} from "~/store/main";


export const overFlow = (state: boolean): void => {
    if (process.client) {
        if (state) {
            document.body.style.overflowY = "hidden";
        } else document.body.style.overflowY = "visible";
    }
};
export const setLoading = (loading: boolean): void => {
    useMain().isLoading = loading;
    overFlow(loading)
}

export const scrollTop = (): void => {
    if (process.client) {
        window.scrollTo({
            top: 300,
            behavior: "smooth",
        });
    }
}




export const sluggedCatalog = (): string => {
    const {params} = useRoute()
    switch (params.slug) {
        case "elektrosamokaty": {
            return "scooters"

        }
        case "elektrovelosipedy": {
            return "bicycles"

        }
        case "robot-pylesosy": {
            return "robots"

        }
        case "vesy": {
            return "scales"

        }
        default :
            return ""
    }
}

export const checkQueryPrice = (value: string): [number, number] => {
    return [parseInt(value.split('-')[0]), parseInt(value.split('-')[1])]
}