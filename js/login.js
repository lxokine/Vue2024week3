import {createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://ec-course-api.hexschool.io';

createApp({
    data(){
        return {
            user:{
                username:'',
                password:'',
            },
        }
    },
    methods:{
        login(){
            axios.post(`${url}/v2/admin/signin`, this.user)
            .then((res)=>{
                const { token, expired } = res.data;
                // 寫入 cookie token
                document.cookie = `hexVueToken=${token}; expires=${new Date(expired)};`;
                //跳轉頁面
                window.location = 'product.html';
            })
            //例外處理
            .catch((err)=>{
                alert(err.response.data.message);
            });
        },
    },
}).mount('#app');