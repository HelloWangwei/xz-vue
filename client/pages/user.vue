<template>
    <div>
        <leftNavbar></leftNavbar>
        <div class="mainContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import leftNavbar from '../components/leftNavbar.vue';
    import conf from './../Conf';
    import _ from 'lodash';
    export default{
        data(){
            return {

            }
        },
        watch:{
        },
        created: function () {

        },
        methods:{

        },
        components: {
            leftNavbar: leftNavbar,
        },
        updated:function(){

        },
    }









</script>

<style scoped>
    .mainContent{
        width:100%;
        padding-left:150px;
    }
</style>