<template>
    <div>
        <button @click="login">登录</button>
    </div>
</template>

<script>
import axios from 'axios'
import aa from '../../utils/123'
import {setToken, getToken,getLocal } from '@/utils/auth' // get token from cookie
export default {
    name: 'login',
    data() {
        return {
            
        };
    },
    mounted() {
        // this.login()
    },
    methods: {
        login(){
            this.$store.dispatch('User/Login',"loginForm").then(async (response)=>{
                // console.log(response);
                let as= await this.$store.dispatch('User/GetRoutes')
                // console.log(as);
                setToken('12313115')
                this.$router.push({path:'/'})
            })
            //  mock( 'parameter/query', "get", function( options ){
            //     console.log(options);
            // } )
        }
    },
};
</script>

<style lang="scss" scoped>

</style>