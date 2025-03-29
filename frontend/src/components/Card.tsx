import { Category } from "../types/MainContainerType";
import { motion } from "framer-motion";

interface CardProps {
	data: Category;
	index: number;
	handleFilters:any
	onClose:any
}

export default function Card({ handleFilters, data, index, onClose }: CardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, type: "spring", stiffness: 100, delay: 0.05 * index }}
			className="max-w-sm h-[200px] bg-b-gray shadow-md rounded-2xl overflow-hidden "
			onClick={() => {
				handleFilters(data.title)
				onClose()
				}}
		>
			<img src={data.photoUrl} alt={data.title} className="w-full  h-2/3 object-cover" />
			<div className="display: grid h-1/3 w-full  items-center justify-items-center text-center">
				<h2 className="text-3xl font-bold text-black  justify-items-center display: inline-block ">
					{data.title}
				</h2>
			</div>
		</motion.div>
	);
}
