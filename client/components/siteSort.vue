<template>
    <div>
    <section class="sort">
        <div>
            <div class="time_sort" @click="sortByTime" :class="{timeSort:timeSort=='desc'}"><a>时间排序</a></div>
            <i></i>
            <div class="time_sort" @click="searchbySort" v-if="siteSort" :class="{timeSort:timeSort=='siteSort'}"><a>网站排序</a></div>
            <div class="impro_down" v-if="improDown">
                <span>按重要性</span>
                <div class="core">
                    <a @click.stop="coreDown">{{coreName}}</a>
                    <ul :class="{open:coreOpen}">
                        <li><a @click="coreChange('core','核心')">核心</a></li>
                        <li><a @click="coreChange('important','重要')">重要</a></li>
                        <li><a @click="coreChange('normal','普通')">普通</a></li>
                        <li><a @click="coreChange('','全部')">全部</a></li>
                    </ul>
                </div>
            </div>
            <div class="laydate">
                <span>时间：</span>
                <div class="laydate-icon" id="laydate_start" @click="changeDate('laydate_start')"></div>
                <span>至：</span>
                <div class="laydate-icon" id="laydate_end" @click="changeDate('laydate_end')"></div>
            </div>
            <div class="fuzzySearch" v-if="fuzzySearch">
                <span>搜索：</span><input type="text" v-model="keyword"/>
            </div>
            <button class="btn-info goinfo" @click="searchbydate"><span class="glyphicon glyphicon-search"></span>
            </button>
            <button v-if="subOrCus!='Subscription'" class="btn-info btnExport" @click="exportInfo">导出</button>
        </div>

    </section>
    <div id="export" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="media">
                    <a class="media-left media-middle">
                        <img src="./../static/img/export.png" >
                    </a>
                    <div class="media-body">
                        <h3 class="media-heading">导出提示:导出数据为您当前筛选条件下的信息</h3>
                        <div class="exportData">
                            <label>文件名称：</label>
                            <input  type="text" v-model="fileName" style="border:1px solid #46b8da">
                        </div>
                        <div  class="exportData">
                            <label>导出类型：</label>
                            <div class="format">
                                <a @click.stop="formatDown">{{exportFormat}}</a>
                                <ul :class="{open:formatOpen}">
                                    <li><a  @click="formatChange('json')">json</a></li>
                                    <li><a @click="formatChange('excel')" >excel</a></li>
                                </ul>
                            </div>
                        </div>
                        <h4>说明：每天导出上限为1000条，剩余导出条数<span class="surplus" style="color:red">{{residue}}</span></h4>
                    </div>
                </div>
                <div class="text-center">
                    <button  class="btn btn-info" @click="exportInfoYse">导出</button>

                    <button  class="btn btn-default"  @click="exportInfoNo">取消</button>
                    <div style="clear: both"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import conf from './../Conf';
    import $ from 'jquery';
    import layui from 'layui';
    import moment from 'moment';


    export default {
        data(){
            return {
                keyword: '',
                timeSort: 'desc',

                startMax: '',
                endMin: '',
                coreLevel: '',
                coreName: '全部',

                coreOpen: false,

//                siteSort: false,//是否显示网站排序
//                improDown: false,//是否显示按重要性排序
                //fuzzySearch: false,//是否显示筛选输入框
                exportFormat:'json',
                fileName:'默认' +moment().format('YYYY-MM-DD'),
                residue:1000,//剩余
                formatOpen:false,

//                exportflag:false
            }

        },
        props: ['flag','fuzzySearch','siteSort','improDown','subOrCus','exportflag'],
        watch: {
            flag: function () {
                let self = this;
                if (this.flag) {
                    $('#laydate_start').text('');
                    $('#laydate_end').text('');
                    self.keyword = '';
                    self.timeSort = 'desc';
                    self.coreLevel = '';
                    self.coreName= '全部';
                }
            },
            timeSort: 'changeTimeSort',

            exportflag:function () {
                if(this.exportflag){
                    this.exportInfo();
                }
            }
        },
        methods: {
            sortByTime: function () {
                if(!this.siteSort){//没有网站排序时正倒序切换
                    this.timeSort = (this.timeSort == 'desc') ? 'asc' : 'desc';
                }
                else{//有网站排序时 时间排序 网站排序切换
                    if(this.timeSort == 'desc'){
                        return
                    }
                    this.timeSort = 'desc'
                }

            },
            searchbySort: function () {//有网站排序时 时间排序 网站排序切换
                if(this.timeSort == 'siteSort'){
                    return
                }
                this.timeSort = 'siteSort'
            },

            changeDate: function (dateId) {
                let self = this;
                layui.laydate({
                    elem: document.getElementById(dateId),
                    istime: false,
                    format: 'YYYY-MM-DD',
                    min: (dateId == 'laydate_end') ? (self.endMin ? self.endMin : '1900-06-16 23:59:59') : '1900-06-16 23:59:59',
                    max: (dateId == 'laydate_start') ? (self.startMax ? self.startMax : layui.laydate.now()) : layui.laydate.now(),

                    choose: function (dates) { //选择好日期的回调
                        if (dateId == 'laydate_start') {
                            self.endMin = dates;
                        }
                        if (dateId == 'laydate_end') {
                            self.startMax = dates;
                        }
                    }
                });
            },
            coreDown: function () {//重要性排序打开
                if (this.coreOpen) {
                    $('.core>ul').slideUp(200);
                    this.coreOpen = false
                } else {
                    $('.core>ul').slideDown(200);
                    this.coreOpen = true;
                }
            },
            coreChange: function (coreLevel, coreName) {//重要性排序换
                $('.core>ul').slideUp(200);
                this.coreOpen = false;
                this.coreLevel = coreLevel;
                this.coreName = coreName;
                this.$emit('coreChange',this.coreLevel);
            },


            changeTimeSort: function () {
                this.$emit('changeTimeSort', this.timeSort);
            },
            searchbydate: function () {
                let body = {timeSort: this.timeSort, start: $('#laydate_start').text(), end: $('#laydate_end').text(), keyword: this.keyword,coreLevel:this.coreLevel};
                this.$emit('rangeKeywordSearch',body);
            },

            //----------------------------------------------导出相关-------------------------------------------
            exportInfo: function () {//导出
                let body = {userid: sessionStorage.userInfo};
                this.$http.post(conf.bathPath + '/info/getTodayExportSum', body).then((res) => {
                    if(res.data.sum>=1000){
                        alert('导出数量已达到上限！');
                    }else{
                        this.residue = 1000-res.data.sum;
                        this.exportFormat='json';
                        this.fileName='默认'+moment().format('YYYY-MM-DD');
                        $('#export').modal();
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            formatDown: function () {//导出功能jsonexcel
                if (this.formatOpen) {
                    $('.format>ul').slideUp(200);
                    this.formatOpen = false
                } else {
                    $('.format>ul').slideDown(200);
                    this.formatOpen = true;
                }
            },
            formatChange: function (formatName) {//导出功能json excel切换
                $('.format>ul').slideUp(200);
                this.formatOpen = false;
                this.exportFormat = formatName;
            },
            exportInfoYse:function(){
                let body={
                    name:this.fileName,
                    type:this.exportFormat,
                    sum: this.residue,
                };

                this.$emit('exportInfo',body);
                $('#export').modal('hide');
            },
            exportInfoNo:function(){//取消导出
                $('#export').modal('hide');
            },
        },
        mounted:function(){
            $('body').on('click', function () {

                if (this.coreOpen) {
                    $('.core>ul').slideUp(200);
                    this.coreOpen = false
                }
                if (this.formatOpen) {
                    $('.format>ul').slideUp(200);
                    this.formatOpen = false
                }

            });
        },
    };


</script>
<style scoped>

    .sort {
        font-size: 18px;
        width: 100%;
        margin: 10px auto;
    }

    .sort > div {
        position: relative;
    }

    .sort > div > i {
        margin: 0 12px;
        border-left: 2px solid #666;
    }

    .time_sort, .impo_sort {
        display: inline-block;
        cursor: pointer;
    }

    .time_sort.active a, .impo_sort.active a {
        color: #000;
        font-weight: 500;
    }

    .time_sort.timeSort > a {
        color: #38f;

    }

    .time_sort a, .impo_sort a {
        text-decoration: none;
        color: #666;
    }

    .impro_down {
        display: inline-block;
        margin-left: 40px;
    }

    .core,.format {
        font-size: 13px;
        position: relative;
        line-height: 23px;
        background: #fff;
        display: inline-block;
    }

    .format > ul,.core > ul {
        z-index: 1000;
        padding: 0px;
        position: absolute;
        width: 100%;
        display: none;
        background: #fff;
    }

    .core > ul > li,.format> ul > li {
        border-top: none;
        list-style: none;
    }

    .core > a, .core > ul > li ,.format > a, .format > ul > li{
        cursor: pointer;
        color: #4aacdd;
        text-align: center;
        width: 100px;
        border: 1px solid #4aacdd;
        display: inline-block;
        text-decoration: none;
    }
    .core > ul > li > a,.format > ul > li > a {
        text-align: center;
        width: 100px;
    }



    .laydate {
        margin-left: 10px;
        display: inline-block;
        vertical-align: middle;
    }

    .laydate > div {
        font-size: 13px;
        display: inline-block;
        width: 125px !important;
        padding: 0 30px 0 0px;
        vertical-align: middle;
        text-align: left;
    }

    #laydate_start {
        width: 200px;
        margin-right: 10px;
    }

    #laydate_end {
        width: 200px;
    }

    .fuzzySearch {
        display: inline-block;
        vertical-align: bottom;
        margin: 0 15px 0 25px;
    }

    .fuzzySearch > input {
        border: 1px solid #c6c6c6;
        height: 25px;
        width: 150px;
        vertical-align: bottom;
        font-size: 15px;
    }

    .goinfo {
        margin: 0;
        list-style: none;
        font-weight: normal;
        border: 0;
        height: 25px;
        line-height: 25px;
        margin-left: 5px;
        padding: 0 20px;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
    }

    .btnExport {
        height: 30px;
        margin-right: 10px;
        padding: 6px 10px;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        list-style: none;
        font-weight: normal;
        border: 0;
        float: right;
    }
    #export .modal-sm {
        width: 650px;
        margin-top:100px;
    }

    #export .modal-content{
        padding:40px;

    }

    #export .media-left img{
        width:150px;
        height:150px;

    }
    #export  .media-body h3{
        margin-top:30px;
        margin-bottom:20px;

    }
    #export  .media-body h4{
        margin-top:20px;
        margin-bottom:20px;

    }
    #export  .exportData{
        margin-top:10px;

    }
    #export  .text-center .btn{
        margin:0 10px;
    cursor:pointer;
    }
</style>
