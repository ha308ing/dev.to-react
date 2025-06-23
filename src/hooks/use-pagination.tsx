import { API_MAX_ARTICLES_COUNT, API_PER_PAGE_COUNT } from "@/config";
import { Pagination } from "antd";
import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(API_PER_PAGE_COUNT);

    const handlePaginationChange = (page: number, pageSize: number) => {
        setPage(page);
        setPageSize(pageSize);
    };

    return [
        () => (
            <Pagination
                current={page}
                defaultPageSize={pageSize}
                pageSize={pageSize}
                onChange={handlePaginationChange}
                showQuickJumper={true}
                showPrevNextJumpers={true}
                showSizeChanger={true}
                total={API_MAX_ARTICLES_COUNT}
                showLessItems={true}
            />
        ),
        page,
        pageSize,
    ] as const;
};
