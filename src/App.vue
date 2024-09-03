<template>
  <BaseLayout>
    <Header />
    <router-view />
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '../../pokeapp/src/components/layout/BaseLayout.vue';
import Header from '../../pokeapp/src/components/header/Header.vue';

export default defineComponent({
  components: {
    Header,
    BaseLayout,
  },
});
</script>