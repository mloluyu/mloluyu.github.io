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
</style>