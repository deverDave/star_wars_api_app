import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import './App.css';
import './stars.css';

function App() {
	const [featuredStarship, setFeaturedStarship] = useState(null);
	const [starships, setStarships] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [loading, setLoading] = useState(false);

	// Fetch starships data from the API
	const fetchStarships = async (url) => {
		setLoading(true);
		try {
			const response = await axios.get(url);
			const starshipData = response.data.results;
			setLoading(false);
			// Update starships state by appending new data
			setStarships((prevStarships) => [...prevStarships, ...starshipData]);
			// Set next page URL
			setNextPage(response.data.next);
		} catch (error) {
			console.error('Error fetching starships:', error);
		}
	};

	const createFeaturedStarship = async () => {
		const randomShipNum = Math.floor(Math.random() * starships.length) + 1;
		setFeaturedStarship(starships[randomShipNum]);
	};

	useEffect(() => {
		fetchStarships('https://swapi.dev/api/starships/');
	}, []);

	useEffect(() => {
		if (starships.length > 0) {
			createFeaturedStarship();
		}
	}, [starships]);

	const handleLoadMore = () => {
		if (nextPage) {
			fetchStarships(nextPage);
		}
	};

	return (
		<>
			<div id="space">
				{[...Array(5)].map((_, index) => (
					<div key={index} className="stars"></div>
				))}
			</div>
			<section className="bg-black rounded-4 container position-relative pt-4 mt-4">
				<header className="sticky-top bg-black d-flex justify-content-between p-4 text-light">
					<h1>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png"
							alt="Star Wars Logo"
							width={250}
						/>
					</h1>

					<div>
						<h2>Featured Starship</h2>
						<hr />
						{featuredStarship && (
							<ul className="list-group text-light">
								<li className="list-group-item bg-dark text-light">
									<span className="badge bg-dark text-uppercase">Name:</span>{' '}
									{featuredStarship.name}
								</li>
								<li className="list-group-item bg-dark text-light">
									<span className="badge bg-dark text-uppercase">
										Manufacturer:
									</span>{' '}
									{featuredStarship.manufacturer}
								</li>
								<li className="list-group-item bg-dark text-light">
									<span className="badge bg-dark text-uppercase">Class:</span>{' '}
									{featuredStarship.starship_class}
								</li>
								<li className="list-group-item bg-dark text-light">
									<span className="badge bg-dark text-uppercase">Cost:</span>{' '}
									{featuredStarship.cost_in_credits &&
									featuredStarship.cost_in_credits !== 'unknown'
										? Number(featuredStarship.cost_in_credits).toLocaleString()
										: 'unknown'}{' '}
									{' credits'}
								</li>
							</ul>
						)}
					</div>
				</header>

				<div className="p-4 mb-5 bg-transparent">
					{starships.length > 0 && (
						<table className="table mb-4 rounded-4 min-vh-80">
							<thead className="sticky-top sticky-top2">
								<tr>
									<th>Ship Name</th>
									<th>Manufacturer</th>
									<th>Credit Cost</th>
									<th>Max Speed</th>
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
													? Number(
															starship.cost_in_credits,
														).toLocaleString()
													: 'unknown'}
											</td>
											<td>{starship.max_atmosphering_speed}</td>
										</tr>
									))}
							</tbody>
						</table>
					)}
					{loading && (
						<div class="d-flex justify-content-center mb-5">
							<div class="spinner-border text-warning" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>
					)}

					{starships.length > 0 && (
						<div className="text-center">
							{nextPage ? (
								<button className="btn btn-warning" onClick={handleLoadMore}>
									<i className="bi bi-plus-circle"></i>
									Load More
								</button>
							) : (
								<div className="alert alert-info">
									<em>Thats all of 'em!!</em> No more starships to load.
								</div>
							)}
						</div>
					)}
				</div>
			</section>
		</>
	);
}

export default App;
