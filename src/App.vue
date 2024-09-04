<template>
  <BaseLayout>
    <Header />
    <router-view />
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import Header from "@/components/Header/Header.vue";

export default defineComponent({
  components: {
    Header,
    BaseLayout,
  },
});
</script>