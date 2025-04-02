<script setup>
import { ref } from "vue";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";
import Navbar from "./components/layout/Navbar.vue";
import PagePočetna from "./components/pages/PagePočetna.vue";
import PageSlika from "./components/pages/PageSlika.vue";
import PageGrafika from "./components/pages/PageGrafika.vue";

const links = [
  { name: "POČETNA", active: true },
  { name: "SLIKA", active: true },
  { name: "ZVUK", active: false },
  { name: "GRAFIKA", active: true },
  { name: "MODEL", active: false },
  { name: "VIDEO", active: false },
];

const activeLink = ref("POČETNA");

function updateActiveLink(linkName) {
  activeLink.value = linkName;
}
</script>

<template>
  <div
    class="fixed w-full h-full flex justify-center poppins text-sm text-indigo-300 bg-gradient-to-b from-[#1B1A55] via-[#2B428D] to-[#3B39BB]"
  >
    <div
      style="
        background-image: url('./src/assets/images/pattern.jpg');
        background-size: 200px;
      "
      class="fixed w-full h-full bg-repeat opacity-[3%] -z-10"
    ></div>

    <div
      class="bg-[#535C91]/25 border-x border-[#9290C3]/10 w-[700px] max-w-[700px] shadow-lg flex flex-col justify-between px-8 gap-4 overflow-auto"
    >
      <Header />

      <Navbar
        :links="links"
        :activeLink="activeLink"
        @updateActiveLink="updateActiveLink"
      />

      <PagePočetna v-if="activeLink == 'POČETNA'" />
      <PageSlika v-if="activeLink == 'SLIKA'" />
      <PageGrafika v-if="activeLink == 'GRAFIKA'" />

      <Footer />
    </div>
  </div>
</template>