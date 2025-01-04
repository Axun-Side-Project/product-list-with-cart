export default {

	/**
	 * Helper Function
	 * 
	 * These functions are designed for internal purposes 
	 * and are not exposed for direct client usage.
	 */
	ADD_PRODUCT_TO_CART(state, product) {
		state.selectedProductList.push({
			...product,
			quantity: 1,
		});
		const originalProduct = state.productList.find(item => item.name === product.name);
		if (originalProduct) originalProduct.isSelected = true;
	},

	REMOVE_PRODUCT_FROM_CART(state, product) {
		state.selectedProductList = state.selectedProductList.filter(
			(item) => item.name !== product.name
		);
		const originalProduct = state.productList.find(item => item.name === product.name);
		if (!originalProduct) return;
		originalProduct.quantity = 1; 
		originalProduct.isSelected = false; 
	},

	UPDATE_PRODUCT_QUANTITY(state, product) {
		const existingProduct = state.selectedProductList.find(item => item.name === product.name);
		if (existingProduct) {
        existingProduct.quantity = product.quantity;
    }
	},

	SHOW_MODAL(state) {
		state.showModal = true;
		document.body.style.overflowY = "hidden";
	},

	CLOSE_MODAL(state) {
		state.showModal = false;
		document.body.style.overflowY = "auto";
	},

	RESET_CART(state) {
		state.productList.forEach(product => {
			product.quantity = 1;
			product.isSelected = false;
		});
		state.selectedProductList = [];
	},
	
}