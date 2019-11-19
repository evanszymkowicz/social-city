import * as mysql from "mysql";
import Content from "./content";
import config from "../config/index";

// sets up local config
// connects to the backend
export const Connection = mysql.createConnection(config.mysql);

// will return error 500 in the console
Connection.connect(err => {
	if(err) console.log(err);
});

export default {
	Content
};
