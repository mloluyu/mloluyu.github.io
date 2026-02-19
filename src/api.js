import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.mloluyu.uno/api/', // 替换为你的后端 API 地址
    timeout: 5000, // 请求超时时间
});

export default apiClient