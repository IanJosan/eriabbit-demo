<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a v-for="(item,i) in commentInfo.tags" :key="item.title" href="javascript:;"
            :class="{active:currTagIndex===i}" @click="changeTag(i)">
            {{item.title}}（{{item.tagCount}}）
          </a>
        </div>
      </div>
    </div>
    <div class="sort" v-if="commentInfo">
      <span>排序：</span>
      <a @click="changeSort(null)" :class="{active:reParams.sortField === null}" href="javascript:;" >默认</a>
      <a @click="changeSort('createTime')" :class="{active:reParams.sortField === 'createTime'}" href="javascript:;">最新</a>
      <a @click="changeSort('praiseCount')" :class="{active:reParams.sortField === 'praiseCount'}" href="javascript:;">最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i + 's'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i + 'k'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formateSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <!-- 评论图片 -->
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures"/>
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>100</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <xtx-pagination v-if="total" :total="total" :page-size="reParams.pageSize" :current-page="reParams.page" @current-change="changePagerFn"/>
  </div>
</template>
<script>
import { findCommentInfo, findCommentList } from '@/api/product'
import { inject, ref, reactive, watch } from 'vue'
import GoodsCommentImage from './goods-comment-image'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  setup () {
    const commentInfo = ref(null)
    const goods = inject('goods')
    findCommentInfo(goods.value.id).then(data => {
      data.result.tags.unshift({ title: '有图', tagCount: data.result.hasPictureCount, type: 'img' })
      data.result.tags.unshift({ type: 'all', title: '全部评价', tagCount: data.result.evaluateCount })
      commentInfo.value = data.result
    })
    const currTagIndex = ref(0)
    const changeTag = (i) => {
      currTagIndex.value = i
      // 点击修改筛选条件
      const tag = commentInfo.value.tags[i]
      if (tag.type === 'all') {
        reParams.hasPicture = null
        reParams.tag = null
      } else if (tag.type === 'img') {
        reParams.hasPicture = true
        reParams.tag = null
      } else {
        reParams.hasPicture = null
        reParams.tag = tag.title
      }
      reParams.page = 1
    }
    const changeSort = (sortFiled) => {
      reParams.sortField = sortFiled
      reParams.page = 1
    }
    // 筛选条件
    const reParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })
    // 初始化需要发请求
    const commentList = ref([])
    const total = ref(0)
    watch(reParams, () => {
      findCommentList(goods.value.id, reParams).then(data => {
        commentList.value = data.result.items
        total.value = data.result.counts
      })
    }, {
      immediate: true
    })
    // 转换数据函数
    const formateSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}: ${c.nameValue}`, '').trim()
    }
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }
    const changePagerFn = (newPage) => {
      reParams.page = newPage
    }
    return { changePagerFn, total, changeSort, commentInfo, currTagIndex, changeTag, reParams, commentList, formateSpecs, formatNickname }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;

    .data {
      width: 340px;
      display: flex;
      padding: 20px;

      p {
        flex: 1;
        text-align: center;

        span {
          display: block;

          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }

          &:last-child {
            color: #999;
          }
        }
      }
    }

    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;

      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }

      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        >a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;

          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }

          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }

  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;

    >span {
      margin-left: 20px;
    }

    >a {
      margin-left: 30px;

      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }

  .list {
    padding: 0 20px;

    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;

      .user {
        width: 160px;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }

        span {
          padding-left: 10px;
          color: #666;
        }
      }

      .body {
        flex: 1;

        .score {
          line-height: 40px;

          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }

          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }

      .text {
        color: #666;
        line-height: 24px;
      }

      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
