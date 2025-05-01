import { AlignJustify, Search, UserRound } from "lucide-react";

type Props = {
	handleSetModalOpen: (modalName: string) => void;
};

export default function BottomBar({ handleSetModalOpen }: Props) {
	return (
		<div className="z-50 fixed bottom-0 left-0 bg-[#DFDFDF] w-full h-20 flex justify-around text-white">
			<button
				onClick={() => {
					handleSetModalOpen("categories");
					console.log("click");
				}}
				className="px-4 py-2 rounded-lg"
			>
				<AlignJustify className="h-10 w-10 text-green font-bold" />
			</button>
			<button onClick={() => handleSetModalOpen("chat")} className="px-4 py-2 rounded-lg">
				<Search className="h-10 w-10 text-black font-bold"></Search>
			</button>
			<button onClick={() => handleSetModalOpen("user")} className="px-4 py-2 rounded-lg">
				<UserRound className="h-10 w-10 text-red font-bold"></UserRound>
			</button>
		</div>
	);
}
