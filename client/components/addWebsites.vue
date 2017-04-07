<template>
    <div>
        <div id="websitesModal" class="modal fade bs-example-modal-lg focusweb" tabindex="-1" role="dialog"
             aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">添加关注网站</h4>
                    </div>
                    <div class="modal-body">
                        <div class="modalsearch">
                            <div class="searchinp">
                                <input type="text" v-model="searchkey" placeholder="">
                                <button class="btn btn-default" @click="searchWebs">
                                    <span class="glyphicon glyphicon-search"></span>
                                </button>
                            </div>
                        </div>
                        <div class="searchinfor">
                            <div class="sitemore">
                                <ul>
                                    <li class="termsli"
                                        v-for="(site,index) in websites"
                                        v-show="siteisShow[index]"
                                        @mouseenter="siteMouseenter($event,site)"
                                        @mouseleave="siteMouseleave"
                                        :class="{checked:siteChecked[index]}" @click="websitesCheck(index,site)"
                                        :title="site.website_name" :url="site.url">

                                        <div>
                                            <i></i>
                                            <span url="site.url">{{site.name}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <ol class=search_a-z>
                            <li v-for="word in AZ" @mouseover="wordFilter(word)">{{word}}</li>
                            <li @mouseover="wordFilter('others')">Others</li>
                            <li class="hover" @mouseover="wordFilter('all')">All</li>
                        </ol>
                    </div>
                    <div class="modalfooter">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="websitesAdd">确定
                        </button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="websitesAddCancel">
                            取消
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import layui from 'layui'
    import conf from './../Conf';
    import moment from 'moment';
    import addwebsites from '../components/addWebsites.vue';

    export default{
        data(){
            return {
                AZ: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                searchkey: '',
                siteisShow: [],//是否显示该网站


                siteChecked: {}//哪些网站被勾选
            }
        },
        created: function () {
            this.init();
        },
        watch: {
            websites: function () {
                this.siteChecked = {};
                let self = this;
                this.websites.forEach(function (d, i) {
                    self.siteisShow.splice(i, 1, true);
                });
            }
        },
        props: {
            websites: {
                type: Array,
                default: []
            }
        },
        methods: {
            init: function () {
            },
            searchWebs: function () {//点击搜索网站放大镜
                let self = this;
                this.websites.forEach(function (d, i) {
                    self.siteisShow.splice(i, 1,
                        ((self.websites[i].name.toLowerCase().indexOf(self.searchkey.toLowerCase()) != -1) || (self.websites[i].url.toLowerCase().indexOf(self.searchkey.toLowerCase()) != -1)));
                });
            },
            choseWebs: function () {//点击确定保存勾选的网站

            },
            websitesCheck: function (index, website) {//topicbody筛选的内容
                if (this.siteChecked[index]) {
                    this.$delete(this.siteChecked, index);
                } else {
                    let val = 1;
                    if (website) {
                        val = website
                    }
                    this.$set(this.siteChecked, index, val);
                }
            },
            websitesAdd: function () {//点击筛选
                let checkedindexs = [];
                let checkedsites = [];
                for (let i in this.siteChecked) {
                    checkedindexs.push(i);
                    checkedsites.push(this.siteChecked[i]);

                }
                this.$emit('websitesAdd', checkedindexs, checkedsites)

            },
            websitesAddCancel: function () {//重置筛选的内容
                this.siteChecked = {};

            },
            wordFilter: function (word) {
                let self = this;

                if (word == 'others') {

                } else if (word == 'all') {
                    this.websites.forEach(function (d, i) {
                        self.siteisShow.splice(i, 1, true);
                    });
                } else {
                    this.websites.forEach(function (d, i) {
                        self.siteisShow.splice(i, 1, self.websites[i].name.toLowerCase().substring(0, 1) == word.toLowerCase());
                    });
                }
            }, siteMouseenter: function (e, site) {//悬浮显示红叉和tips
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
        },
        components: {
            addwebsites: addwebsites
        }

    }

</script>

<style scoped>

    /*瀵懓鍤锟�*/
    .modalsearch {
        overflow: hidden;
    }

    .searchinp input {
        width: 280px;
        height: 28px;
        margin-left: 30px;
        border: 1px solid #3879d9;
    }

    .searchinp {
        line-height: 30px;
        height: 30px;
        display: inline-block;
        position: relative;
    }

    .searchinp input {
        width: 280px;
        height: 28px;
        margin-left: 30px;
    }

    .searchinp .btn-default {
        background: #666;
        color: #fff;
        height: 30px;
        position: absolute;
        border-radius: 0px;
        top: 0px;
        right: -1px;
    }

    /*model*/
    .search_a-z {
        position: absolute;
        top: 17px;
        right: 3%;
        /* display: none; */
    }

    .search_a-z > li {
        font-size: 12px;
        float: left;
        height: 20px;
        line-height: 20px;
        border: 1px solid transparent;
        padding: 0 3px;
        cursor: pointer;
        text-align: center;
        color: #005aa0;

    }

    .search_a-z > li.hover {
        border: 1px solid #005aa0;
    }

    .modalfooter {
        width: 100%;
        text-align: center;
        margin: 10px 0px;
    }

    .modalfooter .btn-primary {
        margin-right: 30px;
    }

    .modal-body {
        min-height: 100px;
        max-height: 400px;
        overflow-y: scroll;
        word-wrap: break-word;
        word-break: break-all;
    }

    .sitemore > ul {
        padding: 0 20px;
        padding-top: 5px;
    }

    .sitemore > ul > li {
        color: #999;
        position: relative;
        float: left;
        _display: inline;
        width: 116px;
        height: 48px;
        padding: 0;
        border: 1px solid #DDD;
        margin: -1px -1px 0 0;
        background: #FFF;
        text-align: center;
        z-index: 3000;
    }

    .sitemore > ul > li:hover {
        position: relative;
        z-index: 5;
        border-color: #6bacdf;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, .12);
        z-index: 3001;
    }

    .sitemore > ul > li span {
        font-size: 12px;
        display: block;
        height: 46px;
        width: 114px;
        overflow: hidden;
        text-overflow: ellipsis;
        zoom: 1;
        color: #005aa0;
        line-height: 21px;
        cursor: pointer;
        padding: 0 4px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    .sitemore > ul > li.checked:hover {
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .12);
    }

    .sitemore > ul > li.checked, .sitemore > ul > li:hover span {
        z-index: 3001;
        border-color: #6bacdf;
    }

    .sitemore > ul > li.checked i {
        display: block;
    }

    .sitemore > ul > li i {
        width: 12px;
        height: 13px;
        background: url(../static/img/search.ele.png);
        border-color: #6bacdf;
        background-position: 0px -182px;
        position: absolute;
        right: -1px;
        bottom: -1px;
        display: none;
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