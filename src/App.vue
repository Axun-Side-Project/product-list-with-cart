<script setup>
import ProductList from './components/ProductList.vue';
import ProductCart from './components/ProductCart.vue';
import OrderCompleteModal from './components/OrderCompleteModal.vue';
import data from './data.json';
import { ref } from 'vue';

const products = ref(data);
const selectedProduct = ref([]);
const isModalVisible = ref(false);

function showModal() {
  isModalVisible.value = true;
}

function handleAddToCart(product) {
  selectedProduct.value.push(product);
  console.log(selectedProduct.value.length);
}

function handleRemoveFromCart(productToRemove) {
  selectedProduct.value = selectedProduct.value.filter(product => product.name !== productToRemove.name);
  console.log(selectedProduct.value.length);
}

function handleUpdateCart(updatedProduct) {
  const existingProductIndex = selectedProduct.value.findIndex(p => p.name === updatedProduct.name);
  if (existingProductIndex !== -1) {
    selectedProduct.value[existingProductIndex] = updatedProduct;
  } else {
    selectedProduct.value.push(updatedProduct);
  }
}

</script>

<template>
  <div class="p-16 bg-background grid grid-cols-[3fr_1fr] gap-x-8">
    
    <section>

      <h1 class="text-4xl font-bold">Desserts</h1>

      <div class="grid grid-cols-3 mt-4 gap-x-8 gap-y-8">
        <ProductList v-for="product in products"
          :key="product.id" 
          :product="product"
          @add-to-cart="handleAddToCart"
          @remove-from-cart="handleRemoveFromCart"
          @updateCart="handleUpdateCart"
        />
      </div>

    </section>

    <ProductCart :selectedProduct="selectedProduct" @completeOrder="showModal"/>
    <OrderCompleteModal :selectedProduct="selectedProduct" :isVisible="isModalVisible" @close="isModalVisible = false"/>
  </div>
</template>

<style scoped>

</style>
