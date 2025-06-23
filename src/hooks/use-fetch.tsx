import { Title } from "@/components/typography";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";

export const LOADING_STATUS = {
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error",
} as const;

export const useFetch = <T = unknown,>(
    fetchFn: () => Promise<{ success: false } | { success: true; data: T }>,
    successRender: (data: T, initialResponse: null | T) => React.ReactNode,
    pendingRender: () => React.ReactNode = () => <Spin size="large" />,
    errorRender: () => React.ReactNode = () => (
        <Title level={2}>Failed to get resource</Title>
    ),
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
