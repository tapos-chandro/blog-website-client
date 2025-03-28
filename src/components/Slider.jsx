// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import banner1 from "../assets/banner-1.jpg";
import banner2 from "../assets/banner-2.jpg";
import banner3 from "../assets/banner-3.jpg";
import { Box, Button, Text } from "@chakra-ui/react";

const Slider = () => {

    const bannersData = [
        {
            id: 1,
            image: banner1,
            title: "Explore, Learn, and Grow",
            description: "A captivating background of a person deeply immersed in a book, symbolizing knowledge and curiosity. Unlock new ideas and insights with every read."
        },
        {
            id: 2,
            image: banner2,
            title: "Stay Ahead with the Latest Trends",
            description: "A dynamic backdrop featuring a futuristic digital workspace, representing innovation and progress. Stay informed, stay inspired."
        },
        {
            id: 3,
            image: banner3,
            title: "Fuel Your Creativity and Passion",
            description: `A cozy and artistic setting with a notebook, coffee, and sunlight streaming through. Where thoughts become words and creativity knows no bounds.`
        }
    ];
    

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      
      {
        bannersData?.map(banner=> <SwiperSlide key={banner?.id}>
            <Box
              bgImage={`url(${banner?.image})`}
              bgPosition="center"
              bgRepeat="no-repeat"
              bgSize="cover"
              mt={5}
              rounded={10}
              display={"flex"}
              justifyContent={"center"}
             
            >
              <Box
                bg={"#00000063"}
                h="full"
                w="full"
                rounded={10}
                display={"flex"}
                justifyContent={"center"}
                py={{md:"150", base: "50"}}
              >
                <Box textAlign={"center"} px={5} >
                  <Text
                    fontSize={{md:"5xl", base: "2xl"}}
                    zIndex={9999}
                    fontWeight={700}
                    color={"light"}
                    
                  >
                   
                   {banner?.title}
                  </Text>
                  <Text color={"light"} fontSize={"md"} px={{md: "36"}} >{banner?.description}</Text>
                  <Button bg={"primary"} color="light" rounded={"full"} my={5}>See More</Button>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>)
      }
      
    </Swiper>
  );
};

export default Slider;
