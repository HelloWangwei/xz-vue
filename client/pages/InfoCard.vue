<template>
    <section class="card">
        <div class="card_left col-md-9">
            <div class="card_head">
                <h1>{{info.title}}</h1>
                <div class="card_right_head">
                    <a @click="collection()" ><span :class="{collectioned:collectioned}">{{collectmsg}}</span></a>
                    <!--<a href=""><span></span></a>-->
                </div>
                <p>{{info.author}}</p>
                <a :href="info.url" target="_blank">{{info.url}}...</a>
                <div>{{info.deploytime}}</div>
            </div>
            <div class="card_main">
                <div class="digest">
                    <span>摘要 ：</span>
                    <p>{{info.abstractcontent}}
                    </p>
                </div>
                <div class="text" v-html="info.content"></div>
            </div>
        </div>
        <div class="card_right col-md-3">
            <div class="card_right_body">
                <h3>相关实体</h3>
                <ul>
                    <li>
                        <h3><b class="checked" @click="filterbykeywords"></b><i class="c_Programs"></i>项目</h3>
                        <ul>
                            <li v-for="(program,index) in programs"><b class="checked"@click="filterbykeyword(program,$event)"></b><span
                                    @click="searchbykeyword('program',program)">{{program}}</span></li>
                        </ul>
                    </li>
                    <li>
                        <h3><b class="checked" @click="filterbykeywords"></b><i class="c_Persons"></i>人员</h3>
                        <ul>
                            <li v-for="(person,index) in persons"><b class="checked"@click="filterbykeyword(person,$event)"></b><span
                                    @click="searchbykeyword('person',person)">{{person}}</span></li>

                        </ul>
                    </li>
                    <li>
                        <h3><b class="checked" @click="filterbykeywords"></b><i class="c_Organizations"></i>机构</h3>
                        <ul>
                            <li v-for="(organization,index) in organizations"><b class="checked"@click="filterbykeyword(organization,$event)"></b><span
                                    @click="searchbykeyword('organization',organization)">{{organization}}</span></li>

                        </ul>
                    </li>
                    <li>
                        <h3><b class="checked" @click="filterbykeywords"></b><i class="c_Technology"></i>技术</h3>
                        <ul>
                            <li v-for="(tech,index) in techs"><b class="checked"@click="filterbykeyword(tech,$event)"></b><span
                                    @click="searchbykeyword('tech',tech)">{{tech}}</span></li>

                        </ul>
                    </li>

                    <li>
                        <h3><b class="checked"  @click="filterbykeywords"></b><i class="c_Location"></i>地区</h3>
                        <ul>
                            <li v-for="(location,index) in locations"><b class="checked"@click="filterbykeyword(location,$event)"></b><span
                                    @click="searchbykeyword('location',location)">{{location}}</span></li>

                        </ul>
                    </li>

                    <li>
                        <h3><b class="checked" @click="filterbykeywords"></b><i class="c_Countries"></i>国家</h3>
                        <ul>
                            <li v-for="(country,index) in countrys"><b class="checked" @click="filterbykeyword(country,$event)"></b><span
                                    @click="searchbykeyword('country',country)">{{country}}</span></li>
                        </ul>
                    </li>

                    <li>
                        <h3>参考文章</h3>
                        <ul>
                            <li v-for="(relatedArticle,index) in relatedArticles" v-if="relatedArticles.length>0">
                                <a :href="relatedArticle" target="_blank">{{relatedArticle}}</a></li>
                            <li v-for="(webArticle,index) in webArticles" v-if="!relatedArticles.length>0">
                                <a :href="webArticle" target="_blank">{{webArticle}}</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div id="myModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">


                    <div class="">

                        <div class="widget-box">
                            <div class="header blue">
                                <h5 style="position: relative">添加笔记 <span id="editClose"  @click="closeEditNode" style="position:absolute;right:0;top:-5px; padding:5px;" class="glyphicon glyphicon-remove"></span></h5>
                            </div>

                            <div class="widget-body">
                                <div class="widget-main no-padding">
                                    <div class="wysiwyg-editor" id="editor2" contenteditable="true" v-bind="noteContent"></div>
                                </div>

                                <div class="widget-toolbox padding-4 clearfix">
                                    <div class="btn-group pull-left">
                                        <button id="editCancel" class="btn btn-sm btn-default" @click="closeEditNode">
                                            <i class="icon-remove bigger-125"></i>
                                            取消
                                        </button>
                                    </div>

                                    <div class="btn-group pull-right">
                                        <button id="editSave" @click="saveNote" class="btn btn-sm btn-info">
                                            <i class="icon-save bigger-125"></i>
                                            保存
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div id="addNote" @click="addNote"><span class="glyphicon glyphicon-pencil"></span></div>
    </section>
