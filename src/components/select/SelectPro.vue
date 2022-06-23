<template>
  <div class="components">
    <van-popup :show="popupType" round position="bottom" :style="{ height: '95%'}">
      <div class="btn space-between">
        <div class="btn-l" @touchend="onClose">取消</div>
        <div class="btn-m">请选择</div>
        <div class="btn-r" @touchend="onConfirm">完成</div>
      </div>
      <div class="content">
        <div class="c1 flex-start">
          <div class="c1-l">
            <div class="c1-l-info">组织名称</div>
          </div>
          <div class="c1-r">
            <div class="c1-r-info">城市公司</div>

          </div>
        </div>
        <div class="c2">
          <van-tree-select
              class="menu"
              v-model:active-id="activeId"
              v-model:main-active-index="activeIndex"
              @click-nav="clickNav"
              @click-item="clickItem"
              :items="items"
          />
        </div>
      </div>

    </van-popup>
  </div>
</template>

<script>
import {inject, onMounted, reactive, toRefs, watch} from "vue";
import {orgOrgTree} from "@/common/api/proAchives";

export default {
  name: "SelectPro",
  setup() {
    const profilesListData = inject('profilesListData')
    const data = reactive({
      value: "",
      popupType: false,
      activeId: 1,
      activeIndex: 0,
      orgCode: '',
      orgLevelId: '',
      title: '华润置地',
      sub: '',
      items: [],
      navList: [],
      num: 0,
      clickNav: (res) => {
        data.items.forEach(item=>{
          data.navList.push(item.text)
        })
        data.title = data.navList[res]
        console.log(data.title,1);
      },
      clickItem: (res) => {
        data.orgCode = res.id
        data.orgLevelId = res.orgLevelId
        data.sub = res.text

      },
      onConfirm: () => {
        profilesListData.req.orgCode = data.orgCode
        profilesListData.req.orgLevelId = data.orgLevelId
        if (data.sub === '全部') {
          profilesListData.popupValue = data.title
        } else if (data.sub === ''){
          profilesListData.popupValue = data.title
        }
        else {
          profilesListData.popupValue = data.sub
        }
        profilesListData.popupType = false
      },
      onClose: () => {
        profilesListData.popupType = false
      }
    });
    watch(profilesListData, (res) => {
      data.popupType = res.popupType
    }, {deep: true});

    onMounted(() => {
      orgOrgTree({}).then(res => {
        data.items = res
      })
    })
    return {
      ...toRefs(data),
    };
  }
}
</script>

<style scoped lang="less">
.components {
  position: relative;
  height: 80%;

  .btn {
    width: 100%;
    position: fixed;
    left: 0;
    background: #ffffff;
    border-radius: 16px 16px 0 0;
    z-index: 999999999;
    line-height: 16px;
    color: rgba(29, 37, 47, 1);
    font-size: 16px;
    padding: 18px 16px 15px;
    border-bottom: rgba(248, 250, 251, 0.9) solid 1px;

    .btn-l {
      color: rgba(141, 158, 174, 1);
    }

    .btn-m {
      color: rgba(29, 37, 47, 1);
    }

    .btn-r {
      color: rgba(255, 162, 0, 1);
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 50px);
    margin-top: 50px;

    .c1 {
      height: 56px;

      .c1-l {
        width: 31%;
        color: rgba(29, 37, 47, 1);
        font-size: 14px;
        line-height: 16px;
        background: rgba(237, 240, 242, 1);

        .c1-l-info {
          padding-left: 15px;
          padding-top: 16px;
          font-weight: bold;
        }

      }

      .c1-r {
        width: 68.6%;

        .c1-r-info {
          color: rgba(29, 37, 47, 1);
          font-size: 14px;
          line-height: 16px;
          padding-left: 16px;
          padding-top: 16px;
        }

        .c1-r-search {
          padding-top: 10px;
        }
      }
    }

    .c2 {
      width: 100%;
      height: calc(100% - 26px);

      .van-tree-select {
        height: 100% !important;
      }

      .menu {

        :deep(.van-tree-select__nav) {
          flex: none;
          width: 31%;
        }

        :deep(.van-tree-select__item) {
          padding-left: 32px;
        }

        :deep(.van-sidebar-item__text) {
          padding-left: 12px;
        }

        :deep(.van-tree-select__nav-item) {
          background: none;
        }

        :deep(.van-tree-select__nav-item) {
          background: none;
        }

        :deep(.van-sidebar-item--select) {
          background: #ffffff;
          color: rgba(255, 162, 0, 1);
        }

        :deep(.van-tree-select__item--active) {
          color: rgba(255, 162, 0, 1);
        }

        :deep(.van-tree-select__nav) {
        }

        :deep(.van-tree-select__nav-item:before) {
          background: rgba(255, 162, 0, 1);
        }

        :deep(.van-sidebar-item--select:before) {
          color: rgba(255, 162, 0, 1);
        }

        :deep(.van-tree-select__selected) {
          display: none;
        }


      }

    }

  }
}
</style>