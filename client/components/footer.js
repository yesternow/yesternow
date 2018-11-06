import React, {Component} from 'react';
import {Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment} from 'semantic-ui-react';

export class Footer extends Component {
	render() {
		return (
			<Menu
				widths={1}
				inverted
				borderless
				fixed="bottom"
				style={{
					flexShrink: 0, //don't allow flexbox to shrink it
					borderRadius: 0, //clear semantic-ui style
					margin: 0 //clear semantic-ui style
				}}
			>
				<Menu.Item header icon="copyright" />
			</Menu>
		);
	}
}

export default Footer;
