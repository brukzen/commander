<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import {onMounted, ref} from "vue";
import {invoke} from "@tauri-apps/api/tauri";
import {useOverlay} from "../composables/useOverlay";

const searchInput = ref<HTMLInputElement>();
const overlay = useOverlay();
overlay.onShow.subscribe(onShow);

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
                 class="w-full h-12 pr-4 bg-transparent border-0 text-gray-800 placeholder-gray-400 pl-11 sm:text-sm outline-none"
                 placeholder="What do you need?" role="combobox" aria-expanded="false" aria-controls="options">
        </div>
      </div>
    </div>
  </section>
</template>

