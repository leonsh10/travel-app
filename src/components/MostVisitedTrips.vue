<template>
  <v-container style="padding-bottom: 50px;">
    <v-row
      style="
        
        margin: 0 auto;
        margin-top: 30px;
        padding-bottom: 45px;
        border-bottom: 1px solid #72728c;
      "
    >
      <v-col cols="4" style="display: flex; justify-content: center;">
        <img src="@/assets/homepageIcons/beach.svg" width="70" />
        <div
          style="
            margin-left: 16px;
            padding-bottom: 4px;
            display: flex;
            flex-direction: column;
            justify-content: end;
          "
        >
          <v-text style="font-size: 18px; color: #181818"
            >Top Destinations</v-text
          >
          <v-text style="color: #72728c; font-size: 14px"
            >Nulla pretium tincidunt felis, nec.</v-text
          >
        </div>
      </v-col>
      <v-col cols="4" style="display: flex;  justify-content: center;" >
        <img src="@/assets/homepageIcons/wallet.svg" width="70" />
        <div
          style="
            margin-left: 16px;
            padding-bottom: 4px;
            display: flex;
            flex-direction: column;
            justify-content: end;
          "
        >
          <v-text style="font-size: 18px; color: #181818"
            >The Best Prices</v-text
          >
          <v-text style="color: #72728c; font-size: 14px"
            >Sollicitudin mauris lobortis in.</v-text
          >
        </div>
      </v-col>
      <v-col cols="4" style="display: flex;  justify-content: center;">
        <img src="@/assets/homepageIcons/suitcase.svg" width="70" />
        <div
          style="
            margin-left: 16px;
            padding-bottom: 4px;
            display: flex;
            flex-direction: column;
            justify-content: end;
          "
        >
          <v-text style="font-size: 18px; color: #181818"
            >Amazing Services</v-text
          >
          <v-text style="color: #72728c; font-size: 14px"
            >Nulla pretium tincidunt felis, nec.</v-text
          >
        </div>
      </v-col>
    </v-row>

    <v-row
      style="
        margin-top: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <v-text
        style="
          font-family: 'Oswald', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: #72728c;
          line-height: 0.75;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        "
        >SIMPLY AMAZING PLACES</v-text
      >
      <h3 style="margin-top: 26px; color: #181818; font-size: 48px">
        Popular Destinations
      </h3>
    </v-row>

    <v-row style="margin-top: 99px;">
      <swiper :slidesPerView="3" :spaceBetween="30">
    <swiper-slide>
      <PopularDestionationsCard/>
    </swiper-slide>
    <swiper-slide>
      <PopularDestionationsCard/>
    </swiper-slide>
    <swiper-slide>
      <PopularDestionationsCard/>
    </swiper-slide>
    <!-- Add more slides here if needed -->
  </swiper>
    </v-row>
  </v-container>
</template>


<script>
import PopularDestionationsCard from './PopularDestinationsCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
export default ({
  components:{
    PopularDestionationsCard,
    Swiper,
    SwiperSlide,
  }
})
</script>