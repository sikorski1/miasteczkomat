import Card from "../Card";
import { useEffect, useState } from "react";

interface CardData {
	id: number;
	title: string;
	content: string;
}

export default function MainContainer() {
	const [data, setData] = useState<CardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch records from an API or a database (using fetch for this example)
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.example.com/records"); // Replace with your API endpoint
				const result = await response.json();
				setData(result);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch data");
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <div className="text-center">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-2 gap-4">
				{data.map((item: any) => (
					<Card key={item.id} title={item.title} image={""} />
				))}
			</div>
		</div>
	);
}
