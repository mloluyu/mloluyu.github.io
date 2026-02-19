<!-- pages/BlogPost.vue -->
<template>
  <article>
    <h1>{{ title }}</h1>
    <MathJaxRenderer :content="renderedHtml" />
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { renderMarkdown } from '../util/markdown.js' // 你自己实现的 markdown 渲染函数
import MathJaxRenderer from '../components/MathJaxRenderer.vue'
// 假设你通过 fetch 或 frontmatter 获取 markdown 内容
//import { compileMarkdown } from '@/utils/markdown' // 你自己实现的 markdown 渲染函数

const title = ref('')
const renderedHtml = ref('')

onMounted(async () => {
  const mdContent = `# Hello Math

行内公式：$a^2 + b^2 = c^2$

块级公式：

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
`.trim()
  renderedHtml.value = renderMarkdown(mdContent) // 使用自定义的 markdown 渲染函数
  title.value = 'Hello Math'
})
</script>