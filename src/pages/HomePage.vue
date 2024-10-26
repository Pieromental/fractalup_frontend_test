<template>
  <q-page class="q-pa-md">
    <!-- MainContent -->
    <SearchBarComponent
      @search="handleSearch"
      :continent-list="continentList"
      :input-search="inputSearch"
    />
    <CountriesGridComponent
      :countries-list="countriesList"
      @serach-country="handleSearchCountry"
    />
    <DrawerCountryComponent
      :drawer-country="drawerCountry"
      :country="countryData"
      @close-drawer="closeDrawer"
    />
  </q-page>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import { ref, watch, onMounted, nextTick } from 'vue';
import {
  useContinents,
  useFilteredCountries,
  useCountryByCode,
} from '@/composable/useTrevorBlades';

import { PexelsParams } from '@/interface/Pexels';
import { usePexels } from '@/composable/usePexels';
import { Loading, QSpinnerFacebook } from 'quasar';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import CountriesGridComponent from '@/components/CountriesGridComponent.vue';
import DrawerCountryComponent from '@/components/DrawerCountryComponent.vue';
import { Screen } from 'quasar';
/****************************************************************************/
/*                               COMPOSABLE                                  */
/****************************************************************************/
const { continents, load: loadContinents } = useContinents();
const { countriesFiltered, fetchCountries } = useFilteredCountries();
const { countryByCode, fetchCountryByCode } = useCountryByCode();
const { fetchImagesPexels } = usePexels();

const breakpoint = ref(600);

/****************************************************************************/
/*                               WATCH                                      */
/****************************************************************************/
watch(
  () => Screen.width,
  (newValue) => {
    if (newValue <= breakpoint.value) {
      closeDrawer();
    }
  }
);
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
      } catch (error) {
        console.error('Error al procesar los países:', error);
      }
    }
  }
);
watch(
  () => countryByCode.value,
  async (newValue) => {
    if (newValue) {
      try {
        countryData.value = {
          ...newValue.country,
          countryImageUrl: await getImagesBackground(newValue.country.name),
          flagImageUrl: `https://flagsapi.com/${newValue.country.code}/flat/64.png`,
        };
      } catch (error) {
        console.error('Error al procesar el país:', error);
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
const countryData = ref<any>({});
const inputSearch = ref('');
const drawerCountry = ref(false);

/****************************************************************************/
/*                               METHODS                                    */
/****************************************************************************/
const handleSearch = async (data: any) => {
  await fetchCountries(data.inputSearch, data.selectedContinents);
};
const handleSearchCountry = async (code: string) => {
  drawerCountry.value = false;
  await fetchCountryByCode(code);
  nextTick(() => {
    drawerCountry.value = !drawerCountry.value;
  });
};
const closeDrawer = () => {
  countriesList.value.forEach((countryItem: any) => {
    countryItem.selected = false;
  });
  drawerCountry.value = false;
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
const loading = async (type: string) => {
  if (type == 'open') {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'white',
      spinnerSize: 140,
      backgroundColor: 'primary',
      message: 'Estamos procesando la información. En breve continuamos',
      messageColor: 'white',
    });
  } else {
    Loading.hide();
  }
};
/****************************************************************************/
/*                               LIFECYCLE                                   */
/****************************************************************************/

onMounted(async () => {
  loading('open');
  await loadContinents();
  await fetchCountries();
  loading('hide');
});
</script>
