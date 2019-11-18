import React from "react";
import axios from "axios";
import TeamForm from "./teamForm";
import Auth from "../../utils/Auth";

class TeamNew extends React.Component {
	constructor() {
		super();

		this.state = {
			data: {
				name: "",
				image: "",
				description: "",
				location: "",
				lat: "",
				lng: "",
				category: ""
			},
			errors: ""
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.suggestionSelect = this.suggestionSelect.bind(this);
	}

	handleChange({ target: { name, value } }) {
		const data = {...this.state.data, [name]: value };
		const errors = { ...this.state.errors, [name]: "" };
		this.setState({ data, errors });
	}

	suggestionSelect(result, lat, lng, text) {
		const data = {...this.state.data,
			lat: lat,
			lng: lng,
			location: result, text
		};
		const errors = { ...this.state.errors, location: "" };

		this.setState({data, errors});
	}

	handleSubmit(e) {
		e.preventDefault();
		axios
			.post("/api/teams", this.state.data, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			.then(() => this.props.history.push("/teams"))
			.catch((err) => {
				return this.setState({errors: err.response.data});
			});
	}

	render() {
		return(
			<div className="section">
				<ClubsForm
					data={this.state.data}
					newform={true}
					errors={this.state.errors}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					suggestionSelect={this.suggestionSelect}
				/>
			</div>
		);
	}
}

export default TeamNew;
