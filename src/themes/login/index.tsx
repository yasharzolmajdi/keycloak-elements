import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";

const Login = lazy(() => import("./pages/Login"));

export default function KcApp(props: { kcContext: KcContext; }) {

    const { kcContext } = props;

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl": return <Login {...{ kcContext }} />;
                    default: return <div>Page not found!</div>;
                }
            })()}
        </Suspense>
    );

}
