export const overFlow = (state: boolean): void => {
    if (process.client) {
        if (state) {
            document.body.style.overflowY = "hidden";
        } else document.body.style.overflowY = "visible";
    }
};

export const scrollTop = (): void => {
    if (process.client) {
        window.scrollTo({
            top: 300,
            behavior: "smooth",
        });
    }
}
const weightSlugged=()=>{
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
export const sluggedType_product = (): string => {
    const {params} = useRoute()
    switch (params.type_product) {
        case  "vnedorozhnyy": {
            return "Внедорожный"
        }
        case "gorodskoy": {
            return "Городской"

        }
        case "zimniy": {
            return "Зимний"

        }
        default :
            return ""
    }
}
export const sluggedUser_type = (): string => {
    const {params} = useRoute()
    switch (params.user_type) {
        case  "dlya-vzroslogo": {
            return "Для взрослого"
        }
        case "dlya-pensionera": {
            return "Для пенсионера"

        }
        case "dlya-rebenka": {
            return "Для ребенка"

        }
        default :
            return ""
    }
}