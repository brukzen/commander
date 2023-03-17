<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";

const {modelValue} = defineProps({
  modelValue: String,
})
</script>
<template>
  <div class="relative bg-gray-50 focus:bg-white rounded-xl">
    <MagnifyingGlassIcon class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400 md hydrated"/>
    <input type="text"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="w-full h-12 pr-4 bg-transparent border-0 text-gray-800 placeholder-gray-400 pl-11 sm:text-sm outline-none"
           placeholder="What do you need?" role="combobox" aria-expanded="false" aria-controls="options"
           autocomplete="off" spellcheck="false">
  </div>
</template>