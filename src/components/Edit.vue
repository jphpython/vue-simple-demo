<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <div class="dj">
                 <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                 <el-breadcrumb-item>{{action}}</el-breadcrumb-item>
            </div>
        </el-breadcrumb>
        <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent>
            <el-form-item label="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="des">
                <el-input v-model="form.des"></el-input>
            </el-form-item>
            <el-form-item label="content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">立即{{action}}</el-button>
            <el-button>取消</el-button>
            <el-button>
                <router-link to="/">回到首页</router-link> 
            </el-button>
            </el-form-item>
            <el-alert v-show="showmsg"
                :title="'操作成功' +timetxt+'秒后回首页'"
                type="success">
            </el-alert>
        </el-form>
    </div>
</template>

<script>
let timer = null
export default {
    name: 'Edit',
    data: function () {
        let dataId = this.$route.params.id;
        let action = this.$route.params.action;
        let maxId = this.$store.getters.getMaxId;
        console.log('id is '+dataId + action + maxId);
        let formData = action == 'edit' ? this.$store.getters.getTextById(dataId) : {};

        return {
            form: formData,
            action: action == 'edit' ? '编辑' : '添加',
            showmsg: false,
            timetxt: 3,
            maxId
        };
    },
    methods: {
        onSubmit: function () {
            //编辑操作
            if (this.$route.params.action == 'edit') {
                let tmp = {id: this.dataId, data: this.form};
                this.$store.commit('editText', tmp);
                this.successJump();
            } else {
                this.form.id = parseInt(this.maxId, 10) + 1;
                this.$store.commit('addText', this.form);
                this.successJump();
            }
        },
        successJump: function () {
            var that = this;
            this.showmsg = true;
            timer = setInterval(function () {
                that.timetxt -= 1;
                if (that.timetxt == 0) {
                    that.$router.replace('/');
                    clearInterval(timer);
                }
            }, 1000);
        }
    }
}
</script>

<style>
a, .router-link-active{
  text-decoration: none;
}

.dj {
    margin: 2% 0 10% 0;
}
</style>