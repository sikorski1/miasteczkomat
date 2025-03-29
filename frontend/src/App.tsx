import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { ProductProvider } from "./context/QueryContext";
import Router from "./routing/Router";


const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ProductProvider>
				<BrowserRouter>
					<Router></Router>
				</BrowserRouter>
			</ProductProvider>
		</QueryClientProvider>
	);
}

export default App;
