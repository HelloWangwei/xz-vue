<template>
    <div>
        <section class="note" style="min-height: 301px;">
            <div class="note_left col-sm-7">
                <div><h2>原文</h2></div>
                <div class="note_head">

                    <h1>{{info.title}}</h1>
                    <p>{{info.author}}</p>
                    <a :href="info.url" target="_blank"
                       title="http://mil-embedded.com/news/f-35-lightning-ii-moa-signed-between-terma-and-bae-systems/">{{info.url}}</a>

                </div>
                <div class="note_main">
                    <div class="scroll">
                        <div class="digest">
                            <span>摘要 ：</span>
                            <p>{{info.abstractcontent}}</p>
                        </div>
                        <div class="text" v-html="info.content">
                        </div>


                    </div>

                    <div id="shuxian"></div>
                </div>


            </div>

            <div class="note_right col-sm-5">
                <div><h2>我的笔记</h2></div>
                <div class="note_right_head">
                    <div>{{noteFocus.createtime}}</div>
                </div>
                <div class="note_right_body">
                    <div id="noteEdit" @click="editSaveNote"><span
                            :class="[noteEditing?'glyphicon glyphicon-floppy-saved':'glyphicon glyphicon-pencil']"></span>
                    </div>

                    <div class="scroll">
                        <div id="noteContent" :contenteditable="noteEditing">
                            {{noteFocus.notecontent}}

                        </div>
                    </div>

                </div>
            </div>


        </section>

        <!--用来加工正文,使坐标与卡片页一致-->
        <div class="card_right_body" style="display: none">
            <h3>相关实体</h3>
            <ul>
                <li>
                    <h3><i class="c_Programs"></i>项目</h3>
                    <ul>
                        <li v-for="(program,index) in info.program"><span
                        >{{program}}</span></li>
                    </ul>
                </li>
                <li>
                    <h3><i class="c_Persons"></i>人员</h3>
                    <ul>
                        <li v-for="(person,index) in info.person"><span
                        >{{person}}</span></li>

                    </ul>
                </li>
                <li>
                    <h3><i class="c_Organizations"></i>机构</h3>
                    <ul>
                        <li v-for="(organization,index) in info.organization"><span
                        >{{organization}}</span></li>

                    </ul>
                </li>
                <li>
                    <h3><i class="c_Technology"></i>技术</h3>
                    <ul>
                        <li v-for="(tech,index) in info.tech"><span
                        >{{tech}}</span></li>

                    </ul>
                </li>

                <li>
                    <h3><i class="c_Location"></i>地区</h3>
                    <ul>
                        <li v-for="(location,index) in info.location"><span
                        >{{location}}</span></li>

                    </ul>
                </li>

                <li>
                    <h3><i class="c_Countries"></i>国家</h3>
                    <ul>
                        <li v-for="(country,index) in info.country"><span
                        >{{country}}</span></li>
                    </ul>
                </li>

            </ul>
        </div>
        <!--用来加工正文,使坐标与卡片页一致-->
    </div>
</template>

<script>

    import conf from './../Conf';
    export default{
        data(){
            return{
                noteID:this.$route.params.id,
                info:{},
                notes:{},
                prevText:'',//记录文章
                regg:eval(/\/|\s|\.| |"/g),//去空格正则
                noteEditing:false,

                noteFocus:{},
            }
        },

        watch:{

        },
        created:function(){
            this.init();

        },
        methods: {
            init: function (id) {
                let self = this;

                let body = {noteID:this.noteID}


                this.$http.post(conf.bathPath + '/info/openNote', body).then((res) => {
                        this.info = res.body.info;
                        this.notes = res.body.note.notes;
                    this.underLineInit();

                }, (err) => {
                    console.log(err)
                });
            },
            underLineInit:function(){//页面初始化将关键词高亮
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

                    self.prevText = text.replace(/(<img[^>]*?)(<span[\S\s]*?>)([\S\s]*?)(<\/span>)([\S\s]*?>)/gi,"$1$3$5")//到这里加完关键词背景色




                    var noteArr = self.notes;//笔记数组
                    var text1 = self.prevText;

                    noteArr.sort(function (a, b)//给所有的关键词按大到小排序
                    {
                        return b.start - a.start;
                    });
                    noteArr.forEach(function (d,i) {//遍历笔记的数组

                        text1 = text1.slice(0,d.end)+'</u>'+text1.slice(d.end);
                        text1 = text1.slice(0,d.start)+"<u class='underLine' data-index="+i+">"+text1.slice(d.start);
                    });

                    self.prevText =  text1;
                    $('.note_main .text').html(text1);


                    $('body .text').on('click','.underLine',function(){//页面上点击带下滑线得位置************************************
                        $('.text .underLine').removeClass('checkedNode');
                        $(this).addClass('checkedNode');
                        self.noteFocus = self.notes[$(this).data('index')];
                        self.noteEditing = false;
                    });
                    $('.text .underLine')[0].click()
                });//页面准备好之后遍历页面中的关键词









            },
            editSaveNote:function(){
                this.noteEditing = !this.noteEditing;
                    if (this.noteEditing) {
                        $('#noteContent').attr('contenteditable', true).focus();
                    } else {
                        this.noteFocus.notecontent = $('#noteContent').html();
                        let body = {
                            noteID:this.noteID,
                            content:this.noteFocus.content,
                            notecontent:this.noteFocus.notecontent,
                        };
                        this.$http.post(conf.bathPath + '/info/modifyNote',body).then((res) => {
                        }, (err) => {console.log(err);alert('修改失败')});
                    }
            },
        },
        mounted: function () {
            window.addEventListener('resize', function () {
                $('.note_main,.note_right_body').css('height', $(window).height() - 370);
            });
            $(function () {//控制两个区域滚轮大小**********************************************************************

                $('.note_main,.note_right_body').css('height', $(window).height() - 370);

            });
        },


    }



