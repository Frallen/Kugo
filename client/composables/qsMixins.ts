import qs from "qs";
import {responseFilterType} from "~/types/catalog.types";
import {checkQueryPrice} from "~/composables/mixins";


// поиск конкретного элемента
export const filterDeal = (value: string | [number]): string => {
    return qs.stringify({
        populate: "deep",
        filters: {
            id: {
                $eq: value,
            },
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}

// пагинация 10 элементов на странице
export const pagination = (page: string): string => {
    return qs.stringify({
        populate: "deep",
        pagination: {
            page: page,
            pageSize: 10,
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}

// получение всех элементов
export const populate = (): string => {
    return qs.stringify(
        {
            populate: "deep",
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
};

//
export const chooseFilter = (value: string): string => {
    return qs.stringify({
        populate: "deep",
        filters: {
            category: {
                Slug: {
                    $eq: value,
                }

            },
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}



// фильтрация каталога
export const filterCatalog = (type: string, value?: responseFilterType, sort?: string): string => {

    return qs.stringify({
        sort: [sort],

        filters: {
            $and: [
                {
                    category: {
                        Title: {$eq: type}
                    }
                },

                {
                    ...(value && value.price && {
                        Price: {

                            $between: checkQueryPrice(value.price as string),

                        }
                    }),
                }, {
                    Weight: {

                        ...(value && value.weight?.includes("-") && {
                            $between: checkQueryPrice(value.weight as string),
                        }),
                        ...(value && !value.weight?.includes("-") && value.weight && parseInt(value.weight as string) <= 15 && {

                            $lt: value.weight,

                        }),
                        ...(value && !value.weight?.includes("-") && value.weight && parseInt(value.weight as string) >= 30 && {
                            $gt: value.weight,
                        }),
                    }
                },
                {
                    Scooter: {
                        $and: [
                            {
                                type_product: {
                                    Title: {$in: value && value.type_product}

                                }
                            },
                            {
                                user_type: {
                                    Title: {$in: value && value.user_type}
                                }

                            }
                        ]
                    }
                },

            ],

        },
    },);
}