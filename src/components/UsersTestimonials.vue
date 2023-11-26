<template>
  <v-row style="margin: 0" class="user-testimonials-background">
    <v-container>
      <span class="testimonials-desc">SIMPLY AMAZING PLACES</span>
      <h1 class="testimonials-title">Testimonials</h1>

      <div style="margin-top: 80px">
        <carousel
          :autoplay="true"
          :autoplayTimeout="3000"
          :perPage="1"
          :navigationEnabled="false"
          :paginationEnabled="false"
          :loop="true"
        >
          <slide v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-text">{{ testimonial.quote }}</div>
            <span class="testimonial-user-name"
              >{{ testimonial.author }},<span class="testimonial-user-position"
                >client</span
              ></span
            >
          </slide>
        </carousel>
      </div>
    </v-container>
  </v-row>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      testimonials: [
        {
          quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
          author: "John Turner",
        },
        { quote: "Another testimonial text...", author: "Jane Doe" },
      ],
    };
  },
};
</script>

<style>
.testimonial-text {
  font-size: 30px;
  font-style: italic;
  color: #ffffff;
  text-align: center;
  width: 70%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  cursor: grabbing;
}

.user-testimonials-background {
  width: 100%;
  height: 500px;
  background-image: url("../assets/landscape-testimonials.jpg");
  background-size: cover;
}

.testimonial-user-name {
  font-family: "Oswald", sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 0.85;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: grabbing;
  margin-top: 40px;
}

.testimonial-user-position {
  font-family: "Oswald", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 0.85;
  cursor: grabbing;
  margin-left: 6px;
}

.testimonials-desc {
  display: flex;
  margin-top: 30px;
  justify-content: center;
  font-size: 12px;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
  font-weight: 400;
  line-height: 0.75;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.testimonials-title {
  font-size: 48px;
  color: #ffffff;
  margin-top: 26px;
  font-family: "Oswald", sans-serif;
  text-align: center;
  justify-content: center;
}
</style>
