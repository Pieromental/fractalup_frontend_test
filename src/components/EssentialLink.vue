<template>
  <q-item active-class="active" clickable v-ripple :to="link">
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EssentialLink',
});

export interface EssentialLinkProps {
  title: string;
  link?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: 'home',
});
</script>

<style scoped>
.active {
  color: #676767 !important;
  background: white !important;
}
</style>
