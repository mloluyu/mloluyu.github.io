<script setup>
    import { ref } from "vue";
    import Calendar from "../components/Calendar.vue";
    import ArticleList from "../components/ArticleList.vue";
    import Footer from "../components/Footer.vue";
    import apiClient from "../api";

    // apiClient.get('/posts/').then(res => {
    //     console.log('Posts:', res.data);
    // }).catch(error => {
    //     console.error('Error fetching posts:', error);
    // });
</script>

<template>
    <div class="app-container">
        <aside class="left-pane">
            <div class="title">Grimorie of<br>Magartorid</div>
            <div class="calendar-container">
                <Calendar />
            </div>
        </aside>
        <main class="main-content">
            <ArticleList />
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
