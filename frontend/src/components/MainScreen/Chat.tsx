import { BotMessageSquare } from "lucide-react";

export default function Chat({ handleSetModalOpen }) {
	return (
		<div className="fixed bottom-24 left-4">
			<button
				onClick={() => handleSetModalOpen("chat")}
				className="size-16 bg-green rounded-full flex items-center justify-center">
				<BotMessageSquare className="text-white text-2xl "></BotMessageSquare>
			</button>
		</div>
	);
}
