import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "./routes";
export const Router: React.FC = () => {
	const location = useLocation();
	const previousLocation = location.state?.previousLocation;
	return (
		<>
			<Routes location={previousLocation || location}>
				{routes.map((route: { path: string; component: React.ElementType; isPrivate: boolean }) => (
					<Route
						path={route.path}
						element={<route.component />}
						key={route.path}
					/>
				))}
			</Routes>
		</>
	);
};

export default Router;