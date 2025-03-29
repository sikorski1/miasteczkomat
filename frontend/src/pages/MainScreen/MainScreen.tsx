import Card from "../../components/Card";
import BottomBar from "../../components/MainScreen/BottomBar";
import Header from "../../components/MainScreen/Header";
import ms from "../../assets/miasteczkomat.png";
import AddButton from "../../components/AddButton";
import Chat from "../../components/MainScreen/Chat";

export default function MainScreen() {
	return (
		<main>
			<Header></Header>
			<BottomBar></BottomBar>
			<AddButton></AddButton>
			<Chat></Chat>
		</main>
	);
}
