<template>
    <div style="width:95%;margin: 0 auto;">
        <section style="margin-top:50px;">

            <div class="container" >

                <div class="row">
                    <input type="hidden" name="applyCount" value="3">
                    <table id="sample-table-2" class="table table-striped table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>申请人</th>
                            <th>时间</th>
                            <th>类型</th>
                            <th>状态</th>
                            <th class="hidden-480">内容</th>
                            <th>关注度</th>
                            <th>关键字</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(apply,index) in applys">
                            <td class="">{{apply.applicant}}</td>
                            <td class="hidden-480">{{apply.time}}</td>

                            <td class="">{{apply.type | typeCheck}}</td>





                            <td class="">{{apply.status | statusCheck}}</td>



                            <td class="">{{apply.content}}</td>



                            <td class="">{{apply.siteslevle | levelCheck}}</td>



                            <td class="">{{apply.keyword}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="add_apply" class="row">
                <button class="btn btn-info"  @click="addApply">添加申请</button>
            </div>
        </section>
        <div id="apply" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm add_modal-dialog">

                <div class="modal-content add_modal-content">
                    <div class="modal-head">
                        <div>添加申请</div>
                    </div>
                    <div>
                        <div class="col-sm-4 text">申请内容:</div>
                        <div class="col-sm-8 input ">
                            <input  class="form-control" v-model="content"  @change="contentCheck">

                            <div class="help-block"  v-show="!contentRight">申请内容不能为空!</div>
                        </div>
                    </div>

                    <div>
                        <div class="col-sm-4 text">关键字:</div>
                        <div class="col-sm-8 input ">
                            <input  class="form-control" v-model="keyword" @change="keywordCheck">

                            <div class="help-block" v-show="!keywordRight">请填写申请关键字!</div>
                        </div>
                    </div>

                    <div>
                        <div class="col-sm-4 text">关注度:</div>
                        <div class="col-sm-8 input">
                            <label>
                                <select v-model="levle" >
                                    <option value="core">核心</option>
                                    <option value="important">重要</option>
                                    <option value="generally">普通</option>
                                </select>
                            </label>
                        </div>
                    </div>

                    <div>
                        <div class="col-sm-4 text">申请类型:</div>
                        <div class="col-sm-8 input">
                            <label>
                                <select v-model="type" >
                                    <option value="website">网站</option>
                                    <option value="other">其他</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div class="text-center">
                        <button  class="btn btn-info" @click="addApplyYse">确定</button>

                        <button  class="btn btn-default"  @click="addApplyNo">取消</button>
                        <div style="clear: both"></div>
                    </div>
                </div>
            </div>
        </div>
        <paging :totalPage="totalPage" :page="page" @pageChange="pageChange"></paging>

        <!--alert-->
        <div class="saveadd modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{modalTip}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import conf from './../Conf';
    import moment from 'moment';
    import paging from './../components/paging.vue';

    export default{
        data(){
            return {
                totalPage: 1,
                page: 1,
                applys:[],//申请列表

                content:'',
                keyword:'',
                levle:'core',
                type:'website',

                applicant:'',

                contentRight:true,//验证
                keywordRight:true,

                modalTip:"",
            }
        },
        created: function () {
                this.commonChange();
        },
        components: {
            paging: paging,
        },
        methods: {
            commonChange: function () {
                let body = {
                    userID: sessionStorage.userInfo,
                    page:this.page,
                };
                let self = this;
                this.$http.post(conf.bathPath + '/users/getUserApply', body).then((res) => {
                    self.applys = res.data.userApplys;
                    self.applicant = self.applys[0].applicant;
                    self.totalPage = Math.ceil(res.data.totalPage / 20);
                }, (err) => {
                    console.log(err);
                });
            },
            pageChange: function (page) {
                this.page = page;
                this.commonChange();
            },


            addApply: function () {
                    this.content='';
                    this.keyword='';
                    this.levle='core'
                    this.type='website'
                $('#apply').modal();
            },
            contentCheck:function(){
                if(this.content==''){
                  this.contentRight=false;
                }else{
                    this.contentRight=true;
                }

            },
            keywordCheck:function(){
                if(this.keyword==''){
                    this.keywordRight=false;
                }
                else{
                    this.keywordRight=true;
                }
            },
            addApplyYse:function(){
                let self = this;
                this.contentCheck();
                this.keywordCheck();
                if(this.contentRight&&this.keywordRight){
                    this.applys.forEach(function(d){
                        if(d.content==self.content){
                            this.modalTip = '该内容已申请过！' ;
                            $('.bs-example-modal-sm').modal();
                            return;
                        }
                    });
                    let body={
                        content:this.content,
                        keyword:this.keyword,
                        sitesLevle:this.levle,
                        type:this.type,
                        id:sessionStorage.userInfo,
                        applicant:this.applicant,
                    };
                    this.$http.post(conf.bathPath + '/users/addUserApply', body).then((res) => {
                        this.commonChange();
                    }, (err) => {
                        console.log(err);
                    });
                    $('#apply').modal('hide')
                };

            },
            addApplyNo:function(){//取消导出
                $('#apply').modal('hide')
            },
        },
        filters: {
            levelCheck: function (value) {
                let val = '';
                if (value=='core') {val='核心'}
                if (value=='important') {val='重要'}
                if (value=='normal') {val='普通'}
                return val;
            },
            typeCheck: function (value) {
                let val = '';
                if (value=='website') {val='网站'}
                else{val='其他'}
                return val;
            },
            statusCheck: function (value) {
                let val = '';
                if (value=='check') {val='申请中'}
                if (value=='processing') {val='通过处理中'}
                if (value=='finish') {val='处理完成'}
                if (value=='nopass') {val='拒绝申请'}
                return val;
            }
        }
    }

</script>

<style scoped>

    section .container{
        width:100%;
        margin: 0 auto;
    }
    .table thead tr {
        color: #707070;
        font-weight: normal;
        background: #f2f2f2;
        background-image: -webkit-gradient(linear, left 0, left 100%, from(#f8f8f8), to(#ececec));
        background-image: -webkit-linear-gradient(top, #f8f8f8, 0%, #ececec, 100%);
        background-image: -moz-linear-gradient(top, #f8f8f8 0, #ececec 100%);
        background-image: linear-gradient(to bottom, #f8f8f8 0, #ececec 100%);
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff8f8f8', endColorstr='#ffececec', GradientType=0);
    }

    #add_apply{
        margin-top:30px;
        text-align: center;
    }



    #apply .modal-sm {
        width: 600px;
        margin-top: 100px;
    }
    .add_modal-content > div:after {
        content: '';
        visibility: hidden;
        height: 0;
        display: block;
        width: 0;
        clear: both;
    }

    .add_modal-content > div > div.text {
        text-align: right;
        line-height: 65px;
        color: #444;
        font-size: 16px;
    }

    .add_modal-content > div > div.input {
        height: 65px;
        padding-top: 18px;
        position: relative;
        padding-right:20%;
    }

    .add_modal-content .input > input {
        border-radius: 5px !important;
    }




    .add_modal-content > div.button {
        text-align: center;
    }

    .add_modal-content > div button {
        margin: 20px;
    }

    .add_modal {
        width: 80%;
        border: 1px solid #C6C6C6;
    }

    .add_modal {
        width: 80%;
        height: 33px;
    }

    #sample-table-2{
        margin-bottom: 0;
    }
    label select{
        color: #666;
        font-weight: 400;
        border-radius: 5px;
        padding: 4px 7px;
    }
    .help-block{
      font-size: 12px;
        color:#e4393c;
    }

    .modal-head{
        height: 50px;
        position: relative;
        background-color: #f4f4f4;
        border: 1px solid #d3d3d3;
        border-radius: 6px 6px 0 0;
        margin-bottom: 10px;
    }
    .modal-head>div{
        margin:15px 0 0 30px;
        font-weight: 500;
        font-size: 15px;
    }
</style>