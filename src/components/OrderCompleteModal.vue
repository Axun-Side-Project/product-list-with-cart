<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50" @click="close"></div>
    <div class="z-10 p-8 bg-white rounded shadow-lg min-w-[24rem]">
      <h2 class="text-3xl font-bold">Order Confirmed</h2>
      <p class="text-sm text-gray-400">We hope you enjoy your food!</p>
      <div class="flex flex-col mt-4 rounded bg-gray-50">

        <div v-for="product in selectedProduct" class="flex items-center justify-between gap-x-8">
            <div class="grid grid-cols-[50px_1fr] gap-x-6 p-4">
                <div>
                    <img class="object-cover w-full h-full" :src="product.image.thumbnail" alt="thumbnail">
                </div>
                <div class="grid grid-rows-2">
                    <p class="font-bold">{{ product.name }}</p>
                    <div class="flex items-center justify-start gap-x-4">
                        <p class="text-sm font-bold text-orange-700">{{ product.quantity }}x</p>
                        <p class="text-sm text-gray-400">@{{ formatterPrice(product.price) }}</p>
                    </div>
                </div>
            </div>
            <p class="pr-6 text-sm font-bold">
                {{ formatterPrice(product.price * product.quantity) }}
            </p>
        </div>

        <div class="flex items-center justify-between p-4">
          <p>Order Total:</p>
          <p class="text-2xl font-bold">{{ formatterPrice(getOrderTotal()) }}</p>
        </div>
      </div>
      <button @click="close" class="w-full px-4 py-2 mt-4 text-white bg-orange-700 rounded-3xl">
        Start New Order
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  selectedProduct: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close"]);

function close() {
  emit("close");
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

const { selectedProduct } = toRefs(props);
</script>
