<template>
    <div class="friends-page-container">
        <div class="with-cooperator">
            <div class="cooperator-describe">
                <h1>Friends / 友達</h1>
                <p></p>
                <p></p>
            </div>
            <div class="cooperators">
                <div v-for="person in mainPeopleTest" :key="person.name" class="cooperator-item">
                    <div class="avatar"></div>
                    <div class="descripe">
                        <h2>{{ person.name }}</h2>
                        <p>{{ person.description }}</p>
                        <p>{{ person.location }}</p>
                        <p>{{ person.occupation }}</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="friend-links">
            <h2>
                Friend Links / 友情链接
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
            </h2>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const mainPeopleTest = [
    {
        name: 'Alice Margatroid',
        description: 'The inspiration of this site',
        location: 'House of Margatroid',
        occupation: 'Magician, Puppeteer, Expert of Tea'
    },
    {
        name: 'Kirisame Marisa',
        description: 'My Friend',
        location: 'Kirisame Magic Shop',
        occupation: 'Magician, Thief, Bookworm'
    }
];
const mainPeople = ref([
    {
        name: 'mloluyu',
        description: 'The administrator of this site',
        location: 'Bengbu, China',
        occupation: 'AVCEIT, Student'
    },
    {
        name: 'Garvey Zhu',
        description: 'HKU Master | Yonsei BBA',
        location: 'Hong Kong SAR, China',
        occupation: 'Master of Applied Economics, HKU'
    }
]);
</script>

<style scoped>
hr {
    width: 100%;
    border: none;
    border-top: 2px solid #cdcdcd;
    margin: 2em 0;
}

.friends-page-container {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 2rem);

    & .with-cooperator {
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin-top: 2em;

        /* border-bottom: #777 1px solid; */
        & .cooperator-describe {
            text-align: left;
            width: 50%;
        }

        & .cooperators {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 1em;

            & .cooperator-item {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 150px;
                border-radius: 16px;
                align-items: center;

                & .avatar {
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 1em;
                    background-color: transparent;
                    border: #A6A6A6 2px solid;
                    border-radius: 16px;
                    justify-content: center;
                }

                & .descripe {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    text-align: left;

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
    }

    & .friend-links {
        display: flex;
        flex-direction: column;
        gap: 2em;
        margin-top: 2em;
    }
}
</style>