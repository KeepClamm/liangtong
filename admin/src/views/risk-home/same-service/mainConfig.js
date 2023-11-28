export const checkBoxOptions = [
  { label: '业务大类', bindValue: 'broadCategory', options: [{ label: '信用类' }, { label: '非信用类' }] },
  { label: '统计范围', bindValue: 'smallCategory', options: [{ label: '总部' }, { label: '子公司1' }, { label: '子公司2' }, { label: '子公司3' }, { label: '子公司4' }] },
  { label: '业务小类', bindValue: 'businessScope', options: [{ label: '债券投资' }, { label: '票据业务' }, { label: '股票质押' }, { label: '融资融券' }, { label: '约定购回' }, { label: '非标债券投资' }, { label: '场外衍生品' }, { label: '场内衍生品' }, { label: '股权投资' }, { label: '投资银行' }, { label: '资产管理' }, { label: '经纪业务' }] }
]
export function setPieOptionCredit() {
  return {
    title: {
      show: true,
      text: '总体授信额度占用情况',
      x: 'center',
      y: 'top'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 3587333,
            name: '总体授信额度',
            itemStyle: {
              color: '#bdd8cc'
            }
          },
          {
            value: 1301352,
            name: '总体已占用额度',
            itemStyle: {
              color: '#f5e8c8'
            }
          },
        ]
      }
    ]
  };
};
export function setPieOptionNonCredit() {
  return {
    title: {
      show: true,
      text: '业务规模（万元）',
      x: 'center',
      y: 'top'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: '100',
      top: '50',
      orient: "vertical"
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 2000,
            name: '场内衍生品'
          },
          {
            value: 1448,
            name: '股权投资',
            color: ''
          },
          {
            value: 120,
            name: '投资银行',
            color: ''
          },
          {
            value: 1448,
            name: '资产管理',
            color: ''
          },
          {
            value: 1448,
            name: '经纪业务',
            color: ''
          },
        ]
      }
    ]
  };
};
export function setPieOptionCreditScale() {
  return {
    tooltip: {
      trigger: 'item'
    },
    title: {
      show: true,
      text: '信用类业务敞口规模',
      x: 'center',
      y: 'top'
    },
    legend: {
      top: '90%',
      left: 'center'
    },
    series: [
      {
        name: '信用类业务敞口规模',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 2000, name: '总公司', itemStyle: {color: '#9b8bba'} },
          { value: 750, name: '子公司', itemStyle: {color: '#8fd3e8'} },
        ]
      }
    ]
  };
};
export function setPieOptionNonCreditScale() {
  return {
    tooltip: {
      trigger: 'item'
    },
    title: {
      show: true,
      text: '非信用类业务规模',
      x: 'center',
      y: 'top'
    },
    legend: {
      top: '90%',
      left: 'center'
    },
    series: [
      {
        name: '非信用类业务规模',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 2000, name: '总公司', itemStyle: {color: '#0070c0'} },
          { value: 750, name: '子公司', itemStyle: {color: '#62b5e5'} },
        ]
      }
    ]
  };
};
export function setBarLineChartOption() {
  return {
    title: {
      text: '客户数量与高风险客户占比',
      x: 'center',
      y: 'top'
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: ['债券投资', '票据业务', '融资融券', '约定购回', '非标债权投资', '场外衍生品', '股票质押']
    },
    yAxis: [
      {
        type: 'value',
        name: '客户数量',
        position: 'left'
      },
      {
        type: 'value',
        name: '高风险客户占比',
        position: 'right',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    legend: {
      orient: 'horizontal',
      left: 'right'
    },
    series: [
      {
        name: '客户数量',
        type: 'bar',
        data: [21254, 28761, 40162, 23020, 6542, 5016, 4102],
        yAxisIndex: 0,
        barWidth: 25
      },
      {
        name: '高风险客户占比',
        type: 'line',
        data: [0.13, 0.13, 0.43, 6.73, 6.12, 3.76, 3.54],
        yAxisIndex: 1,
        lineStyle: {
          width: 5, 
        },
      }
    ]
  }
}