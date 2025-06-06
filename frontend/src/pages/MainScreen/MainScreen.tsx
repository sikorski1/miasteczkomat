import BottomBar from "../../components/MainScreen/BottomBar";
import Header from "../../components/MainScreen/Header";

import { useState } from "react";
import AddButton from "../../components/AddButton";
import Dialog from "../../components/Dialog/Dialog";
import AddProdModal from "../../components/MainScreen/AddProdModal";
import CategoriesModal from "../../components/MainScreen/CategoriesModal";
import Chat from "../../components/MainScreen/Chat";
import ChatModal from "../../components/MainScreen/ChatModal";
import MainSection from "../../components/MainScreen/MainSection";

import MainContainer from "../../components/MainScreen/CategoriesModal";
import AddProductModal from "../../components/MainScreen/AddProductModal";

import UserModal from "../../components/MainScreen/UserModal";
type Modals = {
	categories: boolean;
	user: boolean;
	chat: boolean;
	addProd: boolean;
};


export default function MainScreen() {
	const [modalsOpen, setModalsOpen] = useState<Modals>({
		categories: false,
		user: false,
		chat: false,
		addProd: false,
	});
	const handleSetModalOpen = (modalName: string) => {
		setModalsOpen(prev => ({
			...prev,
			[modalName]: true,
		}));
	};
	const handleModalOnClose = (modalName: string) => {
		setModalsOpen(prev => ({
			...prev,
			[modalName]: false,
		}));
	};
	return (
		<>
			{modalsOpen["categories"] && (
				<Dialog open={modalsOpen["categories"]} onClose={() => handleModalOnClose("categories")}>
					<CategoriesModal></CategoriesModal>
				</Dialog>
			)}
			{modalsOpen["user"] && (
				<Dialog open={modalsOpen["user"]} onClose={() => handleModalOnClose("user")}>
					<UserModal></UserModal>
				</Dialog>
			)}
			{modalsOpen["chat"] && (
				<Dialog open={modalsOpen["chat"]} onClose={() => handleModalOnClose("chat")}>
					<ChatModal onClose={() => handleModalOnClose("chat")}></ChatModal>
				</Dialog>
			)}
			{modalsOpen["addProd"] && (
				<Dialog open={modalsOpen["addProd"]} onClose={() => handleModalOnClose("addProd")}>
					<AddProdModal></AddProdModal>
				</Dialog>
			)}
			<main>
				<Header></Header>
				<MainSection />
				<BottomBar handleSetModalOpen={handleSetModalOpen}></BottomBar>
				<AddButton></AddButton>
				<Chat handleSetModalOpen={handleSetModalOpen}></Chat>
			</main>
		</>
	);
}
