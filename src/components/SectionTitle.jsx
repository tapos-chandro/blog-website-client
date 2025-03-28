import { Box, Text } from "@chakra-ui/react";

const SectionTitle = ({title}) => {


    return (
        <Box >
            <Text textAlign={"center"} fontSize={"3xl"} fontWeight={700} pt={"14"} pb={"7"} color={"dark"}>{title}</Text>
        </Box>
    );
};

export default SectionTitle;