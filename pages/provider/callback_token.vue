<template>
        <div>กำลังประมวลผลการรับโทเค็นการเข้าถึง 222...</div>
</template>

<script setup>
    const route = useRoute();
    import { tr } from '#build/ui/prose';
    import axios from 'axios';
    // import { useRoute } from 'vue-router';
    const client_id='0195360c-de27-7758-a20b-67ab4a3085df'
    const client_sec='b9e8684a5b8aad3d49e6387c0a8e8bc70c7ccee2'
    const client_id2='66f416cd-3945-4ff2-8ef8-ee7b8219d0d0'
    const client_sec2='F1vlLszBVL5gzYI5u6WjlAfrBN1G4Msx'
    useHead({
        title: `ProviderId Callback Token`,
        meta: [
            { name: 'description', content: 'รายละเอียด Provider Callback Token' }
        ]
    });
    
</script>