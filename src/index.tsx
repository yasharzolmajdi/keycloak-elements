import { StrictMode, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { kcContext as kcLoginThemeContext } from "./themes/login/kcContext";

import "./index.css";

const LoginTheme = lazy(() => import("./themes/login"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Suspense>
      {(() => {
        if (kcLoginThemeContext !== undefined) {
          return <LoginTheme kcContext={kcLoginThemeContext} />;
        }

        return null;
      })()}
    </Suspense>
  </StrictMode>
);
