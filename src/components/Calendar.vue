<template>
    <div class="calendar-component">
        <div class="solaryear">{{ year }}年</div>
        <div class="solarmonth">{{ month }}</div>
        <div class="solarday">{{ today }}</div>
        <div class="lunartime">{{ lunartime }}</div>
        <div class="today_fortune">
            <div class="today_fortune_title">
                今日<br>运势
            </div>
            <div class="fortune_depart"></div>
            <div v-if="fortuneValue == ''" class="fortune_praying">少女祈祷中...</div>
            <div v-else :class="['fortune_value', isFortune ? 'fortune' : 'unfortune']">{{ fortuneValue }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import lunisolar from "lunisolar";
import apiClient from "../api";
const dateForView = lunisolar(new Date(), { changeAgeTerm: null });
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];

const today = ref(dateForView.day);
const month = ref(months[dateForView.month - 1]);
const year = ref(dateForView.year);
const lunartime = ref(`${dateForView.format('cY')}年${lunarMonths[dateForView.lunar.month - 1]}${dateForView.lunar.getDayName()}`);

const fortunes = ['大 吉', '中 吉', '小 吉', '末 吉', '末 凶', '凶', '大 凶'];
const fortuneValue = ref('');
//ref(fortunes[Math.floor(Math.random() * fortunes.length)]);
const isFortune = ref(true);
onMounted(async () => {
    try {
        const res = await apiClient.get('/fortune/');
        const index = res.data.index;
        if (index < 4) {
            isFortune.value = true;
        } else {
            isFortune.value = false;
        }
        if (fortunes[index]) {
            fortuneValue.value = fortunes[index];
        }
    } catch (error) {
        fortuneValue.value = fortunes[Math.floor(Math.random() * fortunes.length)];
    }
});
</script>

<style scoped>
.calendar-component {
    box-sizing: border-box;
    border: 1px solid #000000;
    width: 304px;
    height: 301px;
    position: relative;

    & .solaryear {
        position: absolute;
        width: 304px;
        height: 43px;
        top: 12px;
        font-family: 'Songti SC', serif;
        font-size: 28px;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    & .solarmonth {
        position: absolute;
        width: 304px;
        height: 29px;
        top: 49px;
        font-family: 'Songti SC', serif;
        font-size: 24px;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    & .solarday {
        position: absolute;
        width: 304px;
        height: 73px;
        top: 78px;
        font-family: 'BiauKai TC', serif;
        font-size: 48px;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    & .lunartime {
        position: absolute;
        width: 304px;
        height: 40px;
        top: 160px;
        font-family: 'Songti SC', serif;
        font-size: 16px;
        color: #818181;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    & .today_fortune {
        position: absolute;
        width: 280px;
        height: 71px;
        top: 223px;
        left: 12px;
        display: flex;
        align-items: center;
        justify-self: center;
        border-top: 1px dashed #d5d5d5;

        & .today_fortune_title {
            width: 82px;
            height: 71px;
            font-size: 20px;
            line-height: 1.2;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            /* font-family: "Inria Sans", sans-serif; */
            font-family: "Songti SC", serif;
            color: #000;
        }

        & .fortune_depart {
            position: absolute;
            width: 1px;
            height: 57px;
            top: 7px;
            left: 82px;
            border-right: 1px dashed #d5d5d5;
        }

        & .fortune_value {
            width: 198px;
            height: 71px;
            font-size: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: "Inria Sans", sans-serif;
        }

        & .fortune_praying {
            width: 198px;
            height: 71px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: "LXGW WenKai Screen", sans-serif;
            color: #5f5f5f;
        }
    }
}

.fortune {
    color: #cb0404;
}
.unfortune {
    color: #024a11;
}
</style>