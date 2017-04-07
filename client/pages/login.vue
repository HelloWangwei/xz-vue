<template>
    <div>
        <div class="top-content">
            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                            <div class="logintitle text">
                                <h1 :class="{'locked':(userlocked||wrongnumber > 6)}">科技数据平台</h1>

                            </div>
                            <div class="form-bottom">
                                <div class="form-prompt" v-show="passwordTrue" v-if="wrongnumber <=6">
                                    <p class="promptmsg">密码输入错误！如果连续输错超过6次，用户将被锁定！</p>
                                </div>
                                <div class="form-prompt" v-show="(userlocked||wrongnumber > 6)">
                                    <p class="promptmsg">账户已锁定，请联系相关人员进行解锁！</p>
                                </div>
                                <form role="form" class="login-form">
                                    <div class="form-group">
                                        <label class="sr-only" for="form-username">用户名</label>
                                        <input type="text" v-model="username" placeholder="Username..."
                                               class="form-username form-control" id="form-username" @keydown.enter="login">
                                    </div>
                                    <div class="form-group">
                                        <label class="sr-only" for="form-password">密&nbsp;码</label>
                                        <input type="password" v-model="password" placeholder="Password..."
                                               class="form-password form-control password" id="form-password" @keydown.enter="login" @focus="passwordFocused">
                                        <span class="passwordprompt" v-show="passwordPrompt"></span>
                                    </div>
                                    <div class="form-group" v-show="wrongnumber>=1">
                                        <label class="sr-only" for="form-verification">验证码</label>
                                        <input type="text" v-model="verification" placeholder="Verification..."
                                               class="form-verification form-control verification" id="form-verification" @keydown.enter="login" @focus="codeFocused">
                                        <span class="codeprompt" v-show="codePrompt"></span>
                                        <span class="codeimg" id="v_container"></span>
                                        <span class="refreshprompt" @click="refreshPrompt"></span>
                                    </div>
                                    <div class="form-prompt" v-show="codeWrong">
                                        <p class="codewrong">验证码错误！</p>
                                    </div>
                                    <button type="button" @click="login" class="btn">登&nbsp;录</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="backstretch" style="">
        </div>
    </div>

</template>

