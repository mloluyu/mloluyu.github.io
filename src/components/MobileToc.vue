<template>
    <div class="mobile-toc-wrapper">
        <button class="toc-trigger-btn" @click="showMobileToc = !showMobileToc">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>

        <Transition name="fade">
            <div v-if="showMobileToc" class="mobile-toc-panel">
                <div class="panel-header">
                    <span>文章目录</span>
                    <button @click="showMobileToc = false">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="toc-wrapper" v-html="articleToc" @click="handleTocClick"></div>
            </div>
        </Transition>

        <div v-if="showMobileToc" class="overlay" @click="showMobileToc = false"></div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
    articleToc: String,
    showMobileToc: Boolean
})
const articleToc = ref(props.articleToc);
const emit = defineEmits(['toc-click']);

const showMobileToc = ref(props.showMobileToc);

const handleTocClick = (event) => {
    emit('toc-click', event)
}
</script>

<style scoped>
.toc-trigger-btn {
    background: #f6fafd;
    width: 44px;
    height: 44px;
    color: #797979;
    border: #797979 1px solid;
    border-radius: 40%; /* 圆形更现代 */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s; /* 丝滑过渡 */
    font-size: 20px;
}

/* 弹出面板 */
.mobile-toc-panel {
    position: fixed;
    bottom: 90px; /* 按钮上方 */
    right: 20px;
    width: 260px;
    max-height: 60vh;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    z-index: 1001;
    overflow-y: auto;
    padding: 15px;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    & button {
        background: none;
        border: none;
        color: #555;
        cursor: pointer;
    }
}

/* 遮罩层 */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    z-index: 999;
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

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
</style>