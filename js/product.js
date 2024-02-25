import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

  let productModal = null;
  let delProductModal = null;
  

  createApp({
    data(){
      return {
        url: "https://vue3-course-api.hexschool.io",
        apiPath: "vue3-lxokine-api",
        products: [],
        isNew: false,
        tempProduct: {
          imagesUrl: [],
        }
      }
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
          keyboard: false
        });
    
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
          keyboard: false
        });
    
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        console.log(token);

        this.check();
      },
    methods:{
        check(){
            axios.post(`${this.url}/v2/api/user/check`)
            .then(()=>{
              console.log(1);
                this.getProducts();
            })
            .catch((err) => {
                alert(err.data.message);
                window.location = 'index.html';
            });
        },
        getProducts(){
            axios.get(`${this.url}/v2/api/${this.apiPath}/admin/products`)
            .then((res)=>{
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.res.data.message);
            })
        },
        updateProduct() {
            let url = `${this.url}/v2/api/${this.apiPath}/admin/product`;
            let http = 'post';      
            if (!this.isNew) {
              url = `${this.url}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
              http = 'put'
            }      
            axios[http](url, { data: this.tempProduct }).then((res) => {
              alert(res.data.message);
              productModal.hide();
              this.getProducts();
            }).catch((err) => {
              alert(err.res.data.message);
            })
          },
          openModal(isNew, item) {
            if (isNew === 'new') {
              this.tempProduct = {
                imagesUrl: [],
              };
              this.isNew = true;
              productModal.show();
            } else if (isNew === 'edit') {
              this.tempProduct = { ...item };
              this.isNew = false;
              productModal.show();
            } else if (isNew === 'delete') {
              this.tempProduct = { ...item };
              delProductModal.show()
            }
          },
          delProduct() {
            const url = `${this.url}/v2/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;      
            axios.delete(url).then((res) => {
              alert(res.data.message);
              delProductModal.hide();
              this.getProducts();
            }).catch((err) => {
              alert(err.res.data.message);
            })
          },
          createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
          },
    }
  }).mount('#app');