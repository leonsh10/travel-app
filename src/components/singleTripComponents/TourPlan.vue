<template>
    <div class="timeline-container">
      <v-timeline align-top dense v-if="!loader && this.events.length">
        <v-timeline-item
          v-for="event in events"
          :key="event.id"
          :color="event.color"
          class="timeline-item"
        >
          <template v-slot:icon>
            <v-avatar size="69px" color="teal lighten-2">
              <span class="headline white--text">{{ event.DayNumber }}</span>
            </v-avatar>
          </template>
  
          <div class="timeline-content">
            <h3 class="title">{{ `Day ${event.DayNumber}: ${event.Title}` }}</h3>
            <p class="description">{{ event.Description }}</p>
          </div>
        </v-timeline-item>
      </v-timeline>
      <v-progress-circular
      indeterminate
      color="green"
      :size="99"
      v-if="loader"
    ></v-progress-circular>
    <div v-if="!loader && !this.events.length">No Plan for this Trip. Sorry:(</div>
    </div>
  </template>
  
  <script>
import tourPlanService from '../../apiService/services/tourPlanService'
  export default {
    props:{
      trip:{
        default: Object
      }
    },
    data: () => ({
      loader:false,
      events: [
      ]
    }),
    async mounted(){
      this.loader = true;
      const {data} = await tourPlanService.getTourPlanById(this.trip._id).finally(() => {
        setTimeout(() =>{
          this.loader = false
        },1150)
      });
      this.events = data.days;
    }
  }
  </script>
  
  <style scoped>
  .timeline-container {
    /* max-width: 750px; Adjust as needed for your design */
  }
  
  .timeline-item::before {
    border-left-style: dotted !important;
    border-left-width: 2px !important;
  }
  
  .v-timeline-item {
    padding-right: 0 !important;
  }
  
  .timeline-content {
    margin-left: 20px; /* Adjust the spacing as needed */
    margin-top: -10px;
  }
  
  .title {
    color: #424242; /* Match your design's color */
    font-weight: bold;
    font-size: 24px; /* Increased font size for title */
    margin-bottom: 10px; /* Adjust the spacing as needed */
  }
  
  .description {
    color: #424242; /* Match your design's color */
    margin-bottom: 20px; /* Adjust the spacing as needed */
    margin-top: 20px;
  }
  
  .v-avatar {
    border: 4px solid white; /* Thicker white border */
    height: 60px; /* Larger circle size */
    width: 60px; /* Larger circle size */
    line-height: 60px; /* Align the number vertically */
  }
  
  .headline {
    font-size: 1.5rem; /* Increased font size */
  }

  .v-timeline-item__dot{
    display: none;
  }
  </style>
  