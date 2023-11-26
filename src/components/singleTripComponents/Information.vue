<template>
  <v-row>
    <v-col cols="12" style="margin-bottom: 30px;">
      <v-row class="title-row">
        <span class="main-title">{{trip.city}}</span>
        <span class="price-info" :class="{'discount': trip.sale > 0}">
          <span>${{ trip.price }}</span>
          <span class="discount-price" v-if="trip.sale > 0"> ${{ trip.effectivePrice }}</span>
          <span class="per-person">/per person</span>
        </span>
      </v-row>

      <v-row class="description-row">
        <v-col cols="12">

          <span class="main-description">
            {{ trip.shortDescription }}
          </span>
        </v-col>
        <v-col cols="12">
          <span class="secondary-description">
          {{ trip.largeDescription }}
        </span>
        </v-col>
      </v-row>

      <v-row style="margin: 0; margin-top: 15px !important">
        <div style="display:flex; align-items: center;">
            <v-icon aria-label="My Account" role="img" aria-hidden="false">
          mdi-account
        </v-icon>
        <span style="margin-left: 5px; font-size:16px; color: #777; line-height:19px;">12+ Age</span>
        </div>

        <div style="display:flex; align-items: center; margin-left: 25px;">
            <v-icon aria-label="My Account" role="img" aria-hidden="false">
          mdi-thumb-up-outline
        </v-icon>
        <span style="margin-left: 5px; font-size:16px; color: #777; line-height:19px;">Recommended</span>
        </div>
   
      </v-row>

      <v-row class="departure-row">
        <v-row class="departure-info">
            <v-col cols="6">
                <span class="departure-title">Departure</span>
            </v-col>
            <v-col cols="6">
                <span class="departure-location">{{ trip.city }}</span>
            </v-col>
        </v-row>
        <v-row class="departure-info">
            <v-col cols="6">
                <span class="departure-title">Hotel</span>
            </v-col>
            <v-col cols="6">
                <span class="departure-location">{{ trip.hotel }}</span>
            </v-col>
        </v-row>

        <v-row class="departure-info">
            <v-col cols="6">
                <span class="departure-title">Departure Time</span>
            </v-col>
            <v-col cols="6">
                <span class="departure-location">{{formatDateTime(trip.departureTime)}}</span>
            </v-col>
        </v-row>

        <v-row class="departure-info">
            <v-col cols="6">
                <span class="departure-title">Return Time</span>
            </v-col>
            <v-col cols="6">
                <span class="departure-location">{{formatDateTime(trip.returnTime)}}</span>
            </v-col>
        </v-row>

        
        <v-row class="departure-info">
            <v-col cols="6">
                <span class="departure-title">Include</span>
            </v-col>
            <v-col cols="6" style="display: flex; flex-wrap:wrap;">
              <v-col style="padding:0;" cols="6" v-for="(inc,index) in trip.includes" :key="index">
                <span class="departure-location" > <v-icon color="green">mdi-check</v-icon>{{inc}}</span>
              </v-col>
            </v-col>
        </v-row>

        <!-- <v-row class="departure-info">
            <v-col cols="6">
                <span class="departure-title">Not Included</span>
            </v-col>
            <v-col cols="6">
              <v-col cols="6" style="padding:0;">
                <span class="departure-location"><v-icon color="red">mdi-close</v-icon> {{'not included'}}</span>
              </v-col>
            </v-col>
        </v-row> -->
        
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default({
  props:{
    trip:{
      default: Object
    }
  },
  methods:{
    formatDateTime(dateTimeStr) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const dateTime = new Date(dateTimeStr);
  return dateTime.toLocaleDateString('en-US', options).replace(',', '') + ', ' + dateTime.toLocaleTimeString('en-US', options).slice(0, 5);
}
  }
})

</script>

<style>
.title-row {
  margin: 0;
}

.main-title {
  line-height: 26px;
  font-size: 30px;
  font-weight: 700;
  color: #303030;
}

.price-info {
  margin-left: 20px;
  display: flex;
  color: #40c1b9;
  font-size: 26px;
  font-weight: 700;
  line-height: 26px;
}

.price-info.discount span:first-child{
  font-size: 22px;
  text-decoration:line-through;
}

.discount-price{
  font-size: 26px;
  margin-left: 12px;
}

.per-person {
  line-height: normal;
  display: flex;
  align-items: flex-end;
  font-weight: normal;
  font-size: 16px;
  color: #999;
  padding-left: 5px;
}

.description-row {
  margin: 0;
}

.description-row .col{
  padding:10px 0px;
}

.main-description {
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 18px;
  color: #999;
}

.secondary-description {
  font-size: 15px;
  color: #777;
  line-height: 24px;
}

.departure-row {
  display: flex;
  margin: 0;
  margin-top: 40px !important;
}

.departure-info {
  width: 100%;
  padding: 15px 21px;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  transition: color 0.2s ease-out;

}


.departure-info:not(:first-of-type) {
  border-top: none;
}

.departure-title {
  font-weight: 700;
  font-size: 16px;
  color: #303030;
}

.departure-location {
  font-size: 14px;
  color: #777;
  display: flex;
  align-items:center;
}

.departure-info:hover {
  background-color: #f9f9f9;
}
.departure-info:hover .departure-title {
  color: #e83f53;
}

</style>
