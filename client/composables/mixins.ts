export const overFlow = (state: boolean): void => {
    if (state) {
        document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "visible";
};

export const scrollTop = (): void => {
    window.scrollTo({
        top: 300,
        behavior: "smooth",
    });
}

export const typeItem = (): string => {
    const {params}=useRoute()
    switch (true) {
        case params.slug === "elektrosamokaty": {
            return "scooters"

        }
        case params.slug === "elektrovelosipedy": {
            return "bicycles"

        }
        case params.slug === "robot-pylesosy": {
            return "robots"

        }
        case params.slug === "vesy": {
            return "scales"

        }
        default :
            return "scooters"
    }
}