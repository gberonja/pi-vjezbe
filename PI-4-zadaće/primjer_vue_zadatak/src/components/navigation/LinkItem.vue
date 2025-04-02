<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  isCurrentLink: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["linkSelected"]);

function selectLink() {
  emit("linkSelected", props.name);
}
</script>

<template>
  <div
    class="text-sm z-10 relative transition"
    @click="selectLink"
    :class="[
      isCurrentLink
        ? 'underline text-purple-100'
        : 'cursor-pointer text-indigo-300 text-sm hover:text-indigo-200 hover:scale-105',
      active
        ? ''
        : 'text-indigo-500/50 text-sm pointer-events-none font line-through',
    ]"
  >
    {{ name }}
    <b
      v-if="isCurrentLink"
      class="text-purple-400 -z-[5] absolute -left-0.5 blur-sm"
    >
      {{ name }}
    </b>
  </div>
</template>