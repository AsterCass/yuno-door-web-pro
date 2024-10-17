const advEnums = [
    '拼命地', '疯狂地', '怠惰地', '孜孜不倦地', '永不言弃地', '勤勤恳恳地', '偷税地', '严密地',
    "从容不迫地", "仔细地", "满意地", "日夜不停地", '心跳加速地'
]

const vEnums = [
    '生成', '色诱', '喂养', '扒拉', '伺候', '抚摸', '守护', '勾引', '哄骗', '指责', '打骂', '孕育',
    '欺负', '品尝', '洗劫', '惩治', '哀求', '爆杀', '啃食'
]

const nEnums = [
    '代码', '老太太', '待产的母猪', '破旧的洗衣机', '臭袜子', '于谦的父亲王大爷', '绿皮火车', '三上老师的胖次',
    '带馅的大肠', '茄子', '特朗普', '小只因', '葛优的头发', '渣渣辉', '隔壁村的刘寡妇', '科莫多巨蜥', '小黑子',
    '敌敌畏', '纯爱战士', '牛头人', '白学家'
]


export function getLoadGarbleLang() {
    const random = Math.floor(Math.random() * 10000)
    const prefix = '正在'
    const adj = advEnums[random % advEnums.length]
    const v = vEnums[random % vEnums.length]
    const n = nEnums[random % nEnums.length]
    const suffix = '中...'
    return prefix + adj + v + n + suffix
}