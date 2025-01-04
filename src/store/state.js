import ProductData from "@/data.json";

export default {
	productList: ProductData.map(product => ({
		...product,
		isSelected: false,
		quantity: 1,
	})),
	selectedProductList: [],
	showModal: false,
}