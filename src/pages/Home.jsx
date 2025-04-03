import { Box } from "@chakra-ui/react";
import NewsLitter from "../components/NewsLitter";
import Slider from "../components/Slider";
import BloggingTips from "../components/TrendingBlogs";
import ResentPosts from "../components/ResentPosts";
import TrendingBlogs from "../components/TrendingBlogs";

const Home = () => {

  

  return (
    <div>
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
