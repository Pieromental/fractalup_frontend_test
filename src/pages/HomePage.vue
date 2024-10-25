<template>
  <q-page class="q-pa-md">
    <!-- MainContent -->
    <SearchBarComponent
      @search="handleSearch"
      :continent-list="continentList"
      :input-search="inputSearch"
    />
    <CountriesGridComponent :countries-list="countriesList" />
  </q-page>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import { ref, watch, onMounted } from 'vue';
import {
  useContinents,
  useFilteredCountries,
} from '@/composable/useTrevorBlades';
import { usePexels } from '@/composable/usePexels';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import CountriesGridComponent from '@/components/CountriesGridComponent.vue';
import { PexelsParams } from '@/interface/Pexels';

/****************************************************************************/
/*                               COMPOSABLE                                  */
/****************************************************************************/
const { continents, load: loadContinents } = useContinents();
const { countriesFiltered, fetchCountries } = useFilteredCountries();
const { fetchImagesPexels } = usePexels();
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
watch(
  () => countriesFiltered.value,
  async (newValue) => {
    if (newValue) {
      try {
        const countries = await Promise.all(
          newValue.countries.map(async (country: any) => ({
            ...country,
            countryImageUrl: await getImagesBackground(country.name),
            flagImageUrl: `https://flagsapi.com/${country.code}/flat/64.png`,
            selected: false,
          }))
        );

        countriesList.value = countries;
        console.log('Lista de países:', countriesList.value);
      } catch (error) {
        console.error('Error al procesar los países:', error);
      }
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
const countriesList = ref<any>([]);
const inputSearch = ref('');

/****************************************************************************/
/*                               METHODS                                    */
/****************************************************************************/
const handleSearch = async (data: any) => {
  await fetchCountries(data.inputSearch, data.selectedContinents);
};
const getRandomImage = (images: any) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
const getImagesBackground = async (query: string) => {
  if (!query) return;
  const params = {
    query: query,
    per_page: 1,
    orientation: 'landscape',
    size: 'medium',
  };

  const images = await fetchImagesPexels(params as PexelsParams);
  if (images && images.length > 0) {
    return getRandomImage(images).src.medium;
  } else {
    return null;
  }
};

/****************************************************************************/
/*                               LIFECYCLE                                   */
/****************************************************************************/

onMounted(async () => {
  await loadContinents();
  await fetchCountries();
});
</script>
