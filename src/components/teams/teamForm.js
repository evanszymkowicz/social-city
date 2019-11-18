import React from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import ReactFilestack from "react-filestack";
// const fileStack = process.env.FILESTACK_API_KEY
// const mapbox = process.env.MAP_BOX_TOKEN

const TeamForm = ({ data, newform, handleChange, handleSubmit, errors, suggestionSelect }) => {
	return (
		<div className="container">
			<div className="column is-8 is-offset-2 ">
				<h3 className="title has-text-centered">Create A Team</h3>
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
											apikey={`${ fileStack }`}
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
											buttonClass={"button is-info"}
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
											className={errors.description ? "textarea input is-danger" : "textarea input is-info"}
											placeholder="Tell us a little bit about the team...">
										</textarea>
									</div>
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
											className="input is-info">
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
								{errors.category && <small className="help is-danger">{errors.category}</small>}
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Location</label>
							</div>
							<div className="field-body">
								<div className="field">
									{(data.location || newform ) && (
										<MapboxAutocomplete
											publicKey= {mapbox}
											inputClass={errors.lat ? "input is-danger" : "input is-info"}
											onSuggestionSelect={suggestionSelect}
											onchange={handleChange}
											name="location"
											query={`${data.location}`}
										/>
									)}
								</div>
								{errors.location && <small>{errors.location}</small>}
							</div>
						</div>
						<div>
							<button className="button is-medium is-fullwidth is-dark">Submit</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TeamForm;
