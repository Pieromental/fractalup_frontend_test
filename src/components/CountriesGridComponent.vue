<template>
  <div class="row justify-center q-pt-lg q-px-xl q-col-gutter-md">
    <div
      class="col-4 col-xs-12 col-sm-12 col-md-4"
      v-for="(country, index) in localConuntriesList"
      :key="index"
    >
      <q-card class="custom-card" @click="selectCountry(country)">
        <q-img
          :src="country.countryImageUrl"
          :ratio="16 / 9"
          spinner-color="primary"
        />

        <q-item :class="{ 'selected-card': country.selected }">
          <q-item-section avatar>
            <q-img :src="country.flagImageUrl" spinner-color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label
              class="text-primary text-bold"
              :class="{ 'selected-text': country.selected }"
              >{{ country.name }}</q-item-label
            >
            <q-item-label
              caption
              :class="{ 'selected-text': country.selected }"
              >{{ country.name }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                    */
/****************************************************************************/
import { ref, defineProps, defineEmits, watch } from 'vue';

/****************************************************************************/
/*                               PROPS                                      */
/****************************************************************************/
const props = defineProps({
  countriesList: { type: Array as any, default: () => [] },
});

/****************************************************************************/
/*                               DATA                                      */
/****************************************************************************/
defineOptions({
  name: 'SearchBarComponent',
});

const localConuntriesList = ref(props.countriesList);

/****************************************************************************/
/*                             EMITS                                        */
/****************************************************************************/
const emit = defineEmits(['serachCountry']);
/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const selectCountry = (country: any) => {
  localConuntriesList.value.forEach((countryItem: any) => {
    countryItem.selected = false;
  });
  country.selected = true;
  emit('serachCountry', country.code);
};
/****************************************************************************/
/*                             WATCHERS                                     */
/****************************************************************************/

watch(
  () => props.countriesList,
  (newcontinentList: any) => {
    localConuntriesList.value = newcontinentList;
  }
);
/****************************************************************************/
/*                             LYFECICLE                                     */
/****************************************************************************/
</script>
<style scoped>
.custom-card {
  border-radius: 35px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.custom-card:hover {
  transform: scale(1.02);
}

.selected-card {
  color: white !important;
  background-color: var(--q-primary);
}
.selected-text {
  color: white !important;
}
</style>
