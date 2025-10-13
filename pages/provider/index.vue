<template>
    <div class="login-div">
        <div class="login-left"></div>
        <div class="login-right">
            <img src="/images/providerid.png" alt="logo" width="80%" height="150px"/>
            <button @click="CallProvider" class="button-provider">ลงชื่อเข้าใช้</button>
            <button @click="$router.push('/thaid')" class="button-td">
                <img src="/images/thaid.png" alt="logo" width="45px" height="45px"/>
                ลงชื่อเข้าใช้ด้วย THAID
            </button>
            <hr />
            <span class="login-or">หรือ</span>
            <span>หากคุณยังไม่มี Provider ID</span>
            <a href="https://provider.id.th/register" target="_blank" rel="noopener" class="button-id">ลงทะเบียน</a>
        </div>      
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    const route = useRoute();
    useHead({
        title: `ProviderId`,
        meta: [
            { name: 'description', content: 'รายละเอียด Provider' }
        ]
    });

    let health_link = "https://moph.id.th";
    let client_id = "0195360c-de27-7758-a20b-67ab4a3085df";
    let redirect_uri = `${window.location.origin}/provider/callback`;
    let response_type = "code";
    function CallProvider(){
        window.location.href = `${health_link}/oauth/redirect?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
    }
 

</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    font-family: 'Kanit', sans-serif;
    text-shadow: 0cqmax(0 0 5px #000);
    font-size: 18px;
    align-items: center;
    justify-content: center;
}   
.login-div{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: rgba(18, 134, 80, 1.0);
    backdrop-filter: blur(8px);
    z-index: 999;
}
.login-left{
    width: 60%;
    height: 80%;
    background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
    background-size: cover;
    background-position: center;
    border-radius: 35px;
    box-shadow: none 0 0 10px #000000;
}
.login-right{
    display: flex;
    background-color: aliceblue;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 35px;
    box-shadow: none 0 0 10px #000000;
    width: 450px;
    height: 80%;
}
.login-right hr{
    margin-top: 20px;
    width: 80%;
    height: 2px;
    background-color: rgb(222, 217, 217);
    color: black;
}
.login-or{
    display: flex;
    font-size: 22px;
    font-weight: bold;
    color: gray;
    margin-top: -54px;
    background-color: white;
    z-index: 999;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
}
.button-provider{
    width: 80%;
    height: 80px;
    border-radius: 35px;
    border: rgb(142, 205, 142) 3px solid;
    background-color: rgb(255, 255, 255);
    color: green;
    font-size: 24px;
    cursor: pointer;
    box-shadow: none 0 0 10px #000000;
    margin-top: 20px;
}
.button-id{
    display: inline-flex;
    width: 80%;
    height: 60px;
    border-radius: 35px;
    background-color: rgb(36, 127, 36);
    color: white;
    font-size: 22px;
    cursor: pointer;
    box-shadow: none 0 0 0 #ece8e8;
    margin-top: 10px;
    text-decoration: none;
}   
.button-td{
    width: 70%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 50px;
    border: rgb(204, 206, 204) 3px solid;
    background-color: rgb(255, 255, 255);
    color: black;
    font-size: 20px;    
    cursor: pointer;
    box-shadow: none 0 10px 10px #b7b6b6;
}

@media (max-width: 768px) {
    .login-left {
        display: none;
    }
    .login-right {
        width: 80vw;
        height: 80vh;
        border-radius: 0;
    }
}


</style>
