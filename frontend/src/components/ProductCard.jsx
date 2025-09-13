import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../../store/product'

const ProductCard = ({ product }) => {

    const [updateProduct, setUpdateProduct] = useState(product)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const textColor = useColorModeValue("gray.600", "gray.200")

    const bg = useColorModeValue("white", "gray.800")

    const toast = useToast()

    const { deleteProduct, updateProductStore } = useProductStore()

    // console.log("product data", product)

    const handleDeleteProduct = async (id) => {

        const { success, message } = await deleteProduct(id);

        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleProduct = async (id, updateProduct) => {
        const {success, message} = await updateProductStore(id, updateProduct);
        onClose();
        if(!success)
        {
            toast({
                title: "Error",
                description:  message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        else{
            toast({
                title: "Success",
                description:  "Product updated Successfully",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        }
    }

    return (
        <>
            <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{ transform: "translateY(-5px)" }} bg={bg}>
                <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
                <Box p={4}>
                    <Heading as='h3' size='md' mb={2}>
                        {product.name}
                    </Heading>

                    <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                        ${product.price}
                    </Text>

                    <HStack spacing={2}>
                        <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                        <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDeleteProduct(product._id)} />
                    </HStack>
                </Box>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder='Product Name' name='name' value={updateProduct.name} onChange={(e) => setUpdateProduct({ ...updateProduct, name: e.target.value })} />
                            <Input placeContent='Price' name='price' type='number' value={updateProduct.price} onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}/>
                            <Input placeContent='Image URL' name='image' value={updateProduct.image} onChange={(e) => setUpdateProduct({ ...updateProduct, image: e.target.value })}/>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleProduct(product._id, updateProduct)}>Update</Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProductCard