<template>
    <v-row style="margin:0;">
        <v-col cols="12">
            <span style="font-size: 30px;
    font-weight: 700; color: #303030;
    font-family: Lato,sans-serif;
    line-height: 1.3em;">Tour Location</span>
        </v-col>

        <v-col cols="12">
            <span style="font-size: 18px;
    font-weight: 400;
    color: #999;
    margin-bottom: 41px;">{{ trip.shortDescription }}</span>
        </v-col>

        <v-col cols="12">
            <iframe :src="trip.location"
             width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </v-col>
    </v-row>
</template>

<script>
export default({
    props:{
        trip:{
            default: Object
        }
    }
})
</script>