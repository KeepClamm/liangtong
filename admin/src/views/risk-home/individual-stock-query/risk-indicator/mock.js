const RADAR_CHART_DATA = {
  level2IndicatorNames: [
    "成长能力",
    "盈利能力",
    "波动性",
    "动量",
    "股价波动",
    "流动性",
    "股东行为",
    "管理层行为",
    "监管及中介机构行为",
    "买方行为",
    "财报造假",
    "偿债能力"
  ],
  data: [
    {
      "name": "当前主体",
      "value": [
        92.6,
        61.12,
        85.5,
        59.8,
        98.71,
        19.57,
        100,
        77.34,
        89.7,
        0,
        66.3,
        100
      ]
    },
    {
      "name": "全市场中位数",
      "value": [
        53.73,
        46.87,
        84.27,
        47.69,
        56.51,
        41.03,
        67.89,
        67.3,
        90.59,
        0,
        66.72,
        34.6
      ]
    },
    {
      "name": "行业中位数",
      "value": [
        76.47,
        58.62,
        81.53,
        41.7,
        98.74,
        21.83,
        93.34,
        78.28,
        91.36,
        0,
        66.3,
        88.14
      ]
    }
  ]
}

const TABLE_DATA = [
  {
      "code": null,
      "name": "基本面",
      "level": 1,
      "list": [
          {
              "code": null,
              "name": "盈利能力",
              "level": 2,
              "list": [
                  {
                      "code": "PROFITABILITY_1",
                      "name": "近三年经营活动现金流为负次数",
                      "desc": "近3年内经营活动现金流出现负数的次数",
                      "level": 3,
                      "isRisk": 1,
                      "dataNumber": 1,
                      "score": 28.7,
                      "ranking": 1184,
                      "brokerTotalNumber": 4973,
                      "averageScore": 31.57,
                      "scoreAnalysis": {
                          "series": [
                              8.6,
                              94.7,
                              28.7,
                              10.1,
                              0
                          ],
                          "xaxis": [
                              "Missing",
                              "( . ,0]",
                              "(0,1]",
                              "(1,2]",
                              "(2, . )"
                          ]
                      },
                      "currentScoreLinePointXAxis": "(0,1]",
                      "currentScoreLinePointYAxis": 28.7,
                      "subjectDistributionAnalysis": {
                          "series": [
                              0,
                              37.71,
                              23.01,
                              20.3,
                              18.98
                          ],
                          "xaxis": [
                              "Missing",
                              "( . ,0]",
                              "(0,1]",
                              "(1,2]",
                              "(2, . )"
                          ]
                      },
                      "currentScoreBarPointXAxis": "(0,1]",
                      "currentScoreBarPointYAxis": 23.01
                  }
              ]
          }
      ]
  },
  {
      "code": null,
      "name": "技术面",
      "level": 1,
      "list": [
          {
              "code": null,
              "name": "流动性",
              "level": 2,
              "list": [
                  {
                      "code": "PRICE_VOLATILITY_3S",
                      "name": "年化交易量比率",
                      "desc": "最近的252个交易日换手率数据的加权累计值",
                      "level": 3,
                      "isRisk": 2,
                      "dataNumber": 47.9471,
                      "score": 0,
                      "ranking": 4602,
                      "brokerTotalNumber": 4973,
                      "averageScore": 49.7,
                      "scoreAnalysis": {
                          "series": [
                              0,
                              1.18,
                              0,
                              14.59,
                              32.3,
                              33.62,
                              43.55,
                              72.05,
                              81.14,
                              97.34,
                              100
                          ],
                          "xaxis": [
                              "Missing",
                              "(., 46.998]",
                              "(46.998, 67.903]",
                              "(67.903, 88.124]",
                              "(88.124, 106.754]",
                              "(106.754, 126.353]",
                              "(126.353, 225.142]",
                              "(225.142, 259.689]",
                              "(259.689, 441.161]",
                              "(441.161, 597.104]",
                              "(597.104,.)"
                          ]
                      },
                      "currentScoreLinePointXAxis": "(46.998, 67.903]",
                      "currentScoreLinePointYAxis": 0,
                      "subjectDistributionAnalysis": {
                          "series": [
                              0,
                              6.59,
                              6.59,
                              6.6,
                              6.62,
                              6.63,
                              26.59,
                              6.68,
                              20.17,
                              6.73,
                              6.79
                          ],
                          "xaxis": [
                              "Missing",
                              "(., 46.998]",
                              "(46.998, 67.903]",
                              "(67.903, 88.124]",
                              "(88.124, 106.754]",
                              "(106.754, 126.353]",
                              "(126.353, 225.142]",
                              "(225.142, 259.689]",
                              "(259.689, 441.161]",
                              "(441.161, 597.104]",
                              "(597.104,.)"
                          ]
                      },
                      "currentScoreBarPointXAxis": "(46.998, 67.903]",
                      "currentScoreBarPointYAxis": 6.59
                  },
                  {
                      "code": "LIQUIDITY_6",
                      "name": "月换手率",
                      "desc": "用近一个月换手率数据总和表示的流通情况",
                      "level": 3,
                      "isRisk": 2,
                      "dataNumber": -2.233,
                      "score": 0,
                      "ranking": 4438,
                      "brokerTotalNumber": 4973,
                      "averageScore": 24.5,
                      "scoreAnalysis": {
                          "series": [
                              10,
                              0,
                              1.44,
                              4.46,
                              8.32,
                              19.84,
                              24.02,
                              31.72,
                              37.51,
                              49.68,
                              100
                          ],
                          "xaxis": [
                              "Missing",
                              "(., -2.051]",
                              "(-2.051, -1.802]",
                              "(-1.802, -1.601]",
                              "(-1.601, -1.271]",
                              "(-1.271, -0.799]",
                              "(-0.799, -0.437]",
                              "(-0.437, -0.219]",
                              "(-0.219, 0.053]",
                              "(0.053, 0.453]",
                              "(0.453, .)"
                          ]
                      },
                      "currentScoreLinePointXAxis": "(., -2.051]",
                      "currentScoreLinePointYAxis": 0,
                      "subjectDistributionAnalysis": {
                          "series": [
                              0,
                              13.09,
                              6.57,
                              6.57,
                              13.17,
                              19.85,
                              13.34,
                              6.7,
                              6.72,
                              6.82,
                              7.17
                          ],
                          "xaxis": [
                              "Missing",
                              "(., -2.051]",
                              "(-2.051, -1.802]",
                              "(-1.802, -1.601]",
                              "(-1.601, -1.271]",
                              "(-1.271, -0.799]",
                              "(-0.799, -0.437]",
                              "(-0.437, -0.219]",
                              "(-0.219, 0.053]",
                              "(0.053, 0.453]",
                              "(0.453, .)"
                          ]
                      },
                      "currentScoreBarPointXAxis": "(., -2.051]",
                      "currentScoreBarPointYAxis": 13.09
                  },
                  {
                      "code": "LIQUIDITY_2",
                      "name": "季换手率",
                      "desc": "用近一个季度换手率数据总和表示的流通情况",
                      "level": 3,
                      "isRisk": 2,
                      "dataNumber": -1.0924,
                      "score": 0,
                      "ranking": 4363,
                      "brokerTotalNumber": 4973,
                      "averageScore": 41.2,
                      "scoreAnalysis": {
                          "series": [
                              10,
                              0,
                              4.12,
                              16.84,
                              24.66,
                              36.1,
                              46.78,
                              53.81,
                              61.3,
                              75.7,
                              100
                          ],
                          "xaxis": [
                              "Missing",
                              "(., -0.843]",
                              "(-0.843, -0.592]",
                              "(-0.592, -0.395]",
                              "(-0.395, 0.0863]",
                              "(0.0863, 0.237]",
                              "(0.237, 0.55]",
                              "(0.55, 0.722]",
                              "(0.722, 0.921]",
                              "(0.921, 1.178]",
                              "(1.178, 3.212]"
                          ]
                      },
                      "currentScoreLinePointXAxis": "(., -0.843]",
                      "currentScoreLinePointYAxis": 0,
                      "subjectDistributionAnalysis": {
                          "series": [
                              0,
                              13.15,
                              6.59,
                              6.6,
                              19.85,
                              6.63,
                              13.34,
                              6.71,
                              6.71,
                              6.75,
                              13.67
                          ],
                          "xaxis": [
                              "Missing",
                              "(., -0.843]",
                              "(-0.843, -0.592]",
                              "(-0.592, -0.395]",
                              "(-0.395, 0.0863]",
                              "(0.0863, 0.237]",
                              "(0.237, 0.55]",
                              "(0.55, 0.722]",
                              "(0.722, 0.921]",
                              "(0.921, 1.178]",
                              "(1.178, 3.212]"
                          ]
                      },
                      "currentScoreBarPointXAxis": "(., -0.843]",
                      "currentScoreBarPointYAxis": 13.15
                  },
                  {
                      "code": "LIQUIDITY_3",
                      "name": "年换手率",
                      "desc": "用近一年换手率数据总和表示的流通情况",
                      "level": 3,
                      "isRisk": 2,
                      "dataNumber": 0.3559,
                      "score": 0,
                      "ranking": 4678,
                      "brokerTotalNumber": 4973,
                      "averageScore": 82.21,
                      "scoreAnalysis": {
                          "series": [
                              10,
                              0,
                              7.03,
                              70.79,
                              89.83,
                              97.03,
                              100
                          ],
                          "xaxis": [
                              "Missing",
                              "(., 0.365]",
                              "(0.365, 0.747]",
                              "(0.747, 1.003]",
                              "(1.003, 1.656]",
                              "(1.656, 1.79]",
                              "(1.79, .)"
                          ]
                      },
                      "currentScoreLinePointXAxis": "(., 0.365]",
                      "currentScoreLinePointYAxis": 0,
                      "subjectDistributionAnalysis": {
                          "series": [
                              0,
                              6.64,
                              6.61,
                              6.66,
                              26.62,
                              6.68,
                              46.8
                          ],
                          "xaxis": [
                              "Missing",
                              "(., 0.365]",
                              "(0.365, 0.747]",
                              "(0.747, 1.003]",
                              "(1.003, 1.656]",
                              "(1.656, 1.79]",
                              "(1.79, .)"
                          ]
                      },
                      "currentScoreBarPointXAxis": "(., 0.365]",
                      "currentScoreBarPointYAxis": 6.64
                  },
                  {
                      "code": "LIQUIDITY_5",
                      "name": "融资余额占总市值的比",
                      "desc": "融资余额占总市值的比率",
                      "level": 3,
                      "isRisk": 2,
                      "dataNumber": 0.0177,
                      "score": 17.4,
                      "ranking": 1667,
                      "brokerTotalNumber": 4973,
                      "averageScore": 23.67,
                      "scoreAnalysis": {
                          "series": [
                              7.4,
                              0,
                              2.11,
                              3.57,
                              17.4,
                              30.32,
                              39.37,
                              45,
                              71.39,
                              92.16,
                              100
                          ],
                          "xaxis": [
                              "Missing",
                              "(., 0.00603]",
                              "(0.00603, 0.0107]",
                              "(0.0107, 0.013]",
                              "(0.013, 0.0188]",
                              "(0.0188, 0.0266]",
                              "(0.0266, 0.0318]",
                              "(0.0318, 0.0381]",
                              "(0.0381, 0.0557]",
                              "(0.0557, 0.0697]",
                              "(0.0697, .)"
                          ]
                      },
                      "currentScoreLinePointXAxis": "(0.013, 0.0188]",
                      "currentScoreLinePointYAxis": 17.4,
                      "subjectDistributionAnalysis": {
                          "series": [
                              48.62,
                              6.81,
                              6.81,
                              3.4,
                              6.82,
                              6.84,
                              3.42,
                              3.44,
                              6.88,
                              3.46,
                              3.49
                          ],
                          "xaxis": [
                              "Missing",
                              "(., 0.00603]",
                              "(0.00603, 0.0107]",
                              "(0.0107, 0.013]",
                              "(0.013, 0.0188]",
                              "(0.0188, 0.0266]",
                              "(0.0266, 0.0318]",
                              "(0.0318, 0.0381]",
                              "(0.0381, 0.0557]",
                              "(0.0557, 0.0697]",
                              "(0.0697, .)"
                          ]
                      },
                      "currentScoreBarPointXAxis": "(0.013, 0.0188]",
                      "currentScoreBarPointYAxis": 6.82
                  }
              ]
          }
      ]
  }
]

