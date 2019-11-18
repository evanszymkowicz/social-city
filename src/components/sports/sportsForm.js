import React from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import ReactFilestack from "react-filestack";
// const fileStack = process.env.FILESTACK_API_KEY;
// const mapboxAutoComplete = process.env.MAP_BOX_TOKEN;

const SportsForm = ({ newform, data, handleChange, handleSubmit, handleClubChange, errors, suggestionSelect, clubs  }) => {
	const hours = [];
	const minutes = [];
	for (let i=0; i<=23; i++){
		hours.push(i);
	}
	for (let i=0; i<=50; i +=10){
		minutes.push(i);
	}

	return (
		<div className="container">
			<div className="column is-8 is-offset-2">
				<h3 className="title has-text-centered">Organise Event</h3>
				<div className="box">
					<form onSubmit={handleSubmit}>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Name</label>
							</div>
							<div className="field-body">
								<div className="field">
									<div className="control">
										<input
											className={errors.name ? "input is-danger" : "input is-info"}
											placeholder="Name"
											name="name"
											onChange={handleChange}
											value={data.name || ""}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Image</label>
							</div>
							<div className="field-body">
								<div className="field">
									<div className="control is-info">
										<ReactFilestack
											apikey={`${fileStack}`}
											mode={"pick"}
											onSuccess={(res) => {
												handleChange({
													target: {
														name: "image",
														value: res.filesUploaded[0].url
													}});
											}}
											onError={(err) => console.log(err)}
											buttonText={data.image ? "Image Uploaded" : "Upload Image"}
											buttonClass={errors.image ? "button is-danger" : "button is-info"}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Description</label>
							</div>
							<div className="field-body">
								<div className="field">
									<div className="control">
										<textarea
											name="description"
											onChange={handleChange}
											value={data.description || ""}
											className="textarea input is-info"
											placeholder="Tell us a little bit about the event...">
										</textarea>
									</div>
								</div>
							</div>
						</div>

						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Date</label>
							</div>
							<div className="field-body">
								<div className="field">
									<p className="control is-expanded">
										<input
											className={errors.date ? "input is-danger" : "input is-info"}
											type="date"
											placeholder="Date"
											name="date"
											onChange={handleChange}
											value={data.date || ""}
										/>
									</p>
								</div>
							</div>
						</div>

						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Time</label>
							</div>
							<div className="field-body">
								<div className="field">
									<p className="control is-expanded">
										<select
											name="hours"
											defaultValue="Hours"
											onChange={handleChange}
											value={data.hours}
											className={errors.hours ? "input is-danger" : "input is-info"}>
											<option disabled>Hours</option>
											{
												hours.map((hour, i) => {
													return (<option key={i} value={hour} >{("0" + hour).slice(-2)}</option>);
												})
											}
										</select>
									</p>
								</div>
								<div className="field">
									<p className="control is-expanded">
										<select
											name="minutes"
											defaultValue="Minutes"
											onChange={handleChange}
											value={data.minutes}
											className={errors.minutes ? "input is-danger" : "input is-info"}>
											<option disabled>Minutes</option>
											{
												minutes.map((minute, i) => {
													return (<option key={i} value={minute} >{("0" + minute).slice(-2)}</option>);
												})
											}
										</select>
									</p>
								</div>
								<div className="field">
									<p className="control is-expanded">
										<input
											className={errors.duration ? "input is-danger" : "input is-info"}
											type="number"
											placeholder="Duration"
											step="10"
											min="0"
											name="duration"
											onChange={handleChange}
											value={data.duration || ""}
										/>
									</p>
								</div>
							</div>
						</div>

						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Category</label>
							</div>
							<div className="field-body">
								<div className="field">
									<div className="select is-fullwidth">
										<select
											name="category"
											defaultValue="Please Choose..."
											onChange={handleChange}
											value={data.category}
											className={errors.category ? "input is-danger" : "input is-info"}
										>
											<option disabled>Please Choose...</option>
											<option> Board Games </option>
											<option> Food & Drink </option>
											<option> Mums </option>
											<option> Sports </option>
											<option> Photography </option>
											<option> Gaming </option>
										</select>
									</div>
								</div>
								<div className="field-label is-normal">
									<label className="label">Club</label>
								</div>
								<div className="select is-fullwidth">
									<select
										name="club"
										defaultValue="Please Choose..."
										onChange={handleClubChange}
										value={`${data.club.id},${data.club.name}`}
										className={errors.club ? "input is-danger" : "input is-info"}>
										<option disabled>Please Choose...</option>
										{clubs.map((club, i) =>
											<option key={i} value={`${club.value},${club.label}`} > {club.label} </option>
										)}
									</select>
								</div>
							</div>
						</div>

						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Max Attendees</label>
							</div>
							<div className="field-body">
								<div className="field">
									<p className="control is-expanded">
										<input
											className={errors.max_attendees ? "input is-danger" : "input is-info"}
											type="number"
											placeholder="Max Attendees"
											name="max_attendees"
											onChange={handleChange}
											value={data.max_attendees || ""}
										/>
									</p>
								</div>
							</div>

						</div>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Location</label>
							</div>
							<div className="field-body">
								<div className="field">
									{(data.address || newform) && (
										<MapboxAutocomplete
											publicKey= {mapboxAutoComplete}
											inputClass={errors.lat ? "input is-danger" : "input is-info"}
											onSuggestionSelect={suggestionSelect}
											onchange={handleChange}
											name="address"
											query={`${data.address}`}
										/>
									)}
								</div>
							</div>
						</div>

						<div>
							<button className="button is-medium is-fullwidth is-dark">
                Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SportsForm;
