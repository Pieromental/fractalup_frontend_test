<template>
  <q-page class="q-pa-md">
    <!-- Sidebar -->
    <SearchBarComponent
      :continent-list="continentList"
      :input-search="inputSearch"
    />
  </q-page>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import { ref, watch, onMounted } from 'vue';
import { useContinents } from '@/composable/useTrevorBlades';
import SearchBarComponent from '@/components/SearchBarComponent.vue';

/****************************************************************************/
/*                               COMPOSABLE                                  */
/****************************************************************************/
const { continents, load: loadContinents } = useContinents();

/****************************************************************************/
/*                               WATCH                                      */
/****************************************************************************/
watch(
  () => continents.value,
  (newValue) => {
    if (newValue) {
      continentList.value = newValue.continents.map((continent: any) => ({
        ...continent,
        selected: false,
        imageUrl: new URL(
          `../assets/continents/${continent.code}.jpg`,
          import.meta.url
        ).href,
      }));
    }
  }
);

/****************************************************************************/
/*                               DATA                                       */
/****************************************************************************/
defineOptions({
  name: 'IndexPage',
});
const continentList = ref<any>([]);
const inputSearch = ref('');

/****************************************************************************/
/*                               METHODS                                    */
/****************************************************************************/

/****************************************************************************/
/*                               LIFECYCLE                                   */
/****************************************************************************/
onMounted(async () => {
  await loadContinents();
});
</script>

<style scoped>
.custom-input {
  background-color: white;
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.custom-dropdown {
  background-color: white;
  border-radius: 15px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 60%;
  position: absolute;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.continent-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.continent-card:hover {
  transform: scale(1.05);
}

.continent-img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}
.selected-card {
  box-shadow: 0 0 10px var(--q-primary);
}
</style>
