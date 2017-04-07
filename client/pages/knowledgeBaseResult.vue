<template>
    <div class="box">
        <searchbar @searchbykey="searchbykey" @keyWordHnit="keyWordHnit"></searchbar>
        <section class="info_show" style="">
            <div class="container">
                <div id="title" class="" lang="en" v-html="knowledge.title">
                </div>
                <div class="container">
                    <div v-show="knowledge.none">
                        <p class="errimg"><span
                                class="errp">The informations you have searched for does not exist.</span></p>
                        <p><span class="errp">Please try another keyword</span></p>
                    </div>
                </div>

                <div class="contentshow">
                    <div class="contentinfo">

                        <div class="mainbody" style="display:inline;">
                            <div v-html="knowledge.body"></div>
                            <!--结果页主体部分-->
                        </div>

                    </div>
                </div>
            </div>

        </section>

    </div>
</template>

<script>
    import searchbar from '../components/searchbar.vue';
    import conf from './../Conf';
    import _ from 'lodash';
    export default{
        data(){
            return {
                knowledge: {
                    title:'',
                    body:'',
                    none:false,
                    keyword:''
                },
            }
        },
        watch:{
        },
        created: function () {
            let self = this;
            this.keyword = this.$route.params.keyword.replace('-wiki-', '.');;
            this.$http.post(conf.bathPath + '/wiki/pageSearch', {keyword: this.keyword}).then((res) => {
                self.knowledge.none=false
                if(res.data!=null){
                    self.knowledge.body = res.data.body.replace(/<a href="\/wiki\//g,'<a href="'+conf.prePath+'/KnowledgeBaseResult/');
                    self.knowledge.title = res.data.title;
                }else{
                    self.knowledge.none=true
                }
            }, (err) => {
                self.knowledge.none=true
                console.log(err);
            });
        },
        methods:{
            searchbykey: function (keyword) {
                this.$router.push(location = conf.prePath+'/KnowledgeBaseResult/' + keyword);
            },
            keyWordHnit:function(searchThis){
                let self = searchThis;
                _.debounce(//当发生改变时延迟500ms请求数据
                    function () {
                        self.$http.jsonp(conf.wikiPath + self.keyWord, {headers: {'Api-User-Agent': 'Example/1.0'}}).then((res) => {
                            self.hints = res.data[1];
                            if (!self.hints) {
                                self.hints = []
                            }
                            self.hintShow = true;
                        }, (err) => {
                            console.log(err);
                        });
                    }, 100)()
            }
        },
        components: {
            searchbar: searchbar,
        },
        updated:function(){
            (function () {//***********************************************************

                defaultfn();

                function defaultfn(){
                    $('h2 .mw-editsection a').each(function(){
                        if($(this).html()=='edit'){
                            $(this).parent().remove();
                        }
                    });

                    // navbox显示隐藏
                    var firsth = $('.nowraplinks').find('tr:not(:first-child)');
                    firsth.hide();
                    var addspan = $(".navbox:not(:last-child)>.collapsed>tbody>tr:first-child").find('th');


                        addspan.prepend('<span class="collapseButton">[show]</span>');
                        var addspans=$('.navbox[aria-label="Navbox"]').find("th").find('span');
                        addspans.remove();

                    $(".collapseButton").on('click',function(){
                        var showbox = $(this);
                        var zn = $(this).parents('.nowraplinks').find('tr:not(:first-child)');
                        if(showbox.text()=="[show]"){
                            showbox.text("[hide]");
                            zn.show();
                        }else{
                            showbox.text("[show]");
                            zn.hide();
                        };
                    });

                    // contents显示隐藏
                    var addhide = $("#toctitle");
                    addhide.append('<span class="toctoggle">[hide]</span>');
                    $(".toctoggle").click(function(){
                        var conhide = $(this);
                        var con = $(this).parents('#toc').find('ul');
                        con.fadeToggle();
                        console.log()
                        if(conhide.text()=="[hide]"){
                            conhide.text("[show]");
                        }else{
                            conhide.text("[hide]");
                        };

                    });
                    // 点击目录跳转
                    $(".toclevel-1").on('click',function(e){
                        var e = window.event || e
                        e.preventDefault();
                        var ridd=$(this).children('a').attr('href');
                        $('body,html').animate({scrollTop:($(ridd).offset().top-50)},500,function(){

                        })
                    });

                    // 点击上标跳转
                    $(".reference").on('click',function(e){
                        var e = window.event || e
                        e.preventDefault();
                        var rid=$(this).children('a').attr('href');

                        $('body,html').animate({scrollTop:$(rid).offset().top-120},500,function(){
                            $(rid).css('background','#B0C4DE').siblings().css('background','none')
                        })
                    });

                    //为a添加新页面跳转
//                $('.contentinfo a').attr('target','_blank');
                }
            })();//***********************************************************************

        },
    }









</script>



<style lang="css" scoped>

    .container{
        width:100%;
        padding:0 3.5%;
    }
    .info_show {
        font-size: 16px;
        background: #f6f6f6;
        overflow: hidden;
    }


    .alerttitle {
        display: none;
        line-height: 30px;
        margin-left: 120px;
        font-size: 14px;
    }

    .errimg {
        height: 32px;
        line-height: 32px;
        background: url("../static/img/err.png") left center no-repeat;
        background-size: 30px;
    }


    .errp {
        margin-left: 35px;
    }

    .errp {
        margin-left: 35px;
    }

    .showfrom {
        width: 100%;
        font-size: 90%;
        margin: 15px 0px;
    }

    .contentshow {
        width: 100%;
    }

    .contentinfo {
        min-height: 500px;
    }




</style>
<style>
    .mainbody tr,.mainbody td,.mainbody th{
        padding:3px;
    }
    .contentshow h1, .contentshow h2 {
        font-family: "Linux Libertine",Georgia,Times,serif;
        color: #000;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #666;
        padding-right: 96px;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .firstHeading{
        font-family: "Linux Libertine",Georgia,Times,serif;
        color: #000;
        height:38px;
        font-size:2em;
        line-height:38px;
        border-bottom: 1px solid #666;
        padding-right: 96px;
        padding-bottom:20px;
        margin-bottom: 10px;
        overflow:hidden;
    }

    .info_show{
        font-size:16px;
        background: #f6f6f6;
        overflow:hidden;
    }
    .showfrom{
        width:100%;
        font-size:90%;
        margin:15px 0px;
    }
    .contentshow{
        width:100%;
    }
    .infotable{
        width: 398px;
        border: 1px solid #aaa;
        border-spacing: 3px;
        background-color: #fff;
        color: black;
        font-size: 80%;
        padding:5px;
        margin-left:15px;
    }
    tr .infotd{
        text-align:center;
        line-height:170px
    }
    tr .thfirst{
        background-color:#B0C4DE;
        text-align:center;
        vertical-align:middle;
        font-size:110%;
    }
    tr .thsecond{
        background-color:#B0C4DE;
        text-align:left;
        padding-left:2px;
        vertical-align:middle;
        font-size:110%;
    }
    .infobox {
        border: 1px solid #aaa;
        border-spacing: 3px;
        background-color: #f9f9f9;
        color: black;
        margin: 0.5em 0 0.5em 1em;
        padding: 0.2em;
        float: right;
        clear: right;
        font-size: 88%;
        line-height: 1.5em;
    }
    .infobox tr{
        margin:10px;
    }
    .infobox td, .infobox th,.infobox tr{
        vertical-align: top;
        padding: 3px;
    }
    .contentright p{
        margin:10px 0px;
    }
    .thumbimg{
        border: 1px solid #ddd;
        vertical-align: middle;
    }
    .imgfooter{
        height:20px;
        line-height:20px;
        text-align:center;
    }
    .flagicon {
        display: inline-block;
        vertical-align: middle;
    }
    .flgimg{
        width:42px;
        height:28px;
        display: inline-block;
        margin-top: 3px;
    }
    #toc, .toc {
        display: table;
        zoom: 1;
        *display: inline;
        padding: 7px;
    }
    #toc, .toc, .mw-warning, .toccolours {
        border: 1px solid #aaa;
        background-color: #fff;
        padding: 9px;
        margin:8px 0px;
        font-size: 95%;
    }
    #toc #toctitle, .toc #toctitle, #toc .toctitle, .toc .toctitle {
        text-align: center;
    }
    .mw-body #toc h2, .mw-body .toc h2 {
        font-size: 100%;
        font-family: sans-serif;
    }
    #toc h2, .toc h2 {
        display: inline;
        border: none;
        padding: 0;
        font-size: 100%;
        font-weight: bold;
    }
    #togglelink{
        font-size:86%;
    }
    .showtoc{
        display:none;
    }
    #toc ul, .toc ul {
        list-style-type: none;
        list-style-image: none;
        margin-left: 0;
        padding: 0;
        text-align: left;
    }
    .mw-content-ltr .tocnumber {
        padding-left: 0;
        padding-right: 5px;
    }
    .tocnumber {
        padding-left: 0;
        padding-right: 5px;
        color: #222;
    }
    .tocnumber, .toctext {
        display: table-cell;
        text-decoration: inherit;
    }
    #toc ul ul, .toc ul ul {
        margin: 0 0 0 20px;
    }
    .toctoggle{
        font-size:80%;
        color:#0645ad;
        cursor:pointer;
    }
    .mw-body .mw-editsection, .mw-body .mw-editsection-like {
        font-family: sans-serif;
    }
    .mw-content-ltr .mw-editsection, .mw-content-rtl .mw-content-ltr .mw-editsection {
        margin-left: 10px;
    }
    .mw-editsection {
        white-space: nowrap;
        unicode-bidi: -moz-isolate;
        unicode-bidi: -webkit-isolate;
        unicode-bidi: isolate;
    }
    .mw-editsection, .mw-editsection-like {
        font-size: small;
        font-weight: normal;
        margin-left: 10px;
        vertical-align: baseline;
        line-height: 10px;
        display: inline-block;
    }
    .mw-editsection, #jump-to-nav {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    div.tleft {
        margin: 5px 14px 13px 0;
    }
    div.tleft, div.floatleft, table.floatleft {
        float: left;
        clear: left;
    }
    div.thumb {
        margin-bottom: 20px;
        width: auto;
        background-color: transparent;
    }
    div.thumbinner {
        border: 1px solid #ccc;
        padding: 3px;
        background-color: #f9f9f9;
        font-size: 94%;
        text-align: center;
        overflow: hidden;
    }
    .mbox-small {
        clear: right;
        float: right;
        margin: 4px 0 4px 1px;
        box-sizing: border-box;
        width: 238px;
        font-size: 88%;
        line-height: 12px;
    }
    div.tright {
        clear: right;
        float: right;
        margin: 5px 0 13px 14px;
    }
    div.thumb {
        margin-bottom: 5px;
        width: auto;
        background-color: transparent;
    }
    div.reflist, div.refbegin {
        font-size: 90%;
        margin-bottom: 5px;
    }
    div.reflist ol.references {
        font-size: 100%;
        margin-bottom: 0;
        margin-top: 0;
        list-style-type: inherit;
    }
    .mw-content-ltr ol, .mw-content-rtl .mw-content-ltr ol {
        margin: 0.3em 0 0 3.2em;
        padding: 0;
    }
    .nocolbreak, div.columns li, div.columns dd dd {
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid-column;
    }
    .references-column-width{
        -moz-column-width: 32em;
        -webkit-column-width: 32em;
        column-width: 32em;
        list-style-type: decimal;
    }
    .citation {
        word-wrap: break-word;
    }
    cite, dfn {
        font-style: inherit;
    }
    .navbox{
        box-sizing: border-box;
        width: 100%;
        clear: both;
        font-size: 88%;
        text-align: center;
        padding: 1px;
        margin: 1em auto 0;
        border:1px solid #aaa;
    }
    .navbox-inner, .navbox-subgroup {
        width: 100%;
    }
    .navbox-group, .navbox-title, .navbox-abovebelow {
        padding: 0.25em 1em;
        line-height: 1.5em;
        text-align: center;
    }
    .collapseButton{
        color:#0645ad;
        cursor:pointer;
        float: right;
        font-weight: normal;
        text-align: right;
    }
    .navbox-title .navbar {
        float: left;
        text-align: left;
        margin-right: 0.5em;
    }
    .navbox .navbar {
        display: block;
        font-size: 100%;
    }
    .navbox .navbar {
        display: inline;
        font-size: 88%;
        font-weight: normal;
    }
    .mw-body-content .navbar ul {
        line-height: inherit;
    }
    .navbox .navbar ul {
        display: inline;
        white-space: nowrap;
        margin-left: 20px;
    }
    .plainlinks ul{
        margin-left: 20px;
    }
    .plainlinks ul li{
        float: left;
        margin-left: 8px;
    }
    .navbox table{
        background-color:#fff !important;
    }
    th.navbox-group {
        white-space: nowrap;
    }
    .navbox-even {
        background: #f7f7f7;
    }
    .navbox th, .navbox-title {
        background: #ccccff;
    }
    .navbox-abovebelow, th.navbox-group, .navbox-subgroup .navbox-title {
        background: #ddddff;
    }
    .navbox-list {
        line-height: 1.5em;
        border-color: #fdfdfd;
    }
    .navbox-odd ul{
        margin-bottom: 0;
        margin-top: 0;
    }
    .navbox-odd ul li{
        display:inline;
        margin-right:0.6em;
    }
    .navbox ul li {
        list-style:none;
    }
    .references li:nth-child(2n){
        margin-top:1em;
    }
    .references li:nth-child(2n+3){
        margin-top:1em;
    }
    /*table*/
    table.wikitable {
        margin: 1em 0;
        background-color: #f8f9fa;
        border: 1px solid #a2a9b1;
        border-collapse: collapse;
        color: #000;
    }
    table.wikitable > tr > th, table.wikitable > * > tr > th {
        background-color: #eaecf0;
        text-align: center;
    }
    table.wikitable > tr > th, table.wikitable > tr > td, table.wikitable > * > tr > th, table.wikitable > * > tr > td {
        border: 1px solid #aaa;
        padding: 0.2em 0.4em;
    }
    .plainlinks{
        min-height: 0;
        margin-bottom: 0;
    }
</style>