<template>
    <div>
        <section class="info_srarch">
            <div class="info_srarch_heade">
                <div class="input">
                    <input autocomplete="off" type="text" class="relationInp" v-model="relationWord" placeholder=" 关系搜索"
                           @blur="hintHide"
                           @focus="hints.length!=0&&(hintShow = true)"
                           @keydown.enter="search"
                           @keydown.down="hintDown()"
                           @keydown.up="hintUp()"
                           @keyup="relationWordHnit"/>
                    <div>
                        <button class="searchbtn btn btn-info" @click="searchBtn()">
                            <span class="glyphicon glyphicon-search"></span>
                        </button>
                        <button id="force" :class="{charthide:chartHide}" class="chartbtn btn btn-info" @click="force">关系图</button>
                    </div>
                    <div class="search_search_hint" v-show="hintShow">
                        <ul @mouseover="hintHideCan=false" @mouseout="hintHideCan=true">
                            <li v-for="(hint,index) in hints" :class="{curr:hintNow==index}" @click="hintToInput(hint)"
                                @enter="mouseoverHint(index)">
                                {{hint}}
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
        <!-- 提示输入不为空 -->
        <div class="modal fade bs-example-modal-sm " tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" id="myModalLabel">搜索信息有误!</h4>
                    </div>
                    <div class="modal-body">
                        搜索内容，实体关系不可为空！
                    </div>
                </div>
            </div>
        </div>
        <div class="instance_body">
            <div class="instance_six">
                <span>相关实体:</span>
                <ul>
                    <li :class="{checked:activeList[0]}" @click="relationClick(0)" id="program"><i></i> <span class="">项目</span></li>
                    <li :class="{checked:activeList[1]}" @click="relationClick(1)" id="person"><i></i> <span class="">人员</span></li>
                    <li :class="{checked:activeList[2]}" @click="relationClick(2)" id="organization"><i></i> <span class="">机构</span></li>
                    <li :class="{checked:activeList[3]}" @click="relationClick(3)" id="tech"><i></i> <span class="">技术</span></li>
                    <li :class="{checked:activeList[4]}" @click="relationClick(4)" id="location"><i></i> <span class="">地区</span></li>
                    <li :class="{checked:activeList[5]}" @click="relationClick(5)" id="country"><i></i> <span class="">国家</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import conf from './../Conf';

    export default{
        data(){
            return {
                relationWord: '',//输入框
                hints: [],//输入框中返回的搜索提示
                keyWordOld: '',
                hintNow: -1,
                chartHide:true,
                hintShow: false,
                hintHideCan: true,
                activeList:[false,false,false,false,false,false],
                idList:['program','person','organization','tech','location','country']
            }
        },
        props:['types','searchValue','charthide'],
//        watch: {
//            relationWord: function () {
//                let self = this;
//                _.debounce(//当发生改变时延迟500ms请求数据
//                    function () {
//                        self.$http.jsonp(conf.wikiPath + self.relationWord, {headers: {'Api-User-Agent': 'Example/1.0'}}).then((res) => {
//                            self.hints = res.data[1];
//                            self.hintShow = true;
//                        }, (err) => {
//                            console.log(err);
//                        });
//                    }, 100)()
//            },
//        },
        created: function () {
            if(!this.types) return;
            let types=this.types.split(',');
            for(let i in types){
                this.$set(this.activeList,this.idList.indexOf(types[i]),true);
            }
            if(!this.searchValue)return;
            this.relationWord = this.searchValue;
            this.chartHide=this.charthide
        },
        methods: {
            relationWordHnit: function () {
                if (this.relationWordOld == this.relationWord) {
                    return;
                }
                this.relationWordOld = this.relationWord
                let self = this;
                _.debounce(//当发生改变时延迟500ms请求数据
                    function () {
                        self.$http.jsonp(conf.wikiPath + self.relationWord, {headers: {'Api-User-Agent': 'Example/1.0'}}).then((res) => {
                            self.hints = res.data[1];
                            if (!self.hints) {
                                self.hints = []
                            }
                            self.hintShow = true;
                        }, (err) => {
                            console.log(err);
                        });
                    }, 100)()
            },
            searchBtn: function () {//查询
                if (this.relationWord == '') {
                    return $('.bs-example-modal-sm').modal();
                }
                var chosed =[];
                for( var i in this.activeList ){
                    if(this.activeList[i]){
                        chosed.push(this.idList[i])
                    }
                }
                if(chosed.length==0) return $('.bs-example-modal-sm').modal();
                this.$router.push(location=conf.prePath+'/EntityResult/'+this.relationWord+'/'+chosed);
            },
            hintHide: function () {
                if (this.hintHideCan) {
                    this.hintShow = false;
                }
            },
            hintToInput: function (hint) {
                this.relationWord = hint;
                this.hintShow = false;
            },

            hintDown: function (input) {
                if (!this.hintShow) {
                    return
                }
                this.hintNow++;
                if (this.hintNow == this.hints.length) this.hintNow = -1;
//                this.relationWord = this.hints[this.hintNow];
            },
            hintUp: function (input) {
                if (!this.hintShow) {
                    return
                }
                this.hintNow--;
//                if (this.hintNow == -2) this.hintNow = this.hints.length - 1;
            },
            //鼠標在hint上面移動時,hint選中效果
            mouseoverHint: function (index) {
                this.hintNow = index;
                this.relationWord = this.hints[this.hintNow];
            },
            search: function () {
                if (this.hintNow != -1) {
                    this.relationWord = this.hints[this.hintNow]
                }
                this.hintShow = false;
            },
            relationClick:function (index) {
                this.$set(this.activeList, index, !this.activeList[index])

            },
            force:function () {
                this.$emit('force');
            }
        }
    }
