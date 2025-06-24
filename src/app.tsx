import { createBrowserRouter, RouterProvider } from "react-router";
import { ROUTES } from "@/config";
import { MainPage } from "@/pages/main";
import { ArticlePage } from "@/pages/article";
import { NotFoundPage } from "./pages/not-found";

const router = createBrowserRouter([
    {
        path: ROUTES.ROOT,
        Component: MainPage,
    },
    {
        path: `/${ROUTES.ARTICLE}:id`,
        Component: ArticlePage,
    },
    {
        path: "*",
        Component: NotFoundPage,
    },
]);

export const App = () => <RouterProvider router={router} />;
