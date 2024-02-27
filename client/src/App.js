import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "./components/Upload";
import GetData from "./components/GetItemComponentData";

function App() {
	return (
		<div className='App'>
			<React.Fragment>
				<main>
					<Routes>
						<Route exact path='/' element={<Upload />} />
						<Route path='/items' element={<GetData />} />
					</Routes>
				</main>
			</React.Fragment>
		</div>
	);
}

export default App;
