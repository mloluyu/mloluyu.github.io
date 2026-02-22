<script setup>
    import { ref, onMounted, computed } from "vue";
    import { useRoute } from "vue-router";
    import Calendar from "../components/Calendar.vue";
    import ArticleList from "../components/ArticleList.vue";
    import CategoryList from "../components/CategoryList.vue";
    import apiClient from "../api";

    const posts = ref([]);
    const categories = ref([]);

    const route = useRoute();

    const displayPosts = computed(() => {
    // 1. 获取路径中的 slug 字段 (对应路由配置里的 :slug)
        const categorySlug = route.params.slug;

        // 2. 核心判断逻辑
        if (!categorySlug) {
            // 如果没有 slug（比如访问的是 '/'），展示全部
            return posts.value;
        }

        // 3. 筛选逻辑
        // 注意：这里要匹配的是后端返回的 category 的 slug 字段
        return posts.value.filter(post => {
            return post.category.slug === categorySlug;
        });
    });

    onMounted(async () => {
        try {
            const [resp, resc] = await Promise.all([
                apiClient.get('/posts/'),
                apiClient.get('/categories/')
            ]);
            
            // 赋值时增加兜底
            posts.value = resp.data || [];
            categories.value = resc.data || [];
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    });

    
</script>

<template>
    <div class="app-container">
        <aside class="left-pane">
            <div class="title">Grimorie of<br>Magartorid</div>
            <div class="calendar-container">
                <Calendar />
            </div>
            <div class="categories">
                <CategoryList :categories="categories" />
            </div>
        </aside>
        <main class="main-content">
            <ArticleList :posts="displayPosts" />
        </main>
    </div>
</template>

<style scoped>
.title {
    /* position: absolute;
    top: 35px;
    left: 33px; */
    width: 201px;
    height: 68px;
    font-weight: bold;
    font-size: 36px;
    line-height: 1.2;
    display: flex;
    align-items: center;
}

.app-container {
    display: flex;
    flex-direction: row;
    min-height: calc(100vh - 2rem);

    & .left-pane {
        /* padding-top: 46px; */
        width: 304px;
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 4em);
        /* height: 611px; */
    }

    & .calendar-container {
        padding-top: 46px;
        width: 100%;
    }

    & .main-content {
        flex-grow: 1;
        border-radius: 16px;
        background-color: #F4FAFE;
        max-width: 852px;
        min-height: 725px;
        max-height: calc(100vh - 4em);
        margin-left: 60px;
        margin-bottom: 2em;
    }
}

@media (max-width: 900px) {
    .app-container {
        flex-direction: column;

        & .left-pane {
            width: 100%;
            flex-direction: column;
        }

        & .main-content {
            width: 100%;
            max-width: none;
            margin-left: 0;
            margin-top: 20px;
        }
    }
}
</style>
