<template>
  <q-drawer side="right" v-model="drawerState" overlay bordered :width="300">
    <q-layout view="lHh lpr lFf" container>
      <q-header class="custom-header">
        <q-btn
          color="dark"
          flat
          rounded
          dense
          icon="close"
          @click="toggleDrawer"
        />
      </q-header>
      <q-page-container>
        <div class="row q-col-gutter-md q-pa-md">
          <div class="col-12">
            <q-card flat>
              <q-img
                class="custom-img"
                :src="country.countryImageUrl"
                :ratio="16 / 9"
                spinner-color="primary"
              />

              <q-item>
                <q-item-section avatar>
                  <q-img :src="country.flagImageUrl" spinner-color="primary" />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">{{
                    country.name
                  }}</q-item-label>
                  <q-item-label caption>{{ country.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div class="col-12">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Capital
                  </q-item-label>
                </q-item-section>
                <q-item-section>{{ country.capital }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Language
                  </q-item-label>
                </q-item-section>
                <q-item-section>{{ country.capital }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Currency
                  </q-item-label>
                </q-item-section>
                <q-item-section>{{ country.capital }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Region
                  </q-item-label>
                </q-item-section>
                <q-item-section>{{ country.capital }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </q-drawer>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                               IMPORTS                                      */
/****************************************************************************/
import { ref, defineProps, watch, defineEmits } from 'vue';
/****************************************************************************/
/*                               EMITS                                      */
/****************************************************************************/
const emit = defineEmits(['closeDrawer']);
/****************************************************************************/
/*                               PROPS                                       */
/****************************************************************************/
const props = defineProps({
  drawerCountry: { type: Boolean, default: false },
  country: { type: Object, default: () => {} },
});
/****************************************************************************/
/*                               DATA                                       */
/****************************************************************************/
const drawerState = ref(props.drawerCountry);
const localCountry = ref(props.country);
/****************************************************************************/
/*                               METHODS                                       */
/****************************************************************************/
const toggleDrawer = () => {
  emit('closeDrawer');
};
/****************************************************************************/
/*                               WATCH                                       */
/****************************************************************************/
watch(
  () => props.drawerCountry,
  (newValue: any) => {
    drawerState.value = newValue;
  }
);
watch(
  () => props.country,
  (newValue: any) => {
    console.log(newValue);
    localCountry.value = newValue;
  }
);
</script>
<style scoped>
.custom-header {
  display: flex;
  justify-content: flex-end;
  background-color: white;
}
.custom-img {
  border-radius: 15px !important;
}
</style>
