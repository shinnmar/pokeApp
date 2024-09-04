<template>
  <BaseLayout>
    <Header />
    <router-view />
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/Header.vue";
import BaseLayout from "@/components/layout/BaseLayout.vue";

export default defineComponent({
  components: {
    Header,
    BaseLayout,
  },
});
</script>
