<template>
    <div class="share-header show-flex-box-r" v-if="JSON.stringify(this.showList) != '{}'">
        <div v-for="(item, index) in showData" :key="index" class="mr-16" >
            <div 
                v-if="item.label"
                class="choice cursor-pointer1 white-space mb-8">
                <span>{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>
  
<script>
/**
 * @param showList - tabs的item项集合
 * @param needThrottle - 再次点击 是否要触发事件
 * @param tabsName - 展示字段的改变 
 */
import CommonUtils from '@/utils/commonUtils';


export default {
    props: {
        showList: Object,
        tabsName: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            showData: [
                { label: "", name: "0" },
                { label: "", name: "1" },
                { label: "", name: "2" },
                { label: "", name: "3" },
                { label: "", name: "4" },
                { label: "", name: "5" },
                { label: "", name: "6" },
                { label: "", name: "7" },
                { label: "", name: "8" },
            ],
            isTwoFinancialTargetsList: [
                {
                    id: 1,
                    name: '融资标的'
                },
                {
                    id: 2,
                    name: '融券标的'
                },
                {
                    id: 3,
                    name: '融资标的'
                },
            ]
        };
    },
    watch: {
        showList() {
            this.configData();
        },
    },
    mounted() {
        this.configData();
    },
    methods: {
        configData() {
            if (this.showList && JSON.stringify(this.showList) != '{}') {
                let key = ['listingStatus', 'plateName', 'issuingSystem', 'isTwoFinancialTargets', 'isMarginSecurities', 'industryName', 'area', 'enterpriseNature', 'listedDate'];
                let isTwoFinancialTargets = this.showList.isTwoFinancialTargets;
                let isMarginSecurities = this.showList.isMarginSecurities;

                for (let i = 0; i < this.showData.length; i++) {
                    this.showData[i].label = this.showList[key[i]] || '';
                }
                if(this.showData[8].label){
                    this.showData[8].label = '首次上市：' + CommonUtils.formateDate(this.showData[8].label, 'YYYY-MM-DD');
                }
                // 是否两融标的 0-否 1-融资标的 2-融券标的 3-融资 融券标的  //是否可冲抵保证金 0-否 1-是
                if (isMarginSecurities == '0') {
                    this.showData[4].label = '可冲抵保证金';
                } else {
                    this.showData.splice(4, 1);
                }
                if (isTwoFinancialTargets != '0') {
                    this.showData[3].label = this.findSomeone(isTwoFinancialTargets, this.isTwoFinancialTargetsList);

                    if (isTwoFinancialTargets == '1') {
                        this.showData.splice(4, 0, { label: '融券标的' })
                    }

                } else {
                    this.showData.splice(3, 0)
                }
            }
            
        },
        findSomeone(value, list) {
            let info = CommonUtils.findSomeone(value, list);
            return info ? info.name : '';
        },
    }
};
</script>

<style lang="scss" scoped>
.share-header {
    flex-wrap: wrap;
    .choice {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #4E5969;
        padding: 4px 16px;
        background: #F2F3F5;
    }

    .choice:nth-last-child(1) {
        margin-right: 0 !important;
    }
}</style>