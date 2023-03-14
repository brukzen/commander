<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";
import {onMounted, ref} from "vue";
import {invoke} from "@tauri-apps/api/tauri";
import {useOverlay} from "../composables/useOverlay";
import {useCommander} from "../composables/useCommander";

const searchTerm = ref('');
const searchInput = ref<HTMLInputElement>();
const commander = useCommander();
const overlay = useOverlay();
overlay.onShow.subscribe(onShow);

const results = ref<Array<Command>>([]);

function search(term: string) {
  if (!term) {
    return results.value = [];
  }

  results.value = commander.suggestCommands(term);
}

function execute(term: string) {
  results.value[0].executor(term);
}

function completeTerm(term: string) {
  searchTerm.value = results.value[0].prefix;
  search(searchTerm.value);
}

function onShow() {
  if (searchInput.value) {
    searchInput.value.focus();
  }
}

onMounted(async () => {
  await invoke('init_search');
});
</script>
<template>
  <section class="object-center overflow-hidden bg-cover">
    <div class="items-center justify-center p-8 md:p-12 lg:px-20 lg:py-36">
      <div
          class="max-w-xl p-3 mx-auto overflow-hidden transition-all transform bg-white shadow-2xl rounded-xl">
        <div class="relative bg-gray-50 focus:bg-white rounded-xl">
          <MagnifyingGlassIcon class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400 md hydrated"/>
          <input type="text"
                 ref="searchInput"
                 v-model="searchTerm"
                 @input="(e) => search(e.target.value)"
                 @keyup.enter="(e) => execute(e.target.value)"
                 @keydown.tab.prevent="(e) => completeTerm(e.target.value)"
                 class="w-full h-12 pr-4 bg-transparent border-0 text-gray-800 placeholder-gray-400 pl-11 sm:text-sm outline-none"
                 placeholder="What do you need?" role="combobox" aria-expanded="false" aria-controls="options">
          <div
              class="w-full pointer-events-none absolute top-4 h-12 pr-4 bg-transparent border-0 text-gray-400 pl-11 sm:text-sm outline-none flex-col justify-center items-center"
              v-if="results.length > 0">
            <p>{{ results[0].prefix }}</p></div>
        </div>
        <ul class="pt-3 space-y-3 overflow-y-auto max-h-96 scroll-py-3" id="options" role="listbox"
            v-if="results.length > 0">
          <li class="flex p-3 duration-200 cursor-default select-none text-gray-500 hover:text-blue-500 group rounded-xl hover:bg-gray-50"
              v-for="(command, index) in results" @click="command.executor">
            <div name="add-outline" class="w-5 h-5 md hydrated" role="img" aria-label="add outline"></div>
            <span class="flex-auto ml-3 text-sm truncate">{{ command.prefix }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

