<template>
	<section>
		<div v-for="product in selectedProducts">
			{{ product.name }}
		</div>
	</section>
</template>

<script>
export default {
	name: "ProductCart",
  computed: {
    selectedProducts() {
      return this.$store.getters["getSelectedProductList"] ?? [];
    },
  },
}
</script>

<style lang="scss" scoped>
	section {
		background: green;
		padding: 1rem;
	}
</style>