import Contentcity from "./contentcity/Contentcity";
import ContentForm from "./contentform/ContentForm";
import Contenthotel from "./contenthotel/Contenthotel";
import Contenttype from "./contenttype/Contenttype";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";
const Home = () => {
	return (
		<div>
			{/* Lấy ra các componend */}
			<Navbar />
			<Header />
			<Contentcity />
			<Contenttype />
			<Contenthotel />
			<ContentForm />
			<Footer />
		</div>
	);
};

export default Home;
