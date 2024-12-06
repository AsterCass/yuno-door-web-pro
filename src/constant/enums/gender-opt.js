export const genderOptEnum = [
    {
        label: '女',
        color: 'pink-7',
        category: 0
    },
    {
        label: '男',
        color: 'blue-7',
        category: 1
    },
    {
        label: '中性',
        color: 'deep-purple-7',
        category: 2
    },
    {
        label: '偏男两性人',
        color: 'green-7',
        category: 3
    },
    {
        label: '偏女两性人',
        color: 'purple-7',
        category: 4
    },
    {
        label: '不完全男性',
        color: 'light-green-7',
        category: 5
    },
    {
        label: '不完全女性',
        color: 'teal-7',
        category: 6
    },
    {
        label: '武装直升飞机',
        color: 'grey-10',
        category: 7
    },
    {
        label: '沃尔玛购物袋',
        color: 'blue-grey-7',
        category: 8
    },
]

export function getGenderObj(category) {
    for (let obj of genderOptEnum) {
        if (obj.category === category) {
            return obj
        }
    }
    return {
        label: "不能被定义",
        color: "black",
        category: 0
    }
}