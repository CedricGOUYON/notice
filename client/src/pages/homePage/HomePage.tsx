import "./HomePage.css";

function HomePage() {
	const projectName = import.meta.env.VITE_PROJECT_NAME;
	return (
		<div className="home-page">
			<h1>Bienvenue sur votre application web {projectName} 🎉</h1>
			<p>Cette page d'accueil est prête à accueillir vos utilisateurs.</p>
		</div>
	);
}

export default HomePage;
