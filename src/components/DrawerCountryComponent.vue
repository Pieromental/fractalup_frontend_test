<template>
  <q-drawer
    side="right"
    v-model="drawerState"
    overlay
    bordered
    :width="300"
    :breakpoint="700"
  >
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
              <q-item v-if="country.languages && country.languages.length > 0">
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Languages
                  </q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-btn flat color="primary" icon="language">
                    <q-menu>
                      <q-list>
                        <q-item
                          v-for="(language, index) in country.languages"
                          :key="index"
                        >
                          <q-item-section>{{ language.name }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Currency
                  </q-item-label>
                </q-item-section>
                <q-item-section>{{ country.currency }}</q-item-section>
              </q-item>
              <q-item v-if="country.states && country.states.length > 0">
                <q-item-section>
                  <q-item-label class="text-primary text-bold text-h6">
                    Region
                  </q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-btn flat color="primary" icon="location_on">
                    <q-menu>
                      <q-list>
                        <q-item
                          v-for="(state, index) in country.states"
                          :key="index"
                        >
                          <q-item-section>{{ state.name }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn></q-item-section
                >
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
