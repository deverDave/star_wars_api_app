import Starship from './assets/Starship.svg';

const Header = ({ featuredStarship }) => {
	return (
		<header className="header sticky-md-top bg-black rounded-4 m-3" style={{ zIndex: '99999' }}>
			<section className="d-flex flex-column flex-md-row  gap-3 justify-content-between align-items-center p-3 py-4 text-light">
				<h1 className="d-flex align-items-center flex-column ">
					<div>
						<img
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/694px-Star_Wars_Logo.svg.png"
							alt="Star Wars Logo"
							width={200}
						/>
					</div>
					<div className="d-flex gap-3 align-items-center">
						<span className="orbitron-reg sw-yellow">Starship Stats</span>
						<img src={Starship} alt="Starship" width={50} />
					</div>
				</h1>

				<div className="d-flex-column ">
					<h4 className="text-center">Featured Starship</h4>

					<ul className="list-group roboto">
						<li className="list-group-item bg-dark text-light">
							<span className="badge bg-dark text-uppercase text-secondary">
								Name:
							</span>{' '}
							{featuredStarship?.name}
						</li>
						<li className="list-group-item bg-dark text-light">
							<span className="badge bg-dark text-uppercase text-secondary">
								Manufacturer:
							</span>{' '}
							{featuredStarship?.manufacturer}
						</li>

						<li className="list-group-item bg-dark text-light">
							<span className="badge bg-dark text-uppercase text-secondary">
								Cost:
							</span>{' '}
							{featuredStarship?.cost_in_credits &&
							featuredStarship?.cost_in_credits !== 'unknown'
								? Number(featuredStarship?.cost_in_credits).toLocaleString()
								: 'unknown'}{' '}
							{' credits'}
						</li>
						<li className="list-group-item bg-dark text-light">
							<span className="badge bg-dark text-uppercase text-secondary">
								Speed:
							</span>{' '}
							{featuredStarship?.max_atmosphering_speed}
						</li>
					</ul>
				</div>
			</section>
		</header>
	);
};
export default Header;
