<template>
    <div>
        <div class="notes" v-if="!noteNone">
            <settingArticle :infos="infos" @delete="deleteNote"></settingArticle>
        </div>
        <paging v-if="!noteNone"  :totalPage="totalPage" :page="page" @pageChange="pageChange"></paging>
        <div class="noteNone" v-if="noteNone">
            <section class="noneTitle" style="display: block;">
                <div class="pointmain">
                    <div class="pointtitle">
                        <img  src="../static/topicSiteNone/pointicon.png" alt="">
                    </div>
                    <div class="pointbody">
                        您还没填写过笔记！
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<style scoped>
    .notes{
        margin-left:100px;
    }
    .pointmain{
        width: 30%;
        margin: 76px auto;
        border: 1px solid #e9e9e9;
        border-radius: 15px;
        -moz-border-radius:15px; /* 老的 Firefox */
        box-shadow: 0px 2px 2px #ddd;
        -moz-box-shadow: 0px 3px 2px #666;
    }
    .pointtitle{
        height: 40px;
        background: #f0f0f0;
        margin-top: 21px;
    }
    .pointtitle img{
        height: 40px;
    }
    .pointbody{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        height: 170px;
        line-height: 170px;
    }
    .noteNone{
        width: 90%;
        margin: 0 auto;

    }
</style>
<script>
    import conf from './../Conf';
    import defaultImage from '../static/img/default.png'
    import paging from './../components/paging.vue';
    import settingArticle from './../components/settingArticle.vue';

    export default{
        data(){
            return{
                infos:[],
                page:1,
                totalPage:1,
                noteNone:false
            }
        },
        created:function(){

        },
        mounted:function(){
            this.init();
        },
        components:{
            paging:paging,
            settingArticle:settingArticle
        },
        methods:{
            init:function(){
                let body = {
                    userid:sessionStorage.userInfo,
                    page:this.page
                }
                this.$http.post(conf.bathPath + '/users/getNotes', body).then((res) => {

                    if(res.data.total>0){
                        this.infos = res.data.infos;
                        this.totalPage = Math.ceil(res.data.total / 20);
                    }else{
                        this.noteNone = true;
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            deleteNote:function(noteid){
                this.$http.post(conf.bathPath + '/users/deleteNote', {id:noteid}).then((res) => {
                    this.init();
                }, (err) => {
                    console.log(err);
                });
            },
            pageChange: function (page) {
                this.page = page;
                this.init();
            }
        }
    }
</script>
