<template>
    <div>
        <div  v-if="!events.length">
            <h4>暂无相关内容！</h4>
        </div>
        <div v-if="events.length" style="position: relative">
            <div class="head">
                <ul>
                    <li v-for="(equ,index) in equipment" @click="equipmentchange(equ)" :class="{light:equipmentcheck==equ}">
                        {{equ}}
                </li>

                </ul>
            </div>

            <div class="body">
                <div>
                    <ul>
                        <li v-for="(event,index) in events"
                            :title="event.events"
                            :class="[{light:event.time.slice(0,7)==changeTime},{changed:event.id==eventsRight.id}]"
                            @click="changeeventsClick(event)"
                            v-show="eventsShow[index]">
                            {{event.events}}
                    </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <!--<li></li>-->
                    </ul>
                </div>
                <div>
                    <ul>
                        <!--<li></li>-->
                    </ul>
                </div>
            </div>

            <div class="timeline" @mousemove="timeDrag($event)" @mouseleave="timeMoveNO">
                <div class="timelineHead">
                    <div class="active">时间轴</div>
                    <div>统计图</div>
                </div>
                <div class="timelineBody">
                    <div class="timeBlock" id="drogue"

                         @click="timeDragTo">
                        <span @mousedown="timeMove" :style="[{left:drogueleft}]"><i><b></b></i></span>
                    </div>
                    <div class="timeAX">
                        <ul>
                            <li v-for="(time,index) in times" :style="[{width:timeWidth}]">
                                {{time}}
                                <ol style="width:100%;position: absolute;top:-6px;left:0;margin:0;padding:0;">
                                    <li v-for="(time,index) in mounths" style="width:8.33%;float:left;border-left:1px solid #ccc;height:6px"></li>
                                </ol>
                        </li>

                        </ul>
                    </div>
                </div>
            </div>
            <div class="storeright col-xs-6 col-md-2" v-show="eventsRightShow">
                <div class="rightdetailed">
                    <h4>实体内容 <span class="glyphicon glyphicon-chevron-right hideTach" style="float:right;cursor: pointer" @click="closeRightClick"></span></h4>
                    <p class="key" v-show="eventsRight.organization"><strong>机构：</strong></p>
                    <p class="val">{{eventsRight.organization}}</p>

                    <p class="key" v-show="eventsRight.person"><strong>人员：</strong></p>
                    <p class="val">{{eventsRight.person}}</p>

                    <p class="key" v-show="eventsRight.address"><strong>地址：</strong></p>
                    <p class="val">{{eventsRight.address}}</p>

                    <p class="key" v-show="eventsRight.events"><strong>事件：</strong></p>
                    <p class="val">{{eventsRight.events}}</p>

                    <p class="key" v-show="eventsRight.url"><strong>引用：</strong></p>
                    <p class="val"><a :href="eventsRight.url">{{eventsRight.url}}</a></p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import conf from './../Conf';


    export default{
        data(){
            return {
                equipment:[],
                events:[],
                organization:[],
                procurement:[],
                times:[],

                eventsShow:[],//控制哪个作为选中项
                equipmentcheck:'',
                changeTime:'',
                timeWidth:'10%',
                timeCanMove:false,
                drogueleft:'0px',//初始浮标位置
                mounths:[1,2,3,4,5,6,7,8,9,10,11,12],//一年分成几份

                eventsRight:{},
                eventsRightShow:false,
            }
        },
        props:{
            topic:{
                type:Object,
                default:{},
            },
        },

        watch:{
            topic:function(){
                this.init();
            },
            events: function () {
                let self = this;
                this.events.forEach(function (d, i) {
                    self.eventsShow.splice(i, 1, true);
                });
            },
            equipmentcheck:function () {
                let self = this;
                if(self.equipmentcheck==''){
                    this.events.forEach(function (d, i) {
                            self.eventsShow.splice(i, 1, true);
                    });
                }
                else{
                    this.events.forEach(function (d, i) {
                        if(d.equipment==self.equipmentcheck){
                            self.eventsShow.splice(i, 1, true);
                        }else{
                            self.eventsShow.splice(i, 1, false);
                        }

                    });
                }

            },
            times:function () {
                if(this.times.length){
                    this.timeWidth = 100/this.times.length.toFixed(2)+'%';
                }
            },
        },
        methods:{
            init:function(){//初始化
                let body = {topicID:this.topic.id};

                this.$http.post(conf.bathPath + '/topic/timeLine',body).then((res) => {
                    if(res.body.equipment){
                        this.equipment = res.body.equipment;
                        this.events = res.body.events
//                    this.organization = res.body.organization
//                    this.procurement = res.body.procurement
                        this.times = res.body.times
                    }else{
                        this.equipment = [];
                        this.events = []
//                    this.organization = []
//                    this.procurement = []
                        this.times = []
                    }

                }, (err) => {
                    console.log(err);

                });
            },
            equipmentchange:function(equ){
                this.closeRightClick();//关掉右侧

                if(this.equipmentcheck==equ){
                    this.equipmentcheck='';
                }
                else{
                    this.equipmentcheck=equ;
                }
            },

            timeMove:function(e){
                e.preventDefault();
                this.timeCanMove = true;
            },
            timeMoveNO:function(){
                this.timeCanMove = false;
            },
            timeDragTo:function(e){
                let drogueleft = e.clientX - parseFloat($('#drogue').offset().left.toFixed(0));
                if(drogueleft<=$('#drogue').width()&&drogueleft>=0){
                    this.drogueleft = drogueleft-10+'px';
                }

                let i = parseInt(drogueleft/ ($('#drogue').width() / (this.times.length*12)) );
                let j = parseInt(i/12)
                this.changeTime = this.times[j]+'-'+(parseInt(i%12)<9?'0'+(parseInt(i%12)+1):parseInt(i%12)+1);
            },
            timeDrag:function(e){
                if(this.timeCanMove){
                this.timeDragTo(e);
                }

            },
            closeRightClick:function(){//关掉右边实体
                this.eventsRight={};
                this.eventsRightShow=false;
            },
            changeeventsClick:function(event){//切换event小方块
                this.eventsRight=event;
                this.eventsRightShow=true;
            },
        },
        mounted:function(){
            document.querySelector('body').addEventListener('mouseup',this.timeMoveNO)
        },
    }
