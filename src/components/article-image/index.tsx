import { ARTICLE_PLACEHOLDER_IMAGE_URL } from "@/config";
import type { IArticle } from "@/models/article.model";
import type { HTMLAttributes } from "react";

type IArticleImageProps = HTMLAttributes<HTMLImageElement> & {
    article: IArticle;
};

export const ArticleImage: React.FC<IArticleImageProps> = ({
    article,
    ...props
}) => {
    return (
        <img
            {...props}
            src={article.cover_image ?? ARTICLE_PLACEHOLDER_IMAGE_URL}
            alt={article.title}
        />
    );
};
