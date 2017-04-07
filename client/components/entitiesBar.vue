<template>
        <div >
            <div class="relatedInstance">
                <h2>相关实体</h2>
                <ul>
                    <li id="" v-for="(entity,index) in entities">
                        <h3  @click="toggleBar(index)">{{entity.name}}<b  :class="[entity.isChecked?'checked':'']" @click.stop="checkall(index)"></b>
                            <span :class="[entity.isShow?'glyphicon-minus':'glyphicon-plus']" class="glyphicon"></span></h3>
                        <ul v-show="entity.isShow">
                            <li v-for="(list,listIndex) in entity.list">
                                <b  @click="checklist(index,listIndex)" :class="[list.isChosed?'checked':'' ]"></b><span @click="showkeyWord">{{list.key}}</span>
                                <span>({{list.doc_count}})</span>
                            </li>
                            <h5 class="entitymore" @click="moreInstance(entity.text,index)" v-show="entity.more"><div>更多</div></h5>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>
</template>
<script>
    import $ from 'jquery'
    import conf from './../Conf';

    export default{
        data(){
            return {
                //entities:[
                 //   {text:'人员',isShow:false,list:[{text:'F-35 program',isChosed:false},{text:'F-35 program',isChosed:false}],isChecked:false}},
                //    {text:'项目',isShow:false,child:{list:[{text:'F-35 program1',isChosed:false},{text:'F-35 program2',isChosed:false}],isChecked:false}}
                //],
                entities:[],
                chosedList:[],
                chosedEntities:[],
                chosedUl:'',
            }
        },
        props:['pentities','pchosedList','pkeyword','ptypes'],
        watch:{
            pentities: 'init'
        },
        created: function () {

        },
        methods: {
            init: function(){
                this.entities = this.pentities;
                this.chosedList = this.pchosedList;
                this.keyword = this.pkeyword;
            },
            toggleBar: function(index) {
                for(let i in this.entities){
                    if(i!=index){
                        this.$set(this.entities[i],'isShow',false)
                    }
                }
                this.$set(this.entities[index],'isShow',!this.entities[index].isShow);
                this.chosedUl=this.entities[index].text;

            },
            checkall:function (index) {
                let isChecked=!this.entities[index].isChecked;
                this.$set(this.entities[index],'isChecked',isChecked);
                for(let dt of this.entities[index].list){
                    this.$set(dt,'isChosed',isChecked);
                    if(isChecked){
                        this.chosedList[index].list.push(dt.key);
                    }
                }
                if(!isChecked){
                    this.chosedList[index].list.length = 0;
                }
                this.$emit('chosedInfos', this.chosedList);
            },
            checklist:function (ulIndex,listIndex) {

                let dt=this.entities[ulIndex].list[listIndex];
                let type=this.entities[ulIndex].text;
                this.$set(dt,'isChosed',!dt.isChosed);
                if(!dt.isChosed) {
                    let index;
                    for(let i=0;i<this.chosedList[ulIndex].list.length;i++){
                        if(dt.key == this.chosedList[ulIndex].list[i]){
                            index = i;
                            break;
                        }
                    }
                    this.chosedList[ulIndex].list.splice(index,1);
                }else{
                    this.chosedList[ulIndex].list.push(dt.key);
                }

                this.$emit('chosedInfos', this.chosedList);
            },
            showkeyWord:function () {

            },
            moreInstance:function (type,entityIndex) {
                let size = this.entities[entityIndex].list.length;
                let index = size%10+1;
                let body = {
                    type:type,
                    keyword:this.keyword,
                    index:index
                }
                this.$http.post(conf.bathPath + '/info/moreInstance', body).then((res) => {
                    let instances = res.data.moreEntities;
                    let flag = res.data.flag;
                    for(let str of instances){
                        this.entities[entityIndex].list.push(str);
                    }
                    this.entities[entityIndex].more=flag;
                }, (err) => {
                    console.log(err);
                });
            }
        },

    }



</script>

<style scoped>
    .relatedInstance>h2 {
        margin-top: 0;
        font-size: 20px;
        color: #999;
        margin-bottom: 20px;
    }
    .display{
        display: none;
    }
    .relatedInstance ul {
        padding: 0;
        list-style: none;
    }

    .relatedInstance>ul>li {
        margin-bottom: 20px;
    }

    .relatedInstance>ul>li>h3 {
        background: #f3f2f0;
        color: #6bacdf;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
    }
    .entitymore div{
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
    }

    .relatedInstance>ul>li>ul>li {
        padding-left:28px;
        overflow: hidden;
        width: 100%;
        font-size: 14px;
        color: #999;
        line-height: 20px;
        min-height: 20px;
        text-decoration: underline;
        cursor:pointer;
        margin:5px 0;
    }
    .relatedInstance>ul>li>ul>li {
        word-wrap: break-word;
    }

    .relatedInstance li h3{
        cursor:pointer;
    }
    .relatedInstance li h3 span{
        float:right;
        line-height:26px;
        margin-right:5px;
    }
    .relatedInstance li li:hover{
        color:#333;
    }

    .relatedInstance li ul{
        overflow:hidden;
    }
    .relatedInstance li h3{
        position:relative;
    }

    .relatedInstance li li{
        position: relative;
    }
    .relatedInstance li h3 b, .relatedInstance li li b {
        position: absolute;
        top: 1px;
        left: 5px;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        width: 18px;
        height: 18px;
        background: url(./../static/img/blue.png);
        border: none;
        cursor: pointer;
        background-position: 0 0;
        margin-right: 5px;
    }
    .relatedInstance li h3 b {
        position: absolute;
        top: 4px;
    }

    .relatedInstance li h3 b:hover, .relatedInstance li li b:hover {
        background-position: -20px 0;
    }

    .relatedInstance li h3 b.checked, .relatedInstance li li b.checked {
        background-position: -40px 0;
    }

</style>