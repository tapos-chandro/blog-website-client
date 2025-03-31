import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";



const Details = () => {

    const {id} = useParams()
    console.log(id)



    return (
        <Box>
            <Text>This is details{id}</Text>
        </Box>
    );
};

export default Details;