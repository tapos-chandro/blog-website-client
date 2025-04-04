import { Box } from "@chakra-ui/react";
import NewsLitter from "../components/NewsLitter";
import Slider from "../components/Slider";
import ResentPosts from "../components/ResentPosts";
import TrendingBlogs from "../components/TrendingBlogs";
import ReactHelmet from "../sheard/ReactHelmet";

const Home = () => {

  

  return (
    <div>
      <ReactHelmet title={"Blog Web Site || Home"} />
      <Slider></Slider>
      <ResentPosts />
      <Box py={"52"}>
        <NewsLitter titleColor={"dark"} />
      </Box>
      <TrendingBlogs></TrendingBlogs>
    </div>
  );
};

export default Home;
