<template>
    <div class="comments-area">
        <div class="comments-area-head">
            <p>{{ commentsCount }} 评论</p>
        </div>
        <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment">
                <div class="avatar">
                    <img :src="getAvatar(comment)"
                        style="width: 100%; height: 100%; object-fit:contain; border-radius: 50%;">
                </div>
                <div class="comment-body">
                    <p>
                        <span v-if="comment.user == null">{{ comment.user_name }}</span>
                        <span v-else>{{ comment.user.username }}</span>&nbsp;&nbsp;
                        <span class="comment-date">{{ formatDate(comment.created_time) }}</span>
                        <span class="comment-icon">
                            <CommentIcon @click="handleReplyClick(comment)"/>
                        </span>
                    </p>
                    <MathJaxRenderer :content="renderComment(comment.content)" />
                    <div v-if="activeCommentId === comment.id" class="reply-area">
                        <PostComments :post-id="props.postId" :parent-id="comment.id" />
                    </div>

                    <div v-for="reply in comment.replies" :key="reply.id" class="comment">
                        <div class="avatar">
                            <img :src="getAvatar(reply)"
                                style="width: 100%; height: 100%; object-fit:contain; border-radius: 50%;">
                        </div>
                        <div :class="['comment-body', 'reply-body']">
                            <p>
                                <span v-if="reply.user == null">{{ reply.user_name }}</span>
                                <span v-else>{{ reply.user.username }}</span>&nbsp;&nbsp;
                                <span class="comment-date">{{ formatDate(reply.created_time) }}</span>
                                <span class="comment-icon">
                                    <CommentIcon @click="handleReplyClick(reply, reply.parent==comment.id)"/>
                                </span>
                            </p>
                            <MathJaxRenderer :content="renderComment(reply.content)" />
                            <div v-if="activeCommentId === reply.id" class="reply-area">
                                <PostComments :post-id="props.postId" :prepare="replyContent" :parent-id="comment.id"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="next != null" class="show-more">
                <button @click="loadMoreComment">显示更多</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";
import apiClient from "../../api";
import { renderComment } from "../../util/markdownComment";
import MathJaxRenderer from "../MathJaxRenderer.vue";
import CommentIcon from "../icons/CommentIcon.vue";
import PostComments from "./PostComments.vue";
const replyContent = ref('')
const commentsCount = ref(0)
const activeCommentId = ref(null)
const next = ref()
const comments = ref([]);
const props = defineProps({
    postId: {
        type: Number,
        required: true
    }
});
const emit = defineEmits(['hidePostArea', 'appearPostArea'])

onMounted(() => {
    fetchComments()
})

const fetchComments = async (url = `/posts/${props.postId}/comments/`) => {
    const res = await apiClient.get(url);
    comments.value.push(...res.data.results);
    next.value = res.data.next;
    commentsCount.value = res.data.all_count;
};

const handleReplyClick = (comment, isReply = false) => {
    emit('hidePostArea')
    // 如果已经打开了同一个，就关闭它（收起效果）
    if (activeCommentId.value === comment.id) {
        activeCommentId.value = null;
        emit('appearPostArea')
        return;
    }
    
    activeCommentId.value = comment.id;
    
    // 如果是回复“回复者”，自动带上 @ 名字
    if (isReply) {
        console.log(isReply)
        const name = comment.user ? comment.user.username : comment.user_name;
        replyContent.value = `@${name} `;
    } else {
        replyContent.value = "";
    }
};

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function getAvatar(comment) {
    const hash = comment.user ? comment.user.email : comment.user_email;
    const defaultImgUrl = "https://your-blog.com/static/default-avatar.png";
    // 如果没有 hash（邮箱为空），Cravatar 官方建议用 '0' 或者直接空着
    const finalHash = hash || '';
    const encodedDefault = encodeURIComponent(defaultImgUrl);
    return `https://cravatar.cn/avatar/${finalHash}?s=100&d=${encodedDefault}`;
}

function loadMoreComment() {
    if (next.value) {
        fetchComments(next.value)
    }
}

onUnmounted(() => {
    emit('appearPostArea')
})
</script>

<style scoped>
p {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.avatar {
    width: 56px;
    height: 56px;
    border: #dce4e9 1px solid;
    border-radius: 50%;
    display: block;
    margin: 0.5em 0em;
}

.comment-body {
    width: calc(100% - 1em - 56px);
    border-bottom: #dce4e9 1px dashed;
}

.reply-body {
    border-bottom: none;
}

.reply-area {
    width: calc(100% + 1em + 56px);
    margin-left: calc(-1em - 56px);
}

.comment-date {
    color: #a6a6a6;
    font-family: 'Ubuntu Sans Mono' monospace;
}

.comment-icon {
    margin-left: auto;
    display: flex;
    align-items: center;

    & svg {
        color: #a6a6a6;
        transition: 0.3s ease
    }

    & svg:hover {
        color: black;
        transition: 0.3s ease
    }
}

.comments-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;

    & .comments-list {

        & .comment {
            display: flex;
            justify-content: space-between;

        }

        & .show-more {
            text-align: center;
            padding-top: 2em;

            & button {
                border: #a6a6a6 1px solid;
                border-radius: 16px;
                height: 40px;
                width: 80px;
                background: transparent;
                color: #a6a6a6;
                transition: 0.5s ease
            }

            & button:hover {
                border: #8dcd8a 1px solid;
                color: #8dcd8a;
                transition: 0.5s ease
            }
        }
    }
}

@media (max-width: 900px) {

}
</style>