import { ArticleCard } from "@/components/article-card";
import { Title } from "@/components/typography";
import type { IArticle } from "@/models/article.model";
import { articleService } from "@/services/articles.service";
import { Select, Spin } from "antd";
import { useEffect, useRef } from "react";
import styles from "./main.module.css";
import { useSort, SORT_OPTION, selectSortOptions } from "@/hooks/use-sort";
import { usePagination } from "@/hooks/use-pagination";
import { useStatusState, LOADING_STATUS } from "@/hooks/use-status-state";

export const MainPage = () => {
    const [state, setState] = useStatusState<IArticle[]>();
    const [sort, handleSortChange, sortArticlesByTitle] = useSort();
    const [Pagination, page, pageSize] = usePagination();
    const articlesResponse = useRef<IArticle[]>([]);

    useEffect(() => {
        (async () => {
            setState({ status: LOADING_STATUS.PENDING });

            const response = await articleService.getArticles(page, pageSize);

            if (response.success) {
                articlesResponse.current = response.data;

                setState({
                    status: LOADING_STATUS.SUCCESS,
                    data: response.data,
                });
            } else {
                setState({ status: LOADING_STATUS.ERROR });
            }
        })();
    }, [page, pageSize, setState]);

    let content = null;

    switch (state?.status) {
        case LOADING_STATUS.SUCCESS: {
            const articles =
                sort === SORT_OPTION.NONE
                    ? articlesResponse.current
                    : [...state.data].sort(sortArticlesByTitle());

            content = articles.map((article) => (
                <ArticleCard article={article} key={article.id} />
            ));
            break;
        }
        case LOADING_STATUS.ERROR: {
            content = <Title level={2}>Failed to get articles</Title>;
            break;
        }
        case LOADING_STATUS.PENDING: {
            content = <Spin size="large" />;
            break;
        }
    }

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
