<template>
    <div class="post-comments">
        <div class="post-author-inf">
            <input v-model="username" type="text" placeholder="昵称">
            <input v-model="userEmail" type="email" placeholder="E-mail">
            <input v-model="site" type="text" placeholder="网站（选填）">
        </div>
        <div class="post-body">
            <textarea v-model="content" placeholder="コメントの入力はこちら" rows="4"></textarea>
        </div>
        <div id="turnstile-container" class="turnstile-box"></div>
        <button @click="postComment" :disabled="isSubmitting">提交</button>
    </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted, onUnmounted } from 'vue'
import { useToast } from "vue-toastification";
import apiClient from '../../api';

const turnstileToken = ref('') // 存储生成的 Token
const widgetId = ref(null)    // 存储组件 ID 用于重置
const renderTurnstile = () => {
    // 检查节点是否存在，不存在就稍微等一下
    if (!document.querySelector('#turnstile-container')) {
        setTimeout(renderTurnstile, 50); 
        return;
    }

    if (window.turnstile) {
        // 先尝试清理可能存在的旧实例
        if (widgetId.value) window.turnstile.remove(widgetId.value);
        
        widgetId.value = window.turnstile.render('#turnstile-container', {
            sitekey: '0x4AAAAAACj6dbRgbGVdV0KB', 
            callback: (token) => {
                turnstileToken.value = token;
            },
            'error-callback': (error) => {
                console.error("Turnstile Error Code:", error);
                toast.error("验证码初始化失败，请检查网络或刷新");
            }
        });
    }
}

onMounted(() => {
    // 如果脚本还没加载，动态插入
    if (!document.getElementById('cf-turnstile-script')) {
        const script = document.createElement('script');
        script.id = 'cf-turnstile-script';
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.onload = renderTurnstile;
        document.head.appendChild(script);
    } else {
        renderTurnstile();
    }
});

// 组件卸载时清理，防止内存泄漏或重复渲染
onUnmounted(() => {
    if (widgetId.value && window.turnstile) {
        window.turnstile.remove(widgetId.value);
    }
});

const props = defineProps({
    postId: {
        type: Number,
        required: true
    },
    prepare: {
        type: String,
        required: false,
        default: ""
    },
    parentId: {
        type: Number,
        required: false,
        default: null
    }
});

const toast = useToast();

const username = ref('')
const userEmail = ref('')
const site = ref('')
const content = ref(props.prepare)

const isSubmitting = ref(false)
const postComment = () => {
    if (isSubmitting.value || !turnstileToken.value) return; // 没验证通过不能点
    isSubmitting.value = true;
    apiClient.post('/comments/', {
        post: props.postId,
        user_name: username.value,
        user_email: userEmail.value,
        content: content.value,
        parent: props.parentId,
        'cf-turnstile-response': turnstileToken.value
    }).then(res => {
        username.value = ''
        userEmail.value = ''
        site.value = ''
        content.value = ''
        toast.success(res.data.msg)
    }).catch(err => {
        const errorData = err.response ? err.response.data : null;
        if (errorData && errorData.msg) {
            // 如果后端传了你定义的那个 msg
            toast.error(errorData.msg)
        } else {
            // 其他未知错误
            toast.error("未知错误")
        }
    }).finally(() => {
        isSubmitting.value = false;
        if (widgetId.value && window.turnstile) {
            window.turnstile.reset(widgetId.value);
            turnstileToken.value = ''; // 重置本地存储的 token
        }
    })
}

watch(() => props.prepare, (newVal) => {
    content.value = newVal;
});
</script>

<style scoped>
input, textarea {
    border-style: none;
    font-family: 'LXGW Wenkai Screen', sans-serif;
    outline: none;
    box-shadow: none;
}

input {
    border-bottom: #dce4e9 2px dashed;
}

textarea {
    width: 100%;
    resize: vertical;
}

button {
    width: 60px;
    height: 30px;
    align-self: flex-end;
    margin-left: auto;
    border: none;
    border-radius: 16px;
    background-color: #dce4e9;
    color: gray
}
button:hover {
    background: transparent;
} 

.turnstile-box {
    margin: 1em 0;
    /* 如果你想让它在手机端居中 */
    display: flex;
    justify-content: flex-start;
}

.post-comments {
    width: 100%;
    padding-bottom: 0.5em;
    display: flex;
    flex-direction: column;
    & .post-author-inf {
        display: grid;
        flex-direction: row;
        grid-template-columns: repeat(3, 1fr);
        min-height: 40px;
        gap: 0.5em;
    }
    
    & .post-body {
        margin-top: 1em;
    }
}

@media (max-width: 900px) {
    .post-comments {
        & .post-author-inf {
            flex-direction: column;
            grid-template-columns: repeat(1, 1fr);
        }
    }
    .turnstile-box {
        transform: scale(0.85); /* 稍微缩小一点以防溢出 */
        transform-origin: left;
    }
}
</style>