<template>
    <h5>detail สินค้า 001</h5>
    <p ref="ptName"></p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';
import { p } from '#build/ui/prose';

const config = useRuntimeConfig()
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
        queryText: 'SELECT * FROM hr_person LIMIT 1',
        
    };

    axios.post('http://61.19.112.116:9000/api/data/select', payload, {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ctk0011251' 
        }
    })
        .then((res) =>{
       // ptName.value.innerHTML = res.data.data[0].hos_guid +'<br>'+ res.data.data[0].fname +' '+ res.data.data[0].lname
          // console.log(res.data.data[0])
        }) 
        .catch(err => console.error(err.response?.data || err.message));
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    font-family: 'Kanit', sans-serif;
    text-shadow: 0cqmax(0 0 5px #000);
    font-size: 18px;
    align-items: center;
    justify-content: center;
}
</style>