import './stars.css';

const BackgroundStars = () => {
	return (
		<div id="space">
			{[...Array(5)].map((_, index) => (
				<div key={index} className="stars" />
			))}
		</div>
	);
};

export default BackgroundStars;
