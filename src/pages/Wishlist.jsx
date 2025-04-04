import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
  Image,
  Box,
  Spinner,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const email = user?.email;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }) => (
        <Image w={10} h={10} rounded={"full"} src={row.original.image} />
      ),
    },
    { header: "Title", accessorKey: "title" },
    { header: "Category", accessorKey: "category" },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <>
          <Button
            color={"primary"}
            size="sm"
            rounded={"full"}
            bg={"red"}
            textColor={"light"}
            onClick={() => handleRemoveWishlist(row.original.id)}
          >
            Remove Wishlist
          </Button>
          <Button
            color={"light"}
            size="sm"
            bg={"primary"}
            rounded={"full"}
            ml={"2"}
            onClick={() => handleShowDetails(row.original.id)}
          >
            Show details
          </Button>
        </>
      ),
    },
  ];

  const table = useReactTable({
    data: wishlists,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!email) return;
    axiosSecure.get(`/wishlist/?email=${email}`).then((res) => {
      setWishlists(res?.data);
      setLoading(false);
    });
  }, [email]);

  // the wishlist remove
  const handleRemoveWishlist = async (id) => {
    try {
      await axiosInstance.delete(`/wishlist/${id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          setWishlists((prev) => prev.filter((item) => item.id !== id));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Remove wishlist successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (error) {
      console.error("Error removing wishlist item:", error);
    }
  };

  const handleShowDetails = async (id) => {
    navigate(`/details/${id}`);
  };

  if (loading) {
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        h={"100vh"}
        justifyContent={"center"}
      >
        <Spinner size="xl" color="primary" textAlign={"center"} />
      </Box>
    );
  }
  return (
    <>
    {
      wishlists?.length > 0 ? <TableContainer
      border={"1px"}
      pt={5}
      my={5}
      rounded="2xl"
      color={"dark"}
    >
      <Text
        textAlign="center"
        pb={5}
        fontSize="20px"
        fontWeight="bold"
        color="dark"
      >
        Wishlisted Blogs
      </Text>
      <Table variant="striped" size="lg" rounded="2xl" >
        <Thead bg={"primary"} textColor={"light"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} textAlign={"center"}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody >
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} textAlign={"center"}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>: <Box h="50vh" display={"flex"} flexDirection={"column"} justifyItems={"center"} justifyContent={"center"} > 
      <Text textAlign={"center" } fontSize={"2xl"} fontWeight={"bold"} textColor={"dark"}> Wishlist Not Available</Text>
    </Box> 
    }
    </>
  );
};

export default Wishlist;
