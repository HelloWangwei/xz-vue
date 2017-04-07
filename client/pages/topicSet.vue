<template>

    <div>
        <section class="custom_block">
            <div class="cus_name">
                <div class="cus_name_input">
                    <label>自定义专题：</label>
                    <input id="custom_input" type="text" placeholder="  输入名称..." v-model.trim="custom_input">
                    <button class="btn btn-info btn-sm add_custom" @click="addCustomTopic">确定</button>
                </div>
            </div>
            <div class="none_cus" v-show="!customTopics.length">
                <p><span class="yellowicon"></span>&nbsp;您还没有定制专题，请先输入您定制的专题名称！</p>
                <div class="boundary">
                    <i></i>
                </div>
            </div>
            <div class="has_cus"  v-show="customTopics.length">


                <div class="list_ma">
                    <div class="list_pa">
                        <ul class="custom_tp">

                            <li v-for="(customtopic,index) in customTopics"
                                @click="changecustomtopic(customtopic,index)"
                                @mouseenter="topicMouseenter($event)"
                                @mouseleave="topicMouseleave">
                                <div class="btn ":class="[topicFocusIndex==index?'btn-info':'btn-default']">
                                    <span class="custom_name">{{customtopic.topic}}</span>
                                </div>
                                <span class="removeCusTp glyphicon glyphicon-remove-circle" @click="removethisTopic(index)"></span>
                            </li>

                        </ul>
                    </div>
                    <div class="boundary">
                        <i></i>
                    </div>
                </div>
                <div class="templates" v-show="topicFocus.id==''">
                    <ul class="template">
                        <li class="sub" :class="{hover:templateIndex==0}" @click="changetemplateIndex(0)">
                            <div>
                                <i></i>
                                <small>模版</small>
                                <span>已订阅专题</span>
                            </div>
                        </li>
                        <li class="sys"  :class="{hover:templateIndex==1}" @click="changetemplateIndex(1)">
                            <div>
                                <i></i>
                                <small>模版</small>
                                <span>系统推荐专题</span>
                            </div>
                        </li>
                        <li class="cus " :class="{hover:templateIndex==2}" @click="changetemplateIndex(2)">
                            <div>
                                <i></i>
                                <small>&nbsp;</small>
                                <span>自定义内容</span>
                            </div>
                        </li>
                    </ul>
                    <div class="topic_list_ma">
                        <div class="topic_list_pa1" v-show="templateIndex!=2">
                            <ul class="topics">
                                <li  v-for="(templateTopic,index) in templateTopics">
                                    <div class="btn "
                                         @click="changetemplateTopic(templateTopic,index)"
                                         :class="[templateIndex2==index?'btn-info':'btn-default']"><span class="custom_name">{{templateTopic.topic}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="boundary">
                            <i></i>

                        </div>
                    </div>
                </div>


            </div>

        </section>
        <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------------->
        <section class="topic_list"  v-show="customTopics.length">
            <div class="topic_title">
                <h4>网站
                        <router-link class="btn btn-default btn-xs" style="float:right;" to="userApply">申请添加备选网站 <span class="glyphicon glyphicon-plus"></span></router-link>
                </h4>
                <h4>专题数据来源需要收集的网站</h4>
            </div>
            <div style="padding-left: 35px">

                <div class="topic_list_ma">
                    <div class="topic_title">
                        <h4>核心关注网站</h4>
                    </div>
                    <div class="topic_list_pa ">
                        <ul class="core">
                            <li class="webname" v-for="(site,index) in topicFocus.cores"
                                @mouseenter="siteMouseenter($event,site)"
                                @mouseleave="siteMouseleave"
                                :url="site.url" level="core">
                                <span class="btn btn-info btn-xs  tp_name">{{site.name}}</span>
                                <span class="removewebs glyphicon glyphicon-remove-circle"
                                      @click="removethis(topicFocus.cores,index)"></span>
                            </li>
                        </ul>
                        <div class="btn btn-default btn-xs plus" @click="addwebsite('cores')">
                            <span class="glyphicon glyphicon-plus"></span></div>
                    </div>
                    <div class="boundary">
                        <i></i>
                    </div>
                </div>
                <div class="topic_list_ma">
                    <div class="topic_title">
                        <h4>重要关注网站</h4>
                    </div>
                    <div class="topic_list_pa ">
                        <ul class="important">
                            <li class="webname" v-for="(site,index) in topicFocus.importants"
                                @mouseenter="siteMouseenter($event,site)"
                                @mouseleave="siteMouseleave"
                                :url="site.url" level="important">
                                <span class="btn btn-info btn-xs  tp_name">{{site.name}}</span>
                                <span class="removewebs glyphicon glyphicon-remove-circle"
                                      @click="removethis(topicFocus.importants,index)"></span>
                            </li>
                        </ul>
                        <div class="btn btn-default btn-xs plus" @click="addwebsite('importants')">
                            <span class="glyphicon glyphicon-plus"></span>
                        </div>
                    </div>
                    <div class="boundary">
                        <i></i>
                    </div>
                </div>
                <div class="topic_list_ma">
                    <div class="topic_title">
                        <h4>普通关注网站</h4>
                    </div>
                    <div class="topic_list_pa ">
                        <ul class="generally">
                            <li class="webname" v-for="(site,index) in topicFocus.normals"
                                @mouseenter="siteMouseenter($event,site)"
                                @mouseleave="siteMouseleave"
                                :url="site.url" level="important">
                                <span class="btn btn-info btn-xs  tp_name">{{site.name}}</span>
                                <span class="removewebs glyphicon glyphicon-remove-circle"
                                      @click="removethis(topicFocus.normals,index)"></span>
                            </li>
                        </ul>
                        <div class="btn btn-default btn-xs plus" @click="addwebsite('normals')">
                            <span class="glyphicon glyphicon-plus"></span>
                        </div>
                    </div>
                    <div class="boundary">
                        <i></i>
                    </div>
                </div>
            </div>
            <div class="topic_list_ma" v-for="sixClass in viewArr">
                <div class="topic_title">
                    <h4>{{sixClass.name2}}</h4>
                </div>
                <div class="topic_list_pa">
                    <ul id="addedWord">
                        <li class="webname" v-for="(item,index) in topicFocus[sixClass.name1]"
                            @mouseenter="sixClassenter($event,item)"
                            @mouseleave="sixClassleave">
                            <span class="btn btn-info btn-xs  tp_name">{{item}}</span>
                            <span class="removewebs glyphicon glyphicon-remove-circle keywordsremove"
                                  @click="removekeyword(topicFocus[sixClass.name1],index)"></span>
                        </li>
                    </ul>
                    <ul style="margin-top:20px;">
                        <li class="keyli" v-show="keywordEditing[sixClass.name1]">
                            <input :placeholder="'添加一个'+sixClass.name2+'!'" style="border: 1px solid #46b8da" class=""
                                   v-model="keywordList[sixClass.name1]">
                            <span class="savekey glyphicon glyphicon-ok-circle" @click="keywordEditYes(sixClass.name1)"></span>
                            <span class="removekey glyphicon glyphicon-remove-circle" @click="keywordEditNo(sixClass.name1)"></span>
                        </li>

                    </ul>

                    <div class="addkeys btn btn-default btn-xs plus" @click="keywordEdit(sixClass.name1)">
                        <span class="glyphicon glyphicon-plus"></span>
                    </div>
                </div>
                <div class="boundary">
                    <i></i>
                </div>
            </div>
            <div class="topic_savebtn">
                <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false"
                        autocomplete="off" @click="saveUserChoose">
                    保存
                </button>
            </div>
        </section>

        <addwebsites :websites="websites" @websitesAdd="websitesAdd"></addwebsites>
        <div class="saveadd modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{modalTip}}</h4>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!------------------------------------------------------------------------------------->


</template>

<script>
    import layui from 'layui'
    import conf from './../Conf';
    import moment from 'moment';
    import addwebsites from '../components/addWebsites.vue';

    export default{
        data(){
            return {
                viewArr: [
                    {name1: 'program', name2: '项目'},
                    {name1: 'person', name2: '人员'},
                    {name1: 'organization', name2: '机构'},
                    {name1: 'tech', name2: '技术'},

                    {name1: 'location', name2: '地区'},
                    {name1: 'country', name2: '国家'},


                ],


                levelAdd: '',//哪个level将要添加网站
                websites: [],//可选择添加的网站
                websitesCache:[],
                layerIndex: '',//tips

                keywordEditing: {
                    program:false,
                    person:false,
                    organization:false,
                    tech:false,

                    location:false,
                    country:false,
                },
                keywordList: {
                    program:'',
                    person:'',
                    organization:'',
                    tech:'',

                    location:'',
                    country:'',
                },//手动添加的关键字

                topicFocus:{},//当前选中的专题
                defaultTopic:{
                    cores: [],
                    importants: [],
                    normals: [],

                    country: [],
                    location: [],
                    organization: [],
                    person: [],
                    program: [],
                    tech: [],
                },
                topicFocusIndex:0,//当前选中的专题
                customTopics:[],//定制的专题集合
                subscriberTopics:[],//已订阅的专题
                subscriberTopicsNo:[],//还没有订阅的系统专题

                templateTopics:[],//真正显示的模板数组
                templateIndex:2,//三种模板里选中了哪个
                templateIndex2:0,//模板里面选中的
                custom_input:'',//自定义专题名
                modalTip:"",
            }
        },
        created: function () {
            this.init();
        },
        watch: {
            websites: function () {
            },
        },
        methods: {
            init: function () {
                let body = {userID: sessionStorage.userInfo};
                this.$http.post(conf.bathPath + '/users/setting/getTopic', body).then((res) => {
                    this.websitesCache = res.body.websites;
                    this.subscriberTopics = res.body.subscribered;
                    this.subscriberTopicsNo = res.body.notSubscriber;
                    this.customTopics = res.body.topics;
                    this.topicFocus = this.customTopics[0]?this.customTopics[0]:this.defaultTopic;

                    this.websitesUpdate();//将备选网站筛选
                }, (err) => {

                });
            },

            //-------------------------------------------------------------------------------------------------------------------------------------
            topicMouseenter: function (e) {//自定义悬浮显示红叉和tips
                $(e.target).find('.removeCusTp').css("display", "inline-block");

            },
            topicMouseleave: function (e) {//自定义悬浮显示红叉和tips
                $(e.target).find('.removeCusTp').css("display", "none");

            },
            removethisTopic: function (index) {//击小红叉删除当前自定义点专题
                let self= this;
                let body = {
                    id:this.topicFocus.id,
                };
                this.$http.post(conf.bathPath + '/users/setting/deleteTopic', body).then((res) => {
                    self.customTopics.splice(index,1)
                    this.modalTip = '删除成功！' ;
                    $('.bs-example-modal-sm').modal();
                    this.topicFocus = this.customTopics[0]?this.customTopics[0]:this.defaultTopic;

                },(err) => {
                    this.modalTip = '删除失败！' ;
                    $('.bs-example-modal-sm').modal();
                });

            },
            changecustomtopic:function(customtopic,index){//切换选中专题
                this.topicFocus = customtopic;//当前选中的专题
                this.topicFocusIndex = index;//当前选中的专题
                this.websitesUpdate();
            },
            addCustomTopic:function(){//添加自定义专题
                let repeat = false;
                let self = this;
                this.customTopics.forEach(function (d,i) {
                    if(d.topic==self.custom_input){
                        repeat = true;
                    }
                });
                if(repeat){
                    this.modalTip = '自定义专题名重复！' ;
                    $('.bs-example-modal-sm').modal();
                    return;
                }
                if(this.custom_input.trim() == ''){
                    this.modalTip = '专题名不能为空！' ;
                    $('.bs-example-modal-sm').modal();
                    return;
                }
                this.customTopics.splice(0,0,{
                    country: [],
                    id: '',
                    location: [],
                    order: '1',
                    organization: [],
                    person: [],
                    program: [],
                    tech: [],
                    topic: this.custom_input,
                    cores:[],
                    importants:[],
                    normals:[],
                    userid: sessionStorage.userInfo,
                });
                this.custom_input='';
                this.topicFocus = this.customTopics[0]?this.customTopics[0]:this.defaultTopic;
                this.topicFocusIndex = 0;

            },
            changetemplateIndex:function(index){//切换模板类型
                this.templateIndex=index;
                let str = '';
                if(index==0){
                    this.templateTopics = this.subscriberTopics
                    str = 'subscriberTopics'
                }
                if(index==1){
                    this.templateTopics = this.subscriberTopicsNo
                    str = 'subscriberTopicsNo'
                }
                if((str!='')&&this[str].length){
                    this.topicFocusValue(this.topicFocus,this[str][0])
                }
                if((str=='')||!this[str].length){
                    this.topicFocusValue(this.topicFocus,false)
                }

            },
            changetemplateTopic:function(templateTopic,index){//切换模板中的专题
                this.templateIndex2=index
                this.topicFocusValue(this.topicFocus,templateTopic)
            },

            topicFocusValue:function(objTo,objForm){///将当前专题中的值改变

                if(objTo&&objForm){
                    objTo.cores = objForm.cores
                    objTo.importants = objForm.importants
                    objTo.normals = objForm.normals

                    objTo.country = objForm.country
                    objTo.location = objForm.location
                    objTo.organization = objForm.organization
                    objTo.person = objForm.person
                    objTo.program = objForm.program
                    objTo.tech = objForm.tech
                }
                if(objTo&&!objForm){
                    objTo.cores = []
                    objTo.importants =  []
                    objTo.normals = []

                    objTo.country = []
                    objTo.location = []
                    objTo.organization = []
                    objTo.person = []
                    objTo.program = []
                    objTo.tech = []
                }
                this.websitesUpdate();//将备选网站筛选
            },
            websitesUpdate:function(){
                this.websites = this.websitesCache.concat([]);//创建新数组
                let self = this;
                let arr = self.topicFocus.cores.concat(self.topicFocus.importants).concat(self.topicFocus.normals)
                for(let i=0;i<this.websites.length;i++){
                    for(let j=0;j<arr.length;j++){

                        if(arr[j].url==self.websites[i].url){

                            self.websites.splice(i,1)
                            arr.splice(j,1)
                            i--;
                            j--;
                            break;

                        }
                    }
                    if(arr.length==0){break;}

                }

            },
            //-------------------------------------------------------------------------------------------------------------------------------------

            addwebsite: function (levelAdd) {//点击加号准备添加网站
                this.levelAdd = levelAdd;
                $('#websitesModal').modal();
            },

            siteMouseenter: function (e, site) {//悬浮显示红叉和tips
                $(e.target).find('.removewebs').css("display", "inline-block");

                if (!(site.name && site.url)) {
                    return
                }
                let et = e.target;
                let content = '<p class="tipsinfo">' + site.name + '</p>' + '<p class="domaininfo">' + site.url + '</p>';
                this.layerIndex = layer.tips(content, et, {
                    tips: 3,
                    time:0,
                    maxWidth: 800
                });
            },
            siteMouseleave: function (e, site) {//悬浮显示红叉和tips
                $(e.target).find('.removewebs').css("display", "none");
                layer.close(this.layerIndex);
            },
            removethis: function (arr, index) {//点击小红叉删除当前网站
                this.websites.push(arr.splice(index, 1)[0]);//将删掉的数组放入websites
                layer.close(this.layerIndex);
            },

            sixClassenter: function (e, site) {//悬浮显示红叉和tips 六大类
                $(e.target).find('.removewebs').css("display", "inline-block");
            },
            sixClassleave: function (e, site) {//悬浮显示红叉和tips 六大类
                $(e.target).find('.removewebs').css("display", "none");
            },

            removekeyword: function (arr, index) {//点击小红叉删除当前 六大类
                arr.splice(index, 1);
            },

            websitesAdd: function (arr, arr1) {//模态框中点击确定添加时
                let self = this;
                for (let i = arr.length - 1; i > -1; i--) {
                    this.websites.splice(arr[i], 1)
                }
                arr1.forEach(function (d) {
                    let level = self.levelAdd;
                    if(level=='normals'){
                        level='generallys';
                    }
                    d.level = level.slice(0, -1);
                });
                self.topicFocus[self.levelAdd] = self.topicFocus[self.levelAdd].concat(arr1);

            },
            keywordEdit: function (str) {//编辑关键词
                this.keywordEditing[str] = true;
                this.keywordList[str] = '';
            },
            keywordEditNo: function (str) {//取消编辑关键词
                this.keywordEditing[str] = false;
            },
            keywordEditYes: function (str) {//确定编辑关键词
                let self = this;
                if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(this.keywordList[str])) {
                    this.modalTip = '不能含有中文！' ;
                    $('.bs-example-modal-sm').modal();
                    this.keywordList[str] = '';
                    return;
                }
                else {
                    if (this.keywordList[str] != "") {
                        self.topicFocus[str].push(this.keywordList[str])
                    }

                    self.topicFocus[str] = [...new Set(self.topicFocus[str])];
                }

                this.keywordEditing[str] = false;
            },
            saveUserChoose: function () {
                if(!(this.topicFocus.cores.length||this.topicFocus.importants.length||this.topicFocus.normals.length)){
                    this.modalTip = '网站来源不能都为空！' ;
                    $('.bs-example-modal-sm').modal();
                    return;
                }
                let body = {
                    userid: sessionStorage.userInfo,
                    id:this.topicFocus.id,
                    program:this.topicFocus.program,
                    location:this.topicFocus.location,
                    organizaion:this.topicFocus.organizaion,
                    person:this.topicFocus.person,
                    tech:this.topicFocus.tech,
                    country:this.topicFocus.country,
                    topic:this.topicFocus.topic,
                    cores:this.topicFocus.cores,
                    importants:this.topicFocus.importants,
                    normals:this.topicFocus.normals,
                };
                this.$http.post(conf.bathPath + '/users/setting/modifyTopic', body).then((res) => {
                    this.modalTip = '保存成功！' ;
                    $('.bs-example-modal-sm').modal();
                },(err) => {
                    this.modalTip = '保存失败！' ;
                    $('.bs-example-modal-sm').modal();
                });
            },


        },
        components: {
            addwebsites: addwebsites,
        },

    }


