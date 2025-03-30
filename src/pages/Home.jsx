import { Box } from "@chakra-ui/react";
import NewsLitter from "../components/NewsLitter";
import Slider from "../components/Slider";
import BloggingTips from "../components/TrendingBlogs";
import ResentPosts from "../components/ResentPosts";

const Home = () => {

  

  return (
    <div>
      <Slider></Slider>
      <ResentPosts />
      <BloggingTips></BloggingTips>
      <Box py={"52"}>
        <NewsLitter titleColor={"dark"} />
      </Box>
    </div>
  );
};

export default Home;
