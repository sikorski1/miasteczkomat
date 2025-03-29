import ms from "../../assets/miasteczkomat.png";

export default function Header() {
	return (
		<header className="w-full bg-green h-20 flex items-center justify-center">
			<img src={ms} className="h-16, w-16"></img>
			<p className="lowercase text-white text-4xl">miasteczkomat</p>
			<img src={ms} className="h-16, w-16"></img>
		</header>
	);
}
