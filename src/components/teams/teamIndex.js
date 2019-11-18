import React from "react";
import axios from "axios";
import TeamSection from "./teamSection";
import TeamSearchForm from "./teamsearchForm";
import LoadingPage from "../common/LoadingPage";

class TeamIndex extends React.Component {
	constructor() {
		super();
		this.state = {
			teams: [],
			category: "All",
			location: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		axios.get("/api/teams")
			.then(res => this.setState({ teams: res.data }));
	}

	handleChange({ target: { name, value } }) {
		this.setState({ [name]: value });
	}

	filteredClubs() {
		const re = new RegExp(this.state.location, "i");
		if(!this.state.category && !this.state.location) return this.state.teams;
		return this.state.teams.filter(team => {
			return re.test(team.location) && (this.state.category === "All" || team.category === this.state.category);
		});
	}

	render() {
		if(this.state.teams.length === 0) return  <LoadingPage />;
		console.log("state team index", this.state.teams);
		console.log(this.state.teams);
		return (
			<section className="section">
				<div className="container">
					<section className="section">
						<h2 className="title has-text-centered is-title-light is-size-2">Clubs</h2>
					</section>
					<hr />
					<ClubsSearchForm handleChange={this.handleChange} />
					<div>
						{this.filteredClubs().map(team =>
							<div key={team.id}>
								<TeamSection{...team} />
							</div>
						)}
					</div>
				</div>
			</section>
		);
	}
}

export default TeamIndex;
