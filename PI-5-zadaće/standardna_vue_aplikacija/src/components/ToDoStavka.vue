<script setup>
import { ref, useTemplateRef, computed } from "vue";
const props = defineProps({
  opis: String,
  završeno: Boolean,
  prioritet: Number,
});
const unosRef = ref(null);
const uređivanje = ref(false);
const noviOpis = ref("");
const unos = useTemplateRef("unosRef");
const emit = defineEmits(["ažurirajOpis", "ažurirajZavršeno"]);
function klikniKvadratic() {
  emit("ažurirajZavršeno");
}
const dopuštenoUređivanje = computed(() => {
  return uređivanje.value && !props.završeno;
});
function ukljuciUredivanje() {
  if (props.završeno) return;
  noviOpis.value = props.opis;
  uređivanje.value = true;
  // Dodan Timeout zbog renderiranja
  setTimeout(() => {
    if (unos.value) unos.value.focus();
  }, 10);
}
function iskljuciUredivanje() {
  uređivanje.value = false;
  emit("ažurirajOpis", noviOpis.value);
}
</script>
<template>
  <div class="flex justify-between items-center border-2 m-2 rounded shadow">
    <div
      class="flex items-center justify-between flex-grow p-3 cursor-pointer"
      :class="završeno ? 'bg-green-200' : 'bg-white'"
      @click="klikniKvadratic"
    >
      <div class="flex items-center">
        <div class="bg-purple-500 text-white px-2 py-1 rounded mr-3">
          {{ prioritet }}
        </div>
        <p
          v-if="!dopuštenoUređivanje"
          :class="završeno ? 'line-through text-gray-500' : ''"
          @dblclick="ukljuciUredivanje"
          class="min-w-[150px]"
        >
          {{ opis }}
        </p>
        <input
          v-else
          type="text"
          v-model="noviOpis"
          ref="unosRef"
          class="bg-gray-100 p-2 rounded border"
          @focusout="iskljuciUredivanje"
          @keyup.enter="iskljuciUredivanje"
        />
      </div>
    </div>

    <div class="flex items-center mx-2">
      <slot></slot>
    </div>
  </div>
</template>