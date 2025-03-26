<script setup>
import { ref, computed } from "vue";

const nazivProizvoda = ref("");
const cijenaProizvoda = ref(0);
const kosarica = ref([]);
const disabled = ref(true);

function provjeriStanje() {
  disabled.value = nazivProizvoda.value === "";
}

const ukupnaCijena = computed(() => {
  let suma = 0;
  for (let i = 0; i < kosarica.value.length; i++) {
    suma += kosarica.value[i].cijena * kosarica.value[i].kolicina;
  }
  return suma.toFixed(2);
});

function dodajProizvod() {
  if (!nazivProizvoda.value) return;
  let proizvod = kosarica.value.find((p) => p.naziv === nazivProizvoda.value);

  if (proizvod) {
    proizvod.kolicina++;
  } else {
    kosarica.value.push({
      naziv: nazivProizvoda.value,
      cijena: +cijenaProizvoda.value,
      kolicina: 1,
    });
  }
  nazivProizvoda.value = "";
  cijenaProizvoda.value = "";
  disabled.value = true;
}
function dodajKolicinu(proizvod) {
  proizvod.kolicina++;
}
function smanjiKolicinu(proizvod) {
  if (proizvod.kolicina > 1) {
    proizvod.kolicina--;
  }
}
function ukloniProizvod(index) {
  kosarica.value.splice(index, 1);
}
</script>

<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm">
    <h1 class="text-2xl font-light text-gray-800 mb-6">Košarica</h1>

    <div class="flex flex-col md:flex-row gap-3 mb-6">
      <div class="flex-grow">
        <input
          type="text"
          v-model="nazivProizvoda"
          placeholder="Naziv proizvoda"
          @input="provjeriStanje"
          class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div class="w-28">
        <input
          type="number"
          v-model="cijenaProizvoda"
          min="0"
          placeholder="Cijena"
          class="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        @click="dodajProizvod"
        :disabled="disabled"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:bg-gray-400"
      >
        Dodaj
      </button>
    </div>

    <div v-if="kosarica.length === 0" class="py-10 text-center text-gray-500">
      Košarica je prazna
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="(proizvod, index) in kosarica"
        :key="index"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
      >
        <div class="font-medium">{{ proizvod.naziv }}</div>

        <div class="flex items-center space-x-4">
          <div
            class="flex items-center bg-white rounded-lg border border-gray-200"
          >
            <button
              @click="smanjiKolicinu(proizvod)"
              class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg"
            >
              -
            </button>
            <span class="px-2">{{ proizvod.kolicina }}</span>
            <button
              @click="dodajKolicinu(proizvod)"
              class="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg"
            >
              +
            </button>
          </div>

          <div class="w-20 text-right font-light">
            {{ (proizvod.cijena * proizvod.kolicina).toFixed(2) }} €
          </div>

          <button
            @click="ukloniProizvod(index)"
            class="text-gray-400 hover:text-red-500"
          >
            ⨯
          </button>
        </div>
      </div>

      <div class="flex justify-between pt-4 border-t border-gray-200">
        <div class="text-gray-600">Ukupno</div>
        <div class="text-xl font-medium">{{ ukupnaCijena }} €</div>
      </div>
    </div>
  </div>
</template>