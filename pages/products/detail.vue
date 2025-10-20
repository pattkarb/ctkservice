<template>
    <br/>
    <br/>
    <h5>detail สินค้า 001</h5>
    <p ref="ptName"></p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { p } from '#build/ui/prose';

const config = useRuntimeConfig()
let url = config.public.apiUrl;

useHead({
    title: `Detail สินค้า`,
    meta: [
        { name: 'description', content: 'รายละเอียดสินค้า' }
    ]
})

const ptName = ref(null)

onMounted(async () => {
    const payload = {
        mysqlID: 'hosoffice',
        queryText: 'SELECT * FROM hr_person LIMIT 2',
        
    };

    axios.post(`${url}/api/data/select`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ctk0011251' 
        }
    })
        .then((res) =>{
            ptName.value.innerText = res.data.data[0].HR_CID
           // console.log(res.data.data[0])
        }) 
        .catch(err => console.error(err.response?.data || err.message));
})
</script>

<style scoped>

</style>