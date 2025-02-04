import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';

import './App.css';
import BackgroundStars from './BackgroundStars';
import Header from './Header';
import SortFilter from './SortFilter';
import StarshipTable from './StarshipTable';
import { createFeaturedStarship, fetchStarships, handleFilter, handleSortBy } from './utils';

function App() {
	const [featuredStarship, setFeaturedStarship] = useState(null);
	const [starships, setStarships] = useState([]);
	const [nextPage, setNextPage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sortedStarships, setSortedStarships] = useState([]);
	const [filterValue, setFilterValue] = useState('');
	const [sortType, setSortType] = useState('');

	useEffect(() => {
		fetchStarships('https://swapi.dev/api/starships/', setLoading, setStarships, setNextPage);
	}, []);

	useEffect(() => {
		if (starships.length > 0) {
			createFeaturedStarship(starships, setFeaturedStarship);
		}
		setSortedStarships(starships);
	}, [starships]);

	const handleLoadMore = () => {
		if (nextPage) {
			fetchStarships(nextPage, setLoading, setStarships, setNextPage);
		}
		setFilterValue('');
		setSortType('');
	};

	const handleSortChange = (newSortType) => {
		setSortType(newSortType);
		setSortedStarships(handleSortBy(newSortType, starships));
	};

	const addStarShip = (starshipData) => {
		setStarships([...starships, starshipData]);
	};

	return (
		<>
			<BackgroundStars />
			<Header featuredStarship={featuredStarship} loading={loading} />

			<section className="bg-black rounded-4 position-relative mx-3">
				<SortFilter
					handleSortBy={handleSortChange}
					handleFilter={(string) => handleFilter(string, starships, setSortedStarships)}
					filterValue={filterValue}
					setFilterValue={setFilterValue}
					addStarShip={addStarShip}
				/>

				<StarshipTable
					starships={sortedStarships}
					loading={loading}
					nextPage={nextPage}
					handleLoadMore={handleLoadMore}
					sortType={sortType}
				/>
			</section>
		</>
	);
}

export default App;