<script>
    import conf from './../Conf';
    let vm = {
        data(){
            return {
                username: '',
                password: '',
                verification:'',
                passwordTrue:false,//密码错误提示
                passwordPrompt:false,//密码错误提示图标
                accountLock:false,//账号锁定提示
                codeWrong:false,//验证码错误提示
                codePrompt:false,//验证码错误提示图标
                wrongnumber:0,

                verifyCode:{},
                userlocked:false,//账户是否被锁定
            }
        },
        watch:{
            verification:function() {
                if(!this.verifyCode.validate(this.verification)){
                    this.codeWrong = true;
                }else{
                    this.codeWrong = false;
                    this.codePrompt = true;
                }

            }
        },
        created:function () {
            let self = this;
            !(function(window, document) {
                function GVerify(options) { //创建一个图形验证码对象，接收options对象为参数
                    this.options = { //默认options参数值
                        id: "", //容器Id
                        canvasId: "verifyCanvas", //canvas的ID
                        width: "120", //默认canvas宽度
                        height: "45", //默认canvas高度
                        type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
                        code: ""
                    }

                    if(Object.prototype.toString.call(options) == "[object Object]"){//判断传入参数类型
                        for(var i in options) { //根据传入的参数，修改默认参数值
                            this.options[i] = options[i];
                        }
                    }else{
                        this.options.id = options;
                    }

                    this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
                    this.options.letterArr = getAllLetter();

                    this._init();
                    this.refresh();
                }

                GVerify.prototype = {
                    /**版本号**/
                    version: '1.0.0',

                    /**初始化方法**/
                    _init: function() {
                        var con = document.getElementById(this.options.id);
                        var canvas = document.createElement("canvas");
                        this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "120";
                        this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "45";
                        canvas.id = this.options.canvasId;
                        canvas.width = this.options.width;
                        canvas.height = this.options.height;
                        canvas.style.cursor = "pointer";
                        canvas.innerHTML = "您的浏览器版本不支持canvas";
                        con.appendChild(canvas);
                        var parent = this;
                        canvas.onclick = function(){
                            parent.refresh();
                        }
                    },

                    /**生成验证码**/
                    refresh: function() {
                        this.options.code = "";
                        var canvas = document.getElementById(this.options.canvasId);
                        if(canvas.getContext) {
                            var ctx = canvas.getContext('2d');
                        }else{
                            return;
                        }

                        ctx.textBaseline = "middle";

                        ctx.fillStyle = randomColor(180, 240);
                        ctx.fillRect(0, 0, this.options.width, this.options.height);

                        if(this.options.type == "blend") { //判断验证码类型
                            var txtArr = this.options.numArr.concat(this.options.letterArr);
                        } else if(this.options.type == "number") {
                            var txtArr = this.options.numArr;
                        } else {
                            var txtArr = this.options.letterArr;
                        }

                        for(var i = 1; i <= 4; i++) {
                            var txt = txtArr[randomNum(0, txtArr.length)];
                            this.options.code += txt;
                            ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
                            ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
                            ctx.shadowOffsetX = randomNum(-3, 3);
                            ctx.shadowOffsetY = randomNum(-3, 3);
                            ctx.shadowBlur = randomNum(-3, 3);
                            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                            var x = this.options.width / 5 * i;
                            var y = this.options.height / 2;
                            var deg = randomNum(-30, 30);
                            /**设置旋转角度和坐标原点**/
                            ctx.translate(x, y);
                            ctx.rotate(deg * Math.PI / 180);
                            ctx.fillText(txt, 0, 0);
                            /**恢复旋转角度和坐标原点**/
                            ctx.rotate(-deg * Math.PI / 180);
                            ctx.translate(-x, -y);
                        }
                        /**绘制干扰线**/
                        for(var i = 0; i < 4; i++) {
                            ctx.strokeStyle = randomColor(40, 180);
                            ctx.beginPath();
                            ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                            ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                            ctx.stroke();
                        }
                        /**绘制干扰点**/
                        for(var i = 0; i < this.options.width/4; i++) {
                            ctx.fillStyle = randomColor(0, 255);
                            ctx.beginPath();
                            ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                            ctx.fill();
                        }
                    },

                    /**验证验证码**/
                    validate: function(code){
                        var code = code.toLowerCase();
                        var v_code = this.options.code.toLowerCase();
                        if(code == v_code){
                            return true;
                        }else{
//                            this.refresh();
                            return false;
                        }
                    }
                }
                /**生成字母数组**/
                function getAllLetter() {
                    var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
                    return letterStr.split(",");
                }
                /**生成一个随机数**/
                function randomNum(min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                }
                /**生成一个随机色**/
                function randomColor(min, max) {
                    var r = randomNum(min, max);
                    var g = randomNum(min, max);
                    var b = randomNum(min, max);
                    return "rgb(" + r + "," + g + "," + b + ")";
                }
                window.GVerify = GVerify;
            })(window, document);
            $(function(){self.verifyCode = new GVerify("v_container")});
        },
        methods: {
            login: function () {

                if(this.username==''){
                    $("#form-username").attr("placeholder","账号不能为空！");
                    return;
                }else if(this.password==''){
                    $("#form-password").attr("placeholder","密码不能为空！");
                    return;
                }


                if(this.wrongnumber>=1&&!this.verifyCode.validate(this.verification)){
                    this.codeWrong = true;
                    this.verification = '';
                    return;
                }

                else{
                    let self = this;
                    let body = {username: this.username, password: this.password,verification:this.verification,httpname:'login'};

                    if(!localStorage[this.username+'loginErrortime']){localStorage[this.username+'loginErrortime'] = new Date().getTime()}//首次登陆时赋值

                    if(new Date().getTime()-localStorage[this.username+'loginErrortime']>120000){//如果登陆错误时间大于两分钟,重新记录登陆错误次数
                        this.wrongnumber = 0;
                    }
                    this.$http.post(conf.bathPath + '/users/findUser', body).then((res) => {
                        if(res.data.frozen=='0'){
                            this.userlocked = true;//是冻结的账户
                            return;
                        }
                        if (res.data.result != false) {
                            sessionStorage.userInfo = res.data.result;
                            sessionStorage.logintime = new Date().getTime();
                            self.$router.push(location = conf.prePath+'/HomePage');
                            localStorage.removeItem(this.username+'loginErrortime');
                        } else {
                            this.passwordTrue = true;
                            this.passwordPrompt = true;
                                this.wrongnumber += 1;

                            localStorage[this.username+'loginErrortime'] = new Date().getTime();//每次登陆错误刷新错误登陆时间

                            if(this.wrongnumber>=6){//连续错误六次冻结账号
                                this.frozen();
                            }
                            this.verifyCode.refresh();
                            this.verification = '';
                        }

                        if (res.data.userCollectionIDs != false) {
                            localStorage.userCollectionIDs=JSON.stringify(res.data.userCollectionIDs);
                        }else{
                            localStorage.userCollectionIDs=JSON.stringify([]);
                        }

                    }, (err) => {
                        console.log(err);
                    });
                }

            },
            passwordFocused:function () {
                this.passwordTrue = false;
                this.passwordPrompt = false;
            },
            codeFocused:function () {//验证码输入框获得焦点
                this.codeWrong = false;
                this.codePrompt = false;
            },
            refreshPrompt:function () {//刷新验证码
                this.verifyCode.refresh();
            },
            frozen:function(){//冻结账号
                let body = {username: this.username};
                this.$http.post(conf.bathPath + '/users/frozenUser', body).then((res) => {
                    this.userlocked = true;
                }, (err) => {
                    console.log(err);
                });
            },

        },
    };
    export default vm;

