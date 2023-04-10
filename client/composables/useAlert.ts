export const successMessage = (title: string, text: string) => {
    return useNuxtApp().$swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: "Хорошо",
    })
}
export const errorMessage = (text: String) => {
    return useNuxtApp().$swal.fire({
        title: "Ошибка",
        text: text, // "Повторите попытку позже",
        icon: "error",
        confirmButtonText: "Хорошо",
    });
};