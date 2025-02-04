import { useEffect, useState } from 'react';

const CrudModal = ({ addStarShip, editStarShip, currentStarship }) => {
	const blankStarship = {
		name: '',
		manufacturer: '',
		cost_in_credits: '',
		max_atmosphering_speed: '',
	};

	const [newStarship, setNewStarship] = useState(blankStarship);

	// Handle form state when currentStarship changes
	useEffect(() => {
		if (currentStarship) {
			setNewStarship(currentStarship);
		} else {
			setNewStarship(blankStarship);
		}
	}, [currentStarship]);

	return (
		<div
			className="modal fade"
			id="exampleModal"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id="exampleModalLabel">
							{currentStarship ? 'Edit Starship' : 'Add a Starship'}
						</h1>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => setNewStarship(blankStarship)}
						></button>
					</div>
					<div className="modal-body">
						<form className="roboto">
							<div className="mb-2">
								<label htmlFor="starshipName" className="form-label mb-0">
									Name
								</label>
								<input
									type="text"
									className="form-control"
									id="starshipName"
									value={newStarship.name}
									required
									onChange={(e) =>
										setNewStarship({ ...newStarship, name: e.target.value })
									}
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="starshipManufacturer" className="form-label mb-0">
									Manufacturer
								</label>
								<input
									type="text"
									className="form-control"
									id="starshipManufacturer"
									value={newStarship.manufacturer}
									required
									onChange={(e) =>
										setNewStarship({
											...newStarship,
											manufacturer: e.target.value,
										})
									}
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="starshipCost" className="form-label mb-0">
									Cost
								</label>
								<input
									type="text"
									className="form-control"
									id="starshipCost"
									value={newStarship.cost_in_credits}
									onChange={(e) =>
										setNewStarship({
											...newStarship,
											cost_in_credits: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="starshipSpeed" className="form-label mb-0">
									Speed
								</label>
								<input
									type="text"
									className="form-control"
									id="starshipSpeed"
									value={newStarship.max_atmosphering_speed}
									onChange={(e) =>
										setNewStarship({
											...newStarship,
											max_atmosphering_speed: e.target.value,
										})
									}
									required
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
							onClick={() => setNewStarship(blankStarship)}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							data-bs-dismiss="modal"
							onClick={() => {
								if (currentStarship) {
									editStarShip(newStarship); // Edit mode
								} else {
									addStarShip(newStarship); // Add mode
								}
								setNewStarship(blankStarship); // Reset form
							}}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CrudModal;
