import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Fetch starships data from the API
export const fetchStarships = async (url, setLoading, setStarships, setNextPage) => {
	setLoading(true);
	try {
		const response = await axios.get(url);
		const starshipData = response.data.results;
		setLoading(false);
		starshipData.forEach((starship) => {
			starship.id = uuidv4();
		});
		setStarships((prevStarships) => [...prevStarships, ...starshipData]);
		setNextPage(response.data.next);
	} catch (error) {
		console.error('Error fetching starships:', error);
	}
};

// Create a random featured starship
export const createFeaturedStarship = (starships, setFeaturedStarship) => {
	const randomShipNum = Math.floor(Math.random() * starships.length);
	setFeaturedStarship(starships[randomShipNum]);
};

// Sort starships by name, speed, or cost
export const handleSortBy = (sortType, starships) => {
	const sortedArray = [...starships];

	if (sortType === 'name') {
		sortedArray.sort((a, b) => a.name.localeCompare(b.name));
	} else if (sortType === 'speed') {
		sortedArray.sort((a, b) => {
			const speedA =
				a.max_atmosphering_speed === 'unknown' || a.max_atmosphering_speed === 'n/a'
					? -1
					: parseInt(a.max_atmosphering_speed.replace('km', ''), 10);
			const speedB =
				b.max_atmosphering_speed === 'unknown' || b.max_atmosphering_speed === 'n/a'
					? -1
					: parseInt(b.max_atmosphering_speed.replace('km', ''), 10);
			return speedB - speedA;
		});
	} else if (sortType === 'cost') {
		sortedArray.sort((a, b) => {
			const costA =
				a.cost_in_credits === 'unknown'
					? Infinity
					: parseInt(a.cost_in_credits.replace(',', ''), 10);
			const costB =
				b.cost_in_credits === 'unknown'
					? Infinity
					: parseInt(b.cost_in_credits.replace(',', ''), 10);
			return costA - costB;
		});
	}

	return sortedArray;
};

// Filter starships by name
export const handleFilter = (string, starships, setSortedStarships) => {
	setSortedStarships(() => {
		const filteredArray = starships.filter((starship) =>
			starship.name.toLowerCase().includes(string.toLowerCase()),
		);
		return filteredArray;
	});
};

// Check if form fields are empty
export const isFormValid = (newStarship) => {
	return !Object.values(newStarship).some(
		(value) => typeof value === 'string' && value.trim() === '',
	);
};
