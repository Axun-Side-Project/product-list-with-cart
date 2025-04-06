<template>
	<section class="background" v-if="isShowModal">
		<div class="modal">
			<i><img class="confirmed-icon" :src="order_confirmed_icon" alt=""></i>
			<h1>Order Confirmed</h1>
			<h6>We hope you enjoy your food!</h6>
			<section class="product-list">
				<div class="product" v-for="product in products">
					<section style="display: flex; column-gap: 1rem;">
						<img :src="product.image.thumbnail" alt="">
						<div style="display: flex; flex-direction: column; justify-content: space-between">
							<p style="font-size: 0.9rem; font-weight: 500;">{{ product.name }}</p>
							<div style="display: flex; column-gap: 1rem;">
								<p style="color: #8C240D;">{{ product.quantity }}x</p>
								<p style="">@{{ formattedPrice(product.price) }}</p>
							</div>
						</div>
					</section>
					<div>
						{{ formattedPrice(product.price * product.quantity) }}
					</div>
				</div>
			</section>
			<section class="order-total">
				<p class="text">Order Total</p>
				<p class="price">{{ formattedPrice(totalPrice) }}</p>
			</section>
			<button class="new-order" @click.stop="handleNewOrder">
				Start New Order
			</button>
		</div>
	</section>
</template>

<script>
import order_confirmed_icon from "/assets/images/icon-order-confirmed.svg";

export default {
	name: "OrderCompleteModal",
	data() {
		return {
			order_confirmed_icon: order_confirmed_icon,
		};
	},
	methods: {
		formattedPrice(price) {
			return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    	}).format(price);
		},
		handleNewOrder() {
			this.$store.dispatch("handleCloseModal");
			this.$store.dispatch("resetSelectedProductList");
		},
	},
	computed: {
		isShowModal() {
			return this.$store.getters["isShowModal"];
		},
		products() {
      return this.$store.getters["getSelectedProductList"];
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
section.background {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	background: #000000aa;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	div.modal {
		background: white;
		padding: 2rem;
		width: 30vw;
		border-radius: .5rem;
		img.confirmed-icon {
			width: 2.4rem;
			margin-bottom: 1.2rem;
		}
		h1 {
			font-size: 2rem;
			font-weight: bold;
		}
		h6 {
			color: #888;
		}
		section.product-list {
			background: #FCF8F5;
			margin-top: 1rem;
			padding: 0 1.4rem;
			max-height: 40vh;
			overflow: auto;
			&::-webkit-scrollbar {
				display: none;
			}
			div.product {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 1.2rem 0;
				border-bottom: 1px solid #ccc;
				img {
					width: 3.6rem;
				}
			}
		}
		section.order-total {
			background: #FCF8F5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1.8rem 1.4rem;
			margin-bottom:  2rem;
			p.text {
				font-size: 0.9rem;
			}
			p.price {
				font-size: 1.4rem;
				font-weight: bold;
			}
		}
		button.new-order {
			color: white;
			background: orangered;
			width: 100%;
			padding: 0.8rem 1.4rem;
			border-radius: 2rem;
			&:hover {
				background: #b83100;
			}
		}
	}
}

@media screen and (max-width: 970px) {
  section.background {
    align-items: flex-end;
    div.modal {
      width: 100vw;
    }
  }
}
</style>