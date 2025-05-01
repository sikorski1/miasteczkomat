import { useQuery } from "@tanstack/react-query";
import { useProduct } from "../../context/QueryContext";
import { Product } from "../../types/MainScreenTypes";
import { fetchAllProd } from "../../utils/api";
import { LoadingSpinner } from "../Loading/LoadingSpiner";
import ProductCard from "./ProductCard";
const data: Product[] = [
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
		photoUrl: "https://tropikalnystyl.pl/media/products/6c7896439faa25c28e060346a4249701/images/thumbnail/large_meski-sweter-czrny-1-.jpg?lm=1733583280.jpg",
		name: "Sweter dla Pana",
		description: "Super cieply dla Pana",
		dormitory: "Akropol",
		price: 32,
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
		photoUrl: "https://picsum.photos/200/300",
		name: "Produkt 2",
		description: "Opis produktu 2. Kolejny przykładowy opis produktu do wyświetlenia.",
		dormitory: "Filutek",
		price: 10,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
	{
		photoUrl: "https://tropikalnystyl.pl/media/products/6c7896439faa25c28e060346a4249701/images/thumbnail/large_meski-sweter-czrny-1-.jpg?lm=1733583280.jpg",
		name: "Sweter",
		description: "Super cieply ",
		dormitory: "Babilon",
		price: 12,
		currency: "waluta studencka",
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
    {
		photoUrl: "https://media.stockwatch.pl/uploads/2023/10/marcin_skotniczny_ceo_software_mansion_720.jpg",
		name: "Sweter z Marcinem",
		description: "Super cieply sweter z wizerunkiem Marcina Skotniczego",
		dormitory: "Filutek",
		price: 100,
		currency: "PLN",
		createdAt: "2024-04-24",
	},
];
export default function MainSection() {
	const { query } = useProduct();
	const { data: prodData, isLoading, error } = useQuery({ queryKey: ["all products", query], queryFn: ()=> fetchAllProd(query) });

	return !isLoading ? (
		<div className="p-2 grid grid-cols-2 gap-4">
			{prodData.map((item: Product, index: number) => (
				<ProductCard key={item.name + item.createdAt} data={item} index={index} />
			))}
		</div>
	) : (
		<LoadingSpinner></LoadingSpinner>
	);
}