</template>

<script>
    import conf from './../Conf';

    export default{
        data(){
            return {
                collectmsg:'收藏',//收藏
                //文章内容
                info: {},

                //六大类
                programs: [],
                persons: [],
                organizations: [],
                techs: [],
                locations: [],
                countrys: [],

                //参考文章
                relatedArticles: [],
                webArticles: [],

                collectioned:false,
                collArray:[],//关注的文章id数组
                prevText:'',//记录文章
                regg:eval(/\/|\s|\.| |"/g),//去空格正则

                focusContent:'',//选取的内容
                focusStart:0,//用来判断选取时鼠标是否在文本中
                start:'',//笔记起始点
                end:'',//笔记结束点
                noteCount:'001',

                noteCurArr:[],//用来验证选择位置能否添加笔记的本地数组,

                noteContent:'',
                insertI:0,//本地的划了线的文字位置数组
            }
        },
        created: function () {
            let id = this.$route.params.id;
            this.init(id);
        },
        methods: {
            init: function (id) {
                let self = this;
                this.collArray = JSON.parse(localStorage.userCollectionIDs);
                this.$http.post(conf.bathPath + '/info/infoDetail', {id: id}).then((res) => {
                    self.info = res.data.info;
                    self.programs = res.data.program;
                    self.persons = res.data.person;
                    self.organizations = res.data.organization;
                    self.tech = res.data.tech;
                    self.location = res.data.location;
                    self.country = res.data.country;
                    self.relatedArticles = res.data.related;
                    for(let coll of this.collArray){
                        if (coll == self.info.id){
                            self.collectioned = true;
                            self.collectmsg = '取消';
                            break
                        }
                    }
                    this.markbykeyword();

                    this.noteInit();
                    console.log(self.info)
                }, (err) => {

                });
            },
            addCollection:function () {//取消收藏
                let body={
                    userID:sessionStorage.userInfo,
                    article:{
                        id:this.info.id,
                        url:this.info.url,
                        imageName:'',
                        title:this.info.title,
                    }
                }
                this.$http.post(conf.bathPath + '/info/addUserCollection',body).then(function(res){
                    this.collArray.push(body.article.id);
                    localStorage.userCollectionIDs=JSON.stringify(this.collArray);
                },function(err){console.log(err)});
            },
            cancelCollection:function (id) {//添加收藏
                this.$http.post(conf.bathPath + '/info/cancelUserConnection',{userID:sessionStorage.userInfo,infoID:id}).then(function(res){
                    for(let index of this.collArray.map((cID,i)=>[i,cID])){
                        if(index[1] == id){
                            this.collArray.splice(index[0],1);
                            break;
                        }
                    }
                    localStorage.userCollectionIDs=JSON.stringify(this.collArray);
                },function(err){console.log(err)});
            },
            collection:function(){//点击收藏按钮
                this.collectioned = !this.collectioned;
                if(this.collectioned){
                    this.collectmsg="取消";
                    this.addCollection();

                }
                else {
                    this.collectmsg="收藏";
                    this.cancelCollection(this.info.id);
                }
            },
            searchbykeyword:function (str,key) {
                window.open(conf.prePath+'/KeywordList/'+str+'/' + key);
            },
            markbykeyword:function(){//页面初始化将关键词高亮
                let self= this;
                $(function () {//页面准备好之后遍历页面中的关键词
                    var text = self.info.content
                    var spanArr = [];
                    $('.card_right_body li li span').each(function () {
                        spanArr.push($(this));
                        spanArr.sort(function (a, b)//给所有的关键词按大到小排序
                        {
                            return b.html().length - a.html().length;
                        });
                    });
                    spanArr.forEach(function (i) {//遍历关键词的数组
                        var reg = eval("/"+ i.html().replace(/(\/|\(|\))/g, "\\$1") + "/ig");//解决关键词中有'/';

                        var color = i.parent().parent().parent().find('h3 i').attr('class');

                        var mark = i.parent().find('span').html().replace(self.regg, "");
                        text = text.replace(reg, "<span class='" + color + " " + mark + "'>$&</span>");
                    });

                    self.prevText = text.replace(/(<img[^>]*?)(<span[\S\s]*?>)([\S\s]*?)(<\/span>)([\S\s]*?>)/gi,"$1$3$5")
                    self.$set(self.info,'content',self.prevText);

                });//页面准备好之后遍历页面中的关键词
            },
            filterbykeyword:function(str,e){//*********************关键词选框 *****************************************8
                var className = str.replace(this.regg, "");//当前被点击的class名

                if ($(e.target).hasClass('checked')) {
                    $(e.target).removeClass('checked');              //控制选框
                    $(e.target).parents('li').find('h3>b').removeClass('checked');


                    //控制文章中颜色
                    $('.card_main .text .' + className).addClass('_bg_off');
                } else {
                    $(e.target).addClass('checked');                 //控制选框
                    $(e.target).parents('li').find('h3>b').addClass('checked');
                    $(e.target).parent().parent().find('b').each(function () {
                        if (!$(this).hasClass('checked')) {
                            $(this).parents('li').find('h3>b').removeClass('checked');
                        }
                    });
                    $('.card_main .text .' + className).removeClass('_bg_off');//控制文章中颜色
                }
            },
            filterbykeywords:function (e) {
                //*********************关键词选框 全选*****************************************8
                let self = this;
                    if ($(e.target).hasClass('checked')) {
                        $(e.target).parents('li').find('b').removeClass('checked');//选框

                        $(e.target).parents('li').find('li span').each(function () {//文章背景色
                            $('.card_main .text .' + $(this).html().replace(self.regg, "")).addClass('_bg_off');
                        });

                    } else {
                        $(e.target).parents('li').find('b').addClass('checked');//选框

                        $(e.target).parents('li').find('li span').each(function () {//文章背景色
                            $('.card_main .text .' + $(this).html().replace(self.regg, "")).removeClass('_bg_off');
                        });
                    }



            },
            noteInit:function(){//-------------------------------作笔记初始化------------------------------------------------------------
                let self = this;
                //***********添加笔记按钮*********************************************

                $('body .text').on({
                    'mouseup': function (e) {
                        if (!self.focusStart||window.getSelection().toString().length==0) {
                            return;
                        }
                        var x = 15;//笔记图标x坐标
                        var y = 5;//笔记图标y坐标
                        var r = '';
                        var r1 = '';
                        var s='';
                        if (window.getSelection()) {

                            r = window.getSelection().getRangeAt(0);//获得range对象
                            r1 = window.getSelection().toString();//获得带有换行符的选中文本
                            s=window.getSelection();
                        }
                        else if (document.selection) {
                            r = document.selection.createRange().text;
                        }
                        if (r != "") {


                            var temp = document.createElement("u");

                            var compLength = document.createElement("u");//计算带标签的实际长度
                            var tempText = $('.text').html();

                            temp.id="###"+self.noteCount;
                            //$(temp).innerHTML=r1;

                            $(compLength).append(r.cloneContents());////计算带标签的实际长度

                            r.insertNode(temp);//

                            var str = '<u id="###'+self.noteCount+'">';
                            self.start = $('.text').html().indexOf(str);
                            self.end = self.start+$(compLength).html().length;
                            if(s.anchorNode.parentNode.tagName=='SPAN'){
                                //jian
                                self.end = self.end - (s.anchorNode.parentNode.outerHTML.length-s.anchorNode.parentNode.innerHTML.length-s.anchorNode.parentNode.tagName.length-3);
                            }
                            if(s.focusNode.parentNode.tagName=='SPAN'){
                                //jian
                                self.end =self.end-s.focusNode.parentNode.tagName.length-3;
                            }
                            tempText = tempText.slice(0,self.end)+'</u>'+tempText.slice(self.end);
                            tempText = tempText.slice(0,self.start)+'<u id="###'+self.noteCount+'">'+tempText.slice(self.start);


                            $('.text').html(tempText);
                            $('.text').blur();

                            self.focusContent = r1;//保存笔记时的保存内容
                            $("#addNote").css({
                                "top": (e.pageY + y) + "px",
                                "left": (e.pageX + x) + "px",
                                "position": "fixed"
                            }).fadeIn("fast");//铅笔按钮
                            self.focusStart = 0;

                        }
                    },
                    'mousedown': function (e) {
                        if($('.text').html()!=self.prevText){
                            $('.text').html(self.prevText);
                        }
                        self.focusStart = 1;
                        $("#addNote").fadeOut(0);
                        //e.stopPropagation();

                    }
                });

            },
            addNote:function(e){
                let self = this;
                    var editCan=true;

                    if(self.noteCurArr.length){
                        self.noteCurArr.forEach(function(d){
                            if(self.start>=d[0]&&self.start<d[1]||self.end>=d[0]&&self.end<d[1]){//判断落在已选区间
                                return editCan=false;
                            }else if(self.start<=d[0]&&self.end>=d[1]||self.start>=d[0]&&self.end<=d[1]){
                                return editCan=false;
                            }
                        });
                        if(!editCan){
                            alert('您选择的位置已做过笔记');

                            $('#myModal').modal('hide');
                            this.noteContent='';;
                            $('.text').html(self.prevText);//取消添加笔记是将刚刚画的下滑线取消
                            $("#addNote").fadeOut(0);

                            return;
                        }//如果与本地已选的段落冲突,直接不可选.

                        if(self.noteCurArr.length>0){
                            for(var i=0;i<self.noteCurArr.length;i++){
                                if(self.start<self.noteCurArr[i][0]){
                                    self.insertI = i;
                                    break;
                                }else{
                                    self.insertI = self.noteCurArr.length;
                                }
                            };
                            self.start-=self.insertI*19;
                            self.end-=self.insertI*19;
                        }


                    }

                    let body={
                        userid:sessionStorage.userInfo,
                        articid:self.info.id,
                        start:self.start,
                        end:self.end,
                    };
                this.$http.post(conf.bathPath + '/info/checkNote',body).then(function(res){
                    self.noteContent='';
                    if(res.body.flag==true){//没有重叠时候去做笔记
                        $('#myModal').modal('show');
                        $(this).css('display', 'none');
                        $('#editor2').focus();
                    }else{//已做过笔记
                        alert('您选择的位置已做过笔记');
                        $('#myModal').modal('hide');

                        $('.text').html(self.prevText);//取消添加笔记是将刚刚画的下滑线取消
                        $("#addNote").fadeOut(0);
                    }
                },function(err){console.log(err)});

            },
            closeEditNode: function (e) {//取消添加笔记
                $('#myModal').modal('hide');
                this.noteContent='';
                $('.text').html(self.prevText);//取消添加笔记是将刚刚画的下滑线取消
                $("#addNote").fadeOut(0);
            },

            saveNote:function(){//保存笔记
                let self = this;
                if($('#editor2').html()==''||$('#editor2').html()=='未填写任何笔记!'){
                        $('#editor2').html('未填写任何笔记!');
                        setTimeout(function(){
                            $('#editor2').html('');
                        },2000)
                        return;
                    }

                    var body = {};
                    body.userid = sessionStorage.userInfo,
                    body.articid = self.info.id;

                    body.artictitle=self.info.title;
                    body.articurl=self.info.url;
                    body.articimage=self.info.imageName;

                    body.notecontent = $('#editor2').html().replace(/<[^>]+>/g,"").replace(/&nbsp;/g,"");
                    body.content = self.focusContent;

                    body.start = self.start;
                    body.end = self.end;

                this.$http.post(conf.bathPath + '/info/saveNote',body).then(function(res){
                        $("#addNote").fadeOut(0);//隐藏小蓝笔
                        $('#myModal').modal('hide');//隐藏输入框
                        self.noteContent='';//输入笔记内容清空

                        self.prevText=$('.text').html();//将保留内容置为当前的//这个变量是为了将未保存的时候的下划线取消

                        self.noteCount=parseInt(self.noteCount)+1;//将变量改变,作为indexof标记
                        if(self.noteCount<10){self.noteCount = '00'+self.noteCount}
                        else if(self.noteCount<100){self.noteCount = '0'+self.noteCount}
                        else if(self.noteCount>999){alert('不能再添加笔记了')}

                        if(self.noteCurArr.length){
                            self.noteCurArr.forEach(function(d,i){
                                if(i>=self.insertI){
                                    d[0]+=19;
                                    d[1]+=19;
                                }
                            });
                        }
                        self.noteCurArr[self.insertI]=[self.start,self.end+19];//维护这个本地验证数组
                },function(err){console.log(err)});
                       
            },

    },
        mounted:function(){

        },
    }

</script>

<style lang="css" scoped>
    .card_right_body li li span {
        cursor: pointer;
    }

    .card {
        padding: 30px 50px 60px;
        min-height: 800px;
    }
    .card_left, .card_right {
        padding: 0;
    }
    .card_left {
        padding-right: 20px;
    }



    .card_head {
        text-align: right;
        color: #999999;
        padding: 0 20px;
        position: relative;
    }

    .card h1 {
        font-size: 24px;
        color: #000;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .card_head > a,.card_head>div{
        color: #ccc;
        font-size: 12px;
    }
    .card_head > a{
        cursor: pointer;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
        display: inline-block;
    }
    .card_head p{
        margin-bottom:10px;
    }


    .card_main {
        font-size: 14px;
        margin-top: 7px;
    }

    .card_main > .digest {
        background: #f3f2f0;
        padding: 5px 20px;
    }

    .card_main > .text {
        padding: 5px 20px;
    }

    .card_main > .text img {
        display: block;
        max-width: 100%;
    }


/*左侧部分*/
    .card_right_head {
        position: absolute;
        left: 0px;
        bottom: 0px;
    }
    .card_right_head > a {
        display: inline-block;
        height: 30px;
        width: 30px;
    }


    .card_right_head > a > span {
        display: inline-block;
        width: 53px;
        height: 30px;
        font-size:14px;
        line-height: 33px;
        color: #000;
        background: url(../static/img/uncollect.png) left no-repeat;
        background-size: 20px;
    }
    .card_right_head > a > span.collectioned{
        background: url(../static/img/collected.png) left no-repeat;
        background-size: 20px;
    }
    h3{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .card_right_body > h3 {
        font-size: 16px;
        color: #999;
    }
    .card_right_body ul {
        padding: 0;
    }

    .card_right_body > ul > li {
        margin-bottom: 35px;
    }

    .card_right_body > ul > li > h3 {
        position: relative;
        background: #f3f2f0;
        color: #333;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
    }

    .card_right_body ul {
        padding: 0;
    }

    .card_right_body > ul > li > ul > li {
        overflow: hidden;
        width: 100%;
        font-size: 14px;
        color: #999;
        line-height: 20px;
        height: 20px;
        text-decoration: underline;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .card_right_body li h3 b, .card_right_body li li b {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        width: 18px;
        height: 18px;
        background: url(./../static/img/blue.png) no-repeat;
        border: none;
        cursor: pointer;
        background-position: 0 0;
        margin-right: 5px;
    }
    .card_right_body li h3 b {
        position: absolute;
        top: 4px;
        left: 0;
    }

    .card_right_body li h3 b.checked, .card_right_body li li b.checked {
        background-position: -40px 0;
    }


    .card_right_body li h3 i {
        position: absolute;
        top: 4px;
        left: 30px;
        vertical-align: middle;
        margin-right: 8px;
        display: inline-block;
        width: 18px;
        height: 18px;
    }



    .card_right_body > ul > li > ul > li > a {
        text-decoration: underline;
        color: #999;
    }

    #addNote {
        text-align: center;
        font-size: 25px;
        width: 30px;
        height: 30px;
        display: none;
        cursor: pointer;
        background: #0098d9;
        border-radius: 5px;
    }


    #myModal .modal-dialog{
        margin:0 auto;
        margin-top:200px;
    }
    .modal-content{
        border-radius: 2px;
    }
    .header.blue {
        border-bottom-color: #d5e3ef;
        padding-left:7px;
        line-height: 28px;
        margin-top:8px;
    }
    .widget-box {
        font-style: normal;
        font-weight: 500;
        color:#735290;
        padding: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-bottom: 1px solid #CCC;
    }
    .widget-body {
        border: 1px solid #CCC;
        border-top: 0;
        background-color: #82af6f;;
    }
    .widget-main.no-padding {
        padding: 0;
    }
    .wysiwyg-editor {
        max-height: 250px;
        height: 250px;
        background-color: #f7f8fa;
        border-collapse: separate;
        border: 1px solid #bbc0ca;
        padding: 4px;
        box-sizing: content-box;
        overflow-y: scroll;
        overflow-x: hidden;
        outline: 0;
    }
    .widget-toolbox.padding-4 {
        padding: 4px;
        background-color: #EEE;
    }

</style>
<style>
    .card .c_Programs {
        background: #e73c3c;
    }

    .card .c_Persons {
        background: #0098d9;
    }

    .card .c_Organizations {
        background: #f0d84f;
    }

    .card .c_Technology {
        background: #00b053;
    }

    .card .c_Location {
        background: #b9bfc1;
    }

    .card .c_Countries {
        background: #735290;
    }

    .card ._bg_off {
        background: none;
        border: none !important;
    }

    .card .c_Programs span, .card .c_Persons span, .card .c_Organizations span, .card .c_Technology span, .card .c_Location span, .card .c_Countries span {
        border: 2px solid #333;
    }
</style>