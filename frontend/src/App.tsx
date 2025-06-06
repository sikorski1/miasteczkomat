import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routing/Router";
const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Router></Router>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
