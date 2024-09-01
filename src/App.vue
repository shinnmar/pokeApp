<template>
  <BaseLayout>
    <router-view />
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '../../pokeapp/src/components/layout/BaseLayout.vue';

export default defineComponent({
  components: {
    BaseLayout,
  },
});
</script>

<style>

</style>