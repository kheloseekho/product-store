import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields" }
        }

        const res = await fetch("http://localhost:500/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })

        const data = await res.json();
        set((state) => ({
            products: [...state.products, data.data]
        }));

        return { success: true, message: "Product created Successfully" }
    },
    fetchProduct: async() => {
        const res = await fetch("http://localhost:500/allproduct/");
        const data = await res.json();
        set({products: data.data})
    },
    deleteProduct: async (id) => {
        const res = await fetch(`http://localhost:500/delete/${id}`, {
            method:"DELETE"
        })
        const data = await res.json();

        console.log("json", data)

        if(!data.success) return {success: false, message: data.message}

        set((state) => ({
            products: state.products.filter((product) => product._id !== id)
        }));

        return {success: true, message: data.message}
    },
    updateProductStore: async(id, updatedProduct) => {
        const res = await fetch(`http://localhost:500/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })

        const data = await res.json();

        if (!data.success) return {success: false, message: data.message}

        set((state) => ({
            products: state.products.map((product) => (product._id ===   id ? data.data : product))
        }));

        return {success: true, message: data.message};
    }
}))