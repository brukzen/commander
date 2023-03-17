<script setup lang="ts">
import {useOverlay} from "../composables/useOverlay";
import {useCommander} from "../composables/useCommander";
import {provide, ref} from "vue";
import SearchInput from "./SearchInput.vue";
import SearchResult from "./SearchResults.vue";

const commander = useCommander();
const overlay = useOverlay();
await overlay.initialize();
await commander.initialize();
provide('overlay', overlay);
provide('commander', commander);

const term = ref('');
const searchInput = ref<HTMLInputElement>();
const results = ref<Array<ICommand>>([]);

function search(term: string) {
  if (!term) {
    return results.value = [];
  }
  results.value = commander.search(term);
}
</script>

<template>
  <div class="object-center overflow-hidden bg-cover bg-white w-screen h-screen rounded-2xl" @keyup.esc="overlay.hide">
    <div class="flex flex-col p-2">
      <SearchInput ref="searchInput" v-model="term" @input="(e) => search(e.target.value)"/>
      <SearchResult :results="results"/>
    </div>
  </div>
</template>