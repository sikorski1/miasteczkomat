import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { getProdByQuery } from "../../utils/api";
export default function AddProdModal({ onClose }: any) {
	const [query, setQuery] = useState("");
	const { mutate } = useMutation({ mutationKey: ["query prod"], mutationFn: getProdByQuery });
	const handleSearch = () => {
		if (query.trim()) {
			mutate({ query: query });
		}
	};
	return (
		<div className="relative flex flex-col w-[400px] p-12 bg-white rounded-lg shadow-md gap-4 ">
			<button
				onClick={onClose}
				className="absolute right-6 top-6 p-2">
				<X className="w-10 h-10" />
			</button>
			<p className="text-2xl font-semibold mb-2">wprowadź zapytanie</p>
			<input
				type="text"
				value={query}
				onChange={e => setQuery(e.target.value)}
				onKeyDown={e => e.key === "Enter" && handleSearch()}
				className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Type a product name..."
			/>
			<div className="w-full flex justify-end">
				<button
					onClick={handleSearch}
					className=" p-6 mt-6 bg-green text-white py-2 rounded-md hover:bg-green disabled:bg-gray-400 text-2xl">
					wyślij
				</button>
			</div>
		</div>
	);
}
