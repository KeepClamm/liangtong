<template>
  <div class="overview show-flex-box-r">
    <div class="overview-left fs-0 mr-24 show-flex-box-c">
      <div class="head">当前评级</div>
      <div class="number pt-20 pb-20">{{ showDatum.currentRating }}</div>
      <div class="declare">持续天数：{{showDatum.durationDays || 0}}</div>
    </div>
    <div class="overview-right">
      <div class="header">{{findSomeone(stocksType,typeList)}}模型预警指标</div>
      <div class="descriptions show-flex-box-r border-bF1 color-62B w100">
        <span class="descriptions-name">基本面</span>
        <div
          class="descriptions-content"
          v-if="showDatum.fundamentalsZSD && showDatum.fundamentalsZSD.length > 0"
        >
          <span
            :class="classType(item.result) "
            v-for="(item, index) in showDatum.fundamentalsZSD"
            :key="index"
          >{{item.name || ''}}</span>
        </div>
      </div>
      <div class="descriptions show-flex-box-r border-bF1 color-007">
        <span class="descriptions-name">技术面</span>
        <div
          class="descriptions-content"
          v-if="showDatum.technicalAspectsZSD && showDatum.technicalAspectsZSD.length > 0"
        >
          <span
            v-for="(item, index) in showDatum.technicalAspectsZSD"
            :key="index"
            :class="classType(item.result)"
          >{{item.name || ''}}</span>
        </div>
      </div>
      <div class="descriptions show-flex-box-r">
        <span class="descriptions-name color-012">行为面</span>
        <div
          class="descriptions-content"
          v-if="showDatum.behaviorAspectZSD && showDatum.behaviorAspectZSD.length > 0"
        >
          <span
            v-for="(item, index) in showDatum.behaviorAspectZSD"
            :key="index"
            :class="classType(item.result)"
          >{{item.name || ''}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonUtils from "@/utils/commonUtils";

export default {
  props: {
    showDatum: Object, //show-datum
    unitsGrade: {
      //units-grade
      ttype: [Number, String],
      default: 1
    },
    stocksType: {
      //stocks-type
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      evaluateList: ["成交量", "BETA", "月换手率", "年化交易量比率"],
      typeList: [
        {
          id: 1,
          name: "短期"
        },
        {
          id: 2,
          name: "长期"
        }
      ],
      gradeList: [
        {
          id: 1,
          name: "SR"
        },
        {
          id: 2,
          name: "LR"
        }
      ]
    };
  },
  methods: {
    findSomeone(value, list) {
      let info = CommonUtils.findSomeone(value, list);
      return info ? info.name : "--";
    },
    classType(number) {
      let type = "";
      number = number - 0;
      if (number <= 20) {
        type = "general";
      }
      if (number <= 40 && number > 20) {
        type = "early-warning";
      }
      return type;
    }
  }
};
</script>

<style lang="scss" scoped>
.overview {
  background-color: #fff;

  .overview-left {
    background: #f8f9fb;
    padding: 16px 20px;
    width: 190px;
    // align-items: center;
    justify-content: center;

    .head {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #08080d;
    }

    .number {
      font-style: normal;
      font-weight: 700;
      font-size: 64px;
      text-align: center;
      color: #012169;
    }

    .declare {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #9d9fb1;
    }
  }

  .overview-right {
    width: 0;
    flex-grow: 1;
    border: 1px solid #f1f1f1;

    .header {
      background: #f8f9fb;
      padding: 10px 24px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #37383b;
      border-bottom: 1px solid #f1f1f1;
    }

    .descriptions {
      padding: 12px 24px;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      display: flex;
      align-items: center;
      .descriptions-name {
        // width: 198px;
        flex-shrink: 0;
        width: 60px;
      }

      .descriptions-content {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        flex-wrap: wrap;
        margin-right: -24px;
        margin-bottom: -12px;

        > span {
          display: block;
          padding: 3px 12px;
          white-space: nowrap;
          margin-right: 24px;
          margin-bottom: 12px;
        }
      }
      .general {
        background: #fff0f0;
        color: #f42828;
      }
      .early-warning {
        background: #fff6f0;
        color: #ff6e01;
      }
    }

    .border-bF1 {
      border-bottom: 1px solid #f1f1f1;
    }
  }
}

.color-012 {
  // color: #012169;
  color: #37383b;
}

.color-62B {
  // color: #62B5E5;
  color: #37383b;
}

.color-007 {
  // color: #0076A8;
  color: #37383b;
}

.ai-fe {
  align-items: flex-end;
}
</style>