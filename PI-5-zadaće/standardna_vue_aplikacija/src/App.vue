<script setup>
import ToDoBody from "./components/ToDoBody.vue";
import ToDoHeader from "./components/ToDoHeader.vue";
import ToDoFooter from "./components/ToDoFooter.vue";
</script>
<template>
  <div
    class="min-h-screen bg-gray-200 p-5 flex flex-col items-center justify-center"
  >
    <div class="w-full max-w-3xl mx-auto shadow-xl rounded">
      <ToDoHeader>To-Do Aplikacija</ToDoHeader>
      <ToDoBody />
      <ToDoFooter>Gabriel Beronja</ToDoFooter>
    </div>
  </div>
</template>
