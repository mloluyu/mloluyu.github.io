<!-- pages/BlogPost.vue -->
<template>
    <div class="article-container">
        <aside class="left-pane">
        </aside>
        <article class="article">
            <div class="article-area">
                <div class="article-title">
                    <h1 class="title">{{ post.title }}</h1>
                    <p class="title-extra">AUTHOR: {{ post.author.username }}</p>
                </div>
                <div class="article-contents">
                    <MathJaxRenderer :content="renderedHtml" />
                </div>
            </div>
        </article>
    </div>
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
.article-container {
    display: flex;
    flex-direction: row;
    min-height: calc(100vh - 2rem);

    & .left-pane {
        width: 304px;
        display: flex;
        flex-direction: column;
    }
}

.article {
    text-align: left;
    max-width: 880px;
    min-height: 642px;
    margin-left: 32px;
    background-color: #F4FAFE;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 4em;

    & h1 {
        font-size: 36px;
    }

    & .article-area {
        margin: 2em;

        & .title {
            margin: 0;
        }

        & .title-extra {
            color: #A6A6A6;
            font-family: "Ubuntu Sans Mono";
        }
    }
}
</style>