export default {

	/**
	 * Helper Function
	 * 
	 * These functions are designed for internal purposes 
	 * and are not exposed for direct client usage.
	 */

	/**
	 * Client Function 
	 */
	
	handleAddToCart({ state, commit }, product )  {
		const isDuplicate = state.selectedProductList.some(
			(selected) => selected.name === product.name
		);
		if (!isDuplicate) commit("ADD_PRODUCT_TO_CART", product);
	},

	handleRemoveToCart({ state, commit }, product ) {
		const isDuplicate = state.selectedProductList.some(
			(selected) => selected.name === product.name
		);
		if (isDuplicate) commit("REMOVE_PRODUCT_FROM_CART", product);
	},

}