<!-- src/components/MathJaxRenderer.vue -->
<template>
    <div ref="container" class="mathjax-content" v-html="content"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    content: {
        type: String,
        required: true
    }
})

const container = ref(null)
let mathJaxReady = false

function renderMath() {
    if (!mathJaxReady || !container.value) return
    window.MathJax.typesetClear([container.value])
    window.MathJax.typeset([container.value])
}

async function initMathJax() {
    if (window.MathJax) {
        if (mathJaxReady) {
        renderMath()
        } else {
        await window.MathJax.startup.promise
        mathJaxReady = true
        renderMath()
        }
        return
    }

    // 配置：使用 SVG 输出（关键！）
    window.MathJax = {
        tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
        },
        options: {
        renderActions: {
            addMenu: [], // 可选：禁用右键菜单
            checkLoading: [] // 加快渲染
        }
        },
        startup: {
        typeset: false
        }
    }

    // ⚠️ 改为加载 tex-svg.js（不是 tex-chtml.js！）
    await import('mathjax/es5/tex-svg.js')

    await window.MathJax.startup.promise
    mathJaxReady = true
    renderMath()
}

onMounted(() => {
  initMathJax()
})

watch(
    () => props.content,
    (newContent) => {
        if (container.value) {
        container.value.innerHTML = newContent
        requestAnimationFrame(renderMath)
        }
    },
    { immediate: true }
)
</script>

<style scoped>
/* SVG 公式默认垂直对齐更好 */
.mathjax-content :deep(svg) {
    vertical-align: middle;
}

.mathjax-content :deep(hr) {
    border: none;
    border-top: 1px solid #cdcdcd;
    margin: 2em 0;
}

.mathjax-content :deep(blockquote) {
    border-left: 3px solid #cdcdcd;
    padding-left: 0.5em;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    color: #a6a6a6;
}

.mathjax-content :deep(code) {
    background-color: #f7fafb;
    padding: 0.5em 1em;
    border-radius: 16px;
    font-family: 'Ubuntu Sans Mono', monospace;
}

.mathjax-content :deep(table) {
    border-collapse: separate; /* 必须：不能用 collapse */
    border-spacing: 0;         /* 消除单元格间隙 */
    width: 100%;
    border: 1px solid #dfe2e5; /* 外边框 */
    border-radius: 16px;        /* 圆角大小 */
    overflow: hidden;          /* 确保子元素不溢出圆角 */

    & th, & td {
        border-bottom: 1px solid #dfe2e5;
        border-right: 1px solid #dfe2e5;
        padding: 10px;
    }

    & th, & td {
        &:last-child {
            border-right: none; /* 最后一列去掉右边框 */
        }
    }

    & th {
        font-weight: 600;
        background-color: #dfe2e5;
    }

    & tr:last-child td {
        border-bottom: none; /* 最后一行去掉下边框 */
    }
    
}

.mathjax-content :deep(a) {
    color: #a6a6a6;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.mathjax-content :deep(img) {
    max-width: 100%;
    border-radius: 16px;
    margin: 1em 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>