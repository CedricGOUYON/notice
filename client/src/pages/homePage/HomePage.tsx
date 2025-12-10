import Header from "../../components/header/Header";
import "./HomePage.css";
import { constants } from "../../../../setup/constants";

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <h1>Bienvenue sur votre application web</h1>
      <p>Cette page d'accueil est prête à accueillir vos utilisateurs.</p>
      <h2>{constants.ROOT_FOLDER_NAME}</h2>
      <p>sera bientot disponible </p>
    </div>
  );
}

export default HomePage;
