export const genderOptEnum = [
    {
        label: '女',
        color: 'pink-7',
        value: 0
    },
    {
        label: '男',
        color: 'blue-7',
        value: 1
    },
    {
        label: '女同性恋',
        color: 'deep-purple-7',
        value: 2
    },
    {
        label: '男同性恋',
        color: 'green-7',
        value: 3
    },
    {
        label: '双性恋',
        color: 'purple-7',
        value: 4
    },
    {
        label: '跨性别',
        color: 'light-green-7',
        value: 5
    },
    {
        label: '酷儿',
        color: 'teal-7',
        value: 6
    },
    {
        label: '武装直升飞机',
        color: 'grey-10',
        value: 7
    },
    {
        label: '沃尔玛购物袋',
        color: 'blue-grey-7',
        value: 8
    },
]

export function getGenderObj(value) {
    for (let obj of genderOptEnum) {
        if (obj.value === value) {
            return obj
        }
    }
    return {
        label: "不能被定义",
        color: "black",
        value: 0
    }
}