</script>

<style lang="css" scoped>
    .chartbtn {
        position: absolute;
        top: 0;
        right: -70px;
        height: 40px;
        padding: 2px 10px;
        background: #38f;
    }
    .info_srarch {
        width: 100%;
        padding: 0;
        margin-bottom: 25px;
        margin-top: 60px;
    }

    .info_srarch_heade {
        width: 100%;
        text-align: center;
    }

    .info_srarch_heade > div {
        position: relative;
        width: 56.5%;
        margin: 45px auto;
    }

    .info_srarch_heade > div > input {
        outline: none;
        text-indent: 5px;
        box-sizing: border-box;
        height: 40px;
        width: 100%;
        font-family: 'Arial', 'STHeitiSC-Light', 'Heiti SC Light', 'Heiti SC', 'STHeiti', 'Microsoft YaHei';
        font-size: 14px;
        font-weight: 600;
        padding-left: 5px;
        border: 1px solid #38f;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #38f;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #38f;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #38f;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #38f;
    }

    .info_srarch_heade > div > input:hover, .info_srarch_heade > div > input:focus {
        border: 2px solid #38f;
    }

    .searchbtn {
        position: absolute;
        top: 0;
        right: 0;
        border: 1px solid #38f;
        border-radius: 0;
        background: #38f;
        text-align: center;
        padding: 0 27px;
        line-height: 38px;
        font-weight: 600;
        font-size: 15px;
    }

    .search_search_hint {
        position: absolute;
        top: 40px;
        z-index: 10;
        width: 100%;
    }

    .search_search_hint > ul {
        list-style: none;
        padding: 0;
        float: left;
        font-size: 14px;
        width: 100%;
        background: #e4e9ee;
    }

    .search_search_hint > ul > li {
        text-align: left;
        padding: 5px 0;
        padding-left: 10px;
        cursor:pointer;
    }

    .curr {
        background: #f3f3f3;
    }

    .instance_six {
        position: relative;
        padding-left: 90px;
    }

    .instance_six > span {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        font-size: 18px;
        font-weight: 600;
    }

    .instance_six ul {
        margin: 0;
        padding: 0;
    }

    .instance_six li {
        display: inline-block;
        cursor: pointer;
        width: auto;
        height: 24px;
        line-height: 24px;
        margin: 15px 6px;
    }

    .instance_six li .btn {
        line-height: 1.0;
    }

    .instance_six li i, .instance_six li span {
        display: inline-block;
        vertical-align: middle;
        font-size: 15px;
        font-weight: 500;
    }

    .instance_six li i {
        width: 24px;
        height: 22px;
        background-position: 0 0;
        background: url(./../static/img/blue2.png);
    }

    .instance_six li:hover i {
        background-position: -24px 0;
    }

    .instance_six li.checked i {
        background-position: -48px 0;
    }

    .instance_body {
        margin-top: 40px;
        width: 80%;
        margin: 0 auto;
        padding: 0 12%;
    }

    .insimg img {
        display: inline-block;
        width: 48%;
        margin-top: 30px;
        cursor: pointer;
    }
    .charthide{
        display: none;
    }
</style>
