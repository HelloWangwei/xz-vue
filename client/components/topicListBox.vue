<template>
    <section class="topic_lists">
        <div class="topic_list_ma">
            <div class="topic_list_pa">
                <ul class="topic_list">

                    <li class="topic" v-for="(topic,index) in topics">
                        <div class="btn btn-xs topic_name " :class="[topicIndex==index?'btn-info':'btn-default']" @click="topicSearch(index,topic) ">
                            <span class="tp_name" >{{topic.topic}}</span>
                            <span class="tp_update">({{topic.num}})</span>
                        </div>
                        <span class="follow slideDown" v-show="topicIndex==index" @click.stop="topicDown"></span>

                    </li>


                </ul>

                <div class="topic_body" style="">

                    <div class="topic_v1_websit" :class="{opened:tbOpend=='website'}">
                        <div class="topic_v1_name" title="website" @click="topicBodyOpen('website')">网站<span
                                class="glyphicon glyphicon-record"></span></div>
                        <div class="topic_v2">
                            <b>核心</b>
                            <ul>
                                <li :title="website.name" v-for="(website,index) in topicBody.website.cores"
                                    :class="{checked:checked.core[index]}" @click="bodyCheck('core',index,website)">
                                    <div><i></i>
                                        <span >{{website.name}}</span>
                                    </div>
                                </li>
                            </ul>

                        </div>
                        <div class="topic_v2">
                            <b>重要</b>
                            <ul>
                                <li  :title="website.name" v-for="(website,index) in topicBody.website.importants"
                                     :class="{checked:checked.important[index]}" @click="bodyCheck('important',index,website)">
                                    <div><i></i>
                                        <span>{{website.name}}</span>
                                    </div>
                                </li>

                            </ul>

                        </div>
                        <div class="topic_v2">
                            <b>普通</b>
                            <ul>
                                <li  :title="website.name" v-for="(website,index) in topicBody.website.normals"
                                     :class="{checked:checked.normal[index]}" @click="bodyCheck('normal',index,website)">
                                    <div><i></i>
                                        <span>{{website.name}}</span>
                                    </div>
                                </li>


                            </ul>
                        </div>
                    </div>
                    <div class="topic_v1" :class="{opened:tbOpend=='program'}">
                        <div class="topic_v1_name" title="program" @click="topicBodyOpen('program')">项目 <span
                                class="glyphicon glyphicon-record"></span></div>

                        <div class="topic_v2">
                            <b>已关注</b>
                            <span></span>
                            <ul>


                                <li :title="item.item" v-for="(item,index) in topicBody.program"
                                    :class="{checked:checked.program[index]}" @click="bodyCheck('program',index,item)">
                                    <div><i></i><span>{{item}}</span></div>
                                </li>


                            </ul>
                            <i></i>
                        </div>
                        <div class="topic_more">
                            <b>未关注</b>
                            <ul>
                            </ul>
                        </div>
                    </div>
                    <div class="topic_v1" :class="{opened:tbOpend=='person'}">
                        <div class="topic_v1_name" title="person" @click="topicBodyOpen('person')">人员 <span
                                class="glyphicon glyphicon-record"></span></div>

                        <div class="topic_v2">
                            <b>已关注</b>
                            <span></span>
                            <ul>

                                <li :title="item.item" v-for="(item,index) in topicBody.person"
                                    :class="{checked:checked.person[index]}" @click="bodyCheck('person',index,item)">
                                    <div><i></i><span>{{item}}</span></div>
                                </li>

                            </ul>
                            <i></i>
                        </div>
                        <div class="topic_more">
                            <b>未关注</b>
                            <ul>
                            </ul>
                        </div>
                    </div>
                    <div class="topic_v1" :class="{opened:tbOpend=='organization'}">
                        <div class="topic_v1_name" title="organization" @click="topicBodyOpen('organization')">机构 <span
                                class="glyphicon glyphicon-record"></span></div>

                        <div class="topic_v2">
                            <b>已关注</b>
                            <span></span>
                            <ul>
                                <li :title="item.item" v-for="(item,index) in topicBody.organization"
                                    :class="{checked:checked.organization[index]}" @click="bodyCheck('organization',index,item)">
                                    <div><i></i><span>{{item}}</span></div>
                                </li>

                            </ul>
                            <i></i>
                        </div>
                        <div class="topic_more">
                            <b>未关注</b>
                            <ul>
                            </ul>
                        </div>
                    </div>
                    <div class="topic_v1" :class="{opened:tbOpend=='tech'}">
                        <div class="topic_v1_name" title="tech" @click="topicBodyOpen('tech')">技术 <span
                                class="glyphicon glyphicon-record"></span></div>

                        <div class="topic_v2">
                            <b>已关注</b>
                            <span></span>
                            <ul>

                                <li title="item.item" v-for="(item,index) in topicBody.tech"
                                    :class="{checked:checked.tech[index]}" @click="bodyCheck('tech',index,item)">
                                    <div><i></i><span>{{item}}</span></div>
                                </li>


                            </ul>
                            <i></i>
                        </div>
                        <div class="topic_more">
                            <b>未关注</b>
                            <ul>
                            </ul>
                        </div>
                    </div>
                    <div class="topic_v1" :class="{opened:tbOpend=='location'}">
                        <div class="topic_v1_name" title="location" @click="topicBodyOpen('location')">地区 <span
                                class="glyphicon glyphicon-record"></span></div>

                        <div class="topic_v2">
                            <b>已关注</b>
                            <span></span>
                            <ul>

                                <li :title="item.item" v-for="(item,index) in topicBody.location"
                                    :class="{checked:checked.location[index]}" @click="bodyCheck('location',index,item)">
                                    <div><i></i><span>{{item}}</span></div>
                                </li>
                            </ul>
                            <i></i>
                        </div>
                        <div class="topic_more">
                            <b>未关注</b>
                            <ul>
                            </ul>
                        </div>
                    </div>
                    <div class="topic_v1" :class="{opened:tbOpend=='country'}">
                        <div class="topic_v1_name" title="country" @click="topicBodyOpen('country')">国家 <span
                                class="glyphicon glyphicon-record"></span></div>

                        <div class="topic_v2">
                            <b>已关注</b>
                            <span></span>
                            <ul>
                                <li :title="item.item" v-for="(item,index) in topicBody.country"
                                    :class="{checked:checked.country[index]}" @click="bodyCheck('country',index,item)">
                                    <div><i></i><span>{{item}}</span></div>
                                </li>

                            </ul>
                            <i></i>
                        </div>
                        <div class="topic_more">
                            <b>未关注</b>
                            <ul>
                            </ul>
                        </div>
                    </div>




                    <h5>
                        <button class="btn btn-info filter_reset" @click="resetTbody"> 重置</button>
                        <button class="btn btn-info filter_go" @click="searchbyfilter(1)"> 筛选</button>
                    </h5>
                </div>
            </div>
            <div class="boundary">
                <button class="btn-info btnAddspecial" @click="Addspecial"  v-if="subOrCus=='TopicCustom'">添加</button>
                <i></i>
                <p class="changeterms" v-if="subOrCus=='Subscription'">
                    <span class="btnchange " @click="showType('0')" :class="{btnchosed:lisTimeInfoChange=='0'}">信息</span>
                    <span class="btnchange"  @click="showType('1')" :class="{btnchosed:lisTimeInfoChange=='1'}">智库</span>
                    <span class="btnchange" @click="showType('2')" :class="{btnchosed:lisTimeInfoChange=='2'}">时间轴</span>
                </p>
                <span class="showall">全部 <b></b></span>
            </div>
        </div>
    </section>
