import React from "react";

const TeamForm = ({ handleChange }) => {
	return (
		<div className="columns">
			<div className="column is-3 teamFormDiv-1 is-offset-3 ">
				<div className="field">
					<div className="control">
						<label className="label">
							<strong className="has-text-white">Search By Sport</strong>
						</label>
						<select
							className="select"
							name="category"
							onChange={handleChange}>
							<option> All </option>
							<option> Board Games </option>
							<option> Food & Drink </option>
							<option> Mums </option>
							<option> Sports </option>
							<option> Photography </option>
							<option> Gaming </option>
						</select>
					</div>
				</div>
			</div>
			<div className="column is-3 teamFormDiv-1">
				<div className="field">
					<div className="control">
						<label className="label has-text-white">Search By City</label>
						<form>
							<input
								name="location"
								type="text"
								placeholder="Location"
								onChange={handleChange} />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeamForm;
