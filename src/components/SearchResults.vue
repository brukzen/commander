<script setup lang="ts">
const props = defineProps({
  results: Array<ICommand>
});
</script>

<template>
  <ul id="options" role="listbox"
      v-if="results.length > 0">
    <li class="flex items-center p-3 duration-200 cursor-default select-none text-gray-500 hover:text-blue-500 group rounded-xl hover:bg-gray-50"
        v-for="(command, index) in results">
      <img class="w-6 h-6 md" :src="command.icon">
      <p class="flex-auto ml-3 text-sm truncate">{{ command.prefix }}</p>
    </li>
  </ul>
</template>