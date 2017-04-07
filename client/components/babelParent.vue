<template>
    <div class="babelList">
        <div class="icons">
            <h4 style="text-align: center"><span style="text-decoration: underline;">{{keyword}}</span>&nbsp;的关系图</h4>
            <ul>
                <li data-name="program">
                    <img :src="activeList[0]?program1:program2"alt="">
                    <span>项目</span>
                </li>
                <li data-name="person">
                    <img :src="activeList[1]?person1:person2 "alt="">
                    <span>人员</span>
                </li>
                <li data-name="organization">
                    <img :src="activeList[2]?organization1:organization2 "alt="">
                    <span>机构</span>
                </li>
                <li data-name="tech">
                    <img :src="activeList[3]?tech1:tech2 "alt="">
                    <span>技术</span>
                </li>
                <li data-name="location">
                    <img :src="activeList[4]?location1:location2 "alt="">
                    <span>地区</span>
                </li>
                <li data-name="country">
                    <img :src="activeList[5]?country1:country2 "alt="">
                    <span>国家</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import conf from './../Conf';
    import program1 from './../static/img/program1.png';
    import program2 from './../static/img/program2.png';
    import person1 from './../static/img/person1.png';
    import person2 from './../static/img/person2.png';
    import organization1 from './../static/img/organization1.png';
    import organization2 from './../static/img/organization2.png';
    import tech1 from './../static/img/tech1.png';
    import tech2 from './../static/img/tech2.png';
    import location1 from './../static/img/location1.png';
    import location2 from './../static/img/location2.png';
    import country1 from './../static/img/country1.png';
    import country2 from './../static/img/country2.png';
    export default{
        data(){
            return {
                activeList:[false,false,false,false,false,false],
                idList:['program','person','organization','tech','location','country'],
                types:'',
                program1,
                program2,
                person1,
                person2,
                organization1,
                organization2,
                tech1,
                tech2,
                location1,
                location2,
                country1,
                country2

            }
        },
        props:['ptypes','keyword'],
        watch:{
            ptypes:'init'
        },
        created: function () {
        },
        methods: {
            init:function(){
                this.types = this.ptypes;
//                console.log(this.types);
                for(let i in this.types){
                    this.$set(this.activeList,this.idList.indexOf(this.types[i]),true);
//                    console.log(this.idList);
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    .babelList{
        padding-top:5px;
    }
    .icons ul {
        margin-left: 100px;
        margin-top: 10px;
    }
    .icons li {
        display: inline-block;
        margin-right: 20px;
    }
    .icons li img {
        width: 40px;
        height: 40px;
    }
</style>
