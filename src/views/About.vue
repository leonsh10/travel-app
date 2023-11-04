<template>
  <v-row class="content-wrapper">
    <v-row class="background-section">
      <v-row class="content-section container">
        <v-col cols="5" class="left-content">
          <h3 class="header-title">Making Journeys Memorable.</h3>
          <span class="about-header-span"
            >When it comes to travel, every detail matters. With
            <strong>VOYAGEVISTA</strong>, you're not just reserving a trip;
            you're crafting an experience. Dive into a world where every journey
            is tailored to perfection, ensuring memories that last a
            lifetime.</span
          >
          <div class="buttons-container">
            <button
              class="read-more-btn"
              @click="scrollToSection('bgSecondSection')"
            >
              READ MORE
            </button>
            <button class="our-services-btn" @click="scrollToSection('bgThirdSection')">OUR SERVICES</button>
          </div>
        </v-col>

        <v-col cols="5" class="right-content">
          <span class="image-wrapper">
            <img class="about-img" src="@/assets/aboutPicture.jpg" />
          </span>
        </v-col>
      </v-row>
    </v-row>

    <v-row class="background-second-section" id="bgSecondSection">
      <v-row class="content-section container">
        <v-col cols="5" class="left-content">
          <h3 class="second-header-title">About Us</h3>
          <span class="second-about-header-span">
            Discover. Reserve. Experience.
          </span>

          <span class="second-about-header-second-span"
            >Unlocking the world, one trip at a time. With
            <strong>VOYAGEVISTA</strong>, we're not just offering trips — we're
            curating memories. In the era of digital wanderlust, choosing the
            perfect getaway has never been more overwhelming. We at
            <strong>VOYAGEVISTA</strong> understand this. Our platform brings
            together the charm of undiscovered locales and the comfort of
            tried-and-tested destinations. Whether you're a solo traveler
            seeking an adventure, a family planning a summer vacation, or a
            couple on a romantic escapade, we have something tailored for
            everyone. Our commitment is to offer an effortless reservation
            experience, complemented by genuine reviews and insights, so you can
            focus on what truly matters: creating unforgettable memories.</span
          >
        </v-col>

        <v-col cols="5" class="right-content">
          <span class="image-wrapper">
            <img class="about-img" src="@/assets/about2.jpg" />
          </span>
        </v-col>
      </v-row>
    </v-row>

    <v-row class="background-third-section" id="bgThirdSection">
      <v-row class="content-section container">
        <v-col cols="10">
          <div class="center-flex">
            <h3 class="title-text">Explore, Reserve, Travel</h3>
            <span class="line-divider"></span>
            <span class="description-text">
              Experience the world's top destinations with just a few clicks.
              Dive into the endless possibilities of travel, find the best
              deals, and embark on your next adventure seamlessly.
            </span>
          </div>
        </v-col>

        <v-col cols="10" class="center-flex" style="flex-direction: row">
          <!-- Card 1 -->
          <v-col cols="4">
            <v-card>
              <v-card-title class="center-flex">
                <v-icon class="icon-style" size="40">mdi-earth</v-icon>
                <span class="card-title-text">Browse Destinations</span>
              </v-card-title>
              <v-card-text class="card-content">
                Discover an array of destinations, from hidden gems to renowned
                tourist spots. Get inspired by curated travel guides and
                recommendations.
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Card 2 -->
          <v-col cols="4">
            <v-card>
              <v-card-title class="center-flex">
                <v-icon class="icon-style" size="40">mdi-airplane</v-icon>
                <span class="card-title-text">Easy Ticket Reservations</span>
              </v-card-title>
              <v-card-text class="card-content">
                Book your tickets effortlessly with our user-friendly platform.
                Get real-time availability, flexible dates, and competitive
                prices.
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Card 3 -->
          <v-col cols="4">
            <v-card>
              <v-card-title class="center-flex">
                <v-icon class="icon-style" size="40">mdi-airplane</v-icon>
                <span class="card-title-text">Travel Assistance</span>
              </v-card-title>
              <v-card-text class="card-content">
                From travel tips to 24/7 customer support, we're here to assist.
                Enjoy a worry-free journey with our comprehensive travel
                assistance.
              </v-card-text>
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-row>
  </v-row>
</template>

<script>
export default {
    data(){
return{

}
    },
  methods: {
    scrollToSection(id) {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
v-card:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card-title-text:hover {
  color: #49c0b6;
  transition: color 0.3s ease;
  cursor: pointer;
}
.background-third-section {
  background-color: #f8f9fa;
}
.second-header-title {
  font-size: 2.2em;
  color: #3f3d56;
  letter-spacing: 1px;
}
.content-wrapper {
  margin: 0;
}

.second-about-header-span {
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: #3f3d56;
  margin-top: 24px;
  margin-bottom: 24px;
}
.second-about-header-second-span {
  font-size: 16px;
}

.background-section {
  background-color: #3f51b5;
  margin: 0;
}

.content-section {
  margin: auto;
  padding-top: 80px;
  padding-bottom: 80px;
  justify-content: center;
}

.left-content {
  align-self: center;
}

.header-title {
  font-size: 45px;
  color: #fff;
  letter-spacing: 1px;
}

.buttons-container {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

button {
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.3s;
}

button:focus {
  outline: none;
}

.read-more-btn {
  background-color: #49c0b6;
  color: white;
  border: 2px solid #49c0b6;
}

.our-services-btn {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

button:hover {
  transform: scale(1.05);
}

.read-more-btn:hover {
  background-color: white;
  color: #25c481;
}

.our-services-btn:hover {
  background-color: white;
  color: #25c481;
}

.about-header-span {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  color: #fff;
  letter-spacing: 1px;
}

.image-wrapper {
  display: flex;
  width: 400px;
  height: 400px;
  border-radius: 50%;
}

.about-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.right-content {
  display: flex;
  justify-content: center;
}

.center-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title-text {
  font-weight: bold;
  font-size: 2em;
  position: relative;
  text-align: center;
  text-transform: capitalize;
}

.line-divider {
  height: 2px;
  width: 80px;
  margin-top: 10px;
  background: #3f3d56;
}

.description-text {
  max-width: 60%;
  text-align: center;
  margin-top: 40px;
  color: #767575;
  font-size: 16px;
}

.icon-style {
  color: #49c0b6;
}

.card-title-text {
  font-size: 20px;
  display: flex;
  margin-top: 25px;
  margin-bottom: 15px;
  text-align: center;
  color: #3f3d56;
}

.card-content {
  text-align: center;
}

/* Mobile Responsiveness */
@media only screen and (max-width: 768px) {
  .content-section {
    padding-top: 40px;
    padding-bottom: 40px;
    flex-direction: column-reverse;
  }

  .header-title {
    font-size: 30px;
    text-align: center;
    padding-bottom: 15px;
  }

  .about-header-span {
    text-align: center;
  }

  .image-wrapper {
    width: 250px;
    height: 250px;
  }

  .right-content {
    min-width: 100%;
    display: flex;
    justify-content: center;
  }

  .left-content {
    min-width: 100%;
  }

  .background-third-section {
    width: 100%;
  }

  .content-section div {
    min-width: 100%;
  }

  .content-section div.center-flex {
    flex-direction: column !important;
  }
}
</style>
