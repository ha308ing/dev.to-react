import { Title } from "@/components/typography";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";

export const LOADING_STATUS = {
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error",
} as const;

type TFetchFn<T> = () => Promise<
    { success: false } | { success: true; data: T }
>;
type TSuccessRender<T> = (
    data: T,
    initialResponse: null | T,
) => React.ReactNode;

export const useFetch = <T = unknown,>(
    fetchFn: TFetchFn<T>,
    successRender: TSuccessRender<T>,
    pendingRender: () => React.ReactNode = pendingRenderDefault,
    errorRender: () => React.ReactNode = errorRenderDefault,
) => {
    const [state, setState] = useState<
        | { status: typeof LOADING_STATUS.PENDING }
        | { status: typeof LOADING_STATUS.SUCCESS; data: T }
        | { status: typeof LOADING_STATUS.ERROR }
    >();

    const initialResponse = useRef<T>(null);

    useEffect(() => {
        (async () => {
            setState({ status: LOADING_STATUS.PENDING });

            const response = await fetchFn();

            if (response.success) {
                initialResponse.current = response.data;

                setState({
                    status: LOADING_STATUS.SUCCESS,
                    data: response.data,
                });
            } else {
                setState({ status: LOADING_STATUS.ERROR });
            }
        })();
    }, [fetchFn]);

    let content;

    switch (state?.status) {
        case LOADING_STATUS.PENDING: {
            content = pendingRender();
            break;
        }
        case LOADING_STATUS.ERROR: {
            content = errorRender();
            break;
        }
        case LOADING_STATUS.SUCCESS: {
            content = successRender(state.data, initialResponse.current);
            break;
        }
    }

    return content;
};

function pendingRenderDefault() {
    return <Spin size="large" />;
}

function errorRenderDefault() {
    return <Title level={2}>Failed to get resource</Title>;
}
