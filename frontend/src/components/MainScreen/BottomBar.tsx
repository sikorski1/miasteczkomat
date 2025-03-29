export default function BottomBar() {
	return (
		<div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-around text-white">
			<button className="px-4 py-2 bg-gray-700 rounded-lg">Home</button>
			<button className="px-4 py-2 bg-gray-700 rounded-lg">Profile</button>
			<button className="px-4 py-2 bg-gray-700 rounded-lg">Settings</button>
		</div>
	);
}
