import type { IArticle } from "@/models/article.model";
import { useState, useCallback } from "react";

export const SORT_OPTION = {
    NONE: "none",
    ALPHA_ASC: "alpha_asc",
    APHA_DESC: "alpha_desc",
} as const;

export type T_SORT_OPTION = (typeof SORT_OPTION)[keyof typeof SORT_OPTION];

const sortTitle = (sort: T_SORT_OPTION) => (a: IArticle, b: IArticle) => {
    const [articleLeft, articleRight] =
        sort === SORT_OPTION.ALPHA_ASC ? [a, b] : [b, a];

    return articleLeft.title
        .toLocaleLowerCase()
        .localeCompare(articleRight.title.toLocaleLowerCase());
};

export const useSort = () => {
    const [sort, setSort] = useState<T_SORT_OPTION>(SORT_OPTION.NONE);

    const sortArticlesByTitle = useCallback(() => sortTitle(sort), [sort]);

    const handleSortChange = (value: T_SORT_OPTION) => {
        setSort(value);
    };

    return [sort, handleSortChange, sortArticlesByTitle] as const;
};

export const selectSortOptions = [
    { value: SORT_OPTION.NONE, label: <span>w/o sort</span> },
    { value: SORT_OPTION.ALPHA_ASC, label: <span>A-Z</span> },
    { value: SORT_OPTION.APHA_DESC, label: <span>Z-A</span> },
];
