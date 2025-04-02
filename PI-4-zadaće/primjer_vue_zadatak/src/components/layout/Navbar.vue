<script setup>
import LinkItem from "../navigation/LinkItem.vue";
defineProps({
  links: {
    type: Array,
    required: true,
  },
  activeLink: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["updateActiveLink"]);
function setActiveLink(linkName) {
  emit("updateActiveLink", linkName);
}
</script>
<template>
  <nav
    class="sticky top-0 w-full flex gap-4 flex-wrap items-center justify-around bg-[#070F2B]/25 backdrop-blur-sm py-2 px-8 rounded-lg"
  >
    <LinkItem
      v-for="link in links"
      :key="link.name"
      :name="link.name"
      :active="link.active"
      :isCurrentLink="activeLink == link.name"
      @linkSelected="setActiveLink"
    />
  </nav>
</template>