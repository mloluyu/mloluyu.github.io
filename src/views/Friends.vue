<template>
    <div class="friends-page-container">
        <div class="with-cooperator">
            <div class="cooperator-describe">
                <h1>Friends / 友達</h1>
                <p>Dear My Friend</p>
                <p></p>
            </div>
            <div class="cooperators">
                <div v-for="person in mainPeople" :key="person.name" class="cooperator-item">
                    <div class="avatar">
                        <img :src="person.avatar" style="width: 100%; height: 100%; object-fit:contain; border-radius: 14px;">
                    </div>
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
            <div class="friend-links-des">
                <h2>
                    Friend Links / 友情链接
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                </h2>
                <p v-if="showList">Click the avatar to visit sites belong to my friends. </p>
                <p v-else>Watting zzz...</p>
            </div>
            <Transition :name="fade-up">
                <div v-if="showList" class="friend-link-list">
                    <div v-for="friendLink in friendLinks" :key="friendLink.id" class="friend-link-item">
                        <div class="avatar">
                            <a :href="friendLink.url" target="_blank" rel="noopener noreferrer">
                                <img :src="friendLink.avatar" style="width: 100%; height: 100%; object-fit:contain; border-radius: 14px;">
                            </a>
                        </div>
                        <div class="descripe" :class="['top']">
                            <h2>{{ friendLink.name }}</h2>
                            <p>{{ friendLink.description }}</p>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "../api";
const showList = ref(false);
const mainPeople = ref([
    {
        name: 'mloluyu',
        description: 'The administrator of this site',
        location: 'Bengbu, China',
        occupation: 'AVCEIT, Student',
        avatar: 'https://avatars.githubusercontent.com/u/45489523?v=4'
    },
    {
        name: 'Garvey Zhu',
        description: 'HKU Master | Yonsei BBA',
        location: 'Hong Kong SAR, China',
        occupation: 'Master of Applied Economics, HKU',
        avatar: 'https://test.fukit.cn/autoupload/fr/v_7EA5-gGVU4PmgdHJ0Q-fxFopudiA594VTK21R4cCGyl5f0KlZfm6UsKj-HyTuv/20260223/Gd3k/1024X1024/avatar_zhu.png/webp'
    }
]);

const friendLinks = ref([]);
apiClient.get('/friend-links/').then(response => {
    friendLinks.value = response.data;
    if (friendLinks.value.length > 0) {
        showList.value = true;
    }
}).catch(error => {
    console.error('Error fetching friend links:', error);
});

</script>

<style scoped>
hr {
    width: 100%;
    border: none;
    border-top: 2px solid #cdcdcd;
    margin: 2em 0;
}

.avatar {
    display: block;
    width: 100px;
    height: 100px;
    margin: 1em;
    background-color: transparent;
    border: #A6A6A6 2px solid;
    border-radius: 16px;
    justify-content: center;
}

.descripe {
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
    width: 70%;

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

            & p {
                width: 50%;
            }
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

            }
        }
    }

    & .friend-links {
        display: flex;
        flex-direction: row;
        gap: 1em;
        margin-top: 0em;

        & .friend-links-des {
            text-align: left;
            width: 50%;

            & p {
                width: 80%;
            }
        }

        & .friend-link-list {
            display: flex;
            flex-direction: column;
            width: 50%;
            gap: 1em;

            & .friend-link-item {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 150px;
                border-bottom: #e3e3e3 2px solid;
            }
        }
    }
}

.top {
    margin-top: 0.6em;
}

@media (max-width: 900px) {
    .friends-page-container {
        & .with-cooperator {
            & .cooperators {
                grid-template-columns: 1fr;
            }
        }

        & .friend-links {
            flex-direction: column;

            & .friend-link-list {
                width: 100%;
            }
        }
    }
}

.fade-up-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>