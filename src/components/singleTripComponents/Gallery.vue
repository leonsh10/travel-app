<template>
  <v-row style="margin: 0">
    <v-col cols="12">
      <span
        style="
          font-size: 30px;
          font-weight: 700;
          color: #303030;
          font-family: Lato, sans-serif;
          line-height: 1.3em;
        "
        >Our Gallery</span
      >
    </v-col>

    <v-col cols="12">
      <span
        style="
          font-size: 18px;
          font-weight: 400;
          color: #999;
          margin-bottom: 41px;
        "
        >Discover the essence of urban charm and architectural splendor in our gallery, where every photograph is a testament to the diversity and vibrancy of the world's cities. From the soaring skyscrapers of metropolises to the quaint cobblestone streets of ancient towns, each image invites you to wander through spaces that blend the historic with the contemporary. Marvel at the tapestry of cityscapes, the interplay of light and shadow in bustling marketplaces, and serene moments in hidden urban gardens. This gallery celebrates the multifaceted personalities of cities around the globe, inviting you to pause and appreciate the myriad ways in which urban life presents itself.</span
      >
    </v-col>
    <v-col cols="12" class="gallery-wrapper">
      <v-row>
        <v-col
        v-for="(image, index) in galleryImagesWithPaths"
        :key="index"
        cols="12"
        sm="6"
        md="3"
        class="gallery-image"
      >
        <img :src="image" @click="openLightbox(index)" />
      </v-col>
    </v-row>

      <vue-easy-lightbox
        :visible="visible"
        :imgs="galleryImagesWithPaths"
        :scrollDisable="true"
        moveDisabled
        :index="index"
        @hide="handleClose"
        draggable
      ></vue-easy-lightbox>
    </v-col>
  </v-row>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  components: {
    VueEasyLightbox,
  },
  props:{
    trip:{
      default: Object
    }
  },
  data() {
    return {
      images: [
        require("@/assets/about2.jpg"),
        require("@/assets/homeBanner.jpg"),
        require("@/assets/landscape-testimonials.jpg"),
        require("@/assets/logo.png"),
        require("@/assets/logoBgWhite.png"),
        require("@/assets/logoNoBg.png"),
        require("@/assets/logoText.png"),
      ],
      visible: false,
      index: 0,
    };
  },
  computed: {
    galleryImagesWithPaths() {
      if (!this.trip.city || !this.trip.galleryImages) {
        return [];
      }
      return this.trip.galleryImages.map(imageName => this.getImagePath(imageName));
    }
  },
  methods: {
    getImagePath(imageName) {
      try {
        return require(`@/assets/tours/${this.trip.city.replace(/\s/g, '').toLowerCase()}/${imageName}`);
      } catch (e) {
        return e
      }
    },
    openLightbox(index) {
      this.index = index;
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.margin-0 {
  margin: 0;
}

.title-style {
  font-size: 30px;
  font-weight: 700;
  color: #303030;
  font-family: Lato, sans-serif;
  line-height: 1.3em;
}

.description-style {
  font-size: 18px;
  font-weight: 400;
  color: #999;
  margin-bottom: 41px;
}

.gallery-image {
  padding: 5px; /* Add some padding around the images */
}

.gallery-image img {
  width: 100%; /* Make the image fill the container */
  height: 200px; /* Set a fixed height */
  object-fit: cover; /* Crop the image to cover the area */
}
</style>
