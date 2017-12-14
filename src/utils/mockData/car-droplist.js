export default [
  {
    url: '/ces/getMasterBrand',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        'list': [
          {
            'groupList': [
              {
                'brandName': '奥迪',
                'id': 7,
                'initial': 'A'
              },
              {
                'brandName': '阿斯顿·马丁',
                'id': 8,
                'initial': 'A'
              },
              {
                'brandName': '阿尔法·罗密欧',
                'id': 9,
                'initial': 'A'
              },
              {
                'brandName': 'AC Schnitzer',
                'id': 10,
                'initial': 'A'
              },
              {
                'brandName': 'ALPINA',
                'id': 11,
                'initial': 'A'
              },
              {
                'brandName': 'ARCFOX',
                'id': 12,
                'initial': 'A'
              },
              {
                'brandName': '安凯客车',
                'id': 13,
                'initial': 'A'
              }
            ],
            'groupName': 'A'
          },
          {
            'groupList': [
              {
                'brandName': '本田',
                'id': 14,
                'initial': 'B'
              },
              {
                'brandName': '别克',
                'id': 15,
                'initial': 'B'
              },
              {
                'brandName': '宝马',
                'id': 16,
                'initial': 'B'
              },
              {
                'brandName': '奔驰',
                'id': 17,
                'initial': 'B'
              },
              {
                'brandName': '比亚迪',
                'id': 18,
                'initial': 'B'
              },
              {
                'brandName': '标致',
                'id': 19,
                'initial': 'B'
              },
              {
                'brandName': '宝骏',
                'id': 20,
                'initial': 'B'
              },
              {
                'brandName': '奔腾',
                'id': 21,
                'initial': 'B'
              },
              {
                'brandName': '保时捷',
                'id': 22,
                'initial': 'B'
              },
              {
                'brandName': '北汽幻速',
                'id': 23,
                'initial': 'B'
              },
              {
                'brandName': '北汽绅宝',
                'id': 24,
                'initial': 'B'
              },
              {
                'brandName': '北京',
                'id': 25,
                'initial': 'B'
              },
              {
                'brandName': '北汽威旺',
                'id': 26,
                'initial': 'B'
              },
              {
                'brandName': '北汽制造',
                'id': 27,
                'initial': 'B'
              },
              {
                'brandName': '宝沃',
                'id': 28,
                'initial': 'B'
              },
              {
                'brandName': '宾利',
                'id': 29,
                'initial': 'B'
              },
              {
                'brandName': '比速汽车',
                'id': 30,
                'initial': 'B'
              },
              {
                'brandName': '巴博斯',
                'id': 31,
                'initial': 'B'
              },
              {
                'brandName': '北汽道达',
                'id': 32,
                'initial': 'B'
              },
              {
                'brandName': '北汽新能源',
                'id': 33,
                'initial': 'B'
              },
              {
                'brandName': '布加迪',
                'id': 34,
                'initial': 'B'
              }
            ],
            'groupName': 'B'
          }
        ]
      }
    }
  },
  {
    url: '/ces/getSeriesByBrand',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        'list': [
          {
            'groupList': [
              {
                'id': 3275,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Brio'
              },
              {
                'id': 3313,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'CLARITY'
              },
              {
                'id': 3304,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'CONCEPT B'
              },
              {
                'id': 3308,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'CONCEPT D'
              },
              {
                'id': 3309,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'CONCEPT M'
              },
              {
                'id': 3314,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'CONCEPT V'
              },
              {
                'id': 3278,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'EV-Ster'
              },
              {
                'id': 3301,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Freed'
              },
              {
                'id': 3288,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Gear'
              },
              {
                'id': 3298,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Honda Design C 001'
              },
              {
                'id': 3268,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'INSIGHT'
              },
              {
                'id': 3294,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Legend'
              },
              {
                'id': 3283,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'N BOX'
              },
              {
                'id': 3284,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'N ONE'
              },
              {
                'id': 3311,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'N-WGN'
              },
              {
                'id': 3296,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'NeuV'
              },
              {
                'id': 3273,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'P-NUT'
              },
              {
                'id': 3292,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Pilot'
              },
              {
                'id': 3276,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Ridgeline'
              },
              {
                'id': 3299,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Sports EV Concept'
              },
              {
                'id': 3285,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Step Bus'
              },
              {
                'id': 3300,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'STEP WGN'
              },
              {
                'id': 3312,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'VEZEL'
              },
              {
                'id': 3316,
                'seriesGroupName': '本田(进口)',
                'seriesName': 'Vision XS-1'
              },
              {
                'id': 3272,
                'seriesGroupName': '本田(进口)',
                'seriesName': '元素'
              },
              {
                'id': 3290,
                'seriesGroupName': '本田(进口)',
                'seriesName': '奥德赛(海外)'
              },
              {
                'id': 3267,
                'seriesGroupName': '本田(进口)',
                'seriesName': '思域(海外)'
              },
              {
                'id': 3265,
                'seriesGroupName': '本田(进口)',
                'seriesName': '时韵'
              },
              {
                'id': 3277,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田AC-X'
              },
              {
                'id': 3303,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田BR-V'
              },
              {
                'id': 3270,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田CR-V(海外)'
              },
              {
                'id': 3269,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田CR-Z'
              },
              {
                'id': 3306,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田FCV'
              },
              {
                'id': 3271,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田FCX'
              },
              {
                'id': 3305,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田HR-V'
              },
              {
                'id': 3274,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田HSV-010 GT'
              },
              {
                'id': 3279,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田NSX'
              },
              {
                'id': 3291,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田S2000'
              },
              {
                'id': 3310,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田S660'
              },
              {
                'id': 3282,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田SUT'
              },
              {
                'id': 3287,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田Urban'
              },
              {
                'id': 3297,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田Urban EV'
              },
              {
                'id': 3302,
                'seriesGroupName': '本田(进口)',
                'seriesName': '本田WR-V'
              },
              {
                'id': 3307,
                'seriesGroupName': '本田(进口)',
                'seriesName': '杰德(海外)'
              },
              {
                'id': 3286,
                'seriesGroupName': '本田(进口)',
                'seriesName': '歌诗图(海外)'
              },
              {
                'id': 3295,
                'seriesGroupName': '本田(进口)',
                'seriesName': '里程'
              },
              {
                'id': 3315,
                'seriesGroupName': '本田(进口)',
                'seriesName': '锋范(海外)'
              },
              {
                'id': 3293,
                'seriesGroupName': '本田(进口)',
                'seriesName': '雅阁(海外)'
              },
              {
                'id': 3289,
                'seriesGroupName': '本田(进口)',
                'seriesName': '飞度(进口)'
              }
            ],
            'groupName': '本田(进口)'
          },
          {
            'groupList': [
              {
                'id': 3264,
                'seriesGroupName': '广汽本田',
                'seriesName': '冠道'
              },
              {
                'id': 3253,
                'seriesGroupName': '广汽本田',
                'seriesName': '凌派'
              },
              {
                'id': 3251,
                'seriesGroupName': '广汽本田',
                'seriesName': '奥德赛'
              },
              {
                'id': 3259,
                'seriesGroupName': '广汽本田',
                'seriesName': '思迪'
              },
              {
                'id': 3281,
                'seriesGroupName': '广汽本田',
                'seriesName': '本田C'
              },
              {
                'id': 3254,
                'seriesGroupName': '广汽本田',
                'seriesName': '歌诗图'
              },
              {
                'id': 3257,
                'seriesGroupName': '广汽本田',
                'seriesName': '缤智'
              },
              {
                'id': 3260,
                'seriesGroupName': '广汽本田',
                'seriesName': '锋范'
              },
              {
                'id': 3250,
                'seriesGroupName': '广汽本田',
                'seriesName': '锋范经典'
              },
              {
                'id': 3247,
                'seriesGroupName': '广汽本田',
                'seriesName': '雅阁'
              },
              {
                'id': 3252,
                'seriesGroupName': '广汽本田',
                'seriesName': '飞度'
              }
            ],
            'groupName': '广汽本田'
          },
          {
            'groupList': [
              {
                'id': 3262,
                'seriesGroupName': '东风本田',
                'seriesName': '哥瑞'
              },
              {
                'id': 3248,
                'seriesGroupName': '东风本田',
                'seriesName': '思域'
              },
              {
                'id': 3255,
                'seriesGroupName': '东风本田',
                'seriesName': '思铂睿'
              },
              {
                'id': 3249,
                'seriesGroupName': '东风本田',
                'seriesName': '本田CR-V'
              },
              {
                'id': 3280,
                'seriesGroupName': '东风本田',
                'seriesName': '本田S'
              },
              {
                'id': 3266,
                'seriesGroupName': '东风本田',
                'seriesName': '本田UR-V'
              },
              {
                'id': 3258,
                'seriesGroupName': '东风本田',
                'seriesName': '本田XR-V'
              },
              {
                'id': 3256,
                'seriesGroupName': '东风本田',
                'seriesName': '杰德'
              },
              {
                'id': 3263,
                'seriesGroupName': '东风本田',
                'seriesName': '竞瑞'
              },
              {
                'id': 3261,
                'seriesGroupName': '东风本田',
                'seriesName': '艾力绅'
              }
            ],
            'groupName': '东风本田'
          }
        ]
      }
    }
  },
  {
    url: '/ces/getModelBySeries',
    on: true,
    resp: {
      reCode: '0000',
      success: true,
      body: {
        'list': [
          {
            'groupList': [
              {
                'guidancePrice': '18.68万',
                'id': 30633,
                'modelFullName': '本田雅阁 2012款 2.0L MT',
                'modelName': '2012款 2.0L MT',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '20.28万',
                'id': 30634,
                'modelFullName': '本田雅阁 2012款 2.0L SE',
                'modelName': '2012款 2.0L SE',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '21.98万',
                'id': 30635,
                'modelFullName': '本田雅阁 2012款 2.4L LX',
                'modelName': '2012款 2.4L LX',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '22.28万',
                'id': 30636,
                'modelFullName': '本田雅阁 2012款 2.0L EX Navi',
                'modelName': '2012款 2.0L EX Navi',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '22.98万',
                'id': 30637,
                'modelFullName': '本田雅阁 2012款 2.4L SE',
                'modelName': '2012款 2.4L SE',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '24.98万',
                'id': 30638,
                'modelFullName': '本田雅阁 2012款 2.4L EX Navi',
                'modelName': '2012款 2.4L EX Navi',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '26.68万',
                'id': 30639,
                'modelFullName': '本田雅阁 2012款 2.4L EXL Navi',
                'modelName': '2012款 2.4L EXL Navi',
                'seriesYear': '2012'
              },
              {
                'guidancePrice': '34.28万',
                'id': 30640,
                'modelFullName': '本田雅阁 2012款 3.5L V6',
                'modelName': '2012款 3.5L V6',
                'seriesYear': '2012'
              }
            ],
            'groupName': '2012'
          },
          {
            'groupList': [
              {
                'guidancePrice': '18.68万',
                'id': 30641,
                'modelFullName': '本田雅阁 2011款 2.0L MT',
                'modelName': '2011款 2.0L MT',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '20.28万',
                'id': 30642,
                'modelFullName': '本田雅阁 2011款 2.0L EX',
                'modelName': '2011款 2.0L EX',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '21.98万',
                'id': 30643,
                'modelFullName': '本田雅阁 2011款 2.4L LX',
                'modelName': '2011款 2.4L LX',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '22.28万',
                'id': 30644,
                'modelFullName': '本田雅阁 2011款 2.0L EX Navi',
                'modelName': '2011款 2.0L EX Navi',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '22.98万',
                'id': 30645,
                'modelFullName': '本田雅阁 2011款 2.4L EX',
                'modelName': '2011款 2.4L EX',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '24.98万',
                'id': 30646,
                'modelFullName': '本田雅阁 2011款 2.4L EX Navi',
                'modelName': '2011款 2.4L EX Navi',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '26.68万',
                'id': 30647,
                'modelFullName': '本田雅阁 2011款 2.4L EXL Navi',
                'modelName': '2011款 2.4L EXL Navi',
                'seriesYear': '2011'
              },
              {
                'guidancePrice': '34.28万',
                'id': 30648,
                'modelFullName': '本田雅阁 2011款 3.5L V6',
                'modelName': '2011款 3.5L V6',
                'seriesYear': '2011'
              }
            ],
            'groupName': '2011'
          },
          {
            'groupList': [
              {
                'guidancePrice': '18.68万',
                'id': 30649,
                'modelFullName': '本田雅阁 2010款 2.0L MT',
                'modelName': '2010款 2.0L MT',
                'seriesYear': '2010'
              },
              {
                'guidancePrice': '20.28万',
                'id': 30650,
                'modelFullName': '本田雅阁 2010款 2.0L EX',
                'modelName': '2010款 2.0L EX',
                'seriesYear': '2010'
              },
              {
                'guidancePrice': '21.98万',
                'id': 30651,
                'modelFullName': '本田雅阁 2010款 2.4L LX',
                'modelName': '2010款 2.4L LX',
                'seriesYear': '2010'
              },
              {
                'guidancePrice': '22.28万',
                'id': 30652,
                'modelFullName': '本田雅阁 2010款 2.0L EX Navi',
                'modelName': '2010款 2.0L EX Navi',
                'seriesYear': '2010'
              },
              {
                'guidancePrice': '22.98万',
                'id': 30653,
                'modelFullName': '本田雅阁 2010款 2.4L 百万纪念版',
                'modelName': '2010款 2.4L 百万纪念版',
                'seriesYear': '2010'
              },
              {
                'guidancePrice': '24.98万',
                'id': 30654,
                'modelFullName': '本田雅阁 2010款 2.4L EX Navi',
                'modelName': '2010款 2.4L EX Navi',
                'seriesYear': '2010'
              }
            ]
          }
        ]
      }
    }
  }
];
