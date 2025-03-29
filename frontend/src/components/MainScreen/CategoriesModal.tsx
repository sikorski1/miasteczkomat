import { Category } from "../../types/MainContainerType";
import Card from "../Card";
type Props = {
	handleFilter: any;
	onClose:any
};
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

export default function CategoriesModal({ onClose, handleSetFilter }: Props) {
	return (
		<div className="w-[400px] p-4">
			<div className="grid grid-cols-2 gap-4">
				{data.map((item: Category, index: number) => (
					<Card handleFilters={handleSetFilter} onClose={onClose} key={item.title} data={item} index={index} />
				))}
			</div>
		</div>
	);
}
