<template>
    <h5>detail สินค้า 001</h5>
    <p ref="ptName"></p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const config = useRuntimeConfig()
useHead({
    title: `Detail สินค้า`,
    meta: [
        { name: 'description', content: 'รายละเอียดสินค้า' }
    ]
})

const ptName = ref(null)

onMounted(async () => {
    const data = {
        mysqlID: "db1",
        queryText: "SELECT hr_cid, hr_fname, hr_lname FROM hr_person LIMIT 5"
    }

    try {
        const response = await fetch('http://61.19.112.116:9000/api/data/person', {
            method: 'POST',
            headers: {
                'access-control-allow-origin': '*',
                'x-api-key': 'ctk0011251',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(response)
        const result = await response.json()
        if (ptName.value) {
            ptName.value.innerText = JSON.stringify(result)
        }
    } catch (error) {
        if (ptName.value) {
            ptName.value.innerText = 'เกิดข้อผิดพลาด: ' + error
        }
        console.log(error)
    }
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