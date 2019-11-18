import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../../utils/Auth";
import Flash from "../../utils/Flash";

const SecureRoute = ({ component: Component, ...otherProps }) => {
	if(Auth.isAuthenticated()) return <Route {...otherProps} component={Component} />;

	Flash.setMessage("Sorry", "You are not logged in");
	return <Redirect to="/login" />;
};

export default SecureRoute;
