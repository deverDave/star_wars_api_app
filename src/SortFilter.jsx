import CrudModal from './CrudModal';

const SortFilter = ({ handleSortBy, handleFilter, filterValue, setFilterValue, addStarShip }) => {
	return (
		<div
			className=" bg-black rounded-top-4 p-3 pt-4 pb-4 mt-4 d-flex flex-column flex-sm-row sticky-md-top sticky-top2 gap-4 align-items-end"
			style={{ zIndex: '9999' }}
		>
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
			<div className="ms-auto">
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
						<li>
							<a
								className="dropdown-item"
								onClick={() => [handleSortBy('name'), setFilterValue('')]}
							>
								{' '}
								Name (A-Z){' '}
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								onClick={() => [handleSortBy('cost'), setFilterValue('')]}
							>
								Cost (Low to High)
							</a>
						</li>
						<li>
							<a
								className="dropdown-item"
								onClick={() => [handleSortBy('speed'), setFilterValue('')]}
							>
								Speed (High to Low)
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<button
					type="button"
					className="btn  bg-sw-yellow"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal"
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
			<CrudModal addStarShip={addStarShip} editStarShip={null} currentStarship={null} />
		</div>
	);
};
export default SortFilter;
