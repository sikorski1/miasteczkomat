import { motion } from "framer-motion";
import { Product } from "../../types/MainScreenTypes";

type Props = {
	data: Product;
	index: number;
};
export default function ProductCard({ data, index }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, type: "spring", stiffness: 100, delay: 0.05 * index }}
			className="max-w-sm h-[250px] bg-b-gray shadow-md rounded-2xl overflow-hidden"
		>
			<img src={data.photoUrl} alt={data.name} className="w-full h-1/2 object-cover" />
			<div className="relative p-4 h-1/2">
				<h2 className="mt-4 text-3xl font-bold text-black">{data.name}</h2>
				<p className="mt-2 font-bold text-black">{`${data.price} ${data.currency}`}</p>
				<div className=" absolute bottom-2  text-gray text-[13px] text-left">
					<p>{data.dormitory}</p>
					<p>{data.createdAt}</p>
				</div>
			</div>
		</motion.div>
	);
}
