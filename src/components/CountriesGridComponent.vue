<template>
  <div class="row justify-center q-pt-lg q-px-xl q-col-gutter-md">
    <div
      class="col-4 col-xs-12 col-sm-12 col-md-4"
      v-for="(country, index) in localConuntriesList"
      :key="index"
    >
      <q-card class="custom-card">
        <q-img
          :src="country.countryImageUrl"
          :ratio="16 / 9"
          spinner-color="primary"
        />

        <q-item>
          <q-item-section avatar>
            <q-img :src="country.flagImageUrl" spinner-color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-primary">{{ country.name }}</q-item-label>
            <q-item-label caption>{{ country.name }}</q-item-label>
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
import { ref, defineProps, watch } from 'vue';

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

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/

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
}
</style>
