<template>
        <div class="articlelist">
            <ul>
                <li class="artli" v-for="(article,index) in articles">
                    <div class="artback">
                        <div class="picture">
                            <div class="artimg">
                                <img :src="getImg(article.articimage)" @click="toCard(article.articid)">
                            </div>
                        </div>
                        <div class="artinfo">
                            <a @click="toCard(article.articid)" style="cursor:pointer" v-html="article.artictitle"></a>
                            <div>
                                <a :href="article.articurl" target="_blank">{{article.articurl}}</a>
                            </div>
                            <p class="artdate">{{article.notes[0].createtime}}</p>

                        </div>
                        <div class="button2">
                            <button class="btn btn-default noteDetail" @click="toNote(article.id)">查看</button>
                            <button class="btn btn-default deleteNote" @click="delNote(article.id)">删除</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
</template>

<script>
    import conf from './../Conf';
    import defaultImage from '../static/img/default.png'
    export default{
        data(){
            return{
                articles: []
            }
        },
        props:['infos'],
        watch:{
            infos:'change'
        },
        methods: {
            change: function () {
                this.articles = this.infos;
            },
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
            //笔记页面
            toNote:function(id){
                this.$router.push(location = conf.prePath+'/user/noteDetail/' + id);
            },
            delNote:function(noteid){
                this.$emit('delete',noteid);
            },
            keywordSearch: function (type, keyword) {
                window.open(conf.prePath+'/KeywordList/' + type + '/' + keyword, '_blank');
            }
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
</style>