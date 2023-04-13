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