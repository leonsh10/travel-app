<template>
  <v-row class="destination-card-wrapper">
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
    </v-col>
    <v-col cols="12" class="popular-destinations-infos">
      <span class="destination-card-country" @click="redirectToTrip">{{
        trip.city
      }}</span>
      <span class="destination-card-description">{{
        trip.shortDescription
      }}</span>
      <span class="destination-card-price">From ${{ trip.price }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    trip: {
      default: Object,
    },
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
      if (this.trip && this.trip._id) {
        this.$router.push(`/trip/${this.trip._id}`);
      }
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
  font-size: 16px;
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
</style>
