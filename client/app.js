import Vue from "vue";
import App from "./appParent.vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import conf from './Conf';



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: conf.prePath,
        },
        {
            path: conf.prePath,//个人中心
            component: require('./app.vue'),
            children: [
                {
                    path: '',
                    redirect: 'login'
                },
                {
                    path: 'login',
                    name: 'login',
                    component: require('./pages/login.vue')
                },
                {
                    path: 'TodayRecommend',//今日推荐
                    name: 'TodayRecommend',
                    component: require('./pages/TodayRecommend.vue')
                },
                {
                    path: 'RelationSearch',//关系搜索
                    name:'RelationSearch',
                    component: require('./pages/RelationSearch.vue')
                },
                {
                    path: 'EntityResult/:keyword/:types',//关系搜索结果
                    name: 'EntityResult',
                    component: require('./pages/EntityResult.vue')
                },
                {
                    path: 'force/:keyword',//force图
                    name: 'force',
                    component: require('./pages/force.vue')
                },
                {
                    path: 'WebsiteFocus',//网站关注
                    name: 'WebsiteFocus',
                    component: require('./pages/WebsiteFocus.vue')
                },
                {
                    path: 'InfoCard/:id',//卡片页
                    name: 'InfoCard',
                    component: require('./pages/InfoCard.vue')
                }
                ,
                {
                    path: 'KnowledgeBase',//知识库
                    name:'KnowledgeBase',
                    component: require('./pages/knowledgeBase.vue')
                },
                {
                    path: 'KnowledgeBaseResult/:keyword',//知识库结果
                    name:'KnowledgeBaseResult/:keyword',
                    component: require('./pages/knowledgeBaseResult.vue')
                },
                {
                    path: 'KeywordList/:type/:keyword',//关键词结果页
                    name: 'KeywordList',
                    component: require('./pages/keyWordResult.vue')
                },
                {
                    path: 'HomePage',//主页
                    name:'HomePage',
                    component: require('./pages/HomePage.vue')
                },
                {
                    path: 'globalSearch/:keyword',//全局搜索结果页
                    name: 'globalSearch',
                    component: require('./pages/globalSearch.vue')
                },
                {
                    path: 'Subscription',//专题订阅
                    name: 'Subscription',
                    component: require('./pages/TopicSubscriber.vue')
                },
                {
                    path: 'TopicCustom',//专题定制
                    name: 'TopicCustom',
                    component: require('./pages/TopicSubscriber.vue')
                },
                {
                    path: 'user/',//个人中心
                    name: 'user',
                    component: require('./pages/user.vue'),
                    children: [
                        {
                            path: '',
                            redirect: 'profile'
                        },
                        {
                            path: 'profile',
                            name: 'profile',
                            component: require('./pages/profile.vue')
                        },

                        {
                            path: 'collect',
                            name: 'collect',
                            component: require('./pages/userCollect.vue')
                        },
                        {
                            path: 'userApply',
                            name: 'userApply',
                            component: require('./pages/userApply.vue')
                        },
                        {
                            path: 'notes',
                            name: 'notes',
                            component: require('./pages/Notes.vue')
                        },
                        {
                            path: 'TopicSubscription',//个人专题订阅设置
                            name: 'TopicSubscription',
                            component: require('./pages/userTopicSub.vue')
                        },
                        {
                            path: 'siteFocusSet',//网站关注设置
                            name: 'siteFocusSet',
                            component: require('./pages/siteFocusSet.vue')
                        },
                        {
                            path: 'topicSet',//个人专题定制
                            name: 'topicSet',
                            component: require('./pages/topicSet.vue')
                        },
                        {
                            path: 'noteDetail/:id',//笔记详情
                            name: 'noteDetail',
                            component: require('./pages/noteDetail.vue')
                        },

                    ]
                },
            ],
        },

    ]
});

router.beforeEach((from, to, next) => {
    if (from.path != conf.prePath+'/' && from.path != conf.prePath+'/login') {
        if (sessionStorage.userInfo != undefined && new Date().getTime() - parseInt(sessionStorage.logintime) <600000) {
            next();
        } else {
            next(conf.prePath+'/login');
        }
    } else {
        next();
    }
});


/******************拦截器设置请参考这部分(开始)******************/
Vue.http.interceptors.push((request, next)  =>{
    if(request.body.httpname == undefined){
        if(new Date().getTime() - parseInt(sessionStorage.logintime) >600000){
            router.push(location=conf.prePath+'/login');
        }else{
            sessionStorage.logintime = new Date().getTime();
        }
    }
    next((response) => {
        return response;
    });
});
/******************拦截器设置请参考这部分(结束)******************/

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
})
