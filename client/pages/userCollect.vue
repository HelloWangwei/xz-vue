<template>
    <div class="websarticle"  style="min-height: 190px;">
        <div class="articlelist" v-if="!collNone">
            <ul>
                <li class="artli" v-for="(article,index) in articles">
                    <div class="artback">
                        <div class="picture">
                            <div class="artimg">
                                <img :src="getImg(article.imageName)" @click="toCard(article.id)">
                            </div>
                        </div>
                        <div class="artinfo">
                            <a @click="toCard(article.id)" style="cursor:pointer" v-html="article.title"></a>
                            <div>
                                <a :href="article.url" target="_blank">{{article.url}}</a>
                            </div>
                            <p class="artdate">{{article.saveDate}}</p>

                        </div>
                        <div class="button2">
                            <button class="btn btn-default noteDetail" @click="toCard(article.id)">查看</button>
                            <button class="btn btn-default deleteNote" @click="delCollection(article.id)">删除</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"   v-if="!collNone"></paging>


        <div class="collNone" v-if="collNone">
            <section class="noneTitle" style="display: block;">
                <div class="pointmain">
                    <div class="pointtitle">
                        <img  src="../static/topicSiteNone/pointicon.png" alt="">
                    </div>
                    <div class="pointbody">
                        您还没有收藏过文章！
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import conf from './../Conf';
    import defaultImage from '../static/img/default.png'
    import paging from './../components/paging.vue';

    export default{
        data(){
            return {
                articles: [],
                collArray:[],//收藏的数组

                totalPage: 0,
                page: 1,
                collNone:false,
            }
        },
        props: [],
        methods: {

            getImg: function (imgName) {
                if (imgName.length > 0 || imgName == undefined) {
                    return conf.imgPath + imgName[0];
                } else {
                    return defaultImage;
                }
            },
            toCard: function (id) {
                window.open(conf.prePath+'/InfoCard/' + id, '_blank');
            },
            init:function(){
                this.commonChange();
            },
            commonChange:function () {
                this.$http.post(conf.bathPath + '/users/gerUserCollection',{userID:sessionStorage.userInfo,page:this.page}).then(function(res){
                    if(res.body.infoCollections.length){
                        this.articles = res.body.infoCollections;
                        this.totalPage =  Math.ceil(res.body.total / 20);
                        this.collArray = JSON.parse(localStorage.userCollectionIDs);
                    }
                    else{
                        this.collNone = true;
                    }

                },function(err){console.log(err)});
            },
            delCollection:function (id) {
                this.$http.post(conf.bathPath + '/info/cancelUserConnection',{userID:sessionStorage.userInfo,infoID:id}).then(function(res){
                    this.init();
                    for(let index of this.collArray.map((cID,i)=>[i,cID])){
                        if(index[1] == id){
                            this.collArray.splice(index[0],1);
                            break;
                        }
                    }
                    localStorage.userCollectionIDs=JSON.stringify(this.collArray);
                },function(err){console.log(err)});
            },
            pageChange: function (page) {
                this.page = page;
                this.commonChange();
            }

        },
        components: {
            paging: paging,
        },
        created:function(){
            this.init();
        },
        updated: function () {
            imageSize()
        }


    }
    function imageSize() {
        //图片高
        $('.artimg').height(parseFloat($('.artimg').css('width')) * 0.75);
    }
    window.addEventListener('load', function () {
        imageSize();
    })
    window.addEventListener('resize', function () {
        imageSize()
    })


</script>
<style scoped>


    .websarticle {
        width: 90%;
        margin:0 auto;
    }
    .articlelist ul {
        padding:0;
    }
    .articlelist ul li{
        background: #fff;
    }


    .artli {
        overflow: hidden;
        margin-bottom: 15px;
        border-bottom: 1px dashed #666;
    }

    .artback {
        padding-right: 90px;
        position: relative;
    }

    .picture, .artinfo {
        float: left;
    }

    .picture {
        width: 14%;
    }
    .artinfo {
        width: 86%;
        position: relative;
        padding: 10px;
    }

    .coll {
        position: absolute;
        top: 20px;
        right: 10px;
    }

    .artterms {
        color: #1a4f81;
        font-weight: 600;
        margin-right: 15px;
    }

    .artimg {
        width: 100%;
        padding: 10px;
        cursor: pointer;
    }

    .artimg img {
        height: 100%;
        max-width: 100%;
    }



    .artinfo a, .artdate {
        color: #999;
        width: 100%;
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .artinfo>a {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;
        color: #000;
    }

    .artinfo>a:hover{
        text-decoration: underline;
    }

    .catchdate {
        position: absolute;
        top: 60px;
        right: -80px;
    }
    .button2 {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100%;
    }
    .button2 button {
        margin-left: 10px;
        margin-top: 13px;
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
</style>