<template>
    <div class="post-comments">
        <div class="post-author-inf">
            
        </div>
        <div class="post-body">

        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import apiClient from '../../api';
const props = defineProps({
    postId: {
        type: Number,
        required: true
    }
});

const username = ref('')
const userEmail = ref('')
const content = ref('')
const parent = ref(null)

</script>

<style scoped>

</style>