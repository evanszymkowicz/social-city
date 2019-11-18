import React from "react";
import { Link, withRouter } from "react-router-dom";
import Auth from "../../utils/Auth";

class Navigation extends React.Component {
	constructor() {
		super();
		this.state = {
			NavigationOpen: false,
			clickedIcon: false
		};
		this.logout = this.logout.bind(this);
		this.toggleNavigation = this.toggleNavigation.bind(this);
	}

	toggleNavigation() {
		this.setState({ NavigationOpen: !this.state.NavigationOpen });
	}

	logout() {
		Auth.removeToken();
		this.props.history.push("/");
	}

	componentDidUpdate(prevProps) {
		if(prevProps.location.pathname !== this.props.location.pathname){
			this.setState({ NavigationOpen: false });
		}
	}

	render() {
		return (
			<nav className={this.props.location.pathname === "/events" ? "Navigation home" : "Navigation is-dark"}>
				<div className="container">
					<div className="Navigation-brand">
						<Link className="Navigation-item"	onClick={this.toggleIcon} to="/events">
							<strong className="is-size-4">
                Bee Social <span> <img src="/assets/images/BeeLogo.png"/> </span>
							</strong>
						</Link>
						<a className={`Navigation-burger ${this.state.NavigationOpen ? "is-active" : ""}`} onClick={this.toggleNavigation} >
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
					<div className={`Navigation-menu ${this.state.NavigationOpen ? "is-active" : ""}`}>
						<div className="Navigation-item has-dropdown is-hoverable Navigation-start">
							<a className="Navigation-link">
                Browse
							</a>
							<div className="Navigation-dropdown">
								<Link to="/events" className="Navigation-item has-text-black">
                 Events
								</Link>
								<hr className="Navigation-divider" />
								<Link to="/clubs" className="Navigation-item has-text-black">
                 Clubs
								</Link>
							</div>
						</div>
					</div>
					<div className={`Navigation-menu ${this.state.NavigationOpen ? "is-active" : ""}`}>
						<div className="Navigation-end">
							{Auth.isAuthenticated() &&
                <div className="Navigation-item has-dropdown is-hoverable">
                	<a className="Navigation-link">
                   Join
                	</a>
                	<div className="Navigation-dropdown">
                		<Link to="/events/new" className="Navigation-item">
                     Events
                		</Link>
                		<hr className="Navigation-divider" />
                		<Link to="/clubs/new" className="Navigation-item">
                     Clubs
                		</Link>
                	</div>
                </div>}
							{Auth.isAuthenticated() &&<Link to={`/users/${Auth.getUserId()}`} className="Navigation-item">
              Your events
							</Link>}
							{!Auth.isAuthenticated() && <Link className="Navigation-item" to="/register">Sign Up</Link>}
							{!Auth.isAuthenticated() && <Link className="Navigation-item" to="/login">Login</Link>}
							{Auth.isAuthenticated() && <a className="Navigation-item" onClick={this.logout}>Logout</a>}
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default withRouter(Navigation);
