import { Route, Routes } from "react-router-dom";
import "./App.css";
import Tag from "./pages/Tag/Tag";
import Preview from "./pages/Tag/Preview/Preview";
import TagList from "./pages/Tag/TagList/TagList";
function App() {
	return (
		<div>
			<Routes>
				<Route path="/tag/preview/:shortId" element={<Preview />} />
				<Route path="/tag/list" element={<TagList />} />
				<Route path="/tag/create" element={<Tag />} />
				<Route path="/tag/:shortId" element={<Tag />} />
			</Routes>
		</div>
	);
}

export default App;
// "YX4TyUK";
