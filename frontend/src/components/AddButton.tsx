import { Plus } from "lucide-react";

type Props = {
	handleSetModalOpen: (modalName: string) => void;
};

export default function AddButton({ handleSetModalOpen }: Props) {
	return (

		<div className="fixed absolute bottom-24 right-4">
			<button
				onClick={() => handleSetModalOpen("addProd")}
				className="size-16 bg-red rounded-full flex items-center justify-center"
			>
				<Plus className="text-white text-2xl "></Plus>
			</button>
		</div>
	);
}
