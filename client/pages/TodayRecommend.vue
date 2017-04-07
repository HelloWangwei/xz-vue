<template>
    <div class="rectop">
        <div class="row">
            <div class="col-sm-3 newslist" v-for="imgInfo in imgInfos">
                <div class="newsimg">
                    <a>
                        <img :src="imgDeal(imgInfo.imageName)" @click="toCard(imgInfo.id)">
                    </a>
                    <p class="mewstitle" v-cloak @click="toCard(imgInfo.id)">{{imgInfo.title}}</p>
                </div>
            </div>
        </div>
        <div class="row articleterms">
            <div class="col-xs-12 col-md-8">
                <div class="articlelist" v-for="normalInfo in normalInfos">
                    <h4>
                        <a @click="toCard(normalInfo.id)" v-cloak>{{normalInfo.title}}</a>
                    </h4>
                    <div class="col-sm-2 listimg">
                        <img :src="imgDeal(normalInfo.imageName)" @click="toCard(normalInfo.id)">
                    </div>
                    <div class="col-sm-10 listinfo">
                        <p class="infop">
                            <span v-cloak>{{normalInfo.abstractcontent}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-xs-6 col-md-4 rectopdate">
                <h2 v-cloak>{{today}}</h2>
                <ul class="rectoplist">
                    <li class="rectopli" v-for="textInfo in textInfos">
                        <div>
                            <a @click="toCard(textInfo.id)" v-cloak>{{textInfo.title}}</a>
                        </div>
                        <div class="literms">
                            <a target="_blank" :href="textInfo.url">{{textInfo.url}}</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import conf from './../Conf';
    import defaultImage from '../static/img/default.png';
    export default{
        data(){
            return {
                imgInfos: [],
                normalInfos: [],
                textInfos: [],
                today: ''
            }
        },
        created: function () {
            this.$http.post(conf.bathPath + '/info/recommend',{}).then((res) => {
                this.imgInfos = res.data.imgInfos;
                this.normalInfos = res.data.normalInfos;
                this.textInfos = res.data.textInfos;
                this.today = res.data.today;
            }, (err) => {
                console.log(err);
            });
        },
        methods: {
            imgDeal: function (item) {
                if (item.length > 0) {
                    return conf.imgPath + item[0];
                } else {
                    return defaultImage;
                }
            },
            toCard: function (id) {
                window.open(conf.prePath+'/InfoCard/' + id, '_blank');
            }
        }

    }
</script>
<style scoped>
    .rectop {
        padding-top: 20px;
        width: 90%;
        margin: 0 auto;
    }

    .newslist {
        padding-left: 15px;
        padding-right: 15px;
    }

    .newsimg {
        height: 250px;
        width: 100%;
        position: relative;
    }

    .newsimg img {
        width: 100%;
        height: 100%;
    }

    .mewstitle {
        width: 100%;
        display: -webkit-box;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        -webkit-box-orient: vertical;
        text-align: center;
        height: 50px;
        padding-top: 5px;
        color: #fff;
        font-weight: 300;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        bottom: 0;
    }

    .articleterms {
        margin-top: 20px;
    }

    .articlelist {
        margin-top: 10px;
        margin-bottom: 10px;
        overflow: hidden;
    }

    .articlelist h4 {
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .articlelist h4 a {
        color: #000;
        font-weight: inherit;
    }

    .listimg {
        padding: 0px;
    }

    .listimg img {
        width: 100%;
    }

    .rectopdate h2 {
        text-align: center;
        border: 1px solid #ddd;
        margin-bottom: 0px;
        padding: 10px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .rectoplist {
        border: 1px solid #ddd;
        border-top: none;
        margin-top: -3px;
        padding-top: 10px;
        padding-left: 40px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .rectoplist li {
        list-style-type: disc;
        color: #38f;
        margin: 3px 0px;
    }

    .rectoplist li a {
        color: #333;
    }

    .rectoplist .literms a {
        color: #999;
        font-size: 12px;
        word-break: break-all;
    }

    .rectoplist li a {
        color: #333;
    }
</style>

