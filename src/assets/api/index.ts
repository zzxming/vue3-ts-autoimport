import originAxios from 'axios';

export const axios = originAxios.create({
	baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/',
});

// 请求拦截
axios.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// 响应拦截
axios.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		return Promise.reject(error);
	}
);
