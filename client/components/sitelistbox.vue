<template>
    <div class="focustitle">
        <div class="webslist">
            <div class="websshow ":class="{websover:websover.core}" v-if="cores.length">
                <div class="websleft">
                    <p class="wclassify"><span class="classifyw">核心</span></p>
                </div>
                <div class="websright">
                    <div v-for="(site,index) in cores">
                        <p class="btn btn-xs"
                           :class="[(index==checked.index&&site.level==checked.level)?'btn-info':'btn-default']"
                           @mouseenter="tipsShow(site,$event)"
                           @mouseleave="tipsHide()"
                           @click="siteChange(site.url,index,site.level)">
                            <span class="newspan" >{{site.name}}</span>
                        </p>
                        <router-link to="" v-if="site.count">{{site.count}}</router-link>
                    </div>
                    <p class="showwebs" :class="{showwebu:!websover.core}" @click="showWebs('core')"></p>
                </div>
            </div>


            <div class="websshow  ":class="{websover:websover.important}" v-if="importants.length">
                <div class="websleft">
                    <p class="wclassify"><span class="classifyw">重要</span></p>
                </div>
                <div class="websright">
                    <div v-for="(site,index) in importants">
                        <p class="btn btn-xs"
                           :class="[(index==checked.index&&site.level==checked.level)?'btn-info':'btn-default']"
                           @mouseenter="tipsShow(site,$event)"
                           @mouseleave="tipsHide()"
                           @click="siteChange(site.url,index,site.level)">
                            <span class="newspan">{{site.name}}</span>
                        </p>
                        <router-link to="" v-if="site.count">{{site.count}}</router-link>
                    </div>
                    <p class="showwebs" :class="{showwebu:!websover.important}" @click="showWebs('important')"></p>
                </div>
            </div>


            <div class="websshow ":class="{websover:websover.normal}" v-if="normals.length">
                <div class="websleft">
                    <p class="wclassify"><span class="classifyw">普通</span></p>
                </div>
                <div class="websright">
                    <div v-for="(site,index) in normals">
                        <p class="btn btn-xs"
                           :class="[(index==checked.index&&site.level==checked.level)?'btn-info':'btn-default']"
                           @mouseenter="tipsShow(site,$event)"
                           @mouseleave="tipsHide()"
                           @click="siteChange(site.url,index,site.level)">
                            <span class="newspan" >{{site.name}}</span>
                        </p>
                        <router-link to="" v-if="site.count">{{site.count}}</router-link>
                    </div>
                    <p class="showwebs" :class="{showwebu:!websover.normal}" @click="showWebs('normal')"></p>
                </div>
            </div>
            <div></div>
        </div>
        <div class="websline">
            <span class="websborder"></span>&gt;&gt;&gt;&gt;<span class="btn-info addweb" @click="editWebsites()">添加</span>
        </div>
    </div>

</template>
<script>
    import $ from 'jquery'
    import conf from './../Conf';
    import layui from 'layui'
    export default{
        data(){
            return {
                checked: {level: '', index: -1},
                cores: [],
                importants: [],
                normals: [],

                websover:{//三大类网站哪个被打开
                    core:true,
                    important:true,
                    normal:true,
                },
                layerIndex:'',//存储打开的layertips,用以关闭

            }
        },
        watch: {
            websites: 'dataChange',
        },

        props: ['websites', 'website'],
        created:function(){


        },
        updated:function(){

            boundaryAll();
        },
        methods: {
            showWebs:function(t){//网站列表下拉
                    if(this.websover[t]){
                        this.websover[t]=false;
                    }else{
                        this.websover[t]=true;
                    };
            },
            siteChange: function (url, index, level) {
                if (this.checked.index == index && this.checked.level == level) {
                    this.checked.index = -1;
                    url = '';
                } else {
                    this.checked.index = index;
                    this.checked.level = level;
                }
                this.$emit('change', url);
            },
            tipsShow: function (site,e) {//网站悬浮提示
                    let et = e.target;
                    let content = '<p class="tipsinfo">' + site.name + '</p>' + '<p class="domaininfo">' + site.url + '</p>';
                    this.layerIndex = layer.tips(content, et, {
                        tips: 3,
                        time:0,
                        maxWidth: 800
                    });


            },
            tipsHide: function () {//网站悬浮提示消失
                    layer.close(this.layerIndex)

            },
            dataChange: function () {
                this.cores = this.websites.cores;
                this.importants = this.websites.importants;
                this.normals = this.websites.normals;
                let self = this;
                this.cores.forEach(function(d,i){
                    if(d.url==self.website){
                        self.checked.index = i;
                        self.checked.level = d.level;
                        self.websover[d.level]=false;
                    }
                });
                this.importants.forEach(function(d,i){
                    if(d.url==self.website){
                        self.checked.index = i;
                        self.checked.level = d.level;
                        self.websover[d.level]=false;
                    }
                });
                this.normals.forEach(function(d,i){
                    if(d.url==self.website){
                        self.checked.index = i;
                        self.checked.level = d.level;
                        self.websover[d.level]=false;
                    }
                });
            },
            editWebsites:function () {
               window.open(conf.prePath+'/user/siteFocusSet');
            }
        }
    };



    function boundaryAll(){//网站列表超过一行可以下拉
        $('.websright').each(function(){
            if(this.offsetHeight>40){
                $(this).find('.showwebs').css('display','block')
            }else{
                $(this).find('.showwebs').css('display','none')
            }
        });
    };//网站列表超过一行可以下拉


</script>

<style scoped>



    .focustitle {
        padding-top: 40px;
        padding-bottom: 20px;
        box-sizing: border-box;
    }

    .webslist {
        width: 100%;
        color: #678eb9;
        font-size: 14px;
        margin-bottom: 20px;
        background: #fff;
    }

    .websover {
        height: 36px;
        overflow: hidden;
    }

    .websshow {
        position: relative;
        border: 1px solid #ddd;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .websleft {
        height: 100%;
        background: #F5F5F5;
        border-bottom: 1px solid #ddd;
        margin: 1px;
        position: absolute;
        top: 0;
        left: 0;
        width: 58px;
    }

    .wclassify {
        height: 100%;
        position: relative;
    }

    .classifyw {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .websright {
        padding-left: 66px;
        margin-right: 30px;
    }

    .websright > div {
        position: relative;
        display: inline-block;
        padding-right: 6px;
    }

    .websshow .btn {
        position: relative;
        display: inline-block;
        margin-top: 8px;
        margin-bottom: 8px;
        max-width: 260px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .showwebs {
        display: none;
        width: 28px;
        height: 28px;
        background: url(./../static/img/alldown.png) no-repeat center;
        background-size: 18px;
        position: absolute;
        right: 3px;
        top: 0px;
        cursor: pointer;
    }

    .showwebu {
        background: url(./../static/img/allup.png) no-repeat center;
    }
    .websline {
        height: 30px;
        padding-right: 60px;
        position: relative;
    }
    .websborder {
        height: 5px;
        width: 96%;
        border-top: 1px dashed #666;
        display: inline-block;
    }
    .addweb {
        color: #fff;
        font-size: 14px;
        text-align: center;
        padding: 6px 9px;
        cursor: pointer;
        border-radius: 3px;
        -moz-border-radius: 3px;
        position: absolute;
        top: 0;
        right: 10px;
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