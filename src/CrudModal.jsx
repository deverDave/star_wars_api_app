import { useEffect, useState } from 'react';

import { isFormValid } from './utils';

const CrudModal = ({
	show,
	handleClose,
	addStarShip,
	editStarShip,
	deleteStarship,
	currentStarship,
}) => {
	const blankStarship = {
		id: null,
		name: '',
		manufacturer: '',
		cost_in_credits: '',
		max_atmosphering_speed: '',
	};

	const [newStarship, setNewStarship] = useState(blankStarship);

	// Sync form data with selected starship
	useEffect(() => {
		if (currentStarship) {
			setNewStarship(currentStarship);
		} else {
			setNewStarship(blankStarship);
		}
	}, [currentStarship]);

	// Reset form when modal closes
	const resetForm = () => {
		setNewStarship(blankStarship);
		handleClose();
	};

	return (
		<div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content bg-dark text-light ">
					<div className="modal-header">
						<h1 className="modal-title fs-5">
							{currentStarship ? 'Edit Starship' : 'Add Starship'}
						</h1>
						<button
							type="button"
							className="btn-close  btn-close-white"
							onClick={resetForm}
						></button>
					</div>
					<div className="modal-body roboto">
						<form>
							<div className="mb-2">
								<label className="form-label mb-0">Name</label>
								<input
									type="text"
									className="form-control"
									value={newStarship.name}
									onChange={(e) =>
										setNewStarship((prev) => ({
											...prev,
											name: e.target.value,
										}))
									}
								/>
							</div>
							<div className="mb-2">
								<label className="form-label mb-0">Manufacturer</label>
								<input
									type="text"
									className="form-control"
									value={newStarship.manufacturer}
									onChange={(e) =>
										setNewStarship((prev) => ({
											...prev,
											manufacturer: e.target.value,
										}))
									}
									required
								/>
							</div>
							<div className="mb-2">
								<label className="form-label mb-0">Cost</label>
								<input
									type="text"
									className="form-control"
									value={newStarship.cost_in_credits}
									onChange={(e) =>
										setNewStarship((prev) => ({
											...prev,
											cost_in_credits: e.target.value,
										}))
									}
									required
								/>
							</div>
							<div className="mb-2">
								<label className="form-label mb-0">Speed</label>
								<input
									type="text"
									className="form-control"
									value={newStarship.max_atmosphering_speed}
									onChange={(e) =>
										setNewStarship((prev) => ({
											...prev,
											max_atmosphering_speed: e.target.value,
										}))
									}
									required
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={resetForm}>
							Close
						</button>

						{currentStarship && (
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									deleteStarship(currentStarship);
									resetForm();
								}}
							>
								Delete
							</button>
						)}

						<button
							type="button"
							className="btn bg-sw-yellow"
							onClick={() => {
								if (!isFormValid(newStarship)) {
									alert('All fields are required.');
									return;
								}
								(currentStarship ? editStarShip : addStarShip)(newStarship);
								resetForm();
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
