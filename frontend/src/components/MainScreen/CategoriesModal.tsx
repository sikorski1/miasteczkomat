import { Category } from "../../types/MainContainerType";
import Card from "../Card";
type Props = {
	handleFilter: any;
	onClose:any
};
const data: Category[] = [
	{
		title: "Elektronika",
		photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQElpDX081RgV2oUQsgeJYDwJs7GBcJp0fM1w&s",
	},

	{
		title: "Żywnosc",
		photoUrl: "https://polki.pl/foto/4_3_LARGE/czym-jest-zywnosc-naturalna-1644792.jpg",
	},
	{
		title: "Ubrania",
		photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1i7iXelaZUjvOZ-CmJrs8G-hiYeeKh6Szfw&s",
	},
	{
		title: "Akcesoria kuchenne",
		photoUrl: "https://img.europ24.pl/42220-large_default/przybory-kuchenne-kinghoff-kh-1569-zestaw-7-elementow-ze-stojakiem-nylon-stal.jpg",
	},
	{
		title: "Inne",
		photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92PDUHiEiCoYZ63-i-63n99beZo0pvkuuHg&s",
	},
	{
		title: "Środki czystości",
		photoUrl: "https://te-ch.pl/userdata/public/news/images/40.jpg",
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
