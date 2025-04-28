import { RouterProvider } from "react-router";
import { AppRouter } from "./app/AppRouter";
import { RefProvider } from "./app/context/RefContext";

export default function App() {
  return (
    <RefProvider>
            <RouterProvider router={AppRouter} />
    </RefProvider>
  );
}
