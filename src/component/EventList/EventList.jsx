import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import {
  SimpleGrid,
  Box,
  Button,
  Center,
  Heading
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom'

function EventList() {
  const [data, setData] = useState([]);

  const Navigate= useNavigate()

  useEffect(() => {
    axios
      .get("http://13.235.243.100/event/all")
      .then((res) => setData(res.data));
  }, []);
  // console.log(data, "data");

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Navbar />
      <Center><Heading>All Event List</Heading></Center>
      <SimpleGrid mt={5} columns={[1,2,3]} spacing={10}>
        {data &&
          data.map((e, i) => {
            return (
              <Box
              key={i+"eventlist"}
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Box p="6">
                  <Box
                    mt="1"
                    color="red.500"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                    textTransform="uppercase"
                  >
                    {e.name}
                  </Box>
                  <Box fontWeight="semibold" as="h4">
                    Organizer Name
                  </Box>
                  <Box as="span" color="gray.600" fontSize="sm">
                    {e.organizer.username}
                  </Box>

                  <Box fontWeight="semibold" as="h4">
                    Description
                  </Box>
                  <Box as="span" color="gray.600" fontSize="sm">
                    {e.description}
                  </Box>
                  <Box display="flex" mt="2" alignItems="center">
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      Total Players {e.maxPlayers}
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="baseline">
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="s"
                      textTransform="uppercase"
                      ml="2"
                    >
                      Date {e.date}
                    </Box>
                  </Box>
                </Box>
                <Center gap={5} mb={2}><Button colorScheme="green" onClick={()=>Navigate(`/eventplayers/${e._id}`,console.log(e._id))} >Player List</Button>
                <Button colorScheme="yellow" onClick={()=>Navigate(`/event/${e._id}`,console.log(e._id))} >View Details</Button></Center>
              </Box>
            );
          })}
      </SimpleGrid>
    </div>
  );
}

export default EventList;
