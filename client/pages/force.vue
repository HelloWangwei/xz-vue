<template>
    <div>
        <div class="col-sm-3 main-left" :class="[tachRight?'tachRightShow':'tachRightHide']">
            <entitiesBar class="entitiesBar" @chosedInfos="addLink" :pentities="entities" :pchosedList="chosedList" :pkeyword="keyword"></entitiesBar>
        </div>
        <div class="col-sm-9 main-right"  :class="[tachRight?'tachRightShow':'tachRightHide']">
            <babelParent :ptypes="types" :keyword="keyword"></babelParent>
            <d3Circle :d3data="d3data" :updateLink="updateLink" @tachRightEmit="tachRightEmit" @rightData="rightData" :closeRight="closeRight"></d3Circle>
        </div>
        <div id="tachRight"  class="col-sm-2"  :class="[tachRight?'tachRightShow':'tachRightHide']">

            <div>
                <h3>{{clickEntity}} <span class="glyphicon glyphicon-chevron-right hideTach" style="float:right;cursor: pointer" @click="closeRightClick"></span></h3>
            </div>
            <div>
                <ul>
                    <li v-for="(related,index) in relateds">
                        <h4 @click="toggleBar(index)">{{related.type}}<span class="glyphicon glyphicon-plus" :class="[related.isShow?'glyphicon-minus':'glyphicon-plus']"></span></h4>
                        <ul v-show="related.isShow">
                            <li v-for="entity in related.list"  >{{entity}}</li>
                        </ul>
                    </li>
                </ul>

            </div>

        </div>
    </div>
</template>

<script>
    import conf from './../Conf';
    import babelParent from './../components/babelParent.vue';
    import entitiesBar from './../components/entitiesBar.vue';
    import d3Circle from './../components/d3Circle.vue';


    export default{
        data(){
            return {
                keyword: '',
                entities:[],
                chosedList:[],
                d3data:'',
                updateLink:{},
                types:[],
                tachRight:false,//右侧 是否显示
                clickEntity:'',//右侧 选中实体名
                relateds:[] ,   //右侧 相关尸体list
                closeRight:1,
            }
        },
        components: {
            entitiesBar: entitiesBar,
            d3Circle:d3Circle,
            babelParent:babelParent
        },
        created: function () {

        },
        mounted:function(){
            this.keyword = this.$route.params.keyword;
            let sessionEntities = JSON.parse(sessionStorage.entities);
            sessionEntities.forEach(function(val){
                val.isChecked = false;
                val.more = false;
                val.list.forEach((obj) => {
                   obj.isChosed = false;
                });
            });
            this.entities = sessionEntities;
            let sessionchosed = JSON.parse(sessionStorage.chosedList);
            let types = [];
            sessionchosed.forEach(function(val,index){
                val.list = [];
                types.push(val.text)
            })
            this.types = types;
            this.chosedList = sessionchosed;
            this.$http.post(conf.bathPath + '/info/initForce', this.entities).then((res) => {
                this.d3data = res.data;
            }, (err) => {
                console.log(err);
            });
        },
        methods:{
            addLink:function(links){
                let body = {
                    nodes:this.d3data.nodes,
                    links:links
                }
                this.$http.post(conf.bathPath + '/info/updateForce', body).then((res) => {
                    this.updateLink = {
                        updateLink:links,
                        links:res.data.links
                    };
                }, (err) => {
                    console.log(err);
                });
            },
            tachRightEmit:function(tachRight){
                this.tachRight = tachRight;
            },
            rightData:function(data){
                this.tachRight = data.tachRight;
                this.clickEntity = data.entity;
                this.relateds = data.relateds;
            },
            toggleBar: function(index) {//切换打开关闭状态
                let self = this;
                this.relateds.forEach(function(d,i){
                    if(i!=index){
                        d.isShow=false;
                    }
                });
                let flag = this.relateds[index].isShow;
                this.$set(this.relateds[index],'isShow',!flag);
            },
            closeRightClick:function(){
                this.closeRight++;
            },
        }
    }
</script>

<style scoped>
    .main-left{
        padding-top: 30px;
        position:relative ;
        left:0;
        transition: all .7s;
    }
    .main-left.tachRightShow{
        left:-25%;
    }
    .main-left.tachRightHide{
        left:0;
    }
    .main-right{
        padding-top:5px;
        transition: all .7s;
    }
    .main-right.tachRightShow{
        left:-20%;
    }
    .main-right.tachRightHide{
        left:0;
    }
    .entitiesBar{
        margin-left:30px;
        margin-top:10px;
    }
</style>


<style scoped>
    body {position: relative}
    #tachRight {
        position: absolute;
        top:0px;
        right: 0;
        height:100%;
        padding:0;
        background: #F6F6F6;
        transition: right .5s;
    }
    #tachRight.tachRightShow{
        right:0;
    }
    #tachRight.tachRightHide{
        right:-16.7%;

    }
    #tachRight>div:first-child{
        padding-bottom: 10px;
    }
    #tachRight>div>h3{
        margin:0;
        padding:15px;
        padding-right:20px;
        width:100%;
        background: #B5C9D4;
        font-size: 17px;
        font-weight: 600;
    }
    #tachRight ul{
        margin:0;
        padding:0;
    }

    #tachRight>div>ul>li{
        margin-bottom: 10px;
    }
    #tachRight>div li li{
        margin-top: 10px;
        padding-left: 10px;
        color: #000;
        font-weight: 600;
    }

    #tachRight li>h4{
        line-height: 35px;
        text-align: center;
        background: #F3F2F0;
        color: #86B6E1;
        cursor: pointer;
        padding-right: 21px;
    }
    #tachRight li>h4>span{
        float: right;
        line-height: 35px;
        font-size: 14px;
    }
</style>
