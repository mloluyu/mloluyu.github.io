<template>
    <div class="about-page-container">
        <h2>施工中...</h2>
        <p>前面的世界以后再来探索吧</p>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 跳转
router.push('/404')
</script>

<style scoped>
.about-page-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 2rem);
}
</style>