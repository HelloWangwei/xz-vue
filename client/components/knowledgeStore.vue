<template>
    <div>
        <div class="storemain"  v-if="topic=='F-35'">
        <div class="storeleft col-xs-6 col-md-3">
            <ul class="storelist">
                <li id="" v-for="(entity,index) in entities">
                    <h3  @click="toggleBar(index)"  data-name="person">{{entity.text}}<b  :class="{'checked':entity.isChecked}" @click.stop="checkall(index)"></b>
                        <span :class="[entity.isShow?'glyphicon-triangle-bottom':'glyphicon-triangle-right']" class="glyphicon"></span></h3>
                    <ul v-show="entity.isShow" class="storeitems">
                        <li v-for="(list,index) in entity.child_list" :class="{'chosedsrore':index==chosedSrore}"  @click="showkeyWord(list.id,'1',index)">
                            <span class="glyphicon glyphicon-stop"></span><span>{{list.text}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="storecenter col-xs-6 col-md-7" v-show="producerFlag">
            <h4><span class="glyphicon glyphicon-road"></span>承包商</h4>
            <div class="contractpic">
                <div class="contractorleft clearfix">
                    <ul  class="linelist">
                        <li :class="[{line1chosed1:index==chosedIndex1},{selectedlist:index==nowIndex}]" v-for="(oneProducer,index) in knowledges.oneProducers"  @click="getNextProducer(oneProducer,'2',index)"><i></i><i></i>
                            <span class="btn btn-default" @mouseenter="titleShow(oneProducer,$event)" @mouseleave="titleHide()">{{oneProducer.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="contractorcenter clearfix">
                    <ul  class="linelist relation">
                        <li :class="[{line1chosed2:index==chosedIndex2},{selectedterm:index==nowIndex1}]" v-for="(twoProducer,index) in knowledges.twoProducers" @click="getNextProducer(twoProducer,'3',index)"><i></i><i></i><i></i><i></i>
                            <span class="btn btn-now" @mouseenter="titleShow(twoProducer,$event)" @mouseleave="titleHide()" >{{twoProducer.name}}</span>
                        </li>
                    </ul>
                </div>
                <div class="contractorright clearfix">
                    <ul  class="linelist relation">
                        <li :class="[{line1chosed3:index==chosedIndex3},{selectedthird:index==nowIndex2}]" v-for="(threeProducer,index) in knowledges.threeProducers" @click="showSelf(threeProducer,index)"><i></i><i></i>
                            <span class="btn btn-grey"  @mouseenter="titleShow(threeProducer,$event)" @mouseleave="titleHide()">{{threeProducer.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="storeright col-xs-6 col-md-2" v-show="detailsFalg">
            <div class="rightdetailed">
                <h5>{{self.name}}</h5>
                <p class="text-left"><strong>主要产品：</strong></p>
                <p class="text-left">{{self.productname}}</p>
                <p class="text-left"><strong>国家：</strong></p>
                <p class="text-left">{{self.country}}</p>
                <!--<p class="text-left"><strong>Adress：</strong></p>-->
                <!--<p class="text-left">America</p>-->
                <!--<p class="text-left"><strong>引用：</strong></p>-->
                <!--<p class="text-left"><a href="">www://</a></p>-->
            </div>
        </div>
    </div>
        <div  v-if="topic!='F-35'">
            <h4 style="padding-left: 3.5%;">暂无相关内容！</h4>
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
                chosedList:[[],[]],
                chosedUl:'',
                self:{},
                detailsFalg:false,
                producerFlag:false,

                chosedSrore:-1,//智库右侧列表选中

                chosedIndex1:0,//智库中间列表选中
                chosedIndex2:0,
                chosedIndex3:0,

                nowIndex:0,//智库中间列表选中连线
                nowIndex1:0,
                nowIndex2:0,

                oneTreeLength:0,
                twoTreeLength:0,
                threeTreeLength:0,
            }
        },


        props: {
            entities:{
                type:Array,
                default:[],
            },
            knowledges:{
                type:Object,
                default:{}
            },
            topic:{
                type:String,
                default:'',
            },
        },
        updated:function(){
            if($('li.selectedlist:not(:first-child)')[0]){
                $('li.selectedlist>i:first-child').height($('li.selectedlist:not(:first-child)').offset().top-283);
            }

            if($('.contractorcenter li.selectedterm:not(:first-child)')[0]){
                $('.contractorcenter li.selectedterm>i:nth-child(3)').height($('.contractorcenter li.selectedterm:not(:first-child)').offset().top-305);
            }
        },
        watch:{
            knowledges:{
                handler:function () {
                    if(this.knowledges.twoProducers.length==0){
                        this.oneTreeLength=-1;
                        this.twoTreeLength=-1;
                        this.threeTreeLength=-1;
                    }
                    else{
                        this.threeTreeLength=0;
                    }

                    if(this.knowledges.threeProducers.length==0){
                        this.twoTreeLength=-1;
                        this.threeTreeLength=-1;
                    }
                    else{
                        this.threeTreeLength=0;
                    }
                    this.nowIndex=this.oneTreeLength;
                    this.nowIndex1=this.twoTreeLength;
                    this.nowIndex2=this.threeTreeLength;
                },
                deep:true,
            }
        },

        methods: {
            toggleBar: function(index) {
                for(var i in this.entities){
                    if(i!=index){
                        this.$set(this.entities[i],'isShow',false)
                    }
                }
                this.$set(this.entities[index],'isShow',!this.entities[index].isShow);
                this.chosedUl=this.entities[index].text;

                this.producerFlag=false;
                this.detailsFalg=false;
                this.chosedSrore=-1;
            },
            checkall:function (index) {
                var isChecked=!this.entities[index].isChecked;

                this.$set(this.entities[index],'isChecked',!this.entities[index].isChecked)

                for(var i in this.entities[index].child.list){
                    var dt=this.entities[index].child.list[i];
                    this.$set(dt,'isChosed',isChecked);
                    if(isChecked) this.chosedList[index].push(dt.text);

                }
                if(!isChecked) this.chosedList[index].splice(0,this.chosedList[index].length);
            },
            showkeyWord:function (id,type,index) {//右侧列表项点击
                this.chosedSrore=index;
                this.chosedIndex1=0;
                this.chosedIndex2=0;
                this.chosedIndex3=0;
                this.oneTreeLength=0;
                this.twoTreeLength=0;
                this.detailsFalg=false;
                this.producerFlag=true;
                let params = {};

                params.id = id;
                params.type = type;
                this.$emit('getKnowledges',params);

            },

            getNextProducer:function(data,type,index){
                this.chosedIndex2=0;
                this.chosedIndex3=0;
                this.detailsFalg=true;
                this.self=data;
                let params = {};
                params.id = data.id;
                params.type = type;
                if(type=='2'){//点击第一列
                    this.chosedIndex1=index;
                    this.chosedIndex2=0;
                    this.twoTreeLength=0;
                    this.oneTreeLength=index;

                    this.$emit('searchOneProducer',params);
                }else {//点击第二列
                    this.chosedIndex2=index;
                    this.twoTreeLength=index;
                    this.threeTreeLength=index;
                    this.knowledges.threeProducers.length=0;
                    this.$emit('searchTwoProducer',params);
                }

            },

            showSelf:function (self,index) {//点击第三列
                this.detailsFalg=true;
                this.self=self;
                this.chosedIndex3=index;
            },

            titleShow: function (data,e) {//悬浮提示
                let et = e.target;
                let content = '<p class="tipsinfo">' + data.name + '</p>';
                this.layerIndex = layer.tips(content, et, {
                    guide: 2,
                    style: ['background-color:#fff; color:#333; border:1px solid #e6e6e6;'],
                    maxWidth: 800
                });
            },
            titleHide: function () {//网站悬浮提示消失
                layer.close(this.layerIndex)
            },
        }
    };


</script>

<style scoped>

    .storeleft>h2 {
        margin-top: 0;
        font-size: 20px;
        color: #999;
    }
    .display{
        display: none;
    }
    .storeleft ul {
        padding: 0;
    }

    .storeleft>ul>li {
        margin-bottom: 2px;
        color: #fff;
    }

    .storeleft>ul>li>h3 {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        background: #7F7F7F;
    }
    .storeleft>ul>li>h5 {
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        display:none;
        cursor: pointer;
    }
    .storeleft>ul>li>ul>li {
        font-size: 16px;
        font-weight: 600;
        color: #666;
        line-height: 20px;
        min-height: 20px;
        cursor: pointer;
        margin: 0px 0px 6px 0px;
        padding: 5px 0px;
        word-wrap: break-word;
        list-style-type: square;
    }
    .storeleft>ul>li>ul>li:last-child{
        margin-bottom: 0px;
    }
    .storeleft li h3{
        cursor:pointer;
    }
    .storeleft li h3 span{
        float:right;
        line-height:26px;
        margin-right:5px;
    }
    .storeleft li li:hover{
        color: #000;
    }
    .linelist .btn{
        padding: 2px 5px;
        border-radius: 0px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .glyphicon-road{
        margin-right: 10px;
        color:#666;
    }
    .btn-now {
        color: #333;
        background-color: #ccc;
        border-color: #ccc;
    }
    .btn-now:hover{
        background-color: #a0a0a0;
        border-color: #a0a0a0;
        color:#fff;
    }
    .btn-grey{
        color: #fff;
        background-color: #a0a0a0;
        border-color: #a0a0a0;
    }
    .btn-grey:hover{
        background-color: #6e6e6e;
        border-color:#6e6e6e;
    }
    .contractorleft,.contractorcenter,.contractorright{
        float: left;
    }
    .btn{
        padding: 1px 4px;
        border-radius: 0px;
    }
    .storecenter h4{
        margin-bottom: 30px;
        text-align: center;
    }
    .contractpic{
        width: 760px;
        overflow: hidden;
        margin: 0 auto;
    }
    .contractorleft ul{
        padding: 0px;
    }
    .contractorcenter ul{
        margin-top: 15px;
    }
    .contractorright ul{
        margin-top: 37px;
    }
    .contractorleft li .btn{
        width:160px;
        margin-bottom: 25px;
    }
    .linelist li{
        position: relative;
    }
    .line1chosed1 .btn{
        color: #333;
        background-color: #ccc;
        border-color: #ccc;
        text-align: left;
    }
    .line1chosed1 .btn:hover{
        font-weight: 700;
    }
    .relation{
        margin-left: 20px;
    }
    .relation li .btn{
        width:230px;
        margin-bottom: 15px;
    }
    .relation li i:nth-child(1) {
        position:absolute;
        border-left:1px solid #999;
        left: -27px;
        bottom:50px;
        height:100%;
        top:-28px;
        width:1px
    }
    .relation li:first-child i:nth-child(1) {
        position:absolute;
        border-left:1px solid #999;
        left: -27px;
        bottom:50px;
        height:0;
        top:13px;
        width:1px
    }
    .relation li i:nth-child(2) {
        position: absolute;
        border-top: 1px solid #999;
        left: -26px;
        height: 20px;
        top: 13px;
        width: 27px;
    }
    li:first-child.selectedlist i:nth-child(1){
        position:absolute;
        border-left: 1px solid #999;
        left: 193px;
        bottom: 50px;
        height: 16px;
        top: 13px;
        width: 1px;
    }
    li.selectedlist i:nth-child(1){
        position:absolute;
        border-left: 1px solid #999;
        left: 193px;
        bottom: 37px;
        height: 36px;
        width: 1px;
    }
    li.selectedlist i:nth-child(2){
        position:absolute;
        border-top: 1px solid #999;
        left:159px;
        height: 20px;
        top: 13px;
        width: 35px;
    }
    .contractorcenter li.line1chosed2 .btn{
        color: #fff;
        background-color: #a0a0a0;
        border-color: #a0a0a0;
    }
    .contractorcenter li.line1chosed2 .btn:hover{
        font-weight: 700;
    }
    .contractorcenter li:first-child.line1chosed2.selectedterm i:nth-child(3){
        position:absolute;
        border-left: 1px solid #999;
        left: 263px;
        bottom: 50px;
        height: 23px;
        top: 13px;
        width: 1px;
    }
    .contractorcenter li.line1chosed2.selectedterm i:nth-child(3){
        position: absolute;
        border-left: 1px solid #999;
        left: 263px;
        bottom: 27px;
        height: 49px;
        width: 1px;
    }
    .contractorcenter li.line1chosed2.selectedterm i:nth-child(4){
        position: absolute;
        border-top: 1px solid #999;
        left: 230px;
        height: 20px;
        top: 13px;
        width: 34px;

    }
    .line1chosed3 .btn{
        background-color: #6e6e6e;
        border-color: #6e6e6e;
    }
    .line1chosed3 .btn:hover{
        font-weight: 700;
    }
    .storeright{
        border-left: 2px solid #6f6f6f;
        background: #D6D3D3;
        padding-left: 0px;
        padding-right: 0px;
        margin-top: 25px;
    }
    .rightdetailed{
        min-height: 400px;
    }
    .rightdetailed h5{
        margin-bottom: 10px;
        background: #BFBCBC;
        padding: 8px;
    }
    .rightdetailed p{
        margin:6px 0px;
        padding-left: 10px;
    }
    .storeleft .storelist .storeitems{
        max-height: 300px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .storeitems .chosedsrore{
        font-size: 16px;
        font-weight: 800;
        color: #000;
        background: #ccc;
    }
    .glyphicon-stop{
        font-size: 1px;
        padding-right: 5px;
    }
</style>
