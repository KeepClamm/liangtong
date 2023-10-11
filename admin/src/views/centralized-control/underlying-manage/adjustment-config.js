// 调整查询
export const listOfAdjustmentsQuery = {
    'stockCode': {
        'type': 'input',
        'label': '证券代码/名称',
        'placeHolder': '请输入代码/名称',
        'valName': 'stockCodeVal'
    },
    'tradeFloor': {
        'type': 'select',
        'label': '交易市场',
        'selectOpts': [ 
            {
                label: '测试',
                value: 1
            },
            {
                label: '测试2',
                value: 2
            }
        ],
        'valName': 'tradeFloorVal'
    },
    'currentSubjectType': {
        'type': 'selectMut',
        'label': '当前标的类型',
        'selectOpts': [ 
            {
                label: '融资标的',
                value: 1
            },
            {
                label: '融券标的',
                value: 2
            },
            {
                label: '可冲抵保证金',
                value: 3
            },
        ],
        'valName': 'currentSubjectTypeVal'
    },
    'adjustmentItem': {
        'type': 'selectMut',
        'label': '调整项',
        'selectOpts': [ 
            {
                label: '标的范围',
                value: 1
            },
            {
                label: '集中度',
                value: 2
            },
            {
                label: '保证金比例',
                value: 3
            },
            {
                label: '折算率',
                value: 4
            }
        ],
        'valName': 'adjustmentItemVal'
    },
    'timeOfAdjustment': {
        'type': 'date',
        'label': '调整时间',
        'valName': 'adjustTimeVal'
    }
}
// 标的券调整发起清单
export const adjustmentToInitiationList = {
    'stockCode': {
        'type': 'input',
        'label': '证券代码/名称',
        'placeHolder': '请输入代码/名称',
        'valName': 'stockCodeVal'
    },
    'tradeFloor': {
        'type': 'select',
        'label': '交易市场',
        'selectOpts': [ 
            {
                label: '上交所',
                value: 1
            },
            {
                label: '北交所',
                value: 2
            },
            {
                label: '深交所',
                value: 3
            }
        ],
        'valName': 'tradeFloorVal'
    },
    'currentSubjectType': {
        'type': 'selectMut',
        'label': '调整前标的类型',
        'selectOpts': [ 
            {
                label: '融资标的',
                value: 1
            },
            {
                label: '融券标的',
                value: 2
            },
            {
                label: '可冲抵保证金',
                value: 3
            },
        ],
        'valName': 'currentSubjectTypeVal'
    },
    'adjustmentStatu': {
        'type': 'select',
        'label': '调整状态',
        'selectOpts': [ 
            {
                label: '全部',
                value: 1
            },
            {
                label: '已生效',
                value: 2
            },
            {
                label: '可冲抵保证金',
                value: 3
            },
            {
                label: '已驳回（作废）',
                value: 4
            },
        ],
        'valName': 'adjustmentStatuVal'
    },
    'adjustmentItem': {
        'type': 'selectMut',
        'label': '调整项',
        'selectOpts': [ 
            {
                label: '标的范围',
                value: 1
            },
            {
                label: '集中度',
                value: 2
            },
            {
                label: '保证金比例',
                value: 3
            },
            {
                label: '折算率',
                value: 4
            }
        ],
        'valName': 'adjustmentItemVal'
    },
    'timeOfAdjustment': {
        'type': 'date',
        'label': '调整发起时间',
        'valName': 'adjustTimeVal'
    }
}
// 标的券调整待审核清单
export const adjustmentToListPendingAudit = {
    'stockCode': {
        'type': 'input',
        'label': '证券代码/名称',
        'placeHolder': '请输入代码/名称',
        'valName': 'stockCodeVal'
    },
    'tradeFloor': {
        'type': 'select',
        'label': '交易市场',
        'selectOpts': [ 
            {
                label: '上交所',
                value: 1
            },
            {
                label: '北交所',
                value: 2
            },
            {
                label: '深交所',
                value: 3
            }
        ],
        'valName': 'tradeFloorVal'
    },
    'currentSubjectType': {
        'type': 'selectMut',
        'label': '调整前标的类型',
        'selectOpts': [ 
            {
                label: '融资标的',
                value: 1
            },
            {
                label: '融券标的',
                value: 2
            },
            {
                label: '可冲抵保证金',
                value: 3
            },
        ],
        'valName': 'currentSubjectTypeVal'
    },
    'adjustmentItem': {
        'type': 'selectMut',
        'label': '调整项',
        'selectOpts': [ 
            {
                label: '标的范围',
                value: 1
            },
            {
                label: '集中度',
                value: 2
            },
            {
                label: '保证金比例',
                value: 3
            },
            {
                label: '折算率',
                value: 4
            }
        ],
        'valName': 'adjustmentItemVal'
    },
    'timeOfAdjustment': {
        'type': 'date',
        'label': '调整发起时间',
        'valName': 'adjustTimeVal'
    }
}