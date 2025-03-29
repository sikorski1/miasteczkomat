import { AlignJustify, Search, UserRound } from "lucide-react";

export default function BottomBar() {
	return (
		<div className="fixed bottom-0 left-0 bg-[#DFDFDF] w-full h-20 flex justify-around text-white">
			<button className="px-4 py-2 rounded-lg">
				<AlignJustify className="h-10 w-10 text-green font-bold" />
			</button>
			<button className="px-4 py-2 rounded-lg">
				<Search className="h-10 w-10 text-black font-bold"></Search>
			</button>
			<button className="px-4 py-2 rounded-lg">
				<UserRound className="h-10 w-10 text-red font-bold"></UserRound>
			</button>
		</div>
	);
}
