import { ArticleImage } from "@/components/article-image";
import { Text, Title } from "@/components/typography";
import type { IArticle } from "@/models/article.model";
import { articleService } from "@/services/articles.service";
import { Spin } from "antd";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useStatusState, LOADING_STATUS } from "@/hooks/use-status-state";
import { HomeButton } from "@/components/home-button";

export const ArticlePage = () => {
    const { id: articleId } = useParams();
    const { state: locationState } = useLocation();

    const [state, setState] = useStatusState<IArticle>();

    useEffect(() => {
        const articleFromLocation = locationState?.article;

        const isArticleInLocation = checkArticleInLocation(articleFromLocation);

        if (isArticleInLocation) {
            return setState({
                status: LOADING_STATUS.SUCCESS,
                data: articleFromLocation,
            });
        }

        if (articleId == undefined) {
            return setState({
                status: LOADING_STATUS.ERROR,
            });
        }

        (async () => {
            setState({ status: LOADING_STATUS.PENDING });

            const response = await articleService.getArticle(+articleId);

            if (response.success) {
                setState({
                    status: LOADING_STATUS.SUCCESS,
                    data: response.data,
                });
            } else {
                setState({ status: LOADING_STATUS.ERROR });
            }
        })();
    }, [locationState, articleId, setState]);

    let content;

    switch (state?.status) {
        case LOADING_STATUS.PENDING: {
            content = <Spin size="large" />;
            break;
        }
        case LOADING_STATUS.ERROR: {
            content = <Title level={2}>Failed to get article</Title>;
            break;
        }
        case LOADING_STATUS.SUCCESS: {
            const { data: article } = state;
            content = (
                <>
                    <ArticleImage
                        style={{
                            display: "block",
                            width: "100%",
                        }}
                        article={article}
                    />
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
    }

    return (
        <article
            style={{
                display: "flex",
                flexFlow: "column",
                maxInlineSize: "800px",
                marginInline: "auto",
            }}
        >
            {content}
            <HomeButton />
        </article>
    );
};

function checkArticleInLocation(article: unknown): article is IArticle {
    return article != undefined;
}
