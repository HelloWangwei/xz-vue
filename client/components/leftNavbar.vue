<template>
    <nav class="nav_left">

        <router-link :to="{ name: 'profile' }" :class="{hoverBlue:hover=='profile'}"  >个人设置</router-link>

        <router-link :to="{ name: 'userApply' }" :class="{hoverBlue:hover=='userApply'}"  >申请</router-link>
        <router-link :to="{ name:'notes'}" :class="{hoverBlue:hover=='notes'}" >笔记</router-link>

        <router-link :to="{ name:'collect'}" :class="{hoverBlue:hover=='collect'}"  >收藏</router-link>
        <router-link :to="{ name:'topicSet'}" :class="{hoverBlue:hover=='topicSet'}"  >专题定制设置</router-link>
        <router-link :to="{ name:'TopicSubscription'}" :class="{hoverBlue:hover=='TopicSubscription'}"  >专题订阅设置</router-link>

        <router-link :to="{ name:'siteFocusSet'}" :class="{hoverBlue:hover=='siteFocusSet'}" >网站关注设置</router-link>


    </nav>
</template>

<script>
    import conf from './../Conf';
    import _ from 'lodash';
    export default{
        data(){
            return {
                hover:this.$route.matched[2].name,
            }
        },
        watch:{
            $route:function(){
                this.hover=this.$route.matched[2].name;
            },
        },
        created: function () {
        },
        methods:{

        },
        components: {

        },
        updated:function(){

        },
    }









</script>

<style scoped>
    .nav_left {
        min-width:0;
        width:150px;
        background:#e5e5e5;
        position: absolute;
        height:100%;
        top:0;
        left:0;
        padding-top:15px;
        transition: left 0.7s;
        -moz-transition: left 0.7s;	/* Firefox 4 */
        -webkit-transition: left 0.7s;	/* Safari 闂佸憡绮ｉ幏锟� Chrome */
        -o-transition: left 0.7s;	/* Opera */
    }


    .nav_left>a {
        text-align: center;
        display: block;
        width:100%;
        margin:3px auto;
        padding:8px 0;
        text-decoration:none;
        cursor: pointer;
        font-size: 17px;
        font-weight: 500;
        color:#333;
    }
    .nav_left>a:hover {
        color: #337ab7;
    }
    .nav_left>a.hoverBlue{
        color: #4284f3;
    }
</style>