import { useState } from 'react';

import CrudModal from './CrudModal';

const SortFilter = ({ handleSortBy, handleFilter, filterValue, setFilterValue, addStarShip }) => {
	const [showModal, setShowModal] = useState(false);
	const sortTypes = [
		{ name: 'Name (A-Z)', value: 'name' },
		{ name: 'Cost (Low to High)', value: 'cost' },
		{ name: 'Speed (High to Low)', value: 'speed' },
	];

	return (
		<>
			<div className="sort-wrapper bg-black rounded-top-4 p-3 pt-4 pb-4 mt-4 d-flex flex-column flex-sm-row sticky-md-top sticky-top2 gap-4 align-items-end">
				<div>
					<label htmlFor="filterByName" className="form-label mb-0 text-white roboto">
						Filter by Name
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control border-0 roboto"
							id="filterByName"
							aria-describedby="filterByNameHelp"
							value={filterValue}
							placeholder="Start typing a name..."
							onChange={(e) => {
								handleFilter(e.target.value);
								setFilterValue(e.target.value);
							}}
						/>
						<button
							type="button"
							className="btn bg-light radius-left-0"
							onClick={() => {
								setFilterValue('');
								handleFilter('');
								handleSortBy('');
							}}
						>
							<span className="material-symbols-outlined align-middle">close</span>
						</button>
					</div>
				</div>
				<div className="d-flex ms-auto gap-3">
					<div>
						<div className="btn-group " role="group">
							<button
								type="button"
								className="btn dropdown-toggle bg-sw-yellow"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Sort By
							</button>
							<ul className="dropdown-menu roboto cursor-pointer">
								{sortTypes.map((sortType, index) => (
									<li key={index} onClick={() => handleSortBy(sortType.value)}>
										<a className="dropdown-item">{sortType.name}</a>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div>
						<button
							type="button"
							className="btn bg-sw-yellow"
							onClick={() => setShowModal(true)}
						>
							Add{' '}
							<span
								className="material-symbols-outlined align-middle"
								style={{ fontSize: 16 }}
							>
								add
							</span>
						</button>
					</div>
				</div>
			</div>
			<CrudModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				addStarShip={addStarShip}
				editStarShip={null}
				currentStarship={null}
				deleteStarship={null}
			/>
		</>
	);
};

export default SortFilter;
