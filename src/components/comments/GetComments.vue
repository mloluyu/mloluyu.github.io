<template>
    <div class="comments-list">

    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import apiClient from "../api";
const comments = ref([]);
const props = defineProps({
    postId: {
        type: Number,
        required: true
    }
});
</script>

<style scoped>

</style>