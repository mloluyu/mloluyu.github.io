<template>
    <div class="not-found">
        <h1>404 - Not Found</h1>
        <p>抱歉，您所访问的页面被雾雨魔理沙偷走了。</p>
        <p>ごめん、あなたが探しているページは霧雨魔理沙に盗まれました。</p>
        <p>Sorry, the page you are looking for was stolen by Kirisame Marisa.</p>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { webtitle, title } from '../centre.js'

onMounted(() => {
    document.title = `Not Found | ${title}`; // 设置特定标题
});

onUnmounted(() => {
    document.title = webtitle;
});
</script>

<style scoped>
</style>