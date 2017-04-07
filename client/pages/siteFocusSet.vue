<template>

    <div>
        <!--------------------------------------------------------------------------------------------------->
        <section class="topic_list">
            <div class="topic_list_ma">
                <div class="topic_title">
                    <h4>核心关注网站</h4>
                </div>
                <div class="topic_list_pa ">
                    <ul class="core">
                        <li class="webname" v-for="(site,index) in cores"
                            @mouseenter="siteMouseenter($event,site)"
                            @mouseleave="siteMouseleave"
                            :url="site.url" level="core">
                            <span class="btn btn-info btn-xs  tp_name">{{site.name}}</span>
                            <span class="removewebs glyphicon glyphicon-remove-circle"
                                  @click="removethis(cores,index)"></span>
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
                        <li class="webname" v-for="(site,index) in importants"
                            @mouseenter="siteMouseenter($event,site)"
                            @mouseleave="siteMouseleave"
                            :url="site.url" level="important">
                            <span class="btn btn-info btn-xs  tp_name">{{site.name}}</span>
                            <span class="removewebs glyphicon glyphicon-remove-circle"
                                  @click="removethis(importants,index)"></span>
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
                        <li class="webname" v-for="(site,index) in normals"
                            @mouseenter="siteMouseenter($event,site)"
                            @mouseleave="siteMouseleave"
                            :url="site.url" level="important">
                            <span class="btn btn-info btn-xs  tp_name">{{site.name}}</span>
                            <span class="removewebs glyphicon glyphicon-remove-circle"
                                  @click="removethis(normals,index)"></span>
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
            <div class="topic_list_ma">
                <div class="topic_title">
                    <h4>关键词</h4>
                </div>
                <div class="topic_list_pa">
                    <ul id="addedWord">
                        <li class="webname" v-for="(keyword,index) in keywords"
                            @mouseenter="siteMouseenter($event,keyword)"
                            @mouseleave="siteMouseleave">
                            <span class="btn btn-info btn-xs  tp_name">{{keyword}}</span>
                            <span class="removewebs glyphicon glyphicon-remove-circle keywordsremove"
                                  @click="removekeyword(keywords,index)"></span>
                        </li>
                    </ul>
                    <ul style="margin-top:20px;">
                        <li class="keyli" v-show="keywordEditing">
                            <input placeholder="添加多关键词时用逗号分隔" style="border: 1px solid #46b8da" class=""
                                   v-model.trim="keywordList">
                            <span class="savekey glyphicon glyphicon-ok-circle" @click="keywordEditYes"></span>
                            <span class="removekey glyphicon glyphicon-remove-circle" @click="keywordEditNo"></span>
                        </li>

                    </ul>

                    <div class="addkeys btn btn-default btn-xs plus" @click="keywordEdit">
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
        <div class="saveaddweb modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{message}}</h4>
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
                cores: [],//已添加的核心
                importants: [],
                normals: [],
                keywords: [],//添加的关键词

                levelAdd: '',//哪个level将要添加网站
                websites: [],//可选择添加的网站
                layerIndex: '',//tips

                keywordEditing: false,
                keywordList: '',//手动添加的关键字
                message:''
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
                let body = {userid: sessionStorage.userInfo};
                this.$http.post(conf.bathPath + '/info/siteFocusSetInit', body).then((res) => {
                    this.cores = res.body.cores;
                    this.importants = res.body.importants;
                    this.normals = res.body.normals;
                    this.keywords = res.body.keywords;
                    this.websites = res.body.websites;

                }, (err) => {

                });
            },
            addwebsite: function (levelAdd) {//点击加号准备添加网站
                this.levelAdd = levelAdd
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
                layer.close(this.layerIndex)
            },
            removethis: function (arr, index) {//点击小红叉删除当前网站
                this.websites.push(arr.splice(index, 1)[0]);//将删掉的数组放入websites
                layer.close(this.layerIndex)
            },

            removekeyword: function (arr, index) {//点击小红叉删除当前关键词
                arr.splice(index, 1)
            },

            websitesAdd: function (arr, arr1) {//模态框中点击确定添加时
                let self = this;
                for (let i = arr.length - 1; i > -1; i--) {
                    this.websites.splice(arr[i], 1)
                }
                arr1.forEach(function (d) {
                    if(self.levelAdd=='normals'){
                        self.levelAdd='generallys';
                    }
                    d.level = self.levelAdd.slice(0, -1);
                });
                self[self.levelAdd] = self[self.levelAdd].concat(arr1);
                console.log(self[self.levelAdd])

            },
            keywordEdit: function () {//编辑关键词
                this.keywordEditing = true;
                this.keywordList = '';
            },
            keywordEditNo: function () {//取消编辑关键词
                this.keywordEditing = false;
            },
            keywordEditYes: function () {//确定编辑关键词
                let self = this;
                if (/[\u4E00-\u9FA5\uF900-\uFA2D]/.test(this.keywordList)) {
                    alert("不能含有中文！");
                    this.keywordList = '';
                    return;
                }
                else {
                    let keywordList = this.keywordList.split(',');
                    keywordList.forEach(function (d) {
                        if (d != "") {
                            self.keywords.push(d)
                        }
                    });

                    this.keywords = [...new Set(this.keywords)];
                }

                this.keywordEditing = false;
            },
            saveUserChoose: function () {
                let body = {
                    userid: sessionStorage.userInfo,
                    normals: this.normals,
                    cores: this.cores,
                    importants: this.importants,
                    keywords: this.keywords
                };
                this.$http.post(conf.bathPath + '/info/siteFocusSetSave', body).then((res) => {
                    this.message='保存成功！';
                    $('.saveaddweb').modal();
                }, (err) => {
                    console.log(err);
                });
            },

        },
        components: {
            addwebsites: addwebsites,
        },

    }


</script>

<style scoped>
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

    .bs-example-modal-sm .modal-sm{
        margin-top: 100px;
    }
    .modal-dialog .modal-content .modal-header{
        border-bottom: none;
    }
    .bs-example-modal-sm .modal-header h4{
        padding: 40px 20px 40px 40px;
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