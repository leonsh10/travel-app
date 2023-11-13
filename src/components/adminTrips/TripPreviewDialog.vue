<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card>
      <v-card-title>
        {{ "preview" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },

  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
  },

  methods: {
    closeDialog() {
      this.dialog = false;
      this.$emit("update:value", false);
    },
  },
};
</script>
