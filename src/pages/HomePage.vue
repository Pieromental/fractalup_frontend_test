<template>
  <q-page>
    <div class="row justify-center q-pt-lg">
      <div style="position: relative" class="col-9 col-xs-12 col-sm-10 q-px-lg">
        <q-input
          class="custom-input"
          borderless
          placeholder="Escribe el país que deseas ver"
          v-model="inputSearch"
          label="País"
          @focus="showDropdown = true"
          @blur="handleBlur"
        >
          <template v-slot:append>
            <q-btn
              rounded
              style="background: #009cff; color: white"
              icon="search"
              label="Buscar"
            />
          </template>
        </q-input>

        <!-- Menú de filtros personalizado -->
        <div
          v-show="showDropdown"
          class="custom-dropdown"
          style="margin-top: 8px; z-index: 1000"
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
                v-for="(continent, index) in continentList"
                :key="index"
              >
                <q-card @click="selectContinent(continent)">
                  <q-img
                    :src="continent.imageUrl"
                    spinner-color="primary"
                    :ratio="16 / 9"
                  />

                  <q-card-section>
                    <div class="text-h6">{{ continent.name }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import { ref, watch, onMounted } from 'vue';
import { useContinents } from '@/composable/useTrevorBlades';

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
const showDropdown = ref(false);
const selectedContinent = ref('');

/****************************************************************************/
/*                               METHODS                                    */
/****************************************************************************/
const clearInput = () => {
  inputSearch.value = '';
  selectedContinent.value = '';
};

const selectContinent = (continent: { name: string }) => {
  selectedContinent.value = continent.name;
};

const handleBlur = (event: Event) => {
  const relatedTarget = (event as FocusEvent)
    .relatedTarget as HTMLElement | null;

  if (!relatedTarget || !relatedTarget.closest('.q-menu')) {
    showDropdown.value = false;
  }
};
/****************************************************************************/
/*                               LYFECICLE                                   */
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
</style>