</template>


<script>
    import conf from './../Conf';
    export default {
        data(){
            return{
                topicBody:{//topic的内容
                    website:{},
                    location:[],
                    person:[],
                    tech:[],
                    organization:[],
                    program:[],
                    country:[],
                },
                topicIndex:0,//记录被选中的topic
                tbOpend:'website',//记录被打开的topic
                checked:{
                    core:{},
                    important:{},
                    normal:{},
                    location:{},
                    person:{},
                    tech:{},
                    organization:{},
                    program:{},
                    country:{},
                },
                lisTimeInfoChange:'0',
            }
        },
        props:{
            topics:{
                type:Array,
                default:[],
            },
            subOrCus:{
                type:String,
                default:'Subscription',
            },
            index:{
                type:Number,
                default:0,
            }
        },
        watch:{
            topics:function(){
                if(this.subOrCus == 'Subscription'){
                    this.topicBodyUpdate(this.topics[this.index]);
                }else {
                    this.topicBodyUpdate(this.topics[0]);
                }
            },
            subOrCus:function () {
                console.log(this.subOrCus);
            },
            index:function () {
                this.topicIndex = this.index;
            }
        },
        methods:{
            searchbyfilter:function(){//点击筛选
                let checkedParams = {};
                for(let i in this.checked){
                    checkedParams[i]=[];
                    for(let j in this.checked[i]){
                        checkedParams[i].push(this.checked[i][j])


                    }
                }
                this.$emit('searchbyfilter',checkedParams)

            },
            topicSearch:function (index,topic) {//点击切换专题
                if(this.topicIndex == index){
                    return
                };
                this.topicIndex = index;

                this.topicBodyUpdate(topic);
                this.$emit('topicChange',topic)
            },
            topicBodyUpdate:function(topic){//更换body内容
                this.topicBody.website=topic.website;
                this.topicBody.location=topic.location;
                this.topicBody.person=topic.person;
                this.topicBody.tech=topic.tech;
                this.topicBody.organization=topic.organization;
                this.topicBody.program=topic.program;
                this.topicBody.country=topic.country;
                this.resetTbody();
            },
            topicDown:function(){//topicbody下拉
                $('.topic_body').slideDown(200);
                $(document.body).css({
                    "overflow-x":"hidden",
                    "overflow-y":"hidden"
                });
            },
            topicUp:function(s){//topicbody收起
                if(!s){
                    s=0;
                }
                this.tbOpend = 'website';
                $('.topic_body').slideUp(s);
                $(document.body).css({
                    "overflow-x":"auto",
                    "overflow-y":"auto"
                });
            },
            topicBodyOpen:function(str){//打开专题body六大类哪个
                this.tbOpend=str;
            },
            bodyCheck:function(key,index,website){//topicbody筛选的内容
                if(this.checked[key][index]){
                    this.$delete(this.checked[key],index);

                }else{
                    let val = 1;
                    if(website){
                        val = website
                    }
                    this.$set(this.checked[key],index,val);

                }
            },
            resetTbody:function(bool){//重置筛选的内容
                for(let i in this.checked){
                    for(let j in this.checked[i]){
                        this.$delete(this.checked[i],j)
                    }
                }
                if(bool){
                    this.searchbyfilter();
                }


            },

            showType: function(type){
                this.$emit('changeOperation',type);
                this.lisTimeInfoChange = type;
            },
            Addspecial:function () {
                window.open(conf.prePath+'/user/topicSet');
            }
        },

        mounted:function(){
            let self = this;

            $('body').on('click',function(e){//点击别处body收起
                if(e.target.className!='topic_body'&&!$(e.target).parents('.topic_body').length){
                    self.topicUp(200);
                };
            });

            $('.boundary .showall').on('click',function(){//虚线分割线相关
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
            function boundaryAll(){
                if($('.topic_list_pa ul').length){
                    if($('.topic_list_pa ul')[0].offsetHeight>96){
                        $('.boundary .showall').css('display','block')
                    }else{
                        $('.boundary .showall').css('display','none')
                    }
                }

            }

            boundaryAll();//虚线分割线相关
            window.addEventListener('resize',function(){
                boundaryAll();
            })
        },
    }



</script>

<style scoped>


    /*******娑撴捇顣介崚妤勩�****************/
    .topic_lists{
        padding-top: 20px;
        width:100%;
    }
    .topic_list_ma{
        width:100%;
    }
    .topic_list_pa{
        width:100%;
        padding-bottom:20px;
        position:relative;
        padding-right:75px;
        overflow:hidden;
        max-height:110px;
    }
    .topic_list_pa>ul{
        width:100%;
        margin:0;
        padding:0;
    }
    .topic_list_pa .topic{
        display: inline-block;
        margin-right:20px;
        margin-top:20px;
        font-weight:400;
        position: relative;
    }
    .topic_list_pa .topic>div{
        min-width:90px;
        font-size:16px;
    }

    .follow{
        width: 20px;
        height:20px;
        position: absolute;
        top:100%;
        left: 50%;
        transform: translate(-50%,0);
        -moz-transform:translate(-50%,0);
        -o-transform:translate(-50%,0);
        -webkit-transform: translate(-50%,0);
        z-index:50;
        cursor: pointer;
        display: none;

    }

    .follow.slideDown{
        display: block;
        background: url(../static/img/topicbodyslideDown.png) no-repeat 4px 3px;
    }

    div.topic_body{
        padding:0;
        border:2px solid #aaa;
        background:#eaeaea;
        color:#000;
        box-sizing: content-box;
        width:93%;
        top:90px;
        left:3.5%;
        position: fixed;
        z-index: 1350;
        display:none;
        font-style: normal;
        font-variant: normal;
        font-weight: normal;
        font-stretch: normal;
        font-size: 12px;
    }
    div.topic_body>h5{
        text-align: center;
        background:#fff;
        margin:0;
        padding:10px 0;
        margin-left:11%;
    }
    div.topic_body>h5>.btn{
        position:relative;
        left:-4%;
        margin-right:10px;
    }



    .topic_body>div{
        /*height: 40px;*/
        text-align: left;
    }

    .topic_v2,.topic_more{
        display:none;
        position:absolute;
        left:11%;
        top: 0px;
        padding-top:20px;
        width:43%;
        height:250px;
        overflow-y: auto;
        background:#fff;
    }

    .topic_v1_websit,.topic_v1{
        padding-left:3.5%;
    }

    .topic_v2>ul,.topic_more>ul{
        padding:0 20px;
        padding-top:5px;
    }

    .topic_v1_websit .topic_v2{
        width:28.5%;
    }

    .topic_v1_websit .topic_v2:nth-child(3){
        left:39.5%
    }
    .topic_v1_websit .topic_v2:nth-child(4){
        left:68%;
        width:32%;
        padding-right:3%;
    }

    .topic_v1>.topic_v2{
        /*border-right:1px solid #eee;*//*more鐨勭嚎*/

    }
    .topic_more{
        left:54%;
        width:46%;
        padding-right:3%;
    }

    .topic_v2>b,.topic_more>b{
        color:#6bacdf;
        font-weight: 100;
        margin-left:20px;
        margin-bottom:5px;

    }
    .topic_v2>b{

    }
    .topic_v2>i{   /*more鎸夐挳*/
        display:none;
        position: absolute;
        top:0px;
        right:0px;
        width:25px;
        height:25px;
        background: url(../static/img/more2_u786.png);
    }
    .topic_v2>i:hover{
        background: url(../static/img/more2_u786_mouseOver.png);
    }
    .topic_body>.morehover .topic_v2>i{
        background: url(../static/img/less2_u788.png);
    }
    .topic_body>.morehover .topic_v2>i:hover{
        background: url(../static/img/less2_u788_mouseOver.png);
    }
    .topic_v1>.topic_more>ul,
    .topic_v1>.topic_more>b{
        display:none;
    }
    .morehover .topic_more>ul,
    .morehover .topic_more>b
    {
        display: block;
    }


    .topic_v1_name{
        line-height: 35px;
        cursor: pointer;
        font-size:16px;
        color:#333;
        position: relative;
        width:100px;
        font-weight: 200;
    }
    .topic_v1_name>span{
        display:none;
        color:#0ad;
        font-size:14px;
        position: absolute;
        top:13px;
        left:65px;

    }
    .topic_body>.opened .topic_v1_name>span{
        display:block;
    }
    .topic_body>.opened .topic_v2,.topic_body>.opened .topic_more{
        display:block;
    }


    .topic_v2>ul>li,.topic_more>ul>li{
        color:#999;
        position:relative;
        float: left;
        _display: inline;
        width: 116px;
        height: 48px;
        padding: 0;
        border: 1px solid #DDD;
        margin: -1px -1px 0 0;
        background: #FFF;
        text-align: center;
        z-index:3000;
        list-style: none;
    }


    .topic_v2>ul>li:hover,.topic_more>ul>li:hover{

        position: relative;
        border-color: #6bacdf;
        box-shadow: 2px 2px 3px rgba(0,0,0,.12);
        z-index:3001;
    }
    .topic_v2>ul>li.checked,.topic_more>ul>li.checked,
    .topic_v2>ul>li:hover span,.topic_more>ul>li:hover span
    {	z-index:3001;
        border-color: #6bacdf;

    }
    .topic_v2>ul>li.checked:hover,.topic_more>ul>li.checked:hover{
        box-shadow: 4px 4px 8px rgba(0,0,0,.12);
    }
    .topic_v2>ul>li input,.topic_more>ul>li input{display:none;}
    .topic_v2>ul>li span,.topic_more>ul>li span{
        display: block;
        border: 1px solid #FFF;
        height: 46px;
        width: 114px;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        zoom: 1;
        color: #005aa0;
        line-height: 21px;
        cursor: pointer;
        padding:0 4px;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .topic_v2>ul>li i,.topic_more>ul>li i{
        width:12px;
        height:12px;
        background:url(../static/img/search.ele.png);
        border-color: #6bacdf;
        background-position: 0px -182px;
        position:absolute;
        right:-1px;
        bottom:-1px;
        display:none;
    }
    .topic_v2>ul>li.checked i,.topic_more>ul>li.checked i{
        display:block;
    }
    .search_a-z{
        position:absolute;
        top:5px;
        right:3%;
        display:none;
    }
    .search_a-z>li{
        float: left;
        height: 20px;
        line-height: 20px;
        border: 1px solid transparent;
        padding: 0 3px;
        cursor: pointer;
        text-align: center;
        color: #005aa0;

    }
    .search_a-z>li.hover{
        border-color:#005aa0;
    }

    .boundary{
        position:relative;
        padding-right:60px;
        text-align: right;
    }
    .boundary i{
        vertical-align: middle;
        display:inline-block;
        border-top:1px dashed #666;
        width:100%;
    }
    .boundary .changeterms{
        margin-top:-9px;
    }
    .boundary .changeterms .btnchange{
        display: inline-block;
        width: 90px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        margin-left: -4px;
        cursor: pointer;
    }
    .boundary .changeterms .btnchange:hover{
        background: #F0EFED;
    }
    .btnchosed{
        background: #F0EFED;
        border-top: 1px solid #fff;
        border-right: 1px dashed #666;
        border-bottom: 1px dashed #666;
        border-left: 1px dashed #666;
    }
    .boundary .showall{
        font-weight:normal;
        position:absolute;
        top:0;
        right:0;
        cursor:pointer;
    }
    .boundary .showall b{
        display:inline-block;
        width:15px;
        height:8px;
        background:url(../static/img/boundary_down.png);
    }
    .boundary span.all_up b{
        background:url(../static/img/boundary_up.png);
    }
    .btnAddspecial{
        height: 30px;
        padding: 6px 10px;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        list-style: none;
        font-weight: normal;
        border: 0;
        position: absolute;
        bottom: 20px;
        right: 9px;
    }

</style>
