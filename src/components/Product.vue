<template>
	<section class="product">
		<!-- Image Box -->
		<section class="product-image">
			<div :class="['image-box', {'selected': product.isSelected }]">
				<img class="image" :src="product.image.desktop" alt="">
			</div>
			<!-- Button -->
			<section :class="['button-box', {'selected': product.isSelected }]" @click.stop="() => { if (!isSelected) addToCart(); }">
				<template v-if="!product.isSelected">
					<img :src="add_to_cart_icon" alt="">
					Add to Cart
				</template>
				<template v-else>
					<i class="quantity-button" @click.stop="decrementQuantity">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
					</i>
					{{ product.quantity }}
					<i class="quantity-button" @click.stop="incrementQuantity">
						<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
					</i>
				</template>
			</section>
		</section>
		<!-- Information -->
		<div>
			<p class="category">{{ product.category }}</p>
			<h2 class="name">{{ product.name }}</h2>
			<p class="price">{{ formattedPrice(product.price) }}</p>
		</div>
	</section>
</template>

<script>
import { ref } from "vue";
import add_to_cart_icon from "/assets/images/icon-add-to-cart.svg";
import decrement_quantity_icon from '/assets/images/icon-decrement-quantity.svg';
import increment_quantity_icon from '/assets/images/icon-increment-quantity.svg';

export default {
	name: "Product",
	props: {
		product: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			add_to_cart_icon: add_to_cart_icon,
			decrement_quantity_icon: decrement_quantity_icon,
			increment_quantity_icon: increment_quantity_icon,
		};
	},
	methods: {
		addToCart() {
			this.$store.dispatch("handleAddToCart", this.product);
		},
		decrementQuantity() {
			if (this.product.quantity > 1) {
				this.product.quantity -= 1;
				this.$store.dispatch("handleProductQuantityUpdate", this.product)
			} else if (this.product.quantity === 1) {
				this.$store.dispatch("handleRemoveToCart", this.product);
			}
		},
		incrementQuantity() {
			this.product.quantity += 1;
			this.$store.dispatch("handleProductQuantityUpdate", this.product)
		},
		formattedPrice(price) {
			return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    	}).format(price);
		},
	},
};
</script>

<style lang="scss" scoped>
section.product {
	section.product-image {
		position: relative;
		margin-bottom: 2.4rem;
		div.image-box {
			border-radius: 1rem;
			overflow: hidden;
			&.selected {
				border: 4px solid #8C240D;
			}
			img.image {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
		section.button-box {
			position: absolute;
			bottom: 0;
			left: 50%;
			background: white;
			padding: 0.8rem 1.4rem;
			min-width: 11rem;
			display: flex;
			justify-content: center;
			align-items: center;
			column-gap: 0.5rem;
			transform: translate(-50%, 50%);
			cursor: pointer;
			border: 1px solid #8C240D;
			border-radius: 2rem;
			white-space: nowrap;
			transition: all 0.12s ease-in-out;
			&:hover {
				color: #8C240D;
			}
			&.selected {
				justify-content: space-between;
				color: white;
				background: #C83B0E;
				cursor: default;
			}
			.quantity-button {
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				aspect-ratio: 1/1;
				padding: 0.24rem;
				border: 1px solid white;
				border-radius: 100%;
				&:hover {
					background: white;
					svg {
						fill: #C83B0E;
						stroke: #C83B0E;
					}
				}
			}
		}
	}
	p.category {
		font-size: 0.9rem;
		color: #555;
		margin-bottom: 0.3rem;
	}
	h2.name {
		font-weight: 600;
	}
	p.price {
		font-weight: 500;
		font-size: 1.1rem;
		color: #8C240D;
	}
}
</style>