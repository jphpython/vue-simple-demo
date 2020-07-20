import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //state  全局状态
    state: {
        textList: [
            {
                'title': 'first title',
                'id': 1,
                'content': 'i am msg',
                'des': 'i am description'
            },
            {
                'title': '2 title',
                'id': 2,
                'content': 'i am msg2222',
                'des': 'i am description'
            },
            {
                'title': '3 title',
                'id': 3,
                'content': 'i am msg444',
                'des': 'i am description3232'
            },
            {
                'title': '4 title',
                'id': 4,
                'content': 'i am msg22221',
                'des': 'i am description444'
            },
            {
                'title': '5 title',
                'id': 5,
                'content': 'i am msg5555',
                'des': 'i am description5555'
            },
            {
                'title': '6 title',
                'id': 6,
                'content': 'i am msg666',
                'des': 'i am description666'
            }
        ],
        textCount: 6,
        scanCount: 0,
    },
    //mutations 唯一可修改state内属性的方法集
    mutations: {
        // param: object
        addText (state, params) {
            state.textCount++;
            state.textList.push(params);
        },
        delText (state, id) {
            let site = null;
            for (let key in state.textList) {
                if (state.textList[key].id == id) {
                    site = key;
                    break;
                }
            } 
            if (site !== null) {
                state.textList.splice(site, 1);
                state.textCount--;
            }
        },
        // param {id:1, data: object}
        editText (state, param) {
            let site = null;
            console.log(param);
            for (let key in state.textList) {
                if (state.textList[key].id == param.id) {
                    site = key;
                    break;
                }
            }
            if (site !== null) {
                state.textList[site] = param.data
            }
        },
        scanIncre (state) {
            state.scanCount++;
        }
    },
    //async commit mutation
    actions: {
        scanIncred(context) {
            setInterval(function () {
                context.commit('scanIncre');
            }, 1000);
        }
    },
    //getters get state
    getters: {
        getScanCount(state) {
            return Math.floor(state.scanCount / 3600) + ' 小时 ' +  Math.floor(state.scanCount / 60) + ' 分钟 ' +  (state.scanCount % 60) + ' 秒 ';
        },
        getTextById: (state, getters) => (id) => {
            let site = null;
            for (let key in state.textList) {
                if (state.textList[key].id == id) {
                    site = key;
                    break;
                }
            }
            if (site !== null) {
                return state.textList[site]
            }

            return {};
        },
        getMaxId(state) {
            let id = 0;
            state.textList.forEach((item) => {
                if (item.id > id) {
                    id = item.id;
                }
            });
            return id;
        }
    }
})