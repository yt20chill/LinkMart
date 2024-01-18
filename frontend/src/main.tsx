import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./services/query.config.ts";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./components/ui/ErrorFallBack.tsx";
import { useAuthStore } from "./services/stores/authStore.ts";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallBack} onReset={()=>{
			localStorage.removeItem('abc')
			useAuthStore.getState().reset() // Reset State

			// Backend -> Stateless  State-> Database
			// Frontend-> State
		}}>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<App />
					{/* <ReactQueryDevtools initialIsOpen={true} client={queryClient}/> */}
				</QueryClientProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
