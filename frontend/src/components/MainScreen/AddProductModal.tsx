import { useState } from "react";
import { Button, Input, Textarea } from "@headlessui/react";

interface Product {
	name: string;
	photoUrl?: string;
	price: number | undefined;
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
		price: undefined,
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
		<div className="w-full h-max bg-white shadow-lg rounded-2xl p-16 flex-col justify-center">
			<p className=" text-3xl font-semibold mb-8 text-center">wystaw nowy produkt</p>
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					className={"p-2 border rounded-md divide-solid border-[#dfdfdf]"}
					name="name"
					value={product.name}
					onChange={handleChange}
					placeholder="nazwa"
					required
				/>
				<div className="w-full flex items-center">
					<label
						htmlFor="file-upload"
						className="w-full cursor-pointer rounded-lg bg-white text-black p-2 border rounded-md divide-solid border-[#dfdfdf] transition"
					>
						dodaj zdjęcie
					</label>
					<input
						id="file-upload"
						name="photoUrl"
						type="file"
						className="hidden"
						onChange={handleChange}
					/>
				</div>
				<p className="text-1xl">{product.photoUrl}</p>
				<Input
					className={"w-full p-2 border rounded-md divide-solid border-[#dfdfdf]"}
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
					className="w-full p-2 border rounded-md divide-solid border-[#dfdfdf]"
				>
					<option value="PLN">pln</option>
					<option value="EUR">eur</option>
					<option value="Waluta Studencka">waluta studencka</option>
				</select>
				<Textarea
					className={"w-full p-2 border rounded-md divide-solid border-[#dfdfdf]"}
					name="description"
					value={product.description}
					onChange={handleChange}
					placeholder="Description"
				/>
				<select
					name="category"
					value={product.category}
					onChange={handleChange}
					className="w-full p-2 border rounded-md divide-solid border-[#dfdfdf]"
				>
					<option value="ELEKTRONIKA">elektronika</option>
					<option value="ZYWNOŚĆ">żywność</option>
					<option value="UBRANIA">ubrania</option>
					<option value="KUCHNIA">akcesoria kuchenne</option>
					<option value="INNE">inne</option>
					<option value="SPRZĄTANIE">środki czystości</option>
				</select>
				<select
					name="actionType"
					value={product.actionType}
					onChange={handleChange}
					className="w-full p-2 border rounded-md divide-solid border-[#dfdfdf]"
				>
					<option value="SELL">sprzedaj</option>
					<option value="RENT">pożycz</option>
				</select>
				<div className="w-full flex justify-center">
					<Button type="submit" className="pt-4 pb-4 pl-6 pr-6 bg-b-gray rounded-xl">
						Add Product
					</Button>
				</div>
			</form>
		</div>
	);
}
