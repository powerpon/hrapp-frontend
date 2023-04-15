import "./styles/index.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {pages} from "./constants/pages";

const router = createBrowserRouter(pages);

export default function App() {
    return(
        <RouterProvider router={router} />
    );
}