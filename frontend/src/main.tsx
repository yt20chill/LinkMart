// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./services/query.config.ts";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		{/* <ErrorBoundary FallbackComponent={ErrorFallBack}> */}
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</BrowserRouter>
		{/* </ErrorBoundary> */}
	</React.StrictMode>
);
