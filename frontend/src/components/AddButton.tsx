import { Plus } from "lucide-react";

export default function AddButton() {
	return (
		<div className="fixed bottom-24 right-4">
			<button className="size-16 bg-red rounded-full flex items-center justify-center">
				<Plus className="text-white text-2xl "></Plus>
			</button>
		</div>
	);
}
