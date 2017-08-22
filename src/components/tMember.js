import React from 'react';
import Tbase from './Tbase';

class tMember extends React.Component{
	constructor() {
		super();
		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.renderOrder = this.renderOrder.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.filter = this.filter.bind(this);

		this.state = {
			rushes: {},
			search: ''
		}
	}

	componentWillMount() {
		this.ref = Tbase.syncState(`/rushes`, 
			{
				context: this,
				state: 'rushes',
			});
	}

	componentWillUnmount() {
		Tbase.removeBinding(this.ref);
	}

	renderOrder(key) {
		const rush = this.state.rushes[key];
		console.log(rush)
		return (
			<li key={key}> 
				<span>{rush.name}</span>
			</li>
			)

	}

	updateSearch(event) {
		this.setState({search: event.target.value});
	}

	filter(dictionary) {
		var output = {};
		for (var key in dictionary) {
			if(dictionary.hasOwnProperty(key)) {
				if (key.indexOf(this.state.search) !== -1) {
					output[key] = dictionary[key];
				}
			}
		}
		return output;
	}

	render() {
			if (this.state.rushes) {
				const filteredRushes = this.filter(this.state.rushes);
				return (
					<div>
						<button className="facebook" 
						onClick={() => this.context.router.transitionTo(`/`)}>Log Out</button>
						<form className="event-selector">
							<h2>Search</h2>
							<input type="text" required placeholder="Name"
							onChange={this.updateSearch}/>
							{
								Object.keys(filteredRushes).map((key, index) => (
								<button key={index}
								onClick={() => this.context.router.transitionTo(`/profile/deringuzel/${key}`)}>
								 {filteredRushes[key].name} {filteredRushes[key].lastName}</button>))
							}
						</form>
					</div>
				)
			} else {
				return  (
					<p>No rushes yet</p>
				)
			}
		}
}

tMember.contextTypes = {
	router: React.PropTypes.object
}

export default tMember;