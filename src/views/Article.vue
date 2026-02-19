<!-- pages/BlogPost.vue -->
<template>
  <article class="article">
    <h1>{{ post.title }}</h1>
    <MathJaxRenderer :content="renderedHtml" />
  </article>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { renderMarkdown } from '../util/markdown.js' // 你自己实现的 markdown 渲染函数
import { useRoute } from 'vue-router'
import MathJaxRenderer from '../components/MathJaxRenderer.vue'

const route = useRoute()
const post = ref(null)
const renderedHtml = ref('')

// 动态提取数据的函数
const updateData = () => {
    if (route.meta && route.meta.postData) {
        post.value = route.meta.postData
        renderedHtml.value = renderMarkdown(post.value.body)
        // console.log("数据已加载:", post.value.body) // 调试用
    }
    // console.log("渲染后的HTML:", renderedHtml.value)
}

// 1. 初始化尝试
onMounted(updateData)

// 2. 监听路由变化（防止由于组件复用导致数据不更新）
watch(() => route.meta.postData, updateData, { immediate: true })
</script>

<style scoped>
.article {
    & h1 {
        font-size: 36px;
    }
}
</style>