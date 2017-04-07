<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="lf lf-log">
                <router-link :to="{ name: 'HomePage' }" class="navbar-brand">
                    <span>IDP</span>
                </router-link>
            </div>
            <div class="lf lf-icon" v-show="!searchModal">
                <ul class="nav navbar-nav nav_right">
                    <li>
                        <a  class="a_search"
                            @click="routeName!='globalSearch'?searchModal=true:''"
                                ><span class="glyphicon glyphicon-search" :class="{searchBlue:routeName=='globalSearch'}"></span>
                        </a>
                    </li>
                    <li>
                        <router-link :to="{ name: 'profile' }"><span class="glyphicon glyphicon-user" :class="{searchBlue:routeName=='user'}"></span>
                        </router-link>
                    </li>
                    <li>
                        <a @click="logout"><span class="glyphicon glyphicon-log-out" ></span></a>
                    </li>
                </ul>
            </div>
            <div class="lf-nav" v-show="!searchModal">
                <div class="hanbao">
                    <!-- TODO 制作汉堡包按钮 -->
                    <button class="navbar-toggle" data-toggle="collapse" data-target="#nav_navs">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>

                <div id="nav_navs" class="collapse">
                    <ul class="nav navbar-nav">
                        <li>
                            <router-link :to="{ name: 'TodayRecommend' }" replace :class="{weight:routeName=='TodayRecommend'}">今日推荐
                            </router-link>
                        </li>
                        <li class="navSite">
                            <router-link :to="{ name: 'WebsiteFocus' }" replace :class="{weight:routeName=='WebsiteFocus'}">网站关注</router-link>
                        </li>
                        <li class="btn_topic_follow">
                            <router-link :to="{ name: 'Subscription' }" :class="{weight:routeName=='Subscription'}">专题订阅</router-link>
                        </li>
                        <li class="btn_topic_custom">
                            <router-link :to="{ name: 'TopicCustom' }" :class="{weight:routeName=='TopicCustom'}">专题定制</router-link>
                        </li>
                        <li class="instan">
                            <router-link :to="{ name: 'RelationSearch' }" :class="{weight:routeName=='RelationSearch'}">关系搜索
                            </router-link>
                        </li>


                        <li class="navKnow">
                            <router-link :to="{ name: 'KnowledgeBase' }" :class="{weight:routeName=='KnowledgeBase'}">知识库
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
        <div class="header_searchbg"  @click="searchModal=false">
            <div class="header_search" @click.stop="">
                <div class="header_search_input">
                    <!-- 搜索的放大镜-->
                        <div>
                            <span class="glyphicon glyphicon-search" @click="searchbykey"></span>
                        </div>
                        <input type="text" id="globalSearchkey" autocomplete="off" placeholder=" 请输入搜索内容"
                               v-model="keyWord"
                               @blur="hintHide"
                               @focus="hints.length!=0&&(hintShow = true)"
                               @keyup="keyWordHnit"
                               @keydown.enter="search"
                               @keydown.down="hintDown()"
                               @keydown.up="hintUp()">

                </div>
                <div class="header_search_hint" v-show="hintShow">
                    <ul @mouseover="hintHideCan=false" @mouseout="hintHideCan=true">
                        <li v-for="(hint,index) in hints" :class="{curr:hintNow==index}" @click="hintToInput(hint)"
                            @mouseover="mouseoverHint(index)" @enter="mouseoverHint(index)">
                            {{hint}}
                        </li>
                    </ul>
                </div>
                <!-- 关闭search按钮-->
                <!--<a href="#">×</a>-->
            </div>
        </div>
    </nav>
</template>
<script>
    import _ from 'lodash';
    import conf from './../Conf';

    export default{
        data(){
            return {

//                全局搜索功能
                searchModal:false,
                keyWord: '',//输入框
                keyWordOld:'',
                hints: [],//输入框中返回的搜索提示
                hintNow: -1,
                hintShow: false,
                hintHideCan: true,
                routeName:this.$route.matched[1].name
            }
        },
        watch: {
            $route: function () {
                this.routeName=this.$route.matched[1].name
                this.keyWord='';
                this.hints=[];
            },
            hints:function(){
                if(this.hints.length==0){
                    this.hintShow=false;
                }
            },
            searchModal:function(){
                if(this.searchModal) {
                    $('.header_searchbg').fadeIn(300);
                    $('#globalSearchkey').focus();
                }else{
                    $('.header_searchbg').fadeOut(300);
                }
            },
        },
        methods: {
            logout: function () {
                delete sessionStorage.userInfo;
                this.$router.push(location = conf.prePath+'/login');
            },
            keyWordHnit: function () {

                if(arguments[0].keyCode.keyCode==38 || arguments[0].keyCode.keyCode==40)return;

                if(this.keyWord!=''){
                    let self = this;
                    _.debounce(//当发生改变时延迟100ms请求数据
                        function () {
                            self.$http.post(conf.bathPath + '/info/globalSearchHint', {keyword: self.keyWord}).then((res) => {
                                self.hints = res.data.res;
                                if(!self.hints){
                                    self.hints=[]
                                }
                                self.hintShow = true;
                            },(err) => {
                                console.log(err);
                            })
                        }, 100)();
                }else{
                    this.hintShow=false;
                    this.hints=[];
                }


                if(this.keyWordOld==this.keyWord){
                    return;
                }
                this.keyWordOld=this.keyWord

            },
            search:function(){
                if (this.hintNow != -1) {
                    this.keyWord = this.hints[this.hintNow]
                }
                this.searchbykey();
            },
            searchbykey: function () {//查询
                if (this.keyWord == '') {
                    return;
                } else {
                    this.$router.push(conf.prePath+'/globalSearch/' + this.keyWord);
                    this.searchModal=false;
                }
            },
            hintHide: function () {
                if (this.hintHideCan) {
                    this.hintShow = false;
                }
            },
            hintToInput: function (hint) {
                this.keyWord = hint;
                this.hintShow = false;
            },

            hintDown: function (input) {
                if (!this.hintShow) {
                    return
                }
                this.hintNow++;
                if (this.hintNow == this.hints.length) this.hintNow = -1;
            },
            hintUp: function (input) {
                if (!this.hintShow) {
                    return
                }
                this.hintNow--;
                if (this.hintNow == -2) this.hintNow = this.hints.length - 1;
            },
            //鼠標在hint上面移動時,hint選中效果
            mouseoverHint: function (index) {
                this.hintNow = index;
            },
        }

    }
