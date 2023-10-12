<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="share-news">
          <div class="head">当前股价</div>
          <div class="show-flex-box-r pt-10 ai-fe">
            <div class="number pr-12">
              ¥
              <span
                v-if="showDatum.stockBasicInfo"
              >{{showDatum.stockBasicInfo.currentSharePrice || 0}}</span>
            </div>
            <div class="show-flex-box-r pb-3">
              <div class="contrast" v-if="showDatum.stockBasicInfo">
                <img :src="(showDatum.stockBasicInfo.chgRatio-0)>0 ? iconList[0] : iconList[1]" />
              </div>
              <span
                class="declare white-space pl-4"
                v-if="showDatum.stockBasicInfo"
              >{{ dealShowPersent(showDatum.stockBasicInfo.chgRatio)}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="share-news">
          <div class="head hide-line1">同业劵商平均折算率</div>
          <div class="show-flex-box-r pt-10 ai-fe">
            <div class="number pr-12">
              {{ showDatum.brokerageAverageLossRate || 0 }}
            </div>
            <div class="show-flex-box-r pb-3">
              <div class="contrast">
                <img :src="showDatum.averageLossRateContrast > 0 ? iconList[0]:iconList[1]" />
              </div>
              <span class="declare white-space pl-4">
                <!-- 0 - 等于 1-高于  -1 -低于 -->
                {{ showDatum.averageLossRateContrast == 0 ? '等于': showDatum.averageLossRateContrast > 0 ? '高于':'低于' }}行业平均值
              </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="share-news">
          <div class="head hide-line1">归母j净利润（元）</div>
          <div class="show-flex-box-r pt-10 ai-fe">
            <div class="number pr-12">{{ 0 }}</div>
            <div class="show-flex-box-r pb-3">
              <div class="contrast">
                <img :src="showDatum.averageLossRateContrast > 0 ? iconList[0]:iconList[1]" />
              </div>
              <span class="declare white-space pl-4">
                <!-- 0 - 等于 1-高于  -1 -低于 -->
                {{ '低于' }}行业平均值
              </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-20">
      <el-col :span="8" v-if="showDatum.stockBasicInfo">
        <div class="share-news">
          <div class="head">热点</div>
          <div
            class="concept-stock hide-line1 show-flex-box-r mt-5"
            v-for="item in showDatum.stockBasicInfo.concept"
            :key="item.id"
            @click="chooseConceptualBlock(item)"
          >
            <img src="@/assets/images/cockpit-risk/bonfire.png" />
            {{item.name}}
            <span v-if="item.name">概念股</span>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="share-news">
          <div class="head">今日高关注度舆情</div>
          <div class="show-flex-box-r pt-10 ai-fe">
            <div class="number pr-12">{{showDatum.todayHighPublicOpinionNumber || 0}}</div>
            <div class="show-flex-box-r pb-3">
              <div class="contrast">
                <img
                  :src="calculatedSize(showDatum.todayHighPublicOpinionNumber,showDatum.yesterdayHighPublicOpinionNumber) > 0 ? iconList[0]: iconList[1] "
                />
              </div>
              <span
                class="declare white-space pl-4"
              >较昨日：{{showDatum.yesterdayHighPublicOpinionNumber || 0}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="share-news">
          <div class="head">两融余额</div>
          <div class="show-flex-box-r pt-10 ai-fe">
            <div class="number pr-12">{{showDatum.todayHighPublicOpinionNumber || 0}}</div>
            <div class="show-flex-box-r pb-3">
              <div class="contrast">
                <img
                  :src="calculatedSize(showDatum.todayHighPublicOpinionNumber,showDatum.yesterdayHighPublicOpinionNumber) > 0 ? iconList[0]: iconList[1] "
                />
              </div>
              <span
                class="declare white-space pl-4"
              >较昨日：{{showDatum.yesterdayHighPublicOpinionNumber || 0}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <subject-list-dialog ref="subjectListDialogRef" />
  </div>
</template>

<script>
import subjectListDialog from "./subject-list-dialog";
import CommonUtils from "@/utils/commonUtils";

export default {
  props: {
    showDatum: Object
  },
  components: {
    subjectListDialog
  },
  data() {
    return {
      iconList: [
        require("@/assets/images/cockpit-risk/arrow-up.png"),
        require("@/assets/images/cockpit-risk/arrow-down.png")
      ],
      // 概念板块列表
      conceptualBlockList: [
        {
          id: 1,
          name: "猪肉概念股"
        },
        {
          id: 2,
          name: "REITs超长富豪概念股"
        }
      ],
      // 概念板块 选择的
      choosePlate: ""
    };
  },
  methods: {
    chooseConceptualBlock(info) {
      this.choosePlate = info.id;
      this.$refs.subjectListDialogRef.open(info);
    },
    calculatedSize(today, yesterday) {
      return today - 0 - (yesterday - 0);
    },
    dealShowPersent(numerator, denominator, suffix) {
      return CommonUtils.dealShowPersent(numerator, denominator, suffix);
    }
  }
};
</script>

<style lang="scss" scoped>
.share-news {
  padding: 14px 24px;
  background: #f8f9fb;
  height: 90px;
  overflow-y: scroll;

  .head {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #1d2129;
  }

  .number {
    font-weight: 700;
    font-size: 28px;
    // line-height: 34px;
    color: #1d2129;
    white-space: nowrap;
  }

  .contrast {
    > img {
      width: 18px;
      height: 18px;
    }
  }

  .declare {
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #012169;
  }
}
.ai-fe {
  align-items: flex-end;
  overflow: hidden;
}
.concept-stock {
  color: #1d2129;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  white-space: nowrap;
  align-items: center;
  cursor: pointer;

  > img {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
}
.concept-stock:hover {
  color: #00a3e0;
}
.concept-stock:last-child {
  margin-top: 3px !important;
}
</style>