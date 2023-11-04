<template>
  <v-row class="destination-card-wrapper">
    <v-col cols="12" class="popular-destinations-header">
      <div class="popular-destinations-specials">
        <span class="special-offer">Special Offer</span>
        <span class="wishlist-popular-destinations">
            <img src="../assets/usefulIcons/heart.png" />
        </span>
      </div>
    </v-col>
    <v-col cols="12" class="popular-destinations-infos">
      <span class="destination-card-country">Bali</span>
      <span class="destination-card-description"
        >Nulla pretium tincidunt felis, nec.</span
      >
      <span class="destination-card-price">From $679</span>
    </v-col>
  </v-row>
</template>

<style>
.destination-card-wrapper {
  padding-right: 30px;
}
.popular-destinations-header {
  background-image: url("../assets/tours/bali/1.jpg");
  min-height: 300px;
  max-height: 300px;
  background-size: cover;
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

.popular-destinations-specials{
    position: relative;
}

.wishlist-popular-destinations{
    position: absolute;
    top:0;
    right:0;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
</style>
