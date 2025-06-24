import { ArticleImage } from "@/components/article-image";
import { Text, Title } from "@/components/typography";
import type { IArticle } from "@/models/article.model";
import { articleService } from "@/services/articles.service";
import { useCallback } from "react";
import { useLocation, useParams } from "react-router";
import { HomeButton } from "@/components/home-button";
import { useFetch } from "@/hooks/use-fetch";
import styles from "./article.module.css";

export const ArticlePage = () => {
    const params = useParams();
    const location = useLocation();

    const fetchFn = useCallback(() => {
        const articleInLocation = location.state?.article;

        const isArticleInLocation = checkArticleInLocation(articleInLocation);

        if (isArticleInLocation) {
            return Promise.resolve({
                success: true,
                data: articleInLocation,
            } as const);
        } else if (params?.id != undefined) {
            return articleService.getArticle(+params.id);
        } else {
            return Promise.resolve({ success: false } as const);
        }
    }, [params, location]);

    const content = useFetch<IArticle>(fetchFn, renderSuccess);

    return (
        <article className={styles.article}>
            {content}
            <HomeButton />
        </article>
    );
};

function checkArticleInLocation(article: unknown): article is IArticle {
    return article != undefined;
}

function renderSuccess(article: IArticle) {
    return (
        <>
            <ArticleImage className={styles.articleImage} article={article} />
            <Title level={1}>{article?.title}</Title>
            <ul>
                <li>
                    <Text>Description: {article?.description}</Text>
                </li>
                <li>
                    <Text>
                        {`Published: ${new Date(article?.published_at).toLocaleString()}`}
                    </Text>
                </li>
                <li>
                    <Text>Tags: {article?.tags}</Text>
                </li>
            </ul>
        </>
    );
}
