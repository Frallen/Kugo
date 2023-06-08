import * as yup from "yup";

export const RegSchema = () => {
    return yup.object({
        email: yup
            .string()
            .email(() => email())
            .required(() => required()),
        password: yup
            .string()
            .min(6, () => min6())
            .required(),
    });
};

export const AuthSchema = () => {
    return yup.object({
        email: yup
            .string()
            .email(() => email())
            .required(() => required()),
        password: yup
            .string()
            .min(6, () => min6())
            .required(() => required()),
    });
};

export const ServiceSchema = () => {
    return yup.object({
        Option: yup.string().required(required()),
        Phone: yup
            .string()
            .matches(
                /^(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/,
                "Не верный номер телефона"
            )
            .required(() => required()),
    })
}

let min6 = () => "Минимальная длина пароля 6 символов";
let required = () => "Это обязательное поле";
let email = () => "Не является почтой";


/*
export const usePhone = () => {
    return yup.object({
        phone: yup
            .string()
            .matches(
                /^(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))$/,
                "Не верный номер телефона"
            )
            .required(() => required()),
    });
};
export const useReview = () => {
    return yup.object({
        title: yup.string().required(() => required()),
        text: yup.string().required(() => required()),
    });
};
export const useInfo = () => {
    return yup.object({
        userName: yup.string().ensure(),
        email: yup.string().email(() => email()),
    });
};
export const usePassword = () => {
    return yup.object({
        CurrentPassword: yup
            .string()
            .min(8, () => min8())
            .required(() => required()),
        NewPassword: yup
            .string()
            .min(8, () => min8())
            .required(() => required()),
    });
};*/