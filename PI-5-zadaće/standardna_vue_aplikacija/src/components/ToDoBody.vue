<script setup>
import { ref, computed, watch, onMounted } from "vue";
import ToDoStavka from "./ToDoStavka.vue";
import { useBrojacStavki } from "./useBrojacStavki";

const stavke = ref([
  {
    opis: "Implementirati uklanjanje",
    završeno: false,
    prioritet: 1,
  },
  {
    opis: "Dodati text edit",
    završeno: true,
    prioritet: 2,
  },
  {
    opis: "Implementirati pomicanje",
    završeno: false,
    prioritet: 4,
  },
  {
    opis: "Dodati date",
    završeno: false,
    prioritet: 5,
  },
  {
    opis: "Implementirati promjenu boje",
    završeno: false,
    prioritet: 6,
  },
]);

const { brojac, postavi } = useBrojacStavki();

watch(
  stavke,
  (noveStavke) => {
    postavi(noveStavke.length);
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  postavi(stavke.value.length);
});

const sortiraneStavke = computed(() => {
  return [...stavke.value].sort((a, b) => b.prioritet - a.prioritet);
});

function promijeniStatus(index) {
  stavke.value[index].završeno = !stavke.value[index].završeno;
}

function promijeniOpis(index, noviOpis) {
  stavke.value[index].opis = noviOpis;
}

function stvarniIndex(index) {
  const stavka = sortiraneStavke.value[index];
  return stavke.value.findIndex(
    (s) => s.opis === stavka.opis && s.prioritet === stavka.prioritet
  );
}

function povecajPrioritet(index) {
  const i = stvarniIndex(index);
  stavke.value[i].prioritet++;
}

function smanjiPrioritet(index) {
  const i = stvarniIndex(index);
  if (stavke.value[i].prioritet > 0) stavke.value[i].prioritet--;
}

function ukloniStavku(index) {
  const i = stvarniIndex(index);
  stavke.value.splice(i, 1);
}

function dodajNovuStavku() {
  stavke.value.push({
    opis: "Napiši opis...",
    završeno: false,
    prioritet: 0,
  });
}
</script>

<template>
  <div class="p-5 flex flex-col bg-gray-100 rounded shadow-md">
    <TransitionGroup name="list" class="flex flex-col">
      <ToDoStavka
        v-for="(stavka, index) in sortiraneStavke"
        :key="`${stavka.opis}-${stavka.prioritet}`"
        :opis="stavka.opis"
        :završeno="stavka.završeno"
        :prioritet="stavka.prioritet"
        @ažurirajZavršeno="promijeniStatus(stvarniIndex(index))"
        @ažurirajOpis="promijeniOpis(stvarniIndex(index), $event)"
      >
        <div class="flex space-x-2">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            @click.stop="povecajPrioritet(index)"
          >
            +
          </button>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            @click.stop="smanjiPrioritet(index)"
          >
            -
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            @click.stop="ukloniStavku(index)"
          >
            x
          </button>
        </div>
      </ToDoStavka>
    </TransitionGroup>
    <button
      class="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow self-start"
      @click="dodajNovuStavku"
    >
      Dodaj Novu
    </button>
  </div>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
