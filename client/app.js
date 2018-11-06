import React from 'react';
import {Navbar, SideBar, Footer} from './components';
import Routes from './routes';
import {Container} from 'semantic-ui-react';

const App = () => {
	return (
		<div>
			<Container>
				<Navbar />
			</Container>
			<SideBar>
				<div className="full">
					<Routes />
				</div>
			</SideBar>
			<Footer />
		</div>
	);
};

export default App;
