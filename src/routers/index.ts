import {createBrowserRouter} from "react-router-dom";
import ParallelWorldView from "/@/pages";


const routers = createBrowserRouter(
    [
        {
            path: "/",
            Component: ParallelWorldView, // 平行世界
        }
    ],
    {
        future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionStatusRevalidation: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

export default routers;
