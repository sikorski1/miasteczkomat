interface CardProps {
	image: string;
	title: string;
	description: string;
}

export default function Card({ image, title, description }: CardProps) {
	return (
		<div className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden">
			<img src={image} alt={title} className="w-full h-48 object-cover" />
			<div className="p-4">
				<h2 className="text-xl font-bold text-gray-900">{title}</h2>
				<p className="text-gray-600 mt-2">{description}</p>
			</div>
		</div>
	);
}
