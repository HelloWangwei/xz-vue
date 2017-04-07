<template>
    <div style="width:95%;margin:0 auto">
        <section class="topic_lists">
            <div class="topic_list_ma">
                <div  class="topic_list_pa">
                    <ul class="topic_list">
                        <li v-for="topic in topics">
                            <div @click="topicChange(topic)" :class="[topic.id === topicSelectedID?topicSelected:topicNotSelected]">
                                <span class="tp_name" v-cloak>{{topic.topic}}</span>
                            </div>
                            <span :class="[topic.userFlag === 1?topicOnClick:topicNotClick]" @click="gouChange(topic)"></span>
                        </li>
                    </ul>
                </div>
                <div class="boundary">
                    <i></i>
                    <span class="showall">全部 <b></b></span>
                </div>
            </div>
        </section>
        <section class="topic_detail">
            <div class="site">
                <div>
                    <h4>网站</h4>
                    <div  class="detail">
                        <div class="siteCore">
                            <h5>核心来源网站</h5>
                            <div>
                                <ul>
                                    <li v-for="site in core(detail.website)" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(site,$event)" @mouseleave="tipsHide()">{{site.name}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="siteImp">
                            <h5>重要来源网站</h5>
                            <div>
                                <ul>
                                    <li v-for="site in important(detail.website)" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(site,$event)" @mouseleave="tipsHide()"
                                    >{{site.name}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="siteNor">
                            <h5>普通网站</h5>
                            <div>
                                <ul>
                                    <li v-for="site in normal(detail.website)" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(site,$event)" @mouseleave="tipsHide()">{{site.name}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="programs six_class">
                <div>
                    <h4>项目</h4>
                    <div class="detail">
                        <ul>
                            <li v-for="program in detail.program" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(program,$event)" @mouseleave="tipsHide()">{{program}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="persons six_class">
                <div>
                    <h4>人员</h4>
                    <div class="detail">
                        <ul>
                            <li v-for="person in detail.person" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(person,$event)" @mouseleave="tipsHide()">{{person}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="organizations six_class">
                <div>
                    <h4>机构</h4>
                    <div class="detail">
                        <ul>
                            <li v-for="organization in detail.organization" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(organization,$event)" @mouseleave="tipsHide()">{{organization}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="technology six_class">
                <div>
                    <h4>技术</h4>
                    <div class="detail">
                        <ul>
                            <li v-for="tech in detail.tech" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(tech,$event)" @mouseleave="tipsHide()">{{tech}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="location six_class">
                <div>
                    <h4>地区</h4>
                    <div class="detail">
                        <ul>
                            <li v-for="location in detail.location" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(location,$event)" @mouseleave="tipsHide()">{{location}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="countries six_class">
                <div>
                    <h4>国家</h4>
                    <div class="detail">
                        <ul>
                            <li v-for="country in detail.country" v-cloak class="btn btn-info btn-sm" @mouseenter="tipsShow(country,$event)" @mouseleave="tipsHide()">{{country}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import conf from '../Conf';

    export  default{
        data(){
            return{
                topicSelectedID:String,
                topics:[],

                topicNotSelected:"btn btn-default btn-xs",
                topicSelected:"btn btn-info btn-xs",
                //gou选择
                topicOnClick:"follow gou",
                topicNotClick:"follow",

                detail: [],
            }

        },
        watch:{

            topics:{
                handler:function(){


                },deep:true
            },
        },
        beforeCreate:function () {
            let body = {userID:sessionStorage.userInfo};
            this.$http.post(conf.bathPath+"/topic/getTopics",body).then((res) => {

                this.topics = res.data.topics;
                this.topicSelectedID = res.data.topics[0].id
                this.detail = res.data.topics[0];
            }, (err) => {
                console.log(err);
            })
        },
        methods:{
            topicChange:function (topic) {
                this.topicSelectedID = topic.id;
                        this.detail = topic;
            },
            gouChange:function (topic) {
                topic.userFlag == 1 ? topic.userFlag = 0 : topic.userFlag = 1;
                this.$http.post(conf.bathPath + "/topic/modifySubscriber", {topicID: topic.id, userFlag: topic.userFlag,userID:sessionStorage.userInfo})
                    .then((res) => {}, (err) => {console.log(err);})

            },

            core:function (items) {
                if(items != undefined){
                    return items.filter(function (item) {
                        return item.level == 'core';
                    })
                }
            },
            important:function (items) {
                if(items != undefined){
                    return items.filter(function (item) {
                        return item.level == 'important';
                    })
                }
            },
            normal:function (items) {
                if(items != undefined){
                    return items.filter(function (item) {
                        return item.level == 'normal';
                    })
                }
            },
            tipsShow: function (data,e) {//网站悬浮提示
                let et = e.target;
                let content = null;

                if(typeof(data)=='string'){
                    content = '<p class="tipsinfo">' + data+ '</p>';
                }else{
                    content = '<p class="tipsinfo">' + data.name+'</p><p>'+data.url+'</p>';
                }
                this.layerIndex = layer.tips(content, et, {
                    tips: 3,
                    time:0,
                    maxWidth: 800
                });
            },
            tipsHide: function () {//网站悬浮提示消失
                layer.close(this.layerIndex)

            }
        },
        mounted:function(){
            $('.boundary>span').on('click',function(){//虚线分割线相关
                if($('.topic_list_pa').height()>96){
                    $('.topic_list_pa').css('max-height','96px');
                    $(this).removeClass('all_up');
                }else{
                    let offsetHeight = '96px'
                    if($('.topic_list_pa ul').length){
                        offsetHeight=$('.topic_list_pa ul')[0].offsetHeight
                    }
                    $('.topic_list_pa').css('max-height',offsetHeight);
                    $(this).addClass('all_up');
                }

            });
            boundaryAll();//虚线分割线相关
            window.addEventListener('resize',function(){
                boundaryAll();
            });
            function boundaryAll(){
                if($('.topic_list_pa ul').length){
                    if($('.topic_list_pa ul')[0].offsetHeight>96){
                        $('.boundary .showall').css('display','block')
                    }else{
                        $('.boundary .showall').css('display','none')
                    }
                }

            }
        },
    }









</script>

<style scoped>
    /*******专题列表****************/
    .glyphicon-user{
        color:#4284f3;
    }
    section{
        width:90%;
        margin:0 auto;
    }
    .topic_list_ma{
        width:100%;
        margin:0 auto;
    }
    .topic_list_pa{
        width:100%;
        margin-bottom:20px;
        position:relative;
        padding-right:60px;
        overflow:hidden;
        max-height:96px;
    }
    .topic_list_pa ul{
        width:100%;
        margin:0;
        padding:0;
    }
    .topic_list_pa li{
        display: inline-block;
        margin-right:20px;
        margin-top:20px;
        font-weight:400;
        position: relative;
    }
    .topic_list_pa li>div{
        min-width:90px;
        font-size:16px;

    }
    .follow{
        width: 22px;
        height:22px;
        position: absolute;
        top:-11px;
        right: -11px;
        background: url(../static/img/gou.png) no-repeat 4px 4px;
        z-index:50;
        cursor: pointer;
    }

    .follow.gou{
        background: url(../static/img/gou2.png) no-repeat 4px 4px;
    }

    .boundary{
        position:relative;
        padding-right:60px;
    }
    .boundary i{
        vertical-align: middle;
        display:inline-block;
        border-top:1px dashed #666;
        width:100%;
    }
    .boundary span{
        font-weight:normal;
        position:absolute;
        top:0;
        right:0;
        cursor:pointer;
    }
    .boundary span b{
        display:inline-block;
        width:15px;
        height:8px;
        background:url(../static/img/boundary_down.png);
    }
    .boundary span.all_up b{
        background:url(../static/img/boundary_up.png);
    }
    .topic_detail{
        margin-bottom: 50px;
    }
    .detail{
        width:100%;
        margin:0 auto;
    }
    .detail h5{
        margin-top:20px;
    }

    .detail li{
        margin:20px 20px 0 0;
    }
</style>
<style>
    .layui-layer-tips .layui-layer-content {
        background-color:#fff !important;
        color:#333 !important;
        border:1px solid #e6e6e6 !important;
    }
    .layui-layer-tips i.layui-layer-TipsB, .layui-layer-tips i.layui-layer-TipsT {
        border-right-color: #fff !important;
    }
</style>