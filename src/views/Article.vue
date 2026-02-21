<!-- pages/BlogPost.vue -->
<template>
    <div class="article-container">
        <aside class="left-pane">
            <div class="back-home">
                <RouterLink to="/">← Back to Home</RouterLink>
            </div>
            <div v-if="!isMobile" class="toc-head">On This Page</div>
            <div v-if="!isMobile" class="toc-wrapper" v-html="articleToc" @click="handleTocClick"></div>
            <MobileToc v-if="isMobile" :article-toc="articleToc" :show-mobile-toc="showMobileToc" @toc-click="handleTocClick" />
        </aside>
        <article class="article">
            <div class="article-area">
                <div class="article-title">
                    <h1 class="title">{{ post.title }}</h1>
                    <p class="title-extra">AUTHOR: {{ post.author.username }}</p>
                    <p class="title-extra">
                        <span>Created At: {{ createdTime }} | Last Modified: {{ updatedTime }}</span>
                    </p>
                </div>
                <div class="article-contents">
                    <MathJaxRenderer :content="renderedHtml" />
                </div>
            </div>
        </article>
    </div>
    <ToUp />
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { renderMarkdown, getLatestToc } from '../util/markdown.js' // 你自己实现的 markdown 渲染函数
import { useRoute } from 'vue-router'
import MathJaxRenderer from '../components/MathJaxRenderer.vue'
import ToUp from '../components/ToUp.vue'
import { title, webtitle, successIcon } from '../centre.js'
import MobileToc from '../components/MobileToc.vue'

const route = useRoute()
const post = ref(null)
const renderedHtml = ref('')
const articleToc = ref('')
const createdTime = ref('')
const updatedTime = ref('')


// 动态提取数据的函数
const updateData = () => {
    if (route.meta && route.meta.postData) {
        post.value = route.meta.postData
        renderedHtml.value = renderMarkdown(post.value.body)
        articleToc.value = getLatestToc()
        createdTime.value = formatDate(post.value.created_time)
        updatedTime.value = formatDate(post.value.updated_time)
        // console.log("数据已加载:", post.value.body) // 调试用
        document.title = `${post.value.title} | ${title}` // 更新页面标题
    }
    // console.log("渲染后的HTML:", renderedHtml.value)
}


// 2. 监听路由变化（防止由于组件复用导致数据不更新）
watch(() => route.meta.postData, updateData, { immediate: true })

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

const handleTocClick = (event) => {
    if (e.target.tagName === 'A') {
        showMobileToc.value = false
    }
    const link = event.target.closest('a');
    if (!link) return;
    event.preventDefault();

    const href = link.getAttribute('href');
    if (!href) return;

    // 关键：只取最后一个 # 之后的部分作为 ID
    const targetId = decodeURIComponent(href.split('#').pop());
    
    // 在整个 document 或 article 容器内寻找
    const element = document.getElementById(targetId);

    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        console.warn("未找到对应的标题 ID:", targetId);
    }
};

const handleCopy = async (e) => {
    const target = (e.target).closest('.copy-btn');
    if (!target) return;

    const code = decodeURIComponent(target.getAttribute('data-code') || '');

    try {
        await navigator.clipboard.writeText(code);

        // 视觉反馈：切换为“打勾”图标
        const originalSVG = target.innerHTML;
        target.innerHTML = successIcon; // 换成成功图标
        target.classList.add('copy-success');

        setTimeout(() => {
            target.innerHTML = originalSVG; // 换回原始图标
            target.classList.remove('copy-success');
        }, 2000);
    } catch (err) {
        console.error('复制失败');
    }
};

const showMobileToc = ref(false);
const isMobile = ref(window.innerWidth <= 900);

const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= 900;
};

onMounted(() => {
    updateData();
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    document.addEventListener('click', handleCopy);
})

onUnmounted(() => {
    document.title = webtitle // 恢复默认标题
    window.removeEventListener('resize', updateIsMobile);
    document.removeEventListener('click', handleCopy);
})
</script>

