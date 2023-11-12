import { Route, Routes } from "react-router-dom";
import "./App.css";
import Tag from "./pages/Tag/Tag";
import Preview from "./pages/Tag/Preview/Preview";
function App() {
	return (
		<div>
			<Routes>
				<Route path="/tag/create" element={<Tag />} />
				<Route path="/tag/preview" element={<Preview />} />
			</Routes>
		</div>
	);
}

export default App;
