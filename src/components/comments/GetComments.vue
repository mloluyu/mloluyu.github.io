<template>
    <div class="comments-list">
        <div v-for="comment in comments":key="comment.id" class="comment">
            <div class="avatar">

            </div>
            <div class="comment-body">
                <MathJaxRenderer :content="renderMarkdown(comment.content)"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import apiClient from "../api";
import { renderMarkdown } from "../../util/markdown";
import MathJaxRenderer from "../MathJaxRenderer.vue";
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