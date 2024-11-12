import {createBrowserRouter} from "react-router-dom";
import ParallelWorldView from "/@/pages";


const routers = createBrowserRouter([
    {
        path: "/",
        Component: ParallelWorldView, // 平行世界
    }
]);

export default routers;
