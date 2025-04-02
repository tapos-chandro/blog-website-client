import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

const Featured = () => {
  const [topPosts, setTopPosts] = useState([]);
  const axiosInstance = useAxios();

  const wordCalculator = (text) => text.split(" ").length;

  useEffect(() => {
    axiosInstance.get("/blogs").then((res) => {
      const sortBlogs = res?.data
        ?.map((blog) => ({
          ...blog,
          wordCount: wordCalculator(blog.logDescription),
        }))
        .sort((b, a) => a.wordCount - b.wordCount)
        .slice(0, 10);

      setTopPosts(sortBlogs);
    });
  }, []);

const columns = [
    {header: "Title", accessorKey: 'title'},
    {author: "Author", accessorKey: "author"},
    {wordCount: "Word Count", accessorKey: "wordCount"}
]


const table = useReactTable({
    data: topPosts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table)


  return (
      
    <TableContainer border={"1px"} borderColor={"gray"} pt={5} my={5} rounded={"2xl"}>
    <Text textAlign={"center"} pb={5} fontSize={20} fontWeight={"bold"} color={"dark"}>Featured</Text>
      <Table variant='striped'  size={"lg"}  rounded={"2xl"}>
        <Thead bg={"primary"} textColor={"light"} rounded={"2xl"}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody textColor={"dark"}>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Featured;
