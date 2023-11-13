<template>
    <div class="timeline-container">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="event in events"
          :key="event.id"
          :color="event.color"
          class="timeline-item"
        >
          <template v-slot:icon>
            <v-avatar size="69px" color="teal lighten-2">
              <span class="headline white--text">{{ event.id }}</span>
            </v-avatar>
          </template>
  
          <div class="timeline-content">
            <h3 class="title">{{ event.title }}</h3>
            <p class="description">{{ event.description }}</p>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </template>
  
  <script>
  export default {
    data: () => ({
      events: [
        {
          id: 1,
          title: 'Day 1: Departure',
          description: 'Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum. Quisque augue ipsum, vehicula et tellus nec, maximus viverra metus. Nullam elementum nibh nec pellentesque finibus. Suspendisse laoreet velit at eros eleifend, a pellentesque urna ornare. In sed viverra dui. Duis ultricies mi sed lorem blandit, non sodales sapien fermentum. Donec ultricies, turpis a sagittis suscipit, ex odio volutpat sem, vel molestie ligula enim varius est. Pellentesque sodales ipsum nisi. Suspendisse ultrices nulla eu volutpat volutpat. Nunc vestibulum, tortor sollicitudin dapibus egestas, lorem eros vestibulum turpis, ac condimentum erat ipsum rutrum dolor.Donec blandit nisi ut congue rutrum. Vestibulum enim velit, semper hendrerit tristique non, malesuada auctor nulla.',
          color: 'teal'
        },
        {
          id: 2,
          title: 'Day 2: Adventure Begins',
          description: 'Lorem ipsum dolor sit amet, consectetuer. Proin gravida nibh vel velit auctor aliqueenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
          color: 'teal'
        },
        {
          id: 3,
          title: 'Day 3: Historical Tour',
          description: 'Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum. Quisque augue ipsum, vehicula et tellus nec, maximus viverra metus. Nullam elementum nibh nec pellentesque finibus. Suspendisse laoreet velit at eros eleifend, a pellentesque urna ornare. In sed viverra dui. Duis ultricies mi sed lorem blandit, non sodales sapien fermentum. Donec ultricies, turpis a sagittis suscipit, ex odio volutpat sem, vel molestie ligula enim varius est. Pellentesque sodales ipsum nisi. Suspendisse ultrices nulla eu volutpat volutpat. Nunc vestibulum, tortor sollicitudin dapibus egestas, lorem eros vestibulum turpis, ac condimentum erat ipsum rutrum dolor.Donec blandit nisi ut congue rutrum. Vestibulum enim velit, semper hendrerit tristique non, malesuada auctor nulla.',
          color: 'teal'
        },
        {
          id: 4,
          title: 'Day 4: Return',
          description: 'Lorem ipsum dolor sit amet, consectetuer. Proin gravida nibh vel velit auctor aliqueenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
          color: 'teal'
        },
        // ... more events
      ]
    })
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
  