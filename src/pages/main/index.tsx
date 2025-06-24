import { ArticleCard } from "@/components/article-card";
import type { IArticle } from "@/models/article.model";
import { articleService } from "@/services/articles.service";
import { Select } from "antd";
import { useCallback } from "react";
import styles from "./main.module.css";
import { useSort, SORT_OPTION, selectSortOptions } from "@/hooks/use-sort";
import { usePagination } from "@/hooks/use-pagination";
import { useFetch } from "@/hooks/use-fetch";

export const MainPage = () => {
    const [sort, handleSortChange, sortArticlesByTitle] = useSort();
    const [Pagination, page, pageSize] = usePagination();

    const fetchFn = useCallback(
        () => articleService.getArticles(page, pageSize),
        [page, pageSize],
    );

    const renderSuccess = useCallback(
        (responseArticles: IArticle[], initialResponse: IArticle[] | null) => {
            let articles: IArticle[] = [];

            if (initialResponse && sort === SORT_OPTION.NONE) {
                articles = initialResponse;
            } else {
                articles = [...responseArticles].sort(sortArticlesByTitle());
            }

            return (
                <>
                    {articles.map((article) => (
                        <ArticleCard article={article} key={article.id} />
                    ))}
                </>
            );
        },
        [sort, sortArticlesByTitle],
    );

    const content = useFetch(fetchFn, renderSuccess);

    return (
        content && (
            <main className={styles.main}>
                <div className={styles.controls}>
                    <Pagination />
                    <Select
                        options={selectSortOptions}
                        placeholder="Select sort"
                        onChange={handleSortChange}
                    />
                </div>
                <section className={styles.articles}>{content}</section>
            </main>
        )
    );
};
