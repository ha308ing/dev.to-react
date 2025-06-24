import { API_PER_PAGE_COUNT, API_URL, API_TAG } from "@/config";
import type { IArticle } from "@/models/article.model";

type ServiceResponse<T = IArticle[]> =
    | { success: true; data: T }
    | { success: false };

class ArticleService {
    private readonly fail = { success: false } as const;

    private async fetch<Response = unknown>(
        queryString: string,
    ): Promise<ServiceResponse<Response>> {
        try {
            const response = await fetch(API_URL + queryString, {
                method: "GET",
            });

            if (!response.ok || response.status != 200) {
                return this.fail;
            }

            const articles = await response.json();

            return { success: true, data: articles };
        } catch {
            return this.fail;
        }
    }

    public async getArticles(
        pageNumber = 0,
        perPageCount = API_PER_PAGE_COUNT,
        tag = API_TAG,
    ): Promise<ServiceResponse> {
        if (perPageCount < 1) {
            perPageCount = API_PER_PAGE_COUNT;
        }

        const queryString = `?tag=${tag}&page=${pageNumber}&per_page=${perPageCount}`;

        return await this.fetch(queryString);
    }

    public async getArticle(articleId: number) {
        const queryString = `/${articleId}`;

        return await this.fetch<IArticle>(queryString);
    }
}

export const articleService = new ArticleService();
