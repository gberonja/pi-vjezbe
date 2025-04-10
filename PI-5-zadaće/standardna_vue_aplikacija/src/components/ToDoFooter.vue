<script setup></script>
<template>
  <div class="bg-gray-800 text-white text-center p-4 rounded-b shadow-md">
    <slot></slot> - {{ new Date().getFullYear() }}
  </div>
</template>