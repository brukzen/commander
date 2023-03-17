<script setup lang="ts">
import Commander from "./components/Commander.vue";
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <Commander/>
      </template>
      <template #fallback>
      </template>
    </Suspense>
  </div>
</template>