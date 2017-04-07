<template>
    <div class="topicSubscriber">
        <div class="topic_operate" v-if="subOrCus=='Subscription'" v-show="!topicsNone">
            <div class="operatetrem">
                <div class="threetips" v-if="operateShow">
                    <button class="btn-info btnDatapic">数据图</button>
                    <button class="btn-info btnAddTopic" @click="addSubscription">添加</button>
                    <button class="btn-info btnExport" @click="exportSubscription">导出</button>
                </div>
                <div class="operateicon">
                    <div class="clickThree" @click="showTips"></div>
                    <div class="clickmin" @click="showTree" :openTree="openTree"></div>
                </div>
            </div>
        </div>
        <div class="shiptree" v-if="treeshow">
            <treeTab @closeshiptree="closeshiptree"
                     :mintabsright="mintabright"
                     @showTab2="showTab2"
                     :mintabs2="minTabs2"
                     @showTab3="showTab3"
                     :mintabs3="minTabs3"
                     :minlast="minlast"
                     @showTab4="showTab4"
                     :mintabs4="minTabs4"
                     @showTab5="showTab5"
                     :mintabs5="minTabs5"
                     @serchTopicByid="serchTopicByid"
            ></treeTab>
        </div>

        <topicListBox @topicChange="topicChange" :topics="topics" :index="topicIndex" @searchbyfilter="searchbyTopicFilter" v-if="!topicsNone" :subOrCus="subOrCus"  @changeOperation="changeOperation" ></topicListBox>

        <timeline  v-if="subOrCus=='Subscription'" :topic="topic"  v-show="lisTimeInfoChange=='2'"></timeline>
        <div  v-if="subOrCus=='Subscription'" class="librarypositon" v-show="lisTimeInfoChange=='1'">
            <knowledgeStore :entities="entities" @getKnowledges="getKnowledges"
                            :knowledges="knowledges"
                            :topic="topic.topic"
                            @searchOneProducer="searchOneProducer"
                            @searchTwoProducer="searchTwoProducer"></knowledgeStore>
        </div>
        <siteSort @rangeKeywordSearch="searchByRange"
                  @coreChange="coreChange"
                  @changeTimeSort="changeTimeSort"
                  @exportInfo="exportInfo"
                  :flag="flag"
                  :fuzzySearch="true"
                  :siteSort="true"
                  :subOrCus="subOrCus"
                  :improDown="true"  v-if="!topicsNone"
                  v-show="lisTimeInfoChange=='0'"
                  :exportflag="exportflag"></siteSort>
        <articleList :res="infos"  v-if="!topicsNone" v-show="lisTimeInfoChange=='0'"></articleList>
        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"  v-if="!topicsNone" v-show="lisTimeInfoChange=='0'"></paging>



        <div class="topicsNone" v-if="topicsNone">
            <div v-if="subOrCus=='TopicCustom'"  class="customNone">

                <div class="topictitle">
                    <h3 style="width: 90%; margin:30px auto;text-align:center;color:#1695d5">还没有定制的专题</h3>
                    <p style="width: 90%; margin:0 auto;text-align: center;">在<router-link style="display: inline-block;font-size:15px;font-weight:600;cursor:pointer;border-bottom: 1px solid #4284f3;" :to="{ name: 'TopicCustom' }">专题定制设置</router-link>中，可以设置自定义专题，您可以进行定制。</p>
                </div>

                <div class="projectline">
                    <h3 class="topicpoint">如何定制专题</h3>
                </div>
                <!-- infolist数据 -->
                <section class="topicitems">
                    <div class="steps">
                        <img class="pic" src="../static/topicSiteNone/topicimg01.png" alt=""><span>定制之前，您需要对专题信息收集的范围有一定的了解，比如：该专业领域的权威网站、先进技术的项目名称、领导者、技术机构、专业术语等。</span>
                    </div>
                    <div class="steps">
                        <img class="pic" src="../static/topicSiteNone/topicimg02.png" alt=""><span>进入<span class="heavy">个人中心-专题定制设置 </span> 进行定制。</span>
                    </div>
                    <div class="steps">
                        <img class="pic" src="../static/topicSiteNone/topicimg03.png" alt=""><span>输入专题名称</span><p><img class="pic" src="../static/topicSiteNone/topicimg08.png" alt=""></p>
                    </div>
                    <div class="steps">
                        <img class="pic" src="../static/topicSiteNone/topicimg04.png" alt=""><span>输入专题名称后，系统提供二种方式帮助您定制专题：1、以系统推荐专题为模版设置；2、完全自己设置。 </span>
                        <p>1.  如果您首次操作，建议您采用模版的方式逐步设置。 </p>
                        <div class="stepimg"><img class="pic" src="../static/topicSiteNone/topicimg09.png" alt=""></div>
                        <p>2、如果您已经了解专题的设置操作，可以选择自定义内容：  </p>
                        <div class="stepimg"><img class="pic" src="../static/topicSiteNone/topicimg11.png" alt=""></div>
                    </div>
                    <div class="steps">
                        <img class="pic" src="../static/topicSiteNone/topicimg05.png" alt=""><span>逐项配置完成后，点击<img class="pic" src="../static/topicSiteNone/topicimg10.png" alt="">，专题定制完成。 </span>
                    </div>
                </section>
            </div>
            <div v-if="subOrCus=='Subscription'" class="subscriberNone">
                <div>
                    <h3 style="width: 90%; margin:30px auto;text-align:center;color:#1695d5">还没有订阅专题</h3>
                    <p style="width: 90%; margin:0 auto;text-align: center;">在<router-link style="display: inline-block;font-size:15px;font-weight:600;cursor:pointer;border-bottom: 1px solid #4284f3;" :to="{ name: 'TopicSubscription' }">专题订阅设置</router-link>中，可以看到系统推荐专题，您可以进行订阅。</p>
                </div>

                <div class="projectline">
                    <h3 style="color:#1695d5;margin-bottom:30px;">专业推荐</h3>
                </div>
                <!-- infolist数据 -->
                <section class="topicitems">
                    <div>
                        <div class="col-sm-6 projectitems">
                            <div class="col-sm-3 itemsimg">
                                <img style="width:100%" src="../static/topicSiteNone/project03.jpg" alt="">
                            </div>
                            <div class="col-sm-9 itemsinfo">
                                <h4 class="infotitle">第3次抵消战略</h4>
                                <p>不仅仅是颠覆性技术创新问题，还涉及到采购、国防科技工业、作战、训练、概念、编制体制等一系列深刻变革
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-6 projectitems">
                            <div class="col-sm-3 itemsimg">
                                <img style="width:100%" src="../static/topicSiteNone/project01.jpg" alt="">
                            </div>
                            <div class="col-sm-9 itemsinfo">
                                <h4 class="infotitle">人工智能</h4>
                                <p>用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学

                                </p>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <div>
                        <div class="col-sm-6 projectitems">
                            <div class="col-sm-3 itemsimg">
                                <img style="width:100%" src="../static/topicSiteNone/project04.jpg" alt="">
                            </div>
                            <div class="col-sm-9 itemsinfo">
                                <h4 class="infotitle">高新技术</h4>
                                <p>对一个国家或一个地区的政治、经济和军事等各方面的进步产生深远的影响，并能形成产业的先进技术群
                                </p>
                            </div>
                        </div>
                        <div class="col-sm-6 projectitems">
                            <div class="col-sm-3 itemsimg">
                                <img style="width:100%" src="../static/topicSiteNone/project02.jpg" alt="">
                            </div>
                            <div class="col-sm-9 itemsinfo">
                                <h4 class="infotitle">网络安全</h4>
                                <p>网络安全性问题关系到未来网络应用的深入发展，涉及安全策略、操作系统、软件工程和网络安全管理等内容
                                </p>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>
                    <div>
                        <div class="col-sm-6 projectitems">
                            <div class="col-sm-3 itemsimg">
                                <img style="width:100%" src="../static/topicSiteNone/project05.jpg" alt="">
                            </div>
                            <div class="col-sm-9 itemsinfo">
                                <h4 class="infotitle">核安全</h4>
                                <p>推进国际核安全体系建设、加强核领域全球治理，推进核能事业发展

                                </p>
                            </div>
                        </div>
                        <div class="col-sm-6 projectitems">
                            <div class="col-sm-3 itemsimg">
                                <img style="width:100%" src="../static/topicSiteNone/project06.jpg" alt="">
                            </div>
                            <div class="col-sm-9 itemsinfo">
                                <h4 class="infotitle">F-35联合攻击机</h4>
                                <p>一款由美国洛克希德·马丁设计及生产的单座单发战斗攻击机
                                </p>
                            </div>
                        </div>
                        <div style="clear:both;"></div>
                    </div>


                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import conf from './../Conf';

    import topicListBox from './../components/topicListBox.vue';
    import articleList from './../components/articleList.vue';
    import paging from './../components/paging.vue';
    import siteSort from './../components/siteSort.vue';
    import treeTab from './../components/treeTab.vue';
    import timeline from './../components/timeline.vue';
    import knowledgeStore from './../components/knowledgeStore.vue';

    export default{
        data(){
            return{
                topics:[],
                topicIndex:0,
                infos:{},
                topic:{},
                totalPage:{},
                flag:1,

                checkedParams:{},//专题筛选条件
                siteSortObj: {
                    timeSort: 'desc',
                    start: '',
                    end: '',
                    keyword: '',
                    coreLevel: '',



                },
                topicsNone:false,//是否显示无关注时的初始页
                page:1,
                subOrCus:this.$route.matched[1].name,
                //舰船树
                treeshow:false,//舰船树是否显示
//                followChange:true,
                mintabright:false,//舰船树右侧
                minTabs2:false,//二级树
                minTabs3:false,//三级树
                minTabs4:false,//四级树
                minTabs5:false,//五级树
                minlast:false,//最后一级树
                openTree:false,//舰船树图标
                entities:[],
                knowledges:{//组织图
                    oneProducers:[],
                    twoProducers:[],
                    threeProducers:[]
                },
                lisTimeInfoChange:'0', //信息智库时间轴
                operateShow:false,

                exportflag:1//导出弹出
            }
        },
        watch:{
            $route: function () {
                this.subOrCus=this.$route.matched[1].name;
                this.init();
            },

            topic:'topicchangeGo',
        },
        components:{
            topicListBox:topicListBox,
            articleList:articleList,
            paging:paging,
            siteSort:siteSort,
            treeTab:treeTab,//专题树
            knowledgeStore:knowledgeStore,//智库
            timeline:timeline,//时间轴组件
        },
        methods:{
            showTips:function () {//显示三个操作按钮
                this.operateShow=!this.operateShow;
            },
            exportSubscription:function(){//导出弹出层
                this.exportflag=this.exportflag+1;
            },
            showTree:function () {//显示舰船树
                this.minTabs2 =true;
                this.treeshow=true;
                this.openTree=true;
            },
            closeshiptree:function () {//关闭舰船树
                this.treeshow=false;
                this.mintabright = false;
            },
            showTab2:function () {//显示二级树
                this.minTabs2 = true;
                this.mintabright = false;
                this.minTabs3 = false;
            },
            showTab3:function () {//显示三级树
                this.mintabright = true;
                this.minTabs3 = true;
                this.minTabs4 = false;
                this.minTabs5 = false;
            },
            showTab4:function () {////显示四级树
                this.minlast = true;
                this.minTabs4 = true;
                this.minTabs5 = false;
            },
            showTab5:function (ids) {////显示五级树
                this.minTabs5 = true;
                if(ids.length>0){
                    this.serchTopicByid(ids);
                }
            },
            init:function(topic){//初始化
                this.flag = this.flag+1;
                this.page = 1;
                this.checkedParams={//专题筛选条件
                    core:[],
                    important:[],
                    normal:[],
                    location:[],
                    person:[],
                    tech:[],
                    organization:[],
                    program:[],
                    country:[],
                };


                let body = {userid:sessionStorage.userInfo};
                let self = this;
                let road = ''
                if(this.subOrCus=='Subscription'){
                    road = '/topic/getUserSubscriber';
                }else if (this.subOrCus=='TopicCustom'){
                    road = '/topic/getUserTopic';
                }
                if(topic != undefined){
                    body.topicID = topic.id;
                }
                this.$http.post(conf.bathPath + road,body).then((res) => {
                    this.topics=res.body.userTopics;
                    let i = 0;
                    if(body.topicID != ''){
                        for(let [index,topic] of new Map(this.topics.map((topic,index) => [index,topic]))){
                            if(topic.id == body.topicID){
                                i = index;
                                break;
                            }
                        }
                    }
                    if(this.topics[i] ){//当前专题为第一个
                        this.topic=this.topics[i];
                    }else{
                        this.topicsNone = true;
                    }
                    this.infos = res.body.res;
                    this.totalPage = Math.ceil(res.body.total / 20);
                    if(topic !=undefined){
                        let self = this;
                        this.topics.forEach(function (top,index) {
                            if(top.id == topic.id){
                                self.topicIndex = index;
                                return false;
                            }
                        });
                    }

                }, (err) => {
                    console.log(err);

                });

            },

            topicchangeGo:function(){//专题watch后触发
                this.siteSortObj = {
                    timeSort: 'desc',
                    start: '',
                    end: '',
                    keyword: '',
                    coreLevel: '',
                };
                this.page=1;
                this.checkedParams={//专题筛选条件
                    core:[],
                    important:[],
                    normal:[],
                    location:[],
                    person:[],
                    tech:[],
                    organization:[],
                    program:[],
                    country:[],
                };

                this.commonChange();
            },
            topicChange: function (topic) {//切换专题
                this.flag = this.flag+1;//清空筛选条件
                this.topic = topic;
            },

            searchbyTopicFilter:function(checkedParams){//topicBody 筛选
                this.page = 1;

                this.checkedParams = checkedParams;
                this.commonChange();
            },
            coreChange:function(coreLevel){//重要性筛选
                this.siteSortObj.coreLevel = coreLevel;

                this.page = 1;
                this.commonChange();
            },

            changeTimeSort: function (data) {//网站排序 时间排序
                this.siteSortObj.timeSort = data;
                this.page = 1;
                this.commonChange();
            },
            searchByRange: function (siteSortObj) {//放大镜筛选
                this.siteSortObj = siteSortObj;
                this.page = 1;
                this.commonChange();
            },


            pageChange: function (page) {//翻页
                this.page = page;
                this.commonChange();
            },

            objIsNull:function(obj){//判断当前的checkedParams是否为空
                let isnull = 1;
                for (let i in obj) {
                    isnull = 2;
                    return false
                }   return true;

            },
            commonChange: function () {//去查询
                let self = this;
                let body;

                if (!((this.checkedParams.core&&this.checkedParams.core.length)//-----------------------------循环三大类网站
                    ||(this.checkedParams.important&&this.checkedParams.important.length)
                    ||(this.checkedParams.normal&&this.checkedParams.normal.length) )) {//判断当前的checkedParams是否为空
                    this.checkedParams.core=this.topic.website.cores;
                    this.checkedParams.important=this.topic.website.importants;
                    this.checkedParams.normal=this.topic.website.normals;
                }

                if (!((this.checkedParams.location&&this.checkedParams.location.length)//-----------------------------循环六大类参数
                    ||(this.checkedParams.person&&this.checkedParams.person.length)
                    ||(this.checkedParams.tech&&this.checkedParams.tech.length)
                    ||(this.checkedParams.organization&&this.checkedParams.organization.length)
                    ||(this.checkedParams.program&&this.checkedParams.program.length)
                    ||(this.checkedParams.country&&this.checkedParams.country.length) )) {//判断当前的checkedParams六大类是否为空
                    this.checkedParams.location=this.topic.location;
                    this.checkedParams.person=this.topic.person;
                    this.checkedParams.tech=this.topic.tech;
                    this.checkedParams.organization=this.topic.organization;
                    this.checkedParams.program=this.topic.program;
                    this.checkedParams.country=this.topic.country;

                }
                body = {
                    page: this.page,
                    checkedParams: this.checkedParams,//专题筛选条件
                    siteSortObj: this.siteSortObj,
                    topic:this.topic
                }
                let road = ''
                if(this.subOrCus=='Subscription'){
                    road = '/topic/getInfoBySubscriber';
                }else if (this.subOrCus=='TopicCustom'){
                    road = '/topic/getInfoByTopic';
                }


                this.$http.post(conf.bathPath + road,body).then((res) => {
                    this.infos = res.data.res;
                    this.totalPage = Math.ceil(res.data.total / 20);
                }, (err) => {
                    console.log(err);
                });

            },
            //专题树下点击专题的查询
            serchTopicByid:function (id) {
                let self = this;
                let body={id:id};

                let topic='';
                this.$http.post(conf.bathPath + '/topic/serchTopicById',body).then((res) => {
                    topic = res.data.topics;
                    if(topic!=''|| topic!=undefined){
                        self.topicChange(topic);
                    }
                }, (err) => {
                    console.log(err);
                });

            },
            exportInfo:function(obj){

                let self = this;
                let body;
                if (!((this.checkedParams.core&&this.checkedParams.core.length)
                    ||(this.checkedParams.important&&this.checkedParams.important.length)
                    ||(this.checkedParams.normal&&this.checkedParams.normal.length) )) {//判断当前的checkedParams是否为空
                    this.checkedParams = {
                        core: this.topic.website.cores,
                        important: this.topic.website.importants,
                        normal: this.topic.website.normals,
                    }
                }
                if (!((this.checkedParams.location&&this.checkedParams.location.length)//-----------------------------循环六大类参数
                    ||(this.checkedParams.person&&this.checkedParams.person.length)
                    ||(this.checkedParams.tech&&this.checkedParams.tech.length)
                    ||(this.checkedParams.organization&&this.checkedParams.organization.length)
                    ||(this.checkedParams.program&&this.checkedParams.program.length)
                    ||(this.checkedParams.country&&this.checkedParams.country.length) )) {//判断当前的checkedParams六大类是否为空
                    this.checkedParams.location=this.topic.location;
                    this.checkedParams.person=this.topic.person;
                    this.checkedParams.tech=this.topic.tech;
                    this.checkedParams.organization=this.topic.organization;
                    this.checkedParams.program=this.topic.program;
                    this.checkedParams.country=this.topic.country;

                }

                body = {
                    checkedParams: this.checkedParams,//专题筛选条件
                    siteSortObj: this.siteSortObj,//排序筛选条件
                    size:obj.sum,
                };
                if(this.subOrCus=='Subscription'){
                    body.topic = this.topic;
                }

                this.$http.post(conf.bathPath + '/topic/exportTopics',body).then((res) => {
                    let datas = res.data.res;
                    let ShowLabel = datas.title;
                    let JSONData = datas.data;
                    if(obj.type=='excel'){
                        let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
                        let excel = '<table>';
                        //设置表头
                        let row = "<tr>";
                        for (let i = 0, l = ShowLabel.length; i < l; i++) {
                            row += "<td>" + ShowLabel[i].value + '</td>';
                        }
                        //换行
                        excel += row + "</tr>";
                        //设置数据
                        for (let i = 0; i < arrData.length; i++) {
                            let row = "<tr>";

                            for (let index in arrData[i]) {
                                let value = arrData[i][index].value;
                                //=== "." ? "" : arrData[i][index].value;
                                row += '<td>' + value + '</td>';
                            }

                            excel += row + "</tr>";
                        }

                        excel += "</table>";

                        let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
                        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
                        excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
                        excelFile += '; charset=UTF-8">';
                        excelFile += "<head>";
                        excelFile += "<!--[if gte mso 9]>";
                        excelFile += "<xml>";
                        excelFile += "<x:ExcelWorkbook>";
                        excelFile += "<x:ExcelWorksheets>";
                        excelFile += "<x:ExcelWorksheet>";
                        excelFile += "<x:Name>";
                        excelFile += "{worksheet}";
                        excelFile += "</x:Name>";
                        excelFile += "<x:WorksheetOptions>";
                        excelFile += "<x:DisplayGridlines/>";
                        excelFile += "</x:WorksheetOptions>";
                        excelFile += "</x:ExcelWorksheet>";
                        excelFile += "</x:ExcelWorksheets>";
                        excelFile += "</x:ExcelWorkbook>";
                        excelFile += "</xml>";
                        excelFile += "<![endif]-->";
                        excelFile += "</head>";
                        excelFile += "<body>";
                        excelFile += excel;
                        excelFile += "</body>";
                        excelFile += "</html>";

                        let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
                        let link = document.createElement("a");
                        link.href = uri;
                        link.style = "visibility:hidden";
                        link.download = obj.name + ".xls";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }else{
                        var uri = 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(JSON.stringify(datas));

                        var link = document.createElement("a");
                        link.href = uri;

                        link.style = "visibility:hidden";
                        link.download = obj.name + ".json";

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }

                    this.changeExportLog(res.data.total);
                }, (err) => {
                    console.log(err);
                });
            },

            changeExportLog:function (sum) {
                let body = {
                    userid: sessionStorage.userInfo,
                    sum:sum
                };
                this.$http.post(conf.bathPath + '/info/changeExportLog', body).then((res)=>{
                },(err)=>{
                    console.log(err)
                });
            },

            changeOperation:function(type){
                this.lisTimeInfoChange=type;
                if(type=='1'){
                    this.getKnowledgeTree();
                }

            },
            //获取智库菜单树
            getKnowledgeTree:function () {
                let body = {
                    pid:'0',
                    type:'0'
                };
                this.$http.post(conf.bathPath + '/topic/getKnowledgedbs',body).then((res)=>{
                    this.entities = res.data.entities;
                },(err)=>{
                    console.log(err);
                });
            },

            //查询智库的生产商
            getKnowledges: function (params) {
                let body = {
                    pid:params.id,
                    type:params.type
                };
                this.$http.post(conf.bathPath + '/topic/getKnowledgedbs',body).then((res)=>{
                    this.knowledges.oneProducers = res.data.oneProducer;
                    this.knowledges.twoProducers = res.data.twoProducer;
                    this.knowledges.threeProducers = res.data.threeProducer;
                },(err)=>{
                    console.log(err);
                });
            },
            searchOneProducer:function (params) {//智库组织图一级数据
                let body = {
                    pid:params.id,
                    type:params.type
                };
                this.$http.post(conf.bathPath + '/topic/getKnowledgedbs',body).then((res)=>{
                    this.knowledges.twoProducers = res.data.twoProducer;
                    this.knowledges.threeProducers = res.data.threeProducer;
                },(err)=>{
                    console.log(err);
                });
            },
            searchTwoProducer: function (params) {//智库组织图二级数据
                let body = {
                    pid:params.id,
                    type:params.type
                };
                this.$http.post(conf.bathPath + '/topic/getKnowledgedbs',body).then((res)=>{
                    this.knowledges.threeProducers = res.data.threeProducer;
                },(err)=>{
                    console.log(err);
                });
            },

            addSubscription: function () {//专题订阅添加
                window.open(conf.prePath+'/user/TopicSubscription');
            },

        },
        created:function(){
            let topic = this.$route.params.topic;
            this.init(topic);
        },
    }
