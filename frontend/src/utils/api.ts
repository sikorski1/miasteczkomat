import axios from "axios";
import { URL } from "./url";
export const fetchAllProd = async (): Promise<any> => {
	try {
		const response = await axios.get(`${URL}/all-products`);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw new Error("Failed to fetch products data");
	}
};
export const getProdByQuery = async ({ query }: { query: any }): Promise<any> => {
	try {
		const response = await axios.post(`${URL}/query`, query);
		return response.data;
	} catch (error) {
		console.error("Error fetching products by query:", error);
		throw new Error("Failed to fetch products by query data");
	}
};
export const postProd = async ({ data }: { data: any }): Promise<any> => {
	try {
		const response = await axios.post(`${URL}/upload`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error posting product:", error);
		throw new Error("Failed to post product data");
	}
};
