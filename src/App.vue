<script setup lang="ts">
import Search from "./components/Search.vue";
import {useOverlay} from "./composables/useOverlay";
import {onMounted} from "vue";
import {useCommander} from "./composables/useCommander";
import {useState} from "./composables/useState";

const commander = useCommander();
const overlay = useOverlay();
const {state, commands, modules} = useState();

onMounted(async () => {
  await overlay.initialize();
  await commander.initialize();
})
</script>

<template>
  <div>
    <Search/>
  </div>
</template>