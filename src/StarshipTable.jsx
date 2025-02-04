const StarshipTable = ({ starships, loading, nextPage, handleLoadMore, sortType }) => {
	return (
		<div className="mb-5 p-3 pt-0 bg-transparent roboto ">
			{starships.length > 0 && (
				<table className="table mb-4 rounded-4 min-vh-80">
					<thead className="sticky-md-top sticky-top3">
						<tr>
							<th className="text-nowrap">
								Ship Name{' '}
								{sortType === 'name' && (
									<span className="material-symbols-outlined align-middle text-warning">
										arrow_drop_down
									</span>
								)}
							</th>
							<th>Manufacturer</th>
							<th>
								Credit Cost{' '}
								{sortType === 'cost' && (
									<span className="material-symbols-outlined align-middle text-warning">
										arrow_drop_up
									</span>
								)}
							</th>
							<th className="text-nowrap">
								Max Speed{' '}
								{sortType === 'speed' && (
									<span className="material-symbols-outlined align-middle text-warning">
										arrow_drop_down
									</span>
								)}
							</th>
						</tr>
					</thead>
					<tbody>
						{starships &&
							starships.map((starship, index) => (
								<tr key={index}>
									<td>{starship.name}</td>
									<td>{starship.manufacturer}</td>
									<td>
										{starship.cost_in_credits &&
										starship.cost_in_credits !== 'unknown'
											? Number(starship.cost_in_credits).toLocaleString()
											: 'unknown'}
									</td>
									<td>{starship.max_atmosphering_speed}</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
			{loading && (
				<div className="d-flex justify-content-center mb-5">
					<div className="spinner-border text-warning" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}

			{starships.length > 0 && (
				<div className="text-center">
					{nextPage ? (
						<button className="btn bg-sw-yellow" onClick={handleLoadMore}>
							<i className="bi bi-plus-circle"></i>
							Load More
						</button>
					) : (
						<div className="alert alert-secondary  alert-dismissible fade show">
							<strong>
								<em>Thats all of them!!</em>
							</strong>{' '}
							No more starships to load.
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="alert"
								aria-label="Close"
							></button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
export default StarshipTable;
