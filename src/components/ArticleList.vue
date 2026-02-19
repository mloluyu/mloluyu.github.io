<template>
    <div class="article-list-component">
        <!-- <li class="article-item">
            <span class="post-date">FEB 12, 2026</span>
            <a class="post-title" href="#">从零开始，制作一只全自动红茶搅拌人偶</a>
            <p class="post-excerpt">厌倦了自己搅拌红茶？只需要一个微型浮游法阵和简单的逻辑核心，你就能拥有一位勤劳的下午茶助手。</p>
            <div class="tags">
                <span class="tag">MAGIC</span>
            </div>
        </li> -->
        <li v-for="post in posts" :key="post.id" class="article-item">
            <span class="post-date">{{ formatDate(post.created_time) }}</span>
            <RouterLink class="post-title" :to="{name: 'Article',params: { slug: post.slug }}">
                {{ post.title }}
            </RouterLink>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="tags">
                <span v-for="tag in post.tags" :key="tag.id" class="tag">{{ tag.name }}</span>
            </div>
        </li>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import apiClient from "../api";

const posts = ref([]);
const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

apiClient.get('/posts/').then(res => {
    posts.value = res.data;
}).catch(error => {
    console.error('Error fetching posts:', error);
});

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}
</script>

<style scoped>
.article-list-component {
    max-width: 752px;
    min-height: 642px;
    max-height: calc(100vh - 84px - 4em);
    margin: 42px 50px;
    overflow-y: auto;
}

.article-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    min-height: 214px;
    font-family: 'Inter';

    & .post-date {
        height: 25px;
        font-size: 16px;
        color: #A6A6A6;
        display: block;
        text-align: left;
    }

    & .post-title {
        min-height: 53px;
        font-size: 32px;
        font-weight: 600;
        line-height: 1.2;
        color: #000000;
        text-decoration: none;

        display: flex;          /* 开启弹性布局 */
        align-items: center;    /* 垂直方向居中 */
        text-align: left;       /* 水平方向保持左对齐 */

        &:hover {
            text-decoration: underline;
        }
    }

    & .post-excerpt {
        min-height: 81px;
        font-size: 20px;
        line-height: 1.2;
        color: #7b7b7b;
        display: block;
        text-align: left;
        margin: 0;
    }

    & .tags {
        height: 25px;
        margin-bottom: 29px;
        display: flex;
        gap: 12px;
        & .tag {
            display: inline-block;
            width: 70px;
            font-size: 16px;
            color: #5bc3e3;
            border-radius: 8px;
            text-align: center;
            background-color: #CBF5F6;
        }
    }
}
@media (max-width: 900px) {
    .article-list-component {
        margin: 25px;
    }
}

</style>