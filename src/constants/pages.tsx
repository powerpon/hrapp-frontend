import Homepage from "../pages/Homepage";
import CandidateInfo from "../pages/CandidateInfo";

interface Page{
    path: string;
    element: JSX.Element;

}

const pages: Page[] = [
    {path: "/", element: <Homepage />},
    {path: "/candidate/info", element: <CandidateInfo />}
]

export {pages};
export type { Page };