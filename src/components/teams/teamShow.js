import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Auth from "../../utils/auth";
import TeamChat from "./teamChat";
import EventsEmbedded from "../contstants/eventsEmbedded";
import LoadingPage from "../constants/loadingPage";

class TeamShow extends React.Component {
	constructor(){
		super();
		this.state = {
			data: {},
			team: null,
			teams: null,
			userLocation: null,
			currentEventsActive: true
		};
		this.handleToggle = this.handleToggle.bind(this);
		this.handleFolllow = this.handleFolllow.bind(this);
		this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
	}

	componentDidMount() {
		axios.get(`/api/teams/${this.props.match.params.id}`)
			.then(res => this.setState({ team: res.data }));
	}

	handleToggle(e) {
		if(e.currentTarget.textContent === "Future Events" && this.state.currentEventsActive ||
      e.currentTarget.textContent === "Past Events" && !this.state.currentEventsActive){
			return;
		}
		this.setState({currentEventsActive: !this.state.currentEventsActive});
	}

	handleMessageChange(e) {
		const data = {...this.state.data, content: e.target.value };
		const error = null;
		this.setState({ data, error });
	}

	handleMessageSubmit(e){
		e.preventDefault();
		axios
			.post(`/api/teams/${this.state.team.id}/comment`,
				this.state.data,
				{headers: { Authorization: `Bearer ${Auth.getToken()}`}
				})
			.then((res) => {
				this.setState({...this.state, team: res.data, data: {content: ""} });
			})
			.then(() => this.props.history.push(`/teams/${this.state.team.id}`))
			.catch(() => this.setState({ errors: "An error occured" }));
	}

	handleFolllow(e){
		e.preventDefault();
		axios.get(`/api/teams/${this.state.team.id}/follow`, {
			headers: { Authorization: `Bearer ${Auth.getToken()}`}
		})
			.then(res => this.setState({team: res.data}));
	}

	render(){
		if(!this.state.team) return  <LoadingPage />;

		const { id, name, image, category, description, user, location, events,owner, followed_by, team_comments} = this.state.team;
		return (
			<div className="container">
				<div className="section box teamBox">
					<div className="wrapper">
						<div className="hero teamHero is-medium is-bold parent">
							<div className="hero-body child" style={{ backgroundImage: `url(${image})`}}>
								<h1 className="title has-text-white">{name}</h1>
								<p className="subtitle has-text-white is-6">in {location}</p>
								{Auth.isAuthenticated() && !Auth.doesFollow(followed_by) &&(
									<button className="button is-info" onClick={this.handleFolllow}> Follow  </button>
								)}
								{Auth.isAuthenticated() && Auth.doesFollow(followed_by) &&(
									<button className="button is-info"> Following  </button>
								)}
							</div>
						</div>
					</div>
					<div className="columns team-columns">
						<div className="column is-4">
							<h6 className="title is-6">Category: {category}</h6>
							{Auth.isAuthenticated() && Auth.isOwner(owner.id) && (
								<Link to={`/teams/${id}/edit`} className="button is-info"> Edit </Link>
							)}
						</div>
						<div className="column is-4">
							<h6 className="title is-6">Team Details</h6>
							<p> {description}</p>
						</div>
						<div className="column is-4">
							<h6 className="title is-6">Members ({followed_by.length})</h6>
							<div className="members-area columns is-multiline">
								{followed_by.map((follower) => {
									return (
										<div className="column is-3" key={follower.id}>
											<Link to={`/users/${follower.id}`}>
												<div className="image-cropper-team">
													<img className="profile-pic" src={follower.image === "" ? "/assets/images/BeeLogo.png" : follower.image} alt="avatar"/>
												</div>
											</Link>
										</div>
									);
								}
								)}
							</div>
						</div>
					</div>
				</div>
				<EventsEmbedded
					events={events}
					currentEventsActive={this.state.currentEventsActive}
					handleToggle={this.handleToggle}
				/>
				{Auth.isAuthenticated() && Auth.doesFollow(followed_by) && (
					<ClubsChat
						handleMessageChange={this.handleMessageChange}
						handleMessageSubmit={this.handleMessageSubmit}
						messageContent={this.state.data.content}
						team_comments={team_comments}
					/>
				)}
			</div>
		);
	}
}

export default TeamShow;
