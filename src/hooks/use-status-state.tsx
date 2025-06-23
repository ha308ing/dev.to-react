import { useState } from "react";

export const LOADING_STATUS = {
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error",
} as const;

export const useStatusState = <T = unknown,>() => {
    const [status, setStatus] = useState<
        | { status: typeof LOADING_STATUS.PENDING }
        | { status: typeof LOADING_STATUS.SUCCESS; data: T }
        | { status: typeof LOADING_STATUS.ERROR }
    >();

    return [status, setStatus] as const;
};
