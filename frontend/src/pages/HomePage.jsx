import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useProductStore } from '../../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
    const { fetchProduct, products } = useProductStore();

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct])

    console.log("Product", products);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text fontSize={"30"} fontWeight={"bold"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"} textAlign={"center"}>
                    Currect Product 🚀
                </Text>

                <SimpleGrid columns={{
                    base: 1,
                    md: 2,
                    lg: 3
                }} spacing={10} w={"full"}>
                    {
                        products?.map((product) => (<ProductCard key={product._id} product={product} />))
                    }
                </SimpleGrid>

                {
                    products.length == 0 && (<>
                        <Text fontSize='xl' as={'p'} textAlign={"center"} fontWeight='bold' color='gray.500'>
                            No products found 🥺
                        </Text>
                        <Link to={"/create"}>
                            <Text color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Create a product
                            </Text>
                        </Link></>
                    )
                }

            </VStack>
        </Container>
    )
}

export default HomePage