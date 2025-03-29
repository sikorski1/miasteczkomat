import { useState } from "react";
import { Button, Input, Textarea } from "@headlessui/react";

interface Product {
	name: string;
	photoUrl?: string;
	price: number;
	currency: "PLN" | "EUR" | "Waluta Studencka";
	description?: string;
	category?: string;
	personId: number;
	actionType: "SELL" | "RENT";
}

export default function AddProductModal() {
	const [product, setProduct] = useState<Product>({
		name: "",
		photoUrl: "",
		price: 0,
		currency: "Waluta Studencka",
		description: "",
		category: "",
		personId: 0,
		actionType: "SELL",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setProduct((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Product Submitted:", product);
	};

	return (
		<div className="w-full h-max bg-white shadow-lg rounded-2xl p-16">
			<h2 className="text-xl font-semibold">Add New Product</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					name="name"
					value={product.name}
					onChange={handleChange}
					placeholder="nazwa"
					required
				/>
				<Input
					name="photoUrl"
					value={product.photoUrl}
					onChange={handleChange}
					placeholder="Photo URL"
				/>
				<Input
					name="price"
					type="number"
					value={product.price}
					onChange={handleChange}
					placeholder="cena"
					required
				/>
				<select
					name="currency"
					value={product.currency}
					onChange={handleChange}
					className="w-full p-2 border rounded-md"
				>
					<option value="PLN">pln</option>
					<option value="EUR">eur</option>
					<option value="Waluta Studencka">waluta studencka</option>
				</select>
				<Textarea
					name="description"
					value={product.description}
					onChange={handleChange}
					placeholder="Description"
				/>
				<select
					name="category"
					value={product.category}
					onChange={handleChange}
					className="w-full p-2 border rounded-md"
				>
					<option value="ELEKTRONIKA">elektronika</option>
					<option value="ŻYWNOŚĆ">żywność</option>
					<option value="UBRANIA">ubrania</option>
					<option value="KUCHNIA">akcesoria kuchenne</option>
					<option value="INNE">inne</option>
					<option value="SPRZĄTANIE">środki czystości</option>
				</select>
				{/* <Input
					name="personId"
					type="number"
					value={product.personId}
					onChange={handleChange}
					placeholder="Person ID"
					required
				/> */}
				<select
					name="actionType"
					value={product.actionType}
					onChange={handleChange}
					className="w-full p-2 border rounded-md"
				>
					<option value="SELL">sprzedaj</option>
					<option value="RENT">pożycz</option>
				</select>
				<Button type="submit" className="pt-4 pb-4 pl-6 pr-6 bg-b-gray rounded-xl">
					Add Product
				</Button>
			</form>
		</div>
	);
}