</script>

<style scoped>
    .shiptree{
        position: absolute;
        top: 10px;
        right: 0px;
        background: #fff;
        z-index: 100;
    }
    .topicSubscriber {
        width: 93%;
        margin: 0 auto;
    }
    .topicsNone p{
        color:#666;
    }
    .subscriberNone .projectline {
        font-size: 20px;
        margin: 35px auto;
        vertical-align: middle;
        width: 100%;
        border-bottom: 1px dashed #666;
    }
    .subscriberNone .topicitems {
        overflow: hidden;

        width: 100%;
        margin: 0 auto;
    }
    .subscriberNone .itemsinfo .infotitle {
        margin: 3px 0px 5px 0px;
        color: #1695d5;
        font-size: 16px;
    }
    .subscriberNone .projectitems {
        padding-left: 0px;
        overflow: hidden;
        min-height: 80px;
        margin-bottom: 30px;
    }

    .customNone .projectline {
        margin-left: -4%;
        color: #fff;
        height: 45px;
        background: url(../static/topicSiteNone/topicimg06.png) no-repeat left center;
    }
    .customNone .projectline .topicpoint {
        margin-left: 50px;
        line-height: 45px;
        margin-top: 20px;
        margin-bottom: 10px;

    }
    .customNone .topicitems {
        width: 90%;
        margin: 30px auto;
        color: #333;
    }
    .stepimg img {
        width: 100%;
    }
    .customNone .steps {
        margin: 20px 0px;
    }
    .customNone .topicitems span {
        margin-left: 10px;
    }

    .customNone .heavy {
        color: #333;
        font-size: 16px;
        font-weight: 600;
    }

    .customNone .topicitems p {
        margin-left: 86px;
    }
    .customNone .topicitems .stepimg {
        margin-left: 86px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .topic_operate{
        position: absolute;
        top: 12px;
        right: 30px;
        z-index: 10;
    }
    .clickmin{
        background: url(../static/img/moreshow.png) no-repeat center;
        width: 45px;
        height: 45px;
        cursor:pointer;
        position: absolute;
        top: 52px;
        right: 0px;
    }
    .operatetrem{
        position: relative;
    }
    .threetips{
        display: inline-block;
        position: absolute;
        top: 0px;
        right: 44px;
    }
    .threetips .btn-info{
        display: block;
        width: 60px;
        height: 30px;
        margin-top: 10px;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        list-style: none;
        font-weight: normal;
        border: 0;
    }
    .clickThree{
        background: url(../static/img/morehover.png) no-repeat center;
        width: 45px;
        height: 45px;
        cursor:pointer;
        position: absolute;
        top: 12px;
        right: 1px;
    }
    .librarypositon{
        width: 107.5%;
        overflow: hidden;
        margin-left: -3.75%;
    }
    .operateicon{
        display: inline-block;
    }
    .subscriberNone a:hover,.topicsNone a:hover{
        text-decoration: none;
    }
</style>