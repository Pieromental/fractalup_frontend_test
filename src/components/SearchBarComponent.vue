<template>
  <div class="row justify-center q-pt-lg">
    <div style="position: relative" class="col-9 col-xs-12 col-sm-10 q-px-lg">
      <div ref="searchContainerRef">
        <div ref="searchContainerRef">
          <q-input
            class="custom-input"
            borderless
            placeholder="Escribe el país que deseas ver"
            v-model="localInputSearch"
            label="País"
            @focus="showDropdown = true"
            @update:model-value="emitSearch()"
          >
            <template v-slot:append>
              <q-btn
                :loading="localLoading"
                rounded
                class="search-button"
                style="background: #009cff; color: white"
                icon="search"
                :label="localLoading ? '' : 'Buscar'"
                @click="emitSearch()"
              >
                <template v-slot:loading>
                  <div class="row items-center no-wrap loading-content">
                    <q-spinner-hourglass class="spinner" />
                    <span class="loading-text">Buscando...</span>
                  </div>
                </template>
              </q-btn>
            </template>
          </q-input>
        </div>
        <div
          v-show="showDropdown"
          class="custom-dropdown"
          style="margin-top: 8px; z-index: 1000"
          ref="dropdownRef"
        >
          <div class="dropdown-content">
            <div class="dropdown-header">
              <span>Filtrar por continentes</span>
              <q-btn
                color="primary"
                flat
                dense
                label="Limpiar"
                @click="clearInput()"
              />
            </div>

            <div class="row q-col-gutter-md">
              <div
                class="col-4 col-xs-12 col-sm-6 col-md-4 continent-card"
                style="max-width: 250px"
                v-for="(continent, index) in localContinentList"
                :key="index"
              >
                <q-card
                  :class="{ 'selected-card': continent.selected }"
                  @click="selectContinent(continent)"
                >
                  <q-img
                    :src="continent.imageUrl"
                    spinner-color="primary"
                    :ratio="16 / 9"
                  />

                  <q-card-section>
                    <div class="text-subtitle2">{{ continent.name }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import {
  ref,
  defineProps,
  watch,
  onMounted,
  onUnmounted,
  defineEmits,
} from 'vue';
import { debounce } from 'quasar';

/****************************************************************************/
/*                               PROPS                                      */
/****************************************************************************/
const props = defineProps({
  inputSearch: { type: String, default: '' },
  continentList: { type: Array as any, default: () => [] },
  loading: { type: Boolean, default: false },
});

/****************************************************************************/
/*                               DATA                                      */
/****************************************************************************/
defineOptions({
  name: 'SearchBarComponent',
});
const localInputSearch = ref(props.inputSearch);
const localContinentList = ref(props.continentList);
const localLoading = ref(props.loading);
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const searchContainerRef = ref<HTMLElement | null>(null);
/****************************************************************************/
/*                             EMITS                                        */
/****************************************************************************/
const emit = defineEmits(['search']);
/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const clearInput = () => {
  localInputSearch.value = '';
  localContinentList.value.forEach((continent: any) => {
    continent.selected = false;
  });

  emitSearch();
};

const selectContinent = (continent: any) => {
  continent.selected = !continent.selected;
  emitSearch();
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  if (
    dropdownRef.value &&
    searchContainerRef.value &&
    !dropdownRef.value.contains(target) &&
    !searchContainerRef.value.contains(target)
  ) {
    showDropdown.value = false;
  }
};

const emitSearch = debounce(() => {
  emit('search', {
    inputSearch: localInputSearch.value,
    selectedContinents: localContinentList.value
      .filter((continent: any) => continent.selected)
      .map((continent: any) => continent.code),
  });
}, 300);
/****************************************************************************/
/*                             WATCHERS                                     */
/****************************************************************************/
watch(
  () => props.inputSearch,
  (newInputSearch: any) => {
    localInputSearch.value = newInputSearch;
  }
);
watch(
  () => props.continentList,
  (newcontinentList: any) => {
    localContinentList.value = newcontinentList;
  }
);
watch(
  () => props.loading,
  (newLoadingState: any) => {
    localLoading.value = newLoadingState;
  }
);
/****************************************************************************/
/*                             LYFECICLE                                     */
/****************************************************************************/
onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() =>
  document.removeEventListener('mousedown', handleClickOutside)
);
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
.search-button {
  background: #009cff;
  color: white;
  min-width: 120px;
  height: 36px;
  transition: min-width 0.3s ease;
}

.search-button .loading-content {
  width: 100%;
  justify-content: center;
  gap: 4px;
}

.search-button .spinner {
  font-size: 1.2em;
}

.search-button .loading-text {
  font-size: 0.9em;
  white-space: nowrap;
}

@media (max-width: 599px) {
  .search-button {
    min-width: 40px;
    padding: 0 8px;
  }

  .search-button .loading-content {
    width: auto;
  }

  .search-button .loading-text {
    display: none;
  }
}
</style>
