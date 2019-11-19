import { Connection } from "./index";

// ^ is a destructured component
// this will return ALL of the content rather than make specific queries
// Use an async function to rely on mysql's callback functionality
// Callback is boolean returns error or results

export const all = async () => {
	return new Promise((resolve, reject) => {
		Connection.query("SELECT * from content", (err, results) =>  {
			if(err) {
				return reject(err);
			}
			resolve(results);
		});
	});
};

export default {
	all
};
