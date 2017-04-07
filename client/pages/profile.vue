<template>
    <div>
        <div class="box">
            <ul>
                <li>
                    <h5>
                        <span>用户名：</span>
                    </h5>
                    <input type="text" readonly :value="user.name"/>

                </li>

                <li>
                    <h5>
                        <span>昵称：</span>
                    </h5>
                    <input type="text" :readonly="!nicknameE" v-model="nickname" :class="{editing:nicknameE}" />
                    <span v-show="!nicknameE" class="edit" @click="edit('nicknameE')"></span>
                    <div v-show="nicknameE" class="amend">
                        <span class="right"  @click="editcompnick('nicknameE')"></span>
                        <span class="wrong"  @click="canceledit('nicknameE')"></span>
                    </div>
                </li>
                <li>
                    <h5>
                        <span>密码：</span>
                    </h5>
                    <input  type="password" :value="password" readonly />
                    <span  v-show="!passwordE" class="edit" @click="edit('passwordE')"></span>
                    <div v-show="passwordE" >
                        <div class="modal fade pwdmodal" id="pwdmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header" style="background: #f4f4f4;">
                                        <h4 class="modal-title" >修改账号密码</h4>
                                    </div>
                                    <div class="modal-body" >
                                        <ul>
                                            <li>
                                                <h5>
                                                    <span>原始密码：</span>
                                                </h5>
                                                <input type="password" v-model="oldpwd" @blur="oldpwdExec" @focus="oldpwdRight=''"/>
                                                <div v-show="oldpwdRight=='right'" class="amend">
                                                    <span class="right"></span>
                                                    <span>已认证成功</span>
                                                </div>
                                                <div v-show="oldpwdRight=='wrong'" class="amend">
                                                    <span class="wrong"></span>
                                                    <span>认证失败</span>
                                                </div>
                                            </li>
                                            <li>
                                                <h5>
                                                    <span>新密码：</span>
                                                </h5>
                                                <input type="password" v-model="newpwd" @blur="newpwdExec"  @focus="newpwdRight=''"/>
                                                <div v-show="newpwdRight=='right'" class="amend">
                                                    <span class="right"></span>
                                                </div>
                                                <div v-show="newpwdRight=='wrong'" class="amend">
                                                    <span class="wrong"></span>
                                                </div>
                                            </li>
                                            <li>
                                                <h5>
                                                    <span>确认密码：</span>
                                                </h5>
                                                <input type="password"  v-model="newpwdAgain" @keyup="newpwdAgainExec" />
                                                <div v-show="newpwdAgainRight=='right'" class="amend">
                                                    <span class="right"></span>
                                                </div>
                                                <div v-show="newpwdAgainRight=='wrong'" class="amend">
                                                    <span class="wrong"></span>
                                                </div>
                                            </li>
                                        </ul>
                                        <p v-show="newpwdAgainRight=='wrong'">输入密码不一致!请重新输入!</p>
                                    </div>
                                    <div class="buttoncenter">
                                        <button type="button" class="btn btn-primary" @click="editpassword">确定</button>
                                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="canceledit('passwordE')">取消</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </li>

                <li>
                    <h5>
                        <span>公司：</span>
                    </h5>
                    <input type="text"  :readonly="!companyE" v-model="company" :class="{editing:companyE}"/>
                    <span v-show="!companyE" class="edit" @click="edit('companyE')"></span>
                    <div  v-show="companyE" class="amend">
                        <span class="right" @click="editcompnick('companyE')"></span>
                        <span class="wrong" @click="canceledit('companyE')"></span>
                    </div>
                </li>
            </ul>
        </div>

        <!-- 提示输入不为空 -->
        <div class="modal fade bs-example-modal-sm " id tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
             aria-hidden="true" >
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" >不可修改!</h4>
                    </div>
                    <div class="modal-body">
                        请输入合法的修改内容！
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import conf from '../Conf';
    export default{
        data(){
            return {

                user:{ //用户信息
                    name:'zhangxu',
                    company:'231231@213.com',
                    password:'aaaaaa',
                    nickname:'aaaaaa',
                },
                name:'',
                company:'',
                password:'',
                nickname:'',

                companyE:false,//正在修改公司
                passwordE:false,
                nicknameE:false,

                newpwd:'',//新密码
                oldpwd:'',
                newpwdAgain:'',

                oldpwdRight:'',//老密码是否正确
                newpwdRight:'',//新密码是否可用
                newpwdAgainRight:'',
            }
        },
        watch:{
            user:{
                handler:function(val,oldVal){
                    this.name=this.user.name;
                    this.password=this.user.password;
                    this.company=this.user.company;
                    this.nickname=this.user.nickname;
                },
                deep:true
            },


        },
        created: function () {
            this.init();
        },
        methods:{
            init:function(){
                let body = {userId:sessionStorage.userInfo};
                let self = this;
                this.$http.post(conf.bathPath + '/users/userInfo', body).then((res) => {
                    if(res.body.user){
                        self.user=res.body.user;
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            edit:function(edit){
                    this[edit]=true;
                    if(edit=='passwordE'){
                        $('#pwdmodal').modal()
                    }

            },
            canceledit:function(edit){
                this[edit]=false;

                if(edit=='passwordE'){
                    this.password=this.user.password;
                        this.newpwd='';//新密码
                        this.oldpwd='';
                        this.newpwdAgain='';

                        this.oldpwdRight='';
                        this.newpwdRight='';
                        this.newpwdAgainRight='';
                }
                if(edit=='companyE'){
                    this.company=this.user.company
                }
                else{
                    this.nickname=this.user.nickname
                }

            },
            editcompnick:function (type) {
                if(type=='companyE'){
                    if(this.company!=''&&this.company.length<13){
                        this.changeinfo('company',this.company);
                    }
                    else{
                        $('.bs-example-modal-sm').modal();
                    }
                }
                else{
                    if(this.nickname!=''&&this.nickname.length<20) {
                        this.changeinfo('nickname', this.nickname);
                    }
                    else{
                        $('.bs-example-modal-sm').modal();
                    }
                }
            },

            editpassword:function () {
                if(this.oldpwdRight=='right'&&this.newpwdRight=='right'&&this.newpwdAgainRight=='right'){
                    this.changeinfo('password',this.newpwd);
                }else{
                    $('.bs-example-modal-sm').modal();
                }
            },
            changeinfo:function (type,value) {
                let body = {type: type,val:value,id:sessionStorage.userInfo};
                let self = this;
                this.$http.post(conf.bathPath + '/users/updateUser', body).then((res) => {
                    if(res.body.data){
                        self.user[type]=value;
                        self.canceledit(type+'E')
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            oldpwdExec:function(){//原始密码验证
                if(this.oldpwd==this.user.password){
                    this.oldpwdRight='right'
                }else{
                    this.oldpwdRight='wrong'
                }
            },
            newpwdExec:function () {//新密码验证
                if(this.newpwd!=''&&this.newpwd.length<13){
                    this.newpwdRight='right'
                }else{
                    this.newpwdRight='wrong'
                }
            },
            newpwdAgainExec:function () {//再次密码验证
                if(this.newpwd==this.newpwdAgain){
                    this.newpwdAgainRight='right'
                }else{
                    this.newpwdAgainRight='wrong'
                }
            },

        },
        components: {
        },
        updated:function(){

        },
    }









</script>

<style scoped>

    ul,li{
        list-style: none;
    }
    .box{
        margin-left:100px;
    }
    .box>ul>li{
        margin: 40px 0;
        position: relative;
    }
    h5{
        display: inline-block;
        width:100px;
    }
    h5>span{
        font-size: 18px;
        color:#444;
        font-weight: 500;
    }
    li>input{
        display: inline-block;
        width: 300px;
        height: 30px;
        padding: 6px 12px;
        font-size: 18px;
        line-height: 1.42857143;
        color: #444;
        background-color: #fff;
        background-image: none;
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    li>input.editing{
        border-radius: 5px ;
        -webkit-box-shadow: inset 0 0 7px rgba(0,0,0,.075);
        box-shadow: inset 0 0 7px rgba(0,0,0,.075);
    }
    .edit {
        margin-left:20px;
        display: inline-block;
        vertical-align: middle;
        width: 28px;
        height: 24px;
        background:url('../static/img/edit.png');
        cursor: pointer;
        opacity: 0.8;
    }
    .edit:hover{
        opacity: 1.0;
    }
    .amend{
        margin-left:10px;
        display: inline-block;
        vertical-align: middle;
    }
    .box>ul>li>.amend>span{
        cursor:pointer;
        vertical-align: middle;
    }
    .amend>span{
        vertical-align: middle;
    }
    .amend>span.right,.amend>span.wrong{
        display: inline-block;
        width:28px;
        height:24px;
        margin-left: 10px;

    }
    span.right{
        background: url('../static/img/yes.png');
    }
    span.wrong{
        background: url('../static/img/cancel.png');
    }
    .pwdmodal .modal-dialog {
        width: 600px;
        margin: 160px auto;
    }
    .bs-example-modal-sm .modal-dialog {
        margin: 120px auto;
    }
    .modal-header {
        border-radius: 6px 6px 0 0;
    }
    .pwdmodal .modal-body>ul>li{
        margin:16px;
        padding:1px;
    }
    .pwdmodal .modal-body>ul>li>input{
        display: inline-block;
        width: 250px;
        height: 34px;
        padding: 6px 12px;
        font-size: 18px;
        line-height: 1.42857143;
        color: #444;
        border-radius: 5px ;
        border:1px solid #ddd;
    }
    .pwdmodal .modal-body>p{
        color:red;
        text-align: center;

    }
    .buttoncenter{
        margin:10px 0 30px 0;
        text-align: center;
    }
    .buttoncenter>button{
        margin:0 15px;
    }
</style>