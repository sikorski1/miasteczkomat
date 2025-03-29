import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/MainScreenTypes";
import { fetchAllProd } from "../../utils/api";
import { LoadingSpinner } from "../Loading/LoadingSpiner";
import ProductCard from "./ProductCard";
const data: Product[] = [
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 1",
		description: "Opis produktu 1. To jest przykładowy opis produktu.",
		dormitory: "Filutek",
		price: 10,
		currency: "pln",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 2",
		description: "Opis produktu 2. Kolejny przykładowy opis produktu do wyświetlenia.",
		dormitory: "Filutek",
		price: 10,
		currency: "pln",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 3",
		description: "Opis produktu 3. To jest kolejny przykładowy opis dla produktu.",
		dormitory: "Filutek",
		price: 10,
		currency: "pln",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 4",
		description: "Opis produktu 4. Przykład czwartego produktu z opisem.",
		dormitory: "Filutek",
		price: 10,
		currency: "pln",
		createdAt: "2024-04-24",
	},
];
export default function MainSection() {
	const { data: prodData, isLoading, error } = useQuery({ queryKey: ["all products"], queryFn: fetchAllProd });
    
	console.log(prodData);
	return true ? (
		<div className="p-2 grid grid-cols-2 gap-4">
			{data.map((item: Product, index: number) => (
				<ProductCard key={item.name + item.createdAt} data={item} index={index} />
			))}
		</div>
	) : (
		<LoadingSpinner></LoadingSpinner>
	);
}
