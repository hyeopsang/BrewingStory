import { RouterProvider } from "react-router";
import { AppRouter } from "./app/AppRouter";

export default function App() {
	return <RouterProvider router={AppRouter} />;
}
