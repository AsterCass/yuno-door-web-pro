export const roleTypeEnum = [
    {
        label: '游客',
        color: 'grey-7',
        logo: 'fa-regular fa-id-badge',
        code: 0
    },
    {
        label: '会员',
        color: 'green-7',
        logo: 'fa-solid fa-user',
        code: 1
    },
    {
        label: '超级会员',
        color: 'orange-7',
        logo: 'fa-solid fa-user-graduate',
        code: 2
    },
    {
        label: '炒鸡会员',
        color: 'amber-7',
        logo: 'fa-solid fa-drumstick-bite',
        code: 4
    },
    {
        label: '站长',
        color: 'red-7',
        logo: 'fa-solid fa-user-secret',
        code: 1024
    },
]

export function getRoleTypeObj(code) {
    for (let obj of roleTypeEnum) {
        if (obj.code === code) {
            return obj
        }
    }
    return {
        label: "外星人",
        color: "deep-purple-7",
        logo: "fa-solid fa-skull",
        code: -1
    }
}