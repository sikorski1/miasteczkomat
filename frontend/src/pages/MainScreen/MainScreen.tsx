import Card from "../../components/Card";
import BottomBar from "../../components/MainScreen/BottomBar";
import Header from "../../components/MainScreen/Header";

import ms from "../../assets/miasteczkomat.png";
import AddButton from "../../components/AddButton";
import Chat from "../../components/MainScreen/Chat";
import MainSection from "../../components/MainScreen/MainSection";
import MainContainer from "../../components/MainScreen/CategoriesModal";
import AddProductModal from "../../components/MainScreen/AddProductModal";

export default function MainScreen() {
	return (
		<main>
			<Header></Header>
			<BottomBar></BottomBar>
			<AddButton></AddButton>
			<AddProductModal></AddProductModal>
			<Chat></Chat>
		</main>
	);
}
