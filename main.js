import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import PopupTest from './contents/popup'
import DialogTest from './contents/dialog'
import NoticeTest from './contents/notice'
import ShifterTest from './contents/shifter'
import SelectTest from './contents/select'
import RangeTest from './contents/range'
import './resources/css/bootstrap.min.css'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name:"Home",
		component: App
	},
	{
		path: '/popup',
		name:"Popup",
		component: PopupTest
	},
	{
		path: '/dialog',
		name:"Dialog",
		component: DialogTest
	},
	{
		path: '/notice',
		name:"Notice",
		component: NoticeTest
	},
	{
		path: '/shifter',
		name:"Shifter",
		component: ShifterTest
	},
	{
		path: '/select',
		name:"Select",
		component: SelectTest
	},
	{
		path:'/range',
		name:"Range",
		component: RangeTest
	}
]

const router = new VueRouter({
	routes
})

new Vue({
	router,
	data(){
	   return {
	     navs:routes.map((route)=>{
			 route.active = this.$route.path === route.path?1:0;
			 return route;
		 }),
		 name:'Vuejs + Bootstrap UI'  
       }
    },
	methods:{
	   navClick(k){
		   this.navs = this.navs.map((nav,key)=>{
			   nav.active = (key===k)?1:0;
			   return nav;
		   })
	   }	
	},
	template: `
    <div class="container-fluid">
		<div class="page-header">
			<h1>{{name}}</h1>
		</div>
		<div class="row">
			<div class="col-lg-1 col-md-2 col-sm-2 col-xs-4">
				<ul class="nav nav-pills nav-stacked">
					<li v-for="nav,key in navs" :class="nav.active?'active':''"  @click="navClick(key)">
                      <router-link :to="nav.path">{{nav.name}}</router-link>
                    </li>
				</ul>
			</div>
			<div class="col-lg-11 col-md-10 col-sm-10 col-xs-8">
				<router-view></router-view>
			</div>
		</div>
	</div>
  `
}).$mount('#app')