</script>

<style scoped>
    li{
        list-style: none;
        display:inline-block;
    }
    .head{
        margin-top:20px;
    }
    .head li{
        margin:10px;
        padding:3px 20px;
        background-image:linear-gradient(90deg,#808080 0,#777 20%,#a4a4a4 75%,#a3a3a3 100%);
        font-size: 20px;
        font-weight: 600;
        cursor:pointer;
    }
    .body{
        margin:20px 30px 0 0;
    }
    .body ul:not(:first-child){
        margin: 0;
        padding: 0;
        margin-top:30px;
    }



    .body ul li{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width:100px;
        margin:5px;
        padding: 5px;
        background:#b3b3b3 ;
        font-size: 12px;
        font-weight: 400;
        cursor:pointer;
    }
    .body ul li.light,.head li.light{

        background:#4aacdd;

    }
    .body ul li.changed{
        outline:#4aacdd solid  2px;
    }

    .timelineHead{
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }
    .timelineHead>div{
        float: left;
        padding: 2px 10px;
        display:inline-block;
        border:1px solid #ddd;
        background: #fff;
        margin:0 3px;
    }
    .timelineHead>div.active{
        background: #b3b3b3;
    }
    #drogue,.timeAX{
        position: relative;
    }
    .timeAX{}
    .timeAX ul{
        border-top:1px solid #ddd;
        padding:0;
        margin:0;
    }
    .timeAX ul li{
        float:left;
        position: relative;
    }
    .timeAX ul>li::after{
        height:8px;
        border-left:1px solid #333;
        position: absolute;
        top:-8px;
        left:0px;
        content: '';
        display: block;
    }
    .timeBlock{
        height:80px;
        position: relative;

    }
    .timeBlock span{
        left:10%;
        top:0;
        position: absolute;
        display: inline-block;
        height:100%;
        padding:0 10px;
        cursor:w-resize;
    }
    .timeBlock i{
        display: inline-block;
        height:100%;
        width:0;
        position: relative;
        border-left: 3px solid #a3b5c2 ;
    }
    .timeBlock i>b{
        height:24px;
        width:17px;
        position: absolute;
        top: -18px;
        left: -10px;
        background: url(../static/img/timeline.png);
    }

    .storeright{
        border-left: 2px solid #6f6f6f;
        background: #D6D3D3;
        padding-left: 0px;
        padding-right: 0px;
        position: absolute;
        right: -3.75%;
        top: 0;
        min-height: 100%;
        overflow: auto;
        max-height: 800px;
    }
    .rightdetailed{
    }
    .rightdetailed h4{
        margin-bottom: 10px;
        background: #BFBCBC;
        padding: 8px;
    }
    .rightdetailed p{
        margin:6px 0px;
        padding-left: 10px;
    }
    .rightdetailed p{
        margin:6px 0px;
        padding-left: 10px;
    }

</style>