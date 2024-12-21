<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
</script>

<style>
@import './style.css';
</style>
