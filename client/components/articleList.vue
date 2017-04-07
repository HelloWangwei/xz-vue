<template>
    <div class="websarticle" style="min-height: 328px;">
        <div class="articlelist">
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
                            <p class="artdate">{{article.deploytime}}</p>
                            <p class="catchdate">{{article.current_time.slice(0,10)}}</p>
                            <p>{{article.abstractcontent}}</p>
                            <!-- 六大类关键词 -->
                            <p class="artkey" v-if="article.program&&article.program.length>0">
                                <span class="artterms">program:</span>
                                <span class="keyterms" v-for="(program,index) in article.program">
                                    <a @click="keywordSearch('program',program)">{{program}}</a>
                                </span>
                            </p>
                            <p class="artkey" v-if="article.person&&article.person.length>0">
                                <span class="artterms">person:</span>
                                <span class="keyterms" v-for="(person,index) in article.person">
                                    <a @click="keywordSearch('person',person)">{{person}}</a>
                                </span>
                            </p>
                            <p class="artkey" v-if="article.organization&&article.organization.length>0">
                                <span class="artterms">organization:</span>
                                <span class="keyterms" v-for="(organization,index) in article.organization">
                                    <a @click="keywordSearch('organization',organization)">{{organization}}</a>
                                </span>
                            </p>
                            <p class="artkey" v-if="article.tech&&article.tech.length>0">
                                <span class="artterms">tech:</span>
                                <span class="keyterms" v-for="(tech,index) in article.tech">
                                    <a @click="keywordSearch('tech',tech)">{{tech}}</a>
                                </span>
                            </p>
                            <p class="artkey" v-if="article.location&&article.location.length>0">
                                <span class="artterms">location:</span>
                                <span class="keyterms" v-for="(location,index) in article.location">
                                    <a @click="keywordSearch('location',location)">{{location}}</a>
                                </span>
                            </p>
                            <p class="artkey" v-if="article.country&&article.country.length>0">
                                <span class="artterms">country:</span>
                                <span class="keyterms" v-for="(country,index) in article.country">
                                    <a @click="keywordSearch('country',country)">{{country}}</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import conf from './../Conf';
    import defaultImage from '../static/img/default.png'
    export default{
        data(){
            return {
                articles: [],

            }
        },
        props: ['res'],
        watch: {
            res: 'change'
        },
        methods: {
            change: function () {
                this.articles = this.res;
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

    .websarticle {
        width: 100%;
    }

    .articlelist {
        margin-top: 20px;
    }
    .articlelist ul {
       padding:0;
    }
    .articlelist ul li{
        background: #fafafa;
    }
    .articlelist ul li:nth-child(2n+1) {
        background: #f6f6f6;
    }

    .artli {
        overflow: hidden;
        margin-bottom: 15px;
    }

    .artback {
        padding-right: 90px;
        position: relative;
    }

    .picture, .artinfo {
        float: left;
    }

    .picture {
        width: 18%;
    }

    .artinfo {
        width: 82%;
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

    .artinfo>div>a {

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
    }

    .artinfo>a:hover{
        text-decoration: underline;
    }

    .catchdate {
        position: absolute;
        top: 60px;
        right: -80px;
    }
    .keyterms {
        color: #749ec5;
        margin-right: 15px;
    }

</style>