</script>

<style lang="css" scoped>


    input[type="text"], input[type="password"], textarea, textarea.form-control {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #fff;
        border: 3px solid #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #888;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }

    input[type="text"]:focus, input[type="password"]:focus, textarea:focus, textarea.form-control:focus {
        outline: 0;
        background: #fff;
        border: 3px solid #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    input[type="text"], input[type="password"], textarea, textarea.form-control {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #fff;
        border: 3px solid #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #888;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }

    body {
        font-family: 'STHeitiSC-Light', 'Heiti SC Light', 'Heiti SC', 'STHeiti', 'Microsoft YaHei', 'arial';
        font-size: 16px;
        font-weight: 300;
        color: #888;
        line-height: 30px;

    }

    strong {
        font-weight: 500;
    }

    a, a:hover, a:focus {
        color: #de615e;
        text-decoration: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }

    h1, h2 {
        margin-top: 10px;
        font-size: 38px;
        font-weight: 100;
        color: #555;
        line-height: 50px;
        text-align: center;
    }

    h3 {
        font-size: 22px;
        font-weight: 300;
        color: #555;
        line-height: 30px;
    }

    img {
        max-width: 100%;
    }

    ::-moz-selection {
        background: #de615e;
        color: #fff;
        text-shadow: none;
    }

    ::selection {
        background: #de615e;
        color: #fff;
        text-shadow: none;
    }

    .btn-link-1 i {
        padding-right: 5px;
        vertical-align: middle;
        font-size: 20px;
        line-height: 20px;
    }

    .btn-link-2 {
        display: inline-block;
        height: 50px;
        margin: 5px;
        padding: 15px 20px 0 20px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #fff;
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }

    /***** Top content *****/

    .inner-bg {
        padding: 100px 0 170px 0;
    }

    .top-content .text {
        color: #fff;
    }

    .top-content .text h1 {
        color: #fff;
        background: url(../static/login/unlockicon.png) no-repeat right center;
        background-size: 30px;
        margin-right: 25px;
    }
    .top-content .text h1.locked{
        background: url(../static/login/lockedicon.png) no-repeat right center;
        background-size: 20px;
    }
    .top-content .description {
        margin: 20px 0 10px 0;
    }

    .top-content .description p {
        opacity: 0.8;
    }

    .top-content .description a {
        color: #fff;
    }

    .top-content .description a:hover,
    .top-content .description a:focus {
        border-bottom: 1px dotted #fff;
    }

    .form-box {
        margin-top: 35px;

    }

    .form-top-left h3 {
        margin-top: 0;
        color: #fff;
    }

    .form-top-left p {
        opacity: 0.8;
        color: #fff;
    }

    .form-bottom {
        padding: 25px 25px 30px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.3);
        -moz-border-radius: 0 0 4px 4px;
        -webkit-border-radius: 0 0 4px 4px;
        border-radius: 0 0 4px 4px;
        text-align: left;
    }

    .form-bottom form textarea {
        height: 100px;
    }

    .form-bottom form button.btn {
        width: 100%;
    }

    .form-bottom form .input-error {
        border-color: #de615e;
    }

    .social-login h3 {
        color: #fff;
    }

    /***** Media queries *****/

    @media (min-width: 992px) and (max-width: 1199px) {
    }

    @media (min-width: 768px) and (max-width: 991px) {
    }

    @media (max-width: 767px) {

        .inner-bg {
            padding: 60px 0 110px 0;
        }

    }

    @media (max-width: 415px) {

        h1, h2 {
            font-size: 32px;
        }

    }

    input[type="text"],
    input[type="password"],
    textarea,
    textarea.form-control {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #fff;
        border: 3px solid #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #888;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }

    textarea,
    textarea.form-control {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 30px;
    }

    input[type="text"]:focus,
    input[type="password"]:focus,
    textarea:focus,
    textarea.form-control:focus {
        outline: 0;
        background: #fff;
        border: 3px solid #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    input[type="text"]:-moz-placeholder, input[type="password"]:-moz-placeholder,
    textarea:-moz-placeholder, textarea.form-control:-moz-placeholder {
        color: #888;
    }

    input[type="text"]:-ms-input-placeholder, input[type="password"]:-ms-input-placeholder,
    textarea:-ms-input-placeholder, textarea.form-control:-ms-input-placeholder {
        color: #888;
    }

    input[type="text"]::-webkit-input-placeholder, input[type="password"]::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder, textarea.form-control::-webkit-input-placeholder {
        color: #888;
    }

    button.btn {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #de615e;
        border: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        text-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }

    button.btn:hover {
        opacity: 0.6;
        color: #fff;
    }

    button.btn:active {
        outline: 0;
        opacity: 0.6;
        color: #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    button.btn:focus {
        outline: 0;
        opacity: 0.6;
        background: #de615e;
        color: #fff;
    }

    button.btn:active:focus, button.btn.active:focus {
        outline: 0;
        opacity: 0.6;
        background: #de615e;
        color: #fff;
    }

    .backstretch {
        background: url('./../static/img/bg.jpg');
        left: 0;
        top: 0;
        overflow: hidden;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        z-index: -999999;
        position: fixed;
        background-size: cover;
    }
    .logintitle{
        background: rgba(20,20,20,.6);
        padding: 15px 0px;
        border-radius: 4px 4px 0px 0px;
        -moz-border-radius: 4px 4px 0px 0px; /* 老的 Firefox */
    }
    .form-prompt{
        margin: 0px 0px 10px 10px;
    }
    .form-prompt .promptmsg{
        color:#de615e;
        background: url(../static/login/errorsicon.png) no-repeat left center;
        padding-left: 23px;
    }
    .form-group{
        position:relative;
    }
    .passwordprompt{
        position: absolute;
        z-index: 20;
        right: 6px;
        top: 15px;
        width: 20px;
        height: 20px;
        background: url(../static/login/errorsicon.png) no-repeat left center;
    }
    .form-group .verification{
        width:280px;
        display: inline-block;
    }
    .form-group .codeprompt{
        position: absolute;
        z-index: 20;
        left: 260px;
        top: 15px;
        width: 25px;
        height: 25px;
        background: url(../static/login/righticon.png) no-repeat left center;
        cursor: pointer;
    }
    .form-group .codeimg{
        display: inline-block;
        vertical-align: middle;
        height: 45px;
        width: 160px;
        line-height: 45px;
        margin-left: 20px;
    }
    .form-group .codeimg img{
        height: 45px;
    }
    .form-group .refreshprompt{
        position: absolute;
        z-index: 20;
        right: 8px;
        top: 13px;
        width: 27px;
        height: 27px;
        background: url(../static/login/refreshicon.png) no-repeat left center;
        cursor: pointer;
    }
    .codewrong{
        background: url(../static/login/wrongicon.png) no-repeat left center;
        color: #de615e;
        padding-left: 23px;
    }
</style>