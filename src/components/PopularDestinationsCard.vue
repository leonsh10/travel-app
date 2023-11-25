<template>
  <v-row class="destination-card-wrapper" :class="{'soldout': trip.availability == 0}">
    <v-col
      cols="12"
      class="popular-destinations-header"
      @click="redirectToTrip"
      :style="backgroundStyle"
    >
      <div class="popular-destinations-specials">
        <span v-if="trip.sale != 0" class="special-offer">Special Offer</span>
        <span class="wishlist-popular-destinations" @click="test()">
          <img src="../assets/usefulIcons/heart.png" />
        </span>
      </div>
      <div v-if="listing && trip.availability == 0" class="sold-out-image"></div> <!-- Use a div for the image -->
    </v-col>
    <v-col cols="12" class="popular-destinations-infos">
      <span class="destination-card-country" @click="redirectToTrip">{{
        trip.city
      }}</span>
      <span class="destination-card-description">{{
        trip.shortDescription
      }}</span>
      <div class="mt-2">
        <span v-if="trip.sale" class="destination-card-price mr-2"> ${{ calculateDiscountedPrice() }}</span>
        <span class="destination-card-price" :class="{'onsale': trip.sale && trip.sale > 0}">${{ trip.price }}</span>
      </div>

    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    trip: {
      default: Object,
    },
    listing: {
      default: false
    }
  },
  computed: {
    backgroundStyle() {
      let imageUrl;
      if (this.trip.city) {
        imageUrl = require(`../assets/tours/${this.trip.city.replace(/\s/g, '').toLowerCase()}/1.jpg`);
      }
      return {
        "background-image": `url(${imageUrl})`,
      };
    },
  },
  methods: {
    redirectToTrip() {
      if (this.trip && this.trip._id && this.trip.availability) {
        this.$router.push(`/trip/${this.trip._id}`);
      }
    },

    calculateDiscountedPrice() {
    if (this.trip && this.trip.price && this.trip.sale) {
      const discountedPrice = this.trip.price - (this.trip.price * this.trip.sale) / 100;
      return discountedPrice.toFixed(2);
    }
    return null;
  },
  
  },
};
</script>

<style>
.destination-card-wrapper {
  margin: 0;
  padding-right: 30px;
}

.popular-destinations-header {
  min-height: 300px;
  max-height: 300px;
  background-size: cover;
  cursor:pointer;
  position: relative;
}

.destination-card-wrapper.soldout * {
  cursor:not-allowed !important;
}

.popular-destinations-infos {
  padding-left: 0px;
  display: flex;
  flex-direction: column;
}

.destination-card-country {
  font-family: "Oswald", sans-serif;
  font-size: 30px;
  font-weight: 400;
  color: #181818;
  line-height: 30px;
  cursor:pointer;
}


.destination-card-country:hover{
  color: #585050;
}

.destination-card-price.onsale{
  font-size: 16px;
  text-decoration: line-through;
}

.destination-card-description {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  line-height: 1.9285;
  font-weight: 400;
  color: #72728c;
  -webkit-font-smoothing: antialiased;
  -webkit-text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  max-height: 22px;
  min-height: 22px;
  text-overflow: ellipsis;
  display: inline-block;
  white-space:nowrap;
  overflow: hidden;
}

.destination-card-price {
  font-size: 18px;
  font-weight: 700;
  color: #181818;
  margin-top: 16px;
}

.special-offer {
  display: flex;
  padding: 8px 20px;
  background: #181818;
  color: #fff;
  font-size: 16px;
  width: fit-content;
  cursor: pointer;
  font-family: "Oswald", sans-serif;
}

.popular-destinations-specials {
  position: relative;
  margin-top: 5px;
}

.wishlist-popular-destinations {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  padding: 5px;
}

.wishlist-popular-destinations img {
  width: 28px;
}

.wishlist-popular-destinations.active img {
  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)
    brightness(95%) contrast(80%);
}

.wishlist-popular-destinations:hover img {
  filter: invert(68%) sepia(37%) saturate(3207%) hue-rotate(130deg)
    brightness(80%) contrast(90%);
}

.wishlist-popular-destinations:hover {
  background: #ffe2e2;
}

.sold-out-label {
  display: flex;
  align-items: center; /* Center the text and image vertically */
  padding-left: 10px; /* Add some spacing between image and text */
  font-family: "Oswald", sans-serif;
  font-size: 16px;
  cursor: not-allowed; /* Make it clear that it's not clickable */
  color: #fff; /* Text color */
}

.sold-out-image {
  background-image: url('../assets/soldout.png'); /* Set the image as background */
  background-size: contain; /* Adjust the size as needed */
  background-repeat: no-repeat; /* Prevent image from repeating */
  width: 20px; /* Set the width of the image */
  height: 20px; /* Set the height of the image */
  margin-right: 8px; /* Add some spacing between image and text */
  opacity: 0.7; /* Adjust the opacity to make it lighter */
}

.sold-out-image {
  background-image: url('../assets/soldout.png'); /* Set the image as background */
  background-size: cover; /* Cover the entire header */
  background-repeat: no-repeat; /* Prevent image from repeating */
  width: 100%; /* Set the width to cover the entire header */
  height: 100%; /* Set the height to cover the entire header */
  position: absolute; /* Position it absolutely within the header */
  top: 0;
  left: 0;
  opacity: 0.7; /* Adjust the opacity to make it lighter */
}

/* Remove the Sold Out label */
.sold-out-image::after {
  content: ""; /* Clear any content */
}

@media screen and (max-width: 1800px) {
  .destination-card-country{
    font-size: 22px;
  }
  .destination-card-price{
    margin-top: 12px ;
  }
}
</style>