const FINANCE_TABLE_DATA = [
    {
        "code": null,
        "name": "盈利能力",
        "level": 2,
        "list": [
            {
                "code": "PROFITABILITY_1",
                "name": "近三年经营活动现金流为负次数",
                "desc": "近3年内经营活动现金流出现负数的次数",
                "level": 3,
                "isRisk": 1,
                "dataNumber": 1,
                "score": 28.7,
                "ranking": 1184,
                "brokerTotalNumber": 4973,
                "averageScore": 31.57,
                "scoreAnalysis": {
                    "series": [
                        8.6,
                        94.7,
                        28.7,
                        10.1,
                        0
                    ],
                    "xaxis": [
                        "Missing",
                        "( . ,0]",
                        "(0,1]",
                        "(1,2]",
                        "(2, . )"
                    ]
                },
                "currentScoreLinePointXAxis": "(0,1]",
                "currentScoreLinePointYAxis": 28.7,
                "subjectDistributionAnalysis": {
                    "series": [
                        0,
                        37.71,
                        23.01,
                        20.3,
                        18.98
                    ],
                    "xaxis": [
                        "Missing",
                        "( . ,0]",
                        "(0,1]",
                        "(1,2]",
                        "(2, . )"
                    ]
                },
                "currentScoreBarPointXAxis": "(0,1]",
                "currentScoreBarPointYAxis": 23.01
            }
        ]
    }
  ]
  
export {
  RADAR_CHART_DATA,
  TABLE_DATA,
  FINANCE_TABLE_DATA
}