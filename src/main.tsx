import "./polyfill-buffer";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RootErrorBoundary } from "@/components/RootErrorBoundary";
import { EventsProvider } from "@/context/EventsContext";
import App from "./App";
import "./index.css";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <BrowserRouter basename={routerBasename || undefined}>
        <EventsProvider>
          <App />
        </EventsProvider>
      </BrowserRouter>
    </RootErrorBoundary>
  </StrictMode>,
);
