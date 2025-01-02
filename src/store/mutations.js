export default {

	/**
	 * Helper Function
	 * 
	 * These functions are designed for internal purposes 
	 * and are not exposed for direct client usage.
	 */
	ADD_PRODUCT_TO_CART(state, product) {
		state.selectedProductList.push(product);
		// TODO: change the value "isSelected" at prototype
	},

	REMOVE_PRODUCT_FROM_CART(state, product) {
		state.selectedProductList = state.selectedProductList.filter(
			(item) => item.name !== product.name
		);
		// TODO: change the value "isSelected" at prototype
	},
	
}