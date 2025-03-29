import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
type Props = {
	open: boolean;
	children: ReactNode;
	onClose: () => void;
};

export default function Modal({ open, children, onClose }: Props) {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			dialog.current?.showModal();
		}
	}, [open]);
	return createPortal(
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 "
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					/>
					<motion.dialog
						ref={dialog}
						className="flex items-center justify-center bg-transparent bg-gradient-radial from-blue-900/80 to-blue-950/80 border-none rounded-lg overflow-y-auto"
						onClose={onClose}
						initial={{ opacity: 0, scale: 0.9, y: 100 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 100 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						onAnimationComplete={definition => {
							if (definition === "exit") {
								dialog.current?.close();
							}
						}}>
						{children}
					</motion.dialog>
				</>
			)}
		</AnimatePresence>,
		document.getElementById("modal")!
	);
}