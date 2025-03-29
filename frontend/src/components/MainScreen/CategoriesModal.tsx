import { X } from "lucide-react";
export default function CategoriesModal({ onClose }) {
	return (
		<div className=" h-[600px] w-[400px] relative bg-red-100">
			<button
				onClick={onClose}
				className="absolute right-10 p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white">
				<X className="w-5 h-5" />
			</button>
		</div>
	);
}
