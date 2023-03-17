<script setup lang="ts">
import {onMounted, ref} from "vue";
import {invoke} from "@tauri-apps/api/tauri";
import {useOverlay} from "../composables/useOverlay";
import {useCommander} from "../composables/useCommander";

const searchTerm = ref('');
const searchInput = ref<HTMLInputElement>();
const {commandManager} = useCommander();
const overlay = useOverlay();
overlay.onShow.subscribe(onShow);

const results = ref<Array<ICommand>>([]);

function search(term: string) {
  if (!term) {
    return results.value = [];
  }
  results.value = commandManager.suggestCommands(term);
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
  <section class="object-center overflow-hidden bg-cover" @keyup.esc="overlay.hide">
    <div class="items-center justify-center p-8 md:p-12 lg:px-20 lg:py-36">
      <div
          class="max-w-xl p-3 mx-auto overflow-hidden transition-all transform bg-white shadow-2xl rounded-xl">
      </div>
    </div>
  </section>
</template>

