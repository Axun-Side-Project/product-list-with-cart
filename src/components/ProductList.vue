<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["addToCart", "removeFromCart", "updateCart"]);

const isSelected = ref(false);
const quantity = ref(0);

function formatterPrice(price) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function handleAddToCart() {
  if (!isSelected.value) {
    isSelected.value = true;
    quantity.value = 1;
    emit("addToCart", { ...props.product, quantity: quantity.value });
  }
}

function handleRemoveFromCart() {
  emit("removeFromCart", props.product);
  isSelected.value = false;
  quantity.value = 0;
}

function incrementQuantity() {
  if (isSelected.value) {
    quantity.value += 1;
    emit("updateCart", { ...props.product, quantity: quantity.value });
  }
}

function decrementQuantity() {
  if (isSelected.value && quantity.value > 1) {
    quantity.value -= 1;
    emit("updateCart", { ...props.product, quantity: quantity.value });
  } else {
    handleRemoveFromCart();
  }
}
</script>

<template>
  <section class="my-4">
    <div class="overflow-hidden bg-red-400 rounded-xl">
      <img class="object-cover w-full h-full" :src="product.image.desktop" alt="" />
    </div>
    <div class="relative pt-9">
      <section
        class="flex items-center justify-center shadow gap-x-4 absolute top-0 transform -translate-x-1/2 -translate-y-1/2 left-1/2 border border-orange-500 rounded-[2rem] w-56 text-center py-4 text-sm font-bold px-4 transition-all"
        :class="
          isSelected
            ? 'text-white bg-orange-700'
            : 'bg-white hover:text-orange-500 cursor-pointer'
        "
        @click="isSelected ? '' : handleAddToCart()"
      >
        <button v-if="!isSelected" class="flex flex-row gap-x-3">
          <img src="/assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
          Add to Cart
        </button>
        <div v-else class="flex items-center justify-between w-full">
          <button
            @click.stop="decrementQuantity"
            class="p-2 transition-all border border-gray-300 rounded-full aspect-square hover:text-orange-700 hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="2"
              fill="currentColor"
              viewBox="0 0 10 2"
            >
              <path d="M0 .375h10v1.25H0V.375Z" />
            </svg>
          </button>
          <span class="font-bold">{{ quantity }}</span>
          <button
            @click.stop="incrementQuantity"
            class="p-2 transition-all border border-gray-300 rounded-full aspect-square hover:text-orange-700 hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              viewBox="0 0 10 10"
            >
              <path
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
              />
            </svg>
          </button>
        </div>
      </section>
      <p class="text-sm text-gray-500">{{ product.category }}</p>
      <p class="font-bold">{{ product.name }}</p>
      <p class="font-bold text-red-700">{{ formatterPrice(product.price) }}</p>
    </div>
  </section>
</template>