<style scoped>
.article-container {
    display: flex;
    flex-direction: row;
    min-height: calc(100vh - 2rem);

    & .left-pane {
        min-width: 310px;
        display: flex;
        flex-direction: column;
        position: sticky;
        top: 2rem;              /* 距离窗口顶部的距离，可以根据导航栏高度调整 */
        max-height: calc(100vh - 4rem); /* 限制最大高度，防止目录超长无法滚动 */
        overflow-y: auto;       /* 如果目录内容过多，允许目录内部滚动 */

        & .back-home {
            padding: 2em 0;
            & a {
                color: #555;
                font-size: 24px;
                font-family: 'LXGW WenKai Screen', monospace;
                text-decoration: none;
            }
        }

        & .toc-head {
            font-size: 18px;
            font-weight: bold;
            font-family: 'Ubuntu Sans Mono', monospace;
            padding: 1em 0;
            color: #d0d0d0;
        }
    }
}

/* 1. 针对文章正文中所有带 ID 的标题 */
.article-contents :deep(h1[id]), 
.article-contents :deep(h2[id]), 
.article-contents :deep(h3[id]), 
.article-contents :deep(h4[id]) {
    position: relative;
    cursor: pointer;
}

/* 2. 使用伪元素生成 # 符号 */
.article-contents :deep(h1[id]::after), 
.article-contents :deep(h2[id]::after), 
.article-contents :deep(h3[id]::after), 
.article-contents :deep(h4[id]::after) {
    content: "#";
    margin-left: 10px;
    color: #cdcdcd;           /* 符号颜色 */
    font-size: 1em;         /* 稍微小一点 */
    opacity: 0;               /* 默认隐藏 */
    transition: opacity 0.2s; /* 平滑过渡 */
    font-weight: normal;
}

/* 3. 悬停时显示 */
.article-contents :deep(h1[id]:hover::after), 
.article-contents :deep(h2[id]:hover::after), 
.article-contents :deep(h3[id]:hover::after), 
.article-contents :deep(h4[id]:hover::after) {
    opacity: 1;
}

.article {
    text-align: left;
    max-width: 870px;
    min-height: 642px;
    margin-left: 42px;
    /* background-color: #F4FAFE; */
    border: #A6A6A6 2px solid;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 4em;

    & .article-area {
        margin: 42px 50px;

        & .article-title {
            border-bottom: #cdcdcd 1px solid;

            & .title {
                margin: 0;
            }

            & .title-extra {
                color: #A6A6A6;
                font-family: "Ubuntu Sans Mono";
            }
        } 
    }

    & h1 {
        font-size: 32px;
        font-weight: 600;
    }
}

/* 移除列表默认样式 */
.toc-wrapper {
    border-left: #A6A6A6 2px solid;
}
.toc-wrapper :deep(ul), 
.toc-wrapper :deep(ol) {
    list-style: none;
    padding-left: 2em;
    margin: 0;
    text-align: left;
}

.toc-wrapper :deep(a) {
    position: relative;
    display: inline-block;
    text-decoration: none;
    color: #555;
    padding: 8px 0;
    font-size: 16px;
}
.toc-wrapper :deep(a::before) {
    content: "->";
    position: absolute;    /* 开启绝对定位 */
    left: -1.5em;               /* 定位到 padding 区域的起始位置 */
    top: 50%;              /* 垂直居中 */
    transform: translateY(-50%); 
    
    color: #555;
    font-size: 1em;
    opacity: 0;
    transition: all 0.2s;
}
/* 鼠标悬停效果 */
.toc-wrapper :deep(a:hover::before) {
    opacity: 1;
    left: -1.2em;
}

@media (max-width: 900px) {
    .article-container {
        flex-direction: column;

        & .left-pane {
            width: 100%;
            position: static;
            margin-bottom: 2em;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        & .article {
            width: 100%;
            max-width: none;
            margin-left: 0;
            margin-right: 0;
        }
    }
}
</style>