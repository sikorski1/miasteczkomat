import { createContext, useState, useContext } from "react";

const ProductContext = createContext({
	query: "", 
	setQuery: () => {}
});

export function ProductProvider({ children }) {
	const [query, setQuery] = useState("");

	return (
		<ProductContext.Provider value={{ query, setQuery }}>
			{children}
		</ProductContext.Provider>
	);
}

export function useProduct() {
	return useContext(ProductContext);
}