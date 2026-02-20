<template>
    <div v-if="showBtn" class="top-btn" @click="toTop">
    ↑
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const showBtn = ref(false);
const checkScroll = () => {
    // 只需这一行：判断滚动是否超过 400 像素
    showBtn.value = window.scrollY > 400;
};
onMounted(() => window.addEventListener('scroll', checkScroll));
onUnmounted(() => window.removeEventListener('scroll', checkScroll));
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<style scoped>
.top-btn {
    position: fixed;
    right: 3em;
    bottom: 3em;
    width: 44px;
    height: 44px;
    background: #f6fafd;
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

.top-btn:hover {
    transform: translateY(-4px); /* 悬停向上微动 */
}

/* 简单的进入动画 */
.top-btn {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
}
</style>