import axios from "axios";
import { URL } from "./url";
const data: Product[] = [
	{
		photoUrl: "https://media.stockwatch.pl/uploads/2023/10/marcin_skotniczny_ceo_software_mansion_720.jpg",
		name: "Sweter z Marcinem",
		description: "Super cieply sweter z wizerunkiem Marcina Skotniczego",
		dormitory: "Filutek",
		price: 100,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 1",
		description: "Opis produktu 1. To jest przykładowy opis produktu.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://moraj.pl/40151-large_default/cieply-sweter-damski-ze-splotem-warkoczowym.webp",
		name: "Sweter cieply",
		description: "Super cieply",
		dormitory: "Filutek",
		price: 100,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 2",
		description: "Opis produktu 2. Kolejny przykładowy opis produktu do wyświetlenia.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl:
			"https://tropikalnystyl.pl/media/products/6c7896439faa25c28e060346a4249701/images/thumbnail/large_meski-sweter-czrny-1-.jpg?lm=1733583280.jpg",
		name: "Sweter dla Pana",
		description: "Super cieply dla Pana",
		dormitory: "Akropol",
		price: 32,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl:
			"https://tropikalnystyl.pl/media/products/6c7896439faa25c28e060346a4249701/images/thumbnail/large_meski-sweter-czrny-1-.jpg?lm=1733583280.jpg",
		name: "Sweter",
		description: "Super cieply ",
		dormitory: "Babilon",
		price: 12,
		currency: "waluta studencka",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 1",
		description: "Opis produktu 1. To jest przykładowy opis produktu.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 2",
		description: "Opis produktu 2. Kolejny przykładowy opis produktu do wyświetlenia.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 3",
		description: "Opis produktu 3. To jest kolejny przykładowy opis dla produktu.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 4",
		description: "Opis produktu 4. Przykład czwartego produktu z opisem.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
];
export const fetchAllProd = async (query: string): Promise<any> => {
	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	try {
		if (query) {
			await delay(5000);
			// const response = await axios.post(`${URL}/query`, query);
			// return response.data;
			return [data[0], data[2], data[4], data[5]];
		}
		// const response = await axios.get(`${URL}/all-products`);
		// return response.data;
		return data;
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
