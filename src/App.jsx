import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import BackgroundStars from './BackgroundStars';
import CrudModal from './CrudModal';
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
	const [currentStarship, setCurrentStarship] = useState(null);
	const [showModal, setShowModal] = useState(false);

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

	const handleEdit = (starship) => {
		setCurrentStarship(starship);
		setShowModal(true);
	};

	return (
		<>
			<BackgroundStars />
			<Header featuredStarship={featuredStarship} loading={loading} />

			<section className="bg-black rounded-4 position-relative mx-3">
				<SortFilter
					handleSortBy={(newSortType) => {
						setSortType(newSortType);
						setSortedStarships(handleSortBy(newSortType, starships));
					}}
					handleFilter={(string) => handleFilter(string, starships, setSortedStarships)}
					filterValue={filterValue}
					setFilterValue={setFilterValue}
					addStarShip={(starshipData) => {
						setStarships((starships) => [
							...starships,
							{ ...starshipData, id: uuidv4() },
						]);
					}}
				/>

				<StarshipTable
					starships={sortedStarships}
					loading={loading}
					nextPage={nextPage}
					handleLoadMore={handleLoadMore}
					sortType={sortType}
					handleEdit={handleEdit}
				/>
			</section>

			<CrudModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				editStarShip={(updatedStarship) => {
					setStarships((prev) =>
						prev.map((ship) =>
							ship.id === updatedStarship.id ? updatedStarship : ship,
						),
					);
				}}
				deleteStarship={(deletedStarship) => {
					setStarships((prev) => prev.filter((ship) => ship.id !== deletedStarship.id));
				}}
				currentStarship={currentStarship}
			/>
		</>
	);
}

export default App;
