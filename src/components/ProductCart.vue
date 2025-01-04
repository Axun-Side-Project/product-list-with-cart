<template>
	<section class="cart">
		<h2 class="title">Your Cart ({{ selectedProducts.length }})</h2>
		<div class="empty-cart" v-if="selectedProducts.length == 0">
			<img class="empty-cart-img" :src="illustration_empty_cart_svg" alt="">
			<p>Your added items will appear here</p>
		</div>
		<template v-else>
			<section class="product-list">
				<div class="product" v-for="product in selectedProducts">
					<section>
						<h3 class="name">{{ product.name }}</h3>
						<div class="product-info">
							<p class="quantity">{{ product.quantity }}x</p>
							<p class="price">@{{ formattedPrice(product.price) }}</p>
							<p class="total-price">{{ formattedPrice(product.quantity * product.price) }}</p>
						</div>
					</section>
					<div class="button-area">
						<i class="remove-button" @click.stop="handleRemoveFromCart(product)"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></i>
					</div>
				</div>
			</section>
			<section class="order-price">
				<p>Order Total</p>
				<p class="price">{{ formattedPrice(totalPrice) }}</p>
			</section>
			<section class="carbon-neutral">
				<i><img :src="carbon_neutral_icon" alt=""></i>
				<p>This is a <b>carbon-neutral</b> delivery</p>
			</section>
			<button class="confirm-button" @click.stop="handleConfirmOrder">
				Confirm Order
			</button>
		</template>
	</section>
</template>

<script>
import illustration_empty_cart_svg from "/assets/images/illustration-empty-cart.svg";
import carbon_neutral_icon from "/assets/images/icon-carbon-neutral.svg";

export default {
	name: "ProductCart",
	data() {
		return {
			illustration_empty_cart_svg: illustration_empty_cart_svg,
			carbon_neutral_icon: carbon_neutral_icon,
		};
	},
	methods: {
		handleRemoveFromCart(product) {
			this.$store.dispatch("handleRemoveToCart", product);
		},
		formattedPrice(price) {
			return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    	}).format(price);
		},
		handleConfirmOrder() {
			this.$store.dispatch("handleShowModal");
		},
	},
  computed: {
    selectedProducts() {
      return this.$store.getters["getSelectedProductList"] ?? [];
    },
		totalPrice() {
			const orderList = this.$store.getters["getSelectedProductList"];
			let totalPrice = 0;
			orderList.map(product => {
				totalPrice += product.quantity * product.price;
			});
			return totalPrice;
		},
  },
}
</script>

<style lang="scss" scoped>
	section.cart {
		position: sticky;
		top: 4rem;
		padding: 2rem;
		background: white;
		height: max-content;
		h2.title {
			font-size: 1.6rem;
			font-weight: bold;
			color: #C83B0E;
		}
		/* if not any product selected */
		div.empty-cart {
			margin-top: 2rem;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			.empty-cart-img {
				width: 50%;
			}
			p {
				font-size: 0.9rem;
				font-weight: 500;
				color: #8C240D;
			}
		}
		/* if have product be selected */
		section.product-list {
			max-height: 45vh;
			overflow-y: auto;
			&::-webkit-scrollbar {
				display: none;
			}
			div.product {
				display: flex;
				justify-content: space-between;
				padding: 1rem 0;
				border-bottom: 1px solid #ddd;
				h3.name {
					font-weight: 600;
				}
				div.product-info {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					column-gap: 1rem;
					padding: 0.25rem 0;
					p.quantity {
						color: #C83B0E;
						font-weight: 600;
					}
					p.price {
						color: #777;
					}
					p.total-price {
						color: #222;
					}
				}
				div.button-area {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				i.remove-button {
					display: flex;
					justify-content: center;
					align-items: center;
					cursor: pointer;
					&:hover {
						stroke: black;
						fill: black;
					}
				}
			}
		}
		section.order-price {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.4rem 0;
			p.price {
				font-size: 1.6rem;
				font-weight: bold;
			}
		}
		section.carbon-neutral {
			display: flex;
			justify-content: center;
			column-gap: 1rem;
			background: #FCF8F5;
			padding: 1rem 1.6rem;
			border-radius: 4px;
			margin-bottom: 2rem;
			p {
				font-size: 0.9rem;
			}
		}
		button.confirm-button {
			color: white;
			background: #C83B0E;
			width: 100%;
			padding: 1rem;
			border-radius: 2rem;
			&:hover {
				background: #8C240D;
			}
		}
	}
</style>