</script>

<style scoped>

    h2{
        font-size: 24px;
        color:#5b9dcf;
    }
    .note {
        background: #fafafa;
        padding: 30px 50px 60px;
        min-height: 794px;
    }

    .note:after {
        content: '';
        display: block;
        visibility: hidden;
        clear: both;
        height: 0;
    }

    .note_left, .note_right {
        padding: 0;
    }

    .note_head {
        text-align: right;
        color: #999999;
        padding: 0 20px;
        margin: 0 0 10px;
        font-size: 12px;
    }

    .note h1 {
        font-size: 24px;
        color: #000;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
    }

    .note_head > a {
        color: #999;
        text-decoration: none;
        cursor: pointer;
    }

    .note_head > a {
        color: #ccc;
        font-size: 12px;
        text-decoration: none;
        cursor: pointer;
    }

    .note_head > div {
        margin-top: 5px;
    }

    .note_main,.note_right_body{
        position: relative;
        font-size: 14px;
        margin-top: 20px;
        color: #666;
        min-height:300px;
        height:300px;
    }
    .scroll{
        height:100%;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .note_main p,.note_right_body p{
        margin: 0 0 10px;
    }
    .note_main{
        position: relative;
    }
    .digest span{
        color:#666;
    }

    .note_main  .digest {
        background: #fafafa;
        padding: 5px 20px;
    }

    .note_main  .img{
        padding: 40px;
    }

    .note_main  .img > img {
        width: 100%;
    }

    .note_main .text{
        padding: 5px 20px;
        height:300px;
    }

    .note_main .text img {
        display: block;
    }

    .note_left{
        padding-right: 40px;
        position: relative;
    }

    .note_right_head{
        height:90px;
        position: relative;
    }
    .note_right_head>div{
        position:absolute;
        right:0;
        bottom:0;
        font-size: 12px;
    }
    .note_right_body{
    }

    #noteContent{
        word-wrap: break-word;
        padding:0 10px;
        outline: none;
    }
    #noteContent[contenteditable="true"]{
        background:#eeefef;
    }
    #noteEdit{
        position: absolute;
        top:238px;
        right:-32px;
        z-index: 3000;
        color:#fff;
        text-align: center;
        font-size: 25px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: #0098d9;
        border-radius: 5px;
    }
    .text .underLine{
        cursor: pointer;
    }
    .text .underLine.checkedNode,.text .underLine.checkedNode *{
        color: #000;
        font-weight: 600;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px
    }

    ::-webkit-scrollbar-button {
        height: 0;
        width: 0
    }

    ::-webkit-scrollbar-track {
        background-color: #f1f1f1
    }

    ::-webkit-scrollbar-thumb {
        background: #ccc
    }

    #shuxian{
        border-left: 1px solid rgb(0, 0, 0);
        position: absolute;
        top: -0px;
        right: -15px;
        width: 0px;
        height:100%;
    }


</style>
<style>
    .note .text .underLine.checkedNode, .text .underLine.checkedNode *{
        color: #000;
    }
    .note .text .underLine {
        cursor: pointer;
    }
</style>
