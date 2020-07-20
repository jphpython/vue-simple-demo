<template>
    <el-row :gutter="10">
        <el-col>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item, index) in $store.state.textList" :key="index">
                    <router-link :to="'/edit/' + item.id + '/edit'">{{ item.title }}</router-link> 
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col>
            <el-tooltip content="click to show time" placement="bottom" effect="light">
                <el-button @click="showScanFlag = !showScanFlag">show time</el-button>
            </el-tooltip>
            <el-collapse-transition>
                <div v-if="showScanFlag">
                    <div class="showscan">{{ $store.getters.getScanCount }}</div> 
                </div>
                <div v-else><i class="el-icon-time showscan"></i></div>
            </el-collapse-transition>
        </el-col>
        <el-col>
            <el-table
            :data="$store.state.textList.slice((currentPage - 1) * pageSize, pageSize*currentPage)"
            style="width 90%"
            :default-sort="{prop: 'id', order: 'descending'}"
            >
                <el-table-column fixed prop="id" sortable width="80" label="ID"></el-table-column>
                <el-table-column prop="title" sortable width="150" label="title"></el-table-column>
                <el-table-column prop="des" sortable  label="desc"></el-table-column>
                <el-table-column  fixed="right" label="action">
                    <!-- 如果要读取当前表格内数据需要通过属性 slot-scope -->
                    <template slot-scope="scope">
                        <el-button size="mini">
                            <router-link :to="'/edit/' + scope.row.id + '/edit'">edit</router-link>                            
                        </el-button>
                        <el-button size="mini" type="primary">
                            <router-link :to="'/edit/'+ scope.row.id +'/add'">add</router-link>  
                        </el-button>
                        <el-button size="mini" type="danger" @click="delData(scope.row.id)">delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :page-size="pageSize" @current-change="currentChange" :total="$store.state.textCount"></el-pagination>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'Home',
    created() {
        console.log(' begin increment sacn count');
        this.$store.dispatch('scanIncred');
    },
    data() {
        return {
            showScanFlag: true,
            currentPage: 1,
            pageSize: 4
        }
    },
    methods: {
        delData: function (param) {
            console.log(param);
            //执行删除
            this.$store.commit('delText', param);
        },
        currentChange: function (arg) {
            console.log(arg);
            this.currentPage = arg;
        }
    }
}
</script>

<style>
.showscan {
    height: 20px;
    width: 30%;
    border: 1px solid #1989fa;
    border-radius: 30px;
    margin: 3% 35% ;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
  
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

a, .router-link-active{
  text-decoration: none;
  color: #1989fa;
}
</style>