</script>
<style scoped>


    a {
        cursor: pointer
    }

    header nav .container > div {
        padding-right: 0px;
        padding-left: 0px;
    }

    .navbar-nav > li > a {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #fff;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #fff;
    }

    input:-ms-input-placeholder {
        color: #fff;
    }

    input::-webkit-input-placeholder {
        color: #fff;
    }

    .navbar-inverse {
        background: #333;
    }

    .navbar-inverse .navbar-brand > span {
        font-size: 30px;
        font-weight: 700;
        color: #fff;
    }

    .navbar-inverse .navbar-nav > li {
        color: #fff;
        float: left;
        margin-right: 20px;
    }

    .navbar-inverse .navbar-nav > li > a {
        font-family: 'Microsoft YaHei';
        color: #fff;
        font-size: 18px;
        font-weight: 300;
    }

    .navbar-inverse .navbar-nav > li > a.weight {
        font-weight: 600;
        color: #4284f3;
    }

    .navbar-inverse .nav_right > li > a {
        font-size: 17px;
    }
    .searchBlue{
        color: #4284f3;
    }

    .navbar-inverse .nav_right > li {
        margin-right: 2px;
    }

    .navbar-inverse .navbar-nav > li > a:hover {
        color: #4284f3;
    }

    .navbar-inverse .navbar-nav .navbar-nav > li {
        margin-right: 0px;
    }

    header {
        position: relative;
        top: 0;
        left: 0;
        z-index: 5000;
    }

    @media (min-width: 1120px) {
        #nav_navs {
            display: block;
        }

        .hanbao {
            display: none;
        }
    }

    @media (min-width: 0px) and (max-width: 1119px) {
        .hanbao {
            display: block;
        }

        .hanbao > button {
            display: block;
        }

        #nav_navs {
            background: #444;
            position: fixed;
            top: 50px;
            left: 0px;
            width: 100%;
        }
    }

    .container {
        width: 90%;
    }

    .lf {
        float: left;
    }

    /*网站图标*/
    .lf-log {
        width: 140px;
    }

    /*网站各个导航*/
    .lf-nav {
        box-sizing: border-box;
        width: auto;
        margin-left: 140px;
        margin-right: 200px;
    }

    /*右侧三个图标*/
    .lf-icon {
        float: right;
        width: 200px;
    }

    #nav_navs > ul {
        box-sizing: border-box;
        float: left;
        margin: 0;
        width: 100%;
    }

    #nav_navs > ul > li {
        width: 16%;
        margin-right: 0;
    }


    /*******************搜索框样式****************************************************/
    .header_searchbg {
        display: none;
        position: fixed;
        z-index: 5000;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.2);
    }
    .header_search {
        min-width: 500px;
        z-index: 200;
        width: 50%;
        top: 0;
        left: 25%;
        right: 25%;
        margin: 0 auto;
        position: absolute;
        color: rgba(255,255,255,0.8);
    }
    .header_search_input {
        box-sizing: border-box;
        padding: 10px 0 13px 15%;
    }
    .header_search_input>div {
        height: 30px;
        float: left;
        margin-left: -17.5%;
    }

    .header_search_input>div>span {
        display: inline-block;
        padding: 3px;
        font-size: 25px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        color: #fff;
    }
    .header_search_input>div>span:hover {
        color: #aaa;
    }
    .header_search_input>input {
        /* padding-left: 15px; */
        /* margin-left: -15px; */
        height: 30px;
        width: 100%;
        font-size: 20px;
        background: transparent;
        border: none;
        /* border-left: 1px solid #fff; */
        outline: none;
        color: rgba(255, 255, 255, 0.95);
    }


    .header_search_input :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #ccc;
        font-size: 18px;
    }

    .header_search_input ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #ccc;
        font-size: 18px;
    }

    .header_search_input>input:-ms-input-placeholder {
        color: #ccc;
        font-size: 18px;
    }

    .header_search_input>input::-webkit-input-placeholder {
        color: #ccc;
        font-size: 18px;
    }
    .header_search_hint {
        padding: 0;
        z-index: 200;
        background: rgba(0,0,0,0.3);
        font-size: 20px;
        width: 100%;
        position: absolute;
        top: 50px;
        left: 0;
    }
    .header_search_hint>ul {
        padding: 0;
        margin: 0;
    }
    nav .header_search_hint>ul>li {
        padding: 5px 0 5px 15%;
        cursor: pointer;
        margin: 0;
        list-style: none;
        font-size: 20px;
    }
    .curr {
        background: rgba(0,0,0,0.5);
    }

</style>