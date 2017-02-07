<template>
  <div>
     <p>SelectBox</p>
     <SelectBox :data="list" :placeholder="!true" :placeholderText="'请选择...'" :muti="!0"  :search="true" ref="select" @select="select"></SelectBox>
     <p>联动</p>
     <SelectBox :data="list2" :placeholder="true" :placeholderText="'请选择1...'"  :muti="!0" :search="[!0,!0,!1]" :son="!0" ref="select2" @select="select2"></SelectBox>
  </div>
</template>

<script>
import Vue from 'vue'
import SelectBox from '../components/select'

let data = [
  {
    "name":"\u5317\u4eac\u5e02",
    "id":"10"
  },
  {
    "name":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a",
    "id":"11"
  },
  {
    "name":"\u8fbd\u5b81\u7701",
    "id":"12"
  },
  {
    "name":"江西省",
    "id":"13"
  },
  {
    "name":"内蒙古",
    "id":"14"
  }
],
datax = [
  {
    "name":"\u5317\u4eac\u5e02",
    "id":"10"
  },
  {
    "name":"\u5185\u8499\u53e4\u81ea\u6cbb\u533a",
    "id":"11"
  },
  {
    "name":"\u8fbd\u5b81\u7701",
    "id":"12"
  },
  {
    "name":"江西省",
    "id":"13"
  },
  {
    "name":"内蒙古",
    "id":"14"
  }
],
  data2=[
     {
       fid:10,
       list:[{
		  "id": "100",
          "name": "\u4e1c\u57ce\u533a"
       }, {
		  "id": "101",
		  "name": "\u897f\u57ce\u533a"
	   }, {
		  "id": "102",
          "name": "\u5d07\u6587\u533a"
	   }, {
          "id": "103",
          "name": "\u5ba3\u6b66\u533a"
	   }, {
          "id": "104",
          "name": "\u671d\u9633\u533a"
	   }, {
          "id": "105",
          "name": "\u4e30\u53f0\u533a"
	   }, {
          "id": "106",
          "name": "\u77f3\u666f\u5c71\u533a"
	   }, {
          "id": "107",
          "name": "\u6d77\u6dc0\u533a"
	   }, {
          "id": "108",
          "name": "\u95e8\u5934\u6c9f\u533a"
	   }, {
          "id": "109",
          "name": "\u623f\u5c71\u533a"
	   }, {
          "id": "110",
          "name": "\u901a\u5dde\u533a"
	   }, {
          "id": "111",
          "name": "\u987a\u4e49\u533a"
	   }, {
          "id": "112",
          "name": "\u660c\u5e73\u533a"
	   }, {
          "id": "113",
          "name": "\u5927\u5174\u533a"
	   }, {
          "id": "114",
          "name": "\u6000\u67d4\u533a"
	   }, {
          "id": "115",
          "name": "\u5e73\u8c37\u533a"
	   }, {
          "id": "116",
          "name": "\u5bc6\u4e91\u53bf"
	   }, {
          "id": "117",
          "name": "\u5ef6\u5e86\u53bf"
	   }]
     },
     {
       fid:11,
       list:[{
		   "id": "217",
		   "name": "\u547c\u548c\u6d69\u7279\u5e02"
	    }, {
		   "id": "218",
		   "name": "\u5305\u5934\u5e02"
	    }, {
		   "id": "219",
		   "name": "\u4e4c\u6d77\u5e02"
	    }, {
		   "id": "220",
		   "name": "\u8d64\u5cf0\u5e02"
	    }, {
		   "id": "221",
		   "name": "\u901a\u8fbd\u5e02"
	    }, {
		   "id": "222",
		   "name": "\u9102\u5c14\u591a\u65af\u5e02"
	    }, {
		   "id": "223",
		   "name": "\u547c\u4f26\u8d1d\u5c14\u5e02"
	    }, {
		   "id": "224",
		   "name": "\u5df4\u5f66\u6dd6\u5c14\u5e02"
	    }, {
		   "id": "225",
		   "name": "\u4e4c\u5170\u5bdf\u5e03\u5e02"
	    }, {
		   "id": "226",
		   "name": "\u5174\u5b89\u76df"
	    }, {
		   "id": "227",
		   "name": "\u9521\u6797\u90ed\u52d2\u76df"
	    }, {
		   "id": "228",
		   "name": "\u963f\u62c9\u5584\u76df"
	    }]
     },
     {
       fid:12,
       list:[{
			"id": "229",
			"name": "\u6c88\u9633\u5e02",
		}, {
			"id": "230",
			"name": "\u5927\u8fde\u5e02"
		}, {
			"id": "231",
			"name": "\u978d\u5c71\u5e02"
		}, {
			"id": "232",
			"name": "\u629a\u987a\u5e02"
		}, {
			"id": "233",
			"name": "\u672c\u6eaa\u5e02"
		}, {
			"id": "234",
			"name": "\u4e39\u4e1c\u5e02"
		}, {
			"id": "235",
			"name": "\u9526\u5dde\u5e02"
		}, {
			"id": "236",
			"name": "\u8425\u53e3\u5e02"
		}, {
			"id": "237",
			"name": "\u961c\u65b0\u5e02"
		}, {
			"id": "238",
			"name": "\u8fbd\u9633\u5e02"
		}, {
			"id": "239",
			"name": "\u76d8\u9526\u5e02"
		}, {
			"id": "240",
			"name": "\u94c1\u5cad\u5e02"
		}, {
			"id": "241",
			"name": "\u671d\u9633\u5e02"
		}, {
			"id": "242",
			"name": "\u846b\u82a6\u5c9b\u5e02"
		}]
     }
  ],
  data3 = [
     {
       fid:217,
       list:[{
			"id": "1281",
			"name": "\u65b0\u57ce\u533a"
		}, {
			"id": "1282",
			"name": "\u56de\u6c11\u533a"
		}, {
			"id": "1283",
			"name": "\u7389\u6cc9\u533a"
		}, {
			"id": "1284",
			"name": "\u8d5b\u7f55\u533a"
		}, {
			"id": "1285",
			"name": "\u571f\u9ed8\u7279\u5de6\u65d7"
		}, {
			"id": "1286",
			"name": "\u6258\u514b\u6258\u53bf"
		}, {
			"id": "1287",
			"name": "\u548c\u6797\u683c\u5c14\u53bf"
		}, {
			"id": "1288",
			"name": "\u6e05\u6c34\u6cb3\u53bf"
		}, {
			"id": "1289",
			"name": "\u6b66\u5ddd\u53bf"
		}]
     },
     {
       fid:218,
       list:[{
			"id": "1290",
			"name": "\u4e1c\u6cb3\u533a"
		}, {
			"id": "1291",
			"name": "\u6606\u90fd\u4ed1\u533a"
		}, {
			"id": "1292",
			"name": "\u9752\u5c71\u533a"
		}, {
			"id": "1293",
			"name": "\u77f3\u62d0\u533a"
		}, {
			"id": "1294",
			"name": "\u767d\u4e91\u77ff\u533a"
		}, {
			"id": "1295",
			"name": "\u4e5d\u539f\u533a"
		}, {
			"id": "1296",
			"name": "\u571f\u9ed8\u7279\u53f3\u65d7"
		}, {
			"id": "1297",
			"name": "\u56fa\u9633\u53bf"
		}, {
			"id": "1298",
			"name": "\u8fbe\u5c14\u7f55\u8302\u660e\u5b89\u8054\u5408\u65d7"
		}]
     },
     {
       fid:219,
       list:[{
			"id": "1299",
			"name": "\u6d77\u52c3\u6e7e\u533a"
		}, {
			"id": "1300",
			"name": "\u6d77\u5357\u533a"
		}, {
			"id": "1301",
			"name": "\u4e4c\u8fbe\u533a"
		}]
     },
     {
       fid:229,
       list:[{
			"id": "1382",
			"name": "\u548c\u5e73\u533a"
		}, {
			"id": "1383",
			"name": "\u6c88\u6cb3\u533a"
		}, {
			"id": "1384",
			"name": "\u5927\u4e1c\u533a"
		}, {
			"id": "1385",
			"name": "\u7687\u59d1\u533a"
		}, {
			"id": "1386",
			"name": "\u94c1\u897f\u533a"
		}, {
			"id": "1387",
			"name": "\u82cf\u5bb6\u5c6f\u533a"
		}, {
			"id": "1388",
			"name": "\u4e1c\u9675\u533a"
		}, {
			"id": "1389",
			"name": "\u65b0\u57ce\u5b50\u533a"
		}, {
			"id": "1390",
			"name": "\u4e8e\u6d2a\u533a"
		}, {
			"id": "1391",
			"name": "\u8fbd\u4e2d\u53bf"
		}, {
			"id": "1392",
			"name": "\u5eb7\u5e73\u53bf"
		}, {
			"id": "1393",
			"name": "\u6cd5\u5e93\u53bf"
		}, {
			"id": "1394",
			"name": "\u65b0\u6c11\u5e02"
		}]
     },
     {
       fid:235,
       list:[{
			"id": "1430",
			"name": "\u53e4\u5854\u533a"
		}, {
			"id": "1431",
			"name": "\u51cc\u6cb3\u533a"
		}, {
			"id": "1432",
			"name": "\u592a\u548c\u533a"
		}, {
			"id": "1433",
			"name": "\u9ed1\u5c71\u53bf"
		}, {
			"id": "1434",
			"name": "\u4e49\u53bf"
		}, {
			"id": "1435",
			"name": "\u51cc\u6d77\u5e02"
		}, {
			"id": "1436",
			"name": "\u5317\u9547\u5e02"
		}]
     },
     {
       fid:240,
       list:[{
			"id": "1461",
			"name": "\u94f6\u5dde\u533a"
		}, {
			"id": "1462",
			"name": "\u6e05\u6cb3\u533a"
		}, {
			"id": "1463",
			"name": "\u94c1\u5cad\u53bf"
		}, {
			"id": "1464",
			"name": "\u897f\u4e30\u53bf"
		}, {
			"id": "1465",
			"name": "\u660c\u56fe\u53bf"
		}, {
			"id": "1466",
			"name": "\u8c03\u5175\u5c71\u5e02"
		}, {
			"id": "1467",
			"name": "\u5f00\u539f\u5e02"
		}]
     }
  ]

export default {
  data(){
    return {
       list:data,
       list2:[datax,data2,data3]
	}
  },
  components: {
     SelectBox
  },
  methods:{
    select(arr){
	   arr.map((item)=>{
	      console.log("单项:  id:"+item.id+"  name:"+item.name)
	   })
    },
	select2(arr){
	   let str = ""
	   arr.map((item)=>{
	      str += " id:"+item.id+"  name:"+item.name
	   })
	   console.log("联动:  "+str)
    }
  }
}
</script>
