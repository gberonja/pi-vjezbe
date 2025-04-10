<script setup>
import { useBrojacStavki } from "./useBrojacStavki";
const { brojac } = useBrojacStavki();
</script>
<template>
  <div
    class="bg-blue-600 text-white p-5 rounded-t flex justify-between items-center shadow-md"
  >
    <h1 class="text-2xl font-bold"><slot></slot></h1>
    <div class="bg-white text-blue-600 rounded-full px-4 py-2 font-bold shadow">
      Broj stavki: {{ brojac }}
    </div>
  </div>
</template>