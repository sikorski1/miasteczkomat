import Card from "../Card";
import { Category } from "../../types/MainContainerType";

const data: Category[] = [
	{
		title: "elektronika",
		photoUrl: "https://picsum.photos/200/300",
	},

	{
		title: "żywność",
		photoUrl: "https://picsum.photos/200/300",
	},
	{
		title: "ubrania",
		photoUrl: "https://picsum.photos/200/300",
	},
	{
		title: "akcesoria kuchenne",
		photoUrl: "https://picsum.photos/200/300",
	},
	{
		title: "inne",
		photoUrl: "https://picsum.photos/200/300",
	},
	{
		title: "środki czystości",
		photoUrl: "https://picsum.photos/200/300",
	},
];

export default function MainContainer() {
	return (
		<div className="container mx-auto p-4">
			<div className="grid grid-cols-2 gap-4">
				{data.map((item: Category, index: number) => (
					<Card key={item.title} data={item} index={index} />
				))}
			</div>
		</div>
	);
}
