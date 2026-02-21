<template>
    <div class="friends-page-container">
        <div class="with-cooperator">
            <div class="cooperator-item">
                <h2>mloluyu</h2>
                <p>The administrator of this site</p>
                <p>Bengbu, China</p>
                <p>AVCEIT, Student</p>
            </div>
            <div class="cooperator-item">
                <h2>Jawen Zhu</h2>
                <p>My friend</p>
                <p>Hong Kong</p>
                <p>Master of applied economics, University of Hong Kong</p>
            </div>
        </div>
        <hr>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 跳转
router.push('/404')
</script>

<style scoped>
.friends-page-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 2rem);

    & .with-cooperator {
        display: flex;
        flex-direction: row;
        gap: 4em;
        margin-top: 2em;
        justify-content: space-between;
        border-bottom: #777 1px solid;

        & .cooperator-item {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 150px;
            border-radius: 16px;

            & h2 {
                font-size: 24px;
                font-family: 'LXGW WenKai Screen', monospace;
                color: #555;
                margin: 0;
            }

            & p {
                font-size: 16px;
                color: #777;
                margin: 0;
            }
        }
    }
}
</style>