</script>

<style scoped>

    .topic_list,.custom_block{
        width:100%;
        margin:30px auto;
    }
    .custom_block{
        box-sizing: border-box;
        padding: 0 50px 0;
    }

    .btn-primary {
        margin-right: 30px;
    }
    .tipsinfo,.domaininfo{
        text-align:center;
        padding:0px;
        margin:0px;
    }


    .topic_list_pa ul .keyli{
        vertical-align: middle;
        padding:0px;
        border:none;
    }
    .savekey,.removekey{
        margin-left:15px;
        cursor:pointer;
    }
    .savekey{
        color:#31b0d5;
    }




    .keyli>input {
        border: 1px solid #46b8da;
        width: 400px;
        height: 30px;
    }


    .list_ma{margin: 0 auto;}
    .list_pa{
        width: 100%;
        margin-bottom: 20px;
        position: relative;
        padding-right: 60px;
        overflow: hidden;
    }
    .list_pa ul{
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .list_pa ul li{
        display: inline-block;
        margin-right: 20px;
        margin-top: 20px;
        font-weight: 400;
        position: relative;
    }

    .topic_title>h4:last-child{
        color:#999;
        padding-left:25px;

    }
    .topic_title>h4:first-child{
        color:#000;
        padding-left:10px;

    }
    .topic_list_ma2 .topic_title>h4{
        padding-left:35px;
    }
    .topic_list_pa{
        padding-left:35px;
    }
    .cus_name_input>input
    {
        border: 1px solid #46b8da;
        width: 200px;
        height: 30px;
        margin-right:20px;

    }
    .cus_name_input>.btn{
        vertical-align: baseline;
    }
    .cus_name :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
    }

    .cus_name ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
    }

    .cus_name input:-ms-input-placeholder,
    .cus_name textarea:-ms-input-placeholder {
        color: #999;
    }

    .cus_name input::-webkit-input-placeholder,
    .cus_name textarea::-webkit-input-placeholder {
        color: #999;
    }
    .cus_name_input{
        vertical-align: middle;
    }
    .cus_name{
        margin-bottom:20px;
    }
    .cus_name label{
        font-size:18px;
        font-weight: normal;
        color:#666;
    }
    .none_cus{
        font-size: 14px;
    }


    .none_cus p{
        border:1px dotted #999;
        display: inline-block;
        padding:5px;

    }

    .removeCusTp{
        padding:5px;
        display:none;
        color: #f30;
        position: absolute;
        top: -13px;
        right: -14px;
        cursor: pointer;
    }



    .topics_topic{
        margin: 0 20px 20px 0;
        display:inline-block;
    }


    .template>li{
        cursor:pointer;
        display:inline-block;
        height:30px;
        padding:0 10px;
    }
    .template>li i{
        width:29px;
        height:18px;
        display:inline-block;
        background:url('../static/topicset/1.png');
    }
    .template>li.sys i{
        background:url('../static/topicset/2.png');
    }
    .template>li.cus i{
        background:url('../static/topicset/3.png');
    }
    .template>li small{
        position: relative;
        top: -12px;
    }
    .template>li.hover>div{
        border-bottom: 1px solid #3879d9;
    }
    .template>li span{
        font-size: 15px;
    }
    .template>li.hover span{
        color:#3879d9;
    }

    .topic_list_pa1 .topics li{
        display: inline-block;
        margin-right:20px;
        margin-bottom:20px;
    }

    .yellowicon{
        background:url(../static/topicset/iconyellow.png);
        display:inline-block;
        width:16px;
        height:15px;
        vertical-align:baseline;
    }






    .inblock {
        display: inline-block;
    }

    h4, h5, h6 {
        margin-top: 10px;
        margin-bottom: 10px;
        color: #666;
    }

    .topic_list {
        width: 90%;
        min-height: 450px;
        margin: 30px auto;
    }

    .topic_list_ma {
        width: 100%;
    }

    .topic_list_pa {
        width: 100%;
        margin-bottom: 20px;
        position: relative;
        padding-right: 60px;
    }

    .topic_list_pa ul {
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .topic_list_pa li {
        margin-right: 10px;
        padding-right: 20px;
        margin-top: 20px;
        font-size: 14px;
        font-weight: 400;
    }

    .topic_list_pa li .tp_name {
        padding: 4px;
        display: inline-block;
        max-width: 360px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        color: white;
    }

    .keyli :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
    }

    .keyli ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
    }

    .keyli input:-ms-input-placeholder,
    .keyli textarea:-ms-input-placeholder {
        color: #999;
    }

    .keyli input::-webkit-input-placeholder,
    .keyli textarea::-webkit-input-placeholder {
        color: #999;
    }

    .topic_savebtn {
        width: 100%;
        text-align: center;
    }

    .topic_list_pa ul li {
        position: relative;
        display: inline-block;
    }

    .removewebs {
        color: #f30;
        position: absolute;
        top: -9px;
        right: 11px;
        cursor: pointer;
        display: none;
    }

    .lineterms a {
        margin-right: 10px;
    }

    .topic_list_pa ul .keyli {
        vertical-align: middle;
        padding: 0px;
        border: none;
    }

    .savekey, .removekey {
        margin-left: 15px;
        cursor: pointer;
    }

    .savekey {
        color: #31b0d5;
    }

    .boundary {
        position: relative;
        padding-right: 60px;
    }

    .boundary i {
        vertical-align: middle;
        display: inline-block;
        border-top: 1px dashed #666;
        width: 100%;
    }

    .boundary span {
        font-weight: normal;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }

    .boundary span b {
        display: inline-block;
        width: 15px;
        height: 8px;
    }

    .plus {
        font-size: 16px;
        color: #666;
        min-width: 60px;
        margin: 0;
        position: absolute;
        right: 0;
        bottom: 0
    }
    .saveadd .modal-dialog .modal-content .modal-header {
         border-bottom: none;
    }
    .topic_list_ma2 .topic_title>h4 {
        padding-left: 35px;
    }


    .bs-example-modal-sm  .modal-sm{
        margin-top:100px;
    }
    .bs-example-modal-sm .modal-header h4{
        padding:40px 20px 40px 40px;
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