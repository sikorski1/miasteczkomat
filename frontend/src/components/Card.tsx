interface CardProps {
	image: string;
	title: string;
}

export default function Card({ image, title }: CardProps) {
	return (
		<div className="size-64 bg-gray shadow-md rounded-2xl overflow-hidden ml-16 mt-16">
			<img src={image} alt={title} className="w-full object-cover" />
			<h2 className="text-2xl font-bold text-black ">{title}</h2>
		</div>
	);
}
