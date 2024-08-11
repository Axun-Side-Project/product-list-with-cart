<template>
  <section>
    <div class="h-auto p-8 bg-white rounded">
      <h2 class="text-2xl font-bold text-red-600">
        Your Cart ({{ selectedProduct.length }})
      </h2>

      <div
        v-if="selectedProduct.length === 0"
        class="flex flex-col items-center justify-center mt-8 gap-y-6"
      >
        <img src="/assets/images/illustration-empty-cart.svg" alt="Empty Cart" />
        <p>Your added items will appear here</p>
      </div>
      <div v-else>
        <div
          v-for="product in selectedProduct"
          :key="product.name"
          class="flex items-center justify-between py-4 border-b"
        >
          <div>
            <p class="text-lg font-bold">{{ product.name }}</p>
            <div class="flex gap-x-4">
              <p class="font-bold text-orange-700">{{ product.quantity }}x</p>
              <p class="font-light text-gray-500">@{{ formatterPrice(product.price) }}</p>
              <p>{{ formatterPrice(product.quantity * product.price) }}</p>
            </div>
          </div>
          <button @click="handleRemoveFromCart(product)" class="hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              viewBox="0 0 10 10"
            >
              <path
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
              />
            </svg>
          </button>
        </div>
        <div class="flex items-center justify-between py-4">
          <p>Order Total</p>
          <p class="text-2xl font-bold">{{ formatterPrice(getOrderTotal()) }}</p>
        </div>
        <div class="flex justify-center py-4 bg-gray-100 rounded gap-x-2 itmes-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><path fill="#1EA575" d="M8 18.75H6.125V17.5H8V9.729L5.803 8.41l.644-1.072 2.196 1.318a1.256 1.256 0 0 1 .607 1.072V17.5A1.25 1.25 0 0 1 8 18.75Z"/><path fill="#1EA575" d="M14.25 18.75h-1.875a1.25 1.25 0 0 1-1.25-1.25v-6.875h3.75a2.498 2.498 0 0 0 2.488-2.747 2.594 2.594 0 0 0-2.622-2.253h-.99l-.11-.487C13.283 3.56 11.769 2.5 9.875 2.5a3.762 3.762 0 0 0-3.4 2.179l-.194.417-.54-.072A1.876 1.876 0 0 0 5.5 5a2.5 2.5 0 1 0 0 5v1.25a3.75 3.75 0 0 1 0-7.5h.05a5.019 5.019 0 0 1 4.325-2.5c2.3 0 4.182 1.236 4.845 3.125h.02a3.852 3.852 0 0 1 3.868 3.384 3.75 3.75 0 0 1-3.733 4.116h-2.5V17.5h1.875v1.25Z"/></svg>
            <p>
                This is a <span class="font-bold">carbon-neutral</span> delivery
            </p>
        </div>
        <button @click="completeOrder" class="w-full py-3 mt-6 font-bold text-center text-white bg-orange-600 hover:bg-orange-700 rounded-3xl">
            Confirm Order
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { toRefs, defineEmits } from "vue";

const props = defineProps({
  selectedProduct: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['completeOrder']);

function completeOrder() {
  emit('completeOrder');
}

function formatterPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function getOrderTotal() {
  let orderTotal = 0;
  props.selectedProduct.forEach((product) => {
    orderTotal += product.price * product.quantity;
  });
  return orderTotal;
}

function handleRemoveFromCart(product) {
  console.log("Remove product:", product);
}

const { selectedProduct } = toRefs(props);
</script>
