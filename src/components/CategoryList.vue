<template>
    <div class="category-list-container">
        <h2>Categories</h2>
        <div class="categories">
            <li :class="!route.params.slug ? 'this-category' : ''">
                <RouterLink :to="{name: 'Home'}">已发布</RouterLink>
            </li>
            <li v-for="category in props.categories" :key="category.id" :class="isThisCategory(category.slug) ? 'this-category' : ''">
                <RouterLink :to="{name: 'Category',params: { slug: category.slug }}">{{ category.name }}</RouterLink>
            </li>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const isThisCategory = (categorySlug) => {
    return route.params.slug === categorySlug;
};
const props = defineProps({
    categories: {
        type: Array,
        default: () => [] // 默认值设为空数组，防止父组件异步数据没来时报错
    }
});

</script>

<style scoped>
.category-list-container {

    font-family: 'Inter';
    overflow-y: scroll;
    font-family: 'Inria Sans', sans-serif;

    & .categories {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    & h2 {
        text-align: left;
    }

    /* 修改 style 部分 */
    & li {
        list-style: none;
        position: relative;
        padding-left: 2em;
        border-bottom: #a6a6a6 1px solid;
        text-align: left;
        align-items: center;
        font-size: 20px;

        /* 默认状态的圆圈 */
        &::before {
            content: "";
            position: absolute;
            top: 28%;
            left: 0;
            width: 14px;
            height: 14px;
            border: 2px solid #888;
            border-radius: 50%;
            background: transparent;
            box-sizing: border-box;
            transition: background 0.3s; /* 加上过渡效果更丝滑 */
        }

        /* 当 li 拥有 this-category 类时的圆圈状态 */
        &.this-category::before {
            background: #888;
        }

        & a {
            text-decoration: none;
            color: #888;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>