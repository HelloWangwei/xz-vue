<template>
    <div>
        <section class="main_carousel">
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <div class="d3world">
                            <columnMap :data="d3Data" @columnChange="columnChange" style="width:20%;margin-left:5%;float:left;height:100%"></columnMap>
                            <worldMap :data="mapData" style="width:75%;float:left;height:100%"></worldMap>
                            <div id="worldTitle">全部</div>
                            <div id="worldTitle2">
                                <span class="country_name"></span>
                                <span class="size"></span>
                            </div>
                            <!--<div><img src="./../static/img/falsemap.png" stylt="width:100%"></div>-->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ------------------专题跟踪------------------ -->

        <section>

            <div class="container topic_follow" v-for="(topic,index) in topics">
                <div class="row">
                    <h2 class="topic_h2" @click="goTopic(topic.topic)">专题跟踪 [ {{topic.topicname}} 今日({{topic.count}})
                        一周内({{topic.weekcount}}) ]</h2>
                </div>
                <div v-if="topic.articles.length" class="row topic_5">
                    <div v-if="index>0" class="topic_3  col-md-6">
                        <div v-for="(article,index1) in topic.articles" v-if="index1<3">
                            <div class="img" @click="toCard(article.id)">
                                <img :src="getImg(article.imageName)" @click="toCard(article.id)">
                            </div>
                            <div class="text">
                                <h3 @click="toCard(article.id)"><span>{{article.title}}</span></h3>

                                <p>
                                    {{article.abstractcontent}}
                                </p>
                                <span>{{article.deploytime}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="index>0" class="topic_2 col-md-6">
                        <div v-for="(article,index1) in topic.articles" v-if="index1<5&&index1>2">
                            <div class="img" @click="toCard(article.id)">
                                <img :src="getImg(article.imageName)" @click="toCard(article.id)">
                            </div>
                            <div class="text">
                                <h3 @click="toCard(article.id)"><span>{{article.title}}</span></h3>
                                <p>
                                    {{article.abstractcontent}}
                                </p>
                                <span>{{article.deploytime}}</span>
                            </div>
                        </div>

                    </div>
                    <div v-if="index==0" class="topic_1 col-md-6">
                        <div v-for="(article,index1) in topic.articles" v-if="index1==0">
                            <div class="img" @click="toCard(article.id)">
                                <img :src="getImg(article.imageName)" @click="toCard(article.id)">
                            </div>
                            <h3 @click="toCard(article.id)"><span>{{article.title}}</span></h3>
                            <div class="describe">
                                <p>
                                    {{article.abstractcontent}}
                                </p>
                                <span>{{article.deploytime}}</span>
                            </div>
                        </div>

                    </div>

                    <div v-if="index==0" class="topic_4 col-md-6">

                        <div v-for="(article,index1) in topic.articles" v-if="index1<5&&index1>0">
                            <div class="img" @click="toCard(article.id)">
                                <img :src="getImg(article.imageName)" @click="toCard(article.id)">
                            </div>
                            <div class="text">
                                <h3 @click="toCard(article.id)"><span>{{article.title}}</span></h3>
                                <p>
                                    {{article.abstractcontent}}
                                </p>
                                <span>{{article.deploytime}}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="container topic_other">
                <div class="row" @click="goTopic(topic)">
                    <h2 class="topic_h2">专题跟踪 [ 其他 ]</h2>
                </div>
                <div class="row">
                    <span v-for="(moreTopic,index) in moreTopics" @click="goTopic(moreTopic)"><span
                            class="glyphicon glyphicon-th-list"></span><span>{{moreTopic.topic}}</span></span>
                </div>
            </div>

        </section>


        <section class="container data_block instance">
            <div class="row">
                <img src="./../static/img/home_background2.png" alt=""/>
                <img src="./../static/img/home_background3.png" alt=""/>

                <div class="text t1">

                    <div>
                        <h2>
                            <router-link to="RelationSearch">关系搜索
                                <small>点击进入</small>
                            </router-link>
                        </h2>
                        <p>相关实体搜索,关系挖掘,信息聚类.</p>
                    </div>
                </div>
                <div class="text t2">
                    <div>
                        <h2>
                            <router-link to="KnowledgeBase">知识库
                                <small>点击进入</small>
                            </router-link>
                        </h2>
                        <p>知识体系,族谱分析,卡片化,知识百科,内容搜索,获取海量知识</p>
                    </div>
                </div>
                <div style="height:100%;width:8px;position: absolute;top:0;left: 50%;background: #fff;"></div>
            </div>
        </section>

        <section class="container data_block expert">
            <div class="row">
                <div class="img">
                    <img src="./../static/img/home_background1.png" alt="">
                </div>
                <div class="text">
                    <h2 @click="goWebsiteFocus()">网站关注</h2>
                    <ul>
                        <li v-for="(site,index) in sites">
                            <a :title="site.name" @click="goWebsiteFocus(site.url)">{{site.name}}<span></span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    </div>


    <!----------------------------------------------------------------------------------------------------------------->
</template>

<script>
    import conf from './../Conf';
    import columnMap from './../components/columnMap.vue'
    import worldMap from './../components/worldMap'
    import defaultImage from '../static/img/default.png'

    export default{
        data(){
            return {
                sites: [],
                topics: [],
                moreTopics: [],
                d3Data: [],
                mapData: [],
                allMapData: [],
                topicdata:{},
            }
        },
        created: function () {

        },
        mounted:function(){
            let id = sessionStorage.userInfo;
            this.init(id);
        },
        methods: {
            init: function (id) {
                let self = this;
                this.$http.post(conf.bathPath + '/info/HomePageInit', {userid: id}).then((res) => {
                    self.sites = res.data.sites;
                    if(self.sites.length>25){self.sites=self.sites.slice(0,24)};
                    self.moreTopics = res.data.moreTopics;
                    self.topics = res.data.topics;

                    self.d3Data = res.data.d3Data;
                    self.mapData = res.data.mapData;
                    self.allMapData = res.data.mapData;
                }, (err) => {

                });
            }
            ,
            goWebsiteFocus: function (url) {
                this.$router.push({name: 'WebsiteFocus', params: {website: url}});
            },
            goTopic: function (topic) {
                this.$router.push({name: 'Subscription',params:{topic:topic}});
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
            columnChange: function (topic) {
                if (topic == 'all') {
                    this.mapData = this.allMapData;
                    return;
                }
                this.$http.post(conf.bathPath + '/info/columnChange', topic).then((res) => {
                    this.mapData = res.data.mapData;
                }, (err) => {

                });
            },
        },
        components: {
            columnMap: columnMap,
            worldMap: worldMap
        },
        updated:function(){
            $('.d3world').height($('.d3world').width()*0.333);
            imageSize()
        },
    }

    function imageSize() {
        //图片高
        $('.data_block>.row').height(parseFloat($('.data_block>.row').css('width')) * 0.2);
    }
    window.addEventListener('load', function () {
        imageSize();
    })

</script>

<style lang="css" scoped>
    .main_carousel .d3world {
        width: 100%;
        text-align: center;
    }
    .container {
        width: 100%;
        padding-left: 3.5%;
        padding-right: 3.5%;
        box-sizing: border-box;
    }

    .topic_follow:nth-child(even) {
        background: #f6f6f6;
    }

    .topic_follow:nth-child(even) .topic_3 {
        float: right;
    }

    .topic_h2 {
        cursor: pointer;

        padding-left: 15px;
        margin: 20px 0;
        font-weight: 600;
        font-size: 16px;
    }

    .topic_h2:hover {
        text-decoration: underline;
    }

    .topic_5 {
        font-size: 12px;
        margin-bottom: 20px;
        height: 420px;
        overflow: hidden;
    }

    .topic_follow:nth-child(1) .topic_5 {
        height: 505px;
    }

    img {
        width: 100%;
    }

    .topic_1 {
        cursor: pointer;
        position: relative;
        padding-right: 0;
        height: 505px;
    }

    .topic_1:hover {
        text-decoration: underline;
    }

    .topic_1 .img {
        height: 505px;
        overflow: hidden;
        cursor: pointer;
    }

    .topic_1 .img > img {
        width: 100%;
    }

    .topic_1 h3 {
        position: absolute;
        top: 0px;
        left: 15px;
        font-size: 16px;
        color: #fff;
        padding: 30px 15px 10px;
        background: rgba(70, 130, 160, 0.7);
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .describe {
        background: #333;
        font-size: 16px;
        line-height: 18px;
        color: #fff;
        position: absolute;
        bottom: 0px;
        padding: 5px 35px 40px;
    }

    .describe p {
        margin: 0 0 10px;
    }

    .describe > span {
        position: absolute;
        bottom: 15px;
        right: 40px;
        color: #eee;
    }

    .topic_4 {
        height: 505px;
    }

    .topic_4 > div {
        height: 100px;
    }

    .topic_4 > div:not(:last-child) {
        margin-bottom: 35px;
        margin-top: -20px;
    }

    .topic_4 > div > div.img {
        cursor: pointer;
        width: 150px;
        height: 100px;
        overflow: hidden;
    }

    .topic_4 > div:nth-child(odd) > div.img {
        float: left;
    }

    .topic_4 > div:nth-child(even) > div.img {
        float: right;
    }

    .topic_4 > div:nth-child(odd) > div.text {
        padding-left: 155px;
    }

    .topic_4 > div:nth-child(even) > div.text {
        padding-right: 155px;
    }

    .topic_4 > div > div > h3 {
        cursor: pointer;

        font-size: 16px;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .topic_4 > div > div > h3:hover {
        text-decoration: underline;
    }

    .topic_4 > div > div > span, .topic_4 > div > div > p {
        font-size: 14px;
        line-height: 15px;
        color: #999;
        margin: 0 0 10px;
    }


    .topic_2, .topic_3 {
        height: 420px;
        float: left;
    }

    .topic_2 > div > div.img > img, .topic_3 > div > div.img > img {
        width: 100%;
        cursor: pointer;
    }

    .topic_2 > div:first-child {
        margin-bottom: 20px;
    }

    .topic_2 > div {
        height: 200px;
    }

    .topic_2 > div > div.img {
        width: 280px;
        height: 200px;
        overflow: hidden;
        float: left;
    }

    .topic_2 > div > div.text {
        margin-left: 280px;
        padding-left: 10px;
        height: 200px;
    }

    .topic_5 > div .text > h3 {
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .topic_5 > div .text > h3 span {
        font-weight: 600;
    }

    .topic_5 > div .text > h3:hover {
        text-decoration: underline;

    }

    .topic_5 > div .text > span {
        font-size: 12px;
        color:#999;
    }



    .topic_5 > div .text > p {
        font-size: 14px;
        margin: 0 0 10px;
        color: #666;
    }

    .topic_3 > div:not(:last-child) {
        margin-bottom: 30px;
    }

    .topic_3 > div {
        height: 120px;
    }

    .topic_3 > div > .img {
        height: 120px;
        width: 180px;
        overflow: hidden;
        float: left;
    }

    .topic_3 > div > div.text {
        height: 120px;
        margin-left: 180px;
        padding-left: 10px;
    }
    .topic_follow p{
        cursor: text;
    }
    .data_block > .row {
        height: 260px;
        margin: 10px 0 0;
        position: relative;

        width: 100%;
        padding: 0;
    }

    .data_block > .row .img {
        width: 100%;
        height: 100%;
        text-align: center;
    }

    .data_block > .row img {
        width: 50%;
        height: 100%;
        float: left;
    }

    .data_block > .row > .text {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 20px;
        background: rgba(0, 0, 0, 0.5);
    }

    .data_block > .row > .text.t2 {
        width: 50%;
        left: 50%;
    }

    .data_block > .row > .text.t1 {
        width: 50%;
    }

    .data_block > .row > .text > div {
        position: absolute;
        top: 40%;
        left: 20%;
        text-align: left;
        transform: translate(0%, -50%);
        padding-right: 20px;
    }

    .data_block h2 {
        font-size: 30px;
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }

    .data_block p {
        margin: 0 0 10px;
    }

    .data_block h2 > a {
        color: #fff;
    }

    .data_block h2 > a:hover {
        text-decoration: underline;
    }

    .data_block h2 > a > small {
        text-decoration: none;
        color: #fafafa;
        font-size: 16px;
    }

    .expert > .row img {
        max-width: 100%;
        max-height: 100%;
        float: initial;
    }

    .expert > .row > .text {
        padding-top: 54px;
    }

    .expert > .row > .text h2 {
        margin: 0;
        padding: 12px 0 10px;
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 20px;
        font-size: 30px;
    }

    .expert > .row > .text ul {
        overflow: hidden;
        margin: 0;
        height: 100%;
        border-top: 1px solid #ccc;
        padding-top: 10px;
        padding-bottom: 30px;
    }

    .expert > .row > .text li {
        float: left;
        margin: 10px 0;
        margin-left: 35px;
        max-width: 220px;
    }

    .expert > .row > .text li a {
        color: #fff;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .expert > .row > .text li a:hover {
        text-decoration: underline;
    }

    .topic_other {
        cursor: pointer;
    }

    .topic_other > div:nth-child(2) {
        padding-left: 15px;
        font-size: 20px;
        color: #333;
    }

    .topic_other > div:nth-child(2) > span {
        margin-right: 20px;
    }

    .topic_other > div:nth-child(2) > span > span:nth-child(1) {
        margin-right: 10px;
        cursor: pointer;
    }

    .topic_other > div:nth-child(2) > span > span:nth-child(2):hover {
        text-decoration: underline;
    }
</style>