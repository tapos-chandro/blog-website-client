import { Box } from "@chakra-ui/react";
import NewsLitter from "../components/NewsLitter";
import ResentPost from "../components/ResentPost";
import Slider from "../components/Slider";

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <ResentPost/>
           <Box py={"52"}>
           <NewsLitter/>
           </Box>
        </div>
    );
};

export default Home;