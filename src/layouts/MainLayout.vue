<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #676767" v-show="showHeader" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar
            class="q-mx-sm"
            style="background-color: white; border-radius: 50%"
          >
            <img src="../assets/fractal-world-logo.svg" />
          </q-avatar>

          WorldSearch
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="breakpoint"
      style="
        background-color: #676767;
        color: white;
        font-size: 1rem;
        font-weight: 700;
      "
    >
      <q-list class="menu-list">
        <q-item
          v-show="!showHeader"
          style="background-color: #dbdbdb; color: #676767; font-size: 1.5rem"
        >
          <q-item-section avatar>
            <q-img :size="'200px'" src="../assets/fractal-world-logo.svg" />
          </q-item-section>
          <q-item-section>
            <q-item-label>WorldSearch</q-item-label>
          </q-item-section>
        </q-item>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import { ref, computed, onMounted } from 'vue';
import { Screen } from 'quasar';
import { EssentialLinkProps } from '@/components/EssentialLink.vue';
import EssentialLink from '@/components/EssentialLink.vue';

/****************************************************************************/
/*                               DATA                                       */
/****************************************************************************/
defineOptions({
  name: 'MainLayout',
});
const breakpoint = ref(600);
const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    link: 'home',
  },
  {
    title: 'Vista 1',
    link: 'view-1',
  },
  {
    title: 'Vista 2',
    link: 'view-2',
  },
];
const leftDrawerOpen = ref(true);

/****************************************************************************/
/*                                COMPUTED                                   */
/****************************************************************************/
const showHeader = computed(() => Screen.width <= breakpoint.value);

/****************************************************************************/
/*                               METHODS                                    */
/****************************************************************************/
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
/****************************************************************************/
/*                               LYFECICLE                                  */
/****************************************************************************/
onMounted(() => {
  leftDrawerOpen.value = Screen.width > breakpoint.value;
});
</script>
<style scoped>
.menu-list .q-item {
  margin: 5% 10% 0 10%;
  border-radius: 10px;
}
</style>
