import NewsLitter from "../components/NewsLitter";
import ResentPost from "../components/ResentPost";
import Slider from "../components/Slider";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <ResentPost/>
            <NewsLitter/>
        </div>
    );
};

export default Home;