<script setup lang="ts">
import Search from "./components/Search.vue";
import {useOverlay} from "./composables/useOverlay";
import {onMounted} from "vue";
import {useCommander} from "./composables/useCommander";
const commander = useCommander();
const overlay = useOverlay();
onMounted(async () => {
  await overlay.initialize();
})
</script>

<template>
  <div>
    <Search/>
  </div>
</template>