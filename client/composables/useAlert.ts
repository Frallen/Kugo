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

export const AddedToBasket = () => {
    return useNuxtApp().$swal.fire({
        toast: true, icon: "success",
        title: "Товар успешно добавлен корзину!",
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
            toast.addEventListener("mouseenter", useNuxtApp().$swal.stopTimer);
            toast.addEventListener("mouseleave", useNuxtApp().$swal.resumeTimer);
        },
    });

};

export const Confirm = (title: String, text?: String) => {
    return useNuxtApp().$swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6F73EE",
        cancelButtonColor: "#5D6C7B",
        confirmButtonText: "Подтвердить",
        cancelButtonText: "Отменить",
    });
};
