const articleTagEnums = [
    {
        name: "Docker",
        code: 1,
        color: "red-8",
        rbg: "rgb(211, 47, 47)",
    },
    {
        name: "Linux",
        code: 2,
        color: "pink-8",
        rbg: "rgb(194, 24, 91)",

    },
    {
        name: "Java",
        code: 4,
        color: "purple-8",
        rbg: "rgb(123, 32, 163)",
    },
    {
        name: "C/C++",
        code: 8,
        color: "deep-purple-8",
        rbg: "rgb(81, 45, 168)",
    },
    {
        name: "SQL",
        code: 16,
        color: "indigo-8",
        rbg: "rgb(48, 63, 159)",
    },
    {
        name: "Windows",
        code: 32,
        color: "blue-8",
        rbg: "rgb(25, 118, 210)",
    },
    {
        name: "Shell",
        code: 64,
        color: "light-blue-8",
        rbg: "rgb(2, 136, 209)",
    },
    {
        name: "Tool",
        code: 128,
        color: "cyan-8",
        rbg: "rgb(0, 151, 167)",
    },
    {
        name: "Android",
        code: 256,
        color: "teal-8",
        rbg: "rgb(0, 121, 107)",
    },
    {
        name: "Qt",
        code: 512,
        color: "green-8",
        rbg: "rgb(56, 142, 60)",
    },
    {
        name: "Spring",
        code: 1024,
        color: "light-green-8",
        rbg: "rgb(104, 159, 56)",
    },
    {
        name: "Kotlin",
        code: 2048,
        color: "lime-8",
        rbg: "rgb(175, 180, 43)",
    },
    {
        name: "Vue",
        code: 4096,
        color: "amber-8",
        rbg: "rgb(255, 160, 0)",
    },
    {
        name: "Html/Css/Js",
        code: 8192,
        color: "orange-8",
        rbg: "rgb(245, 124, 0)",
    },
]

function getArticleTagDesc(code) {
    return articleTagEnums[Math.log2(code)]
}

function getArticleTagDescList(code) {
    let descList = []
    if (null !== code && 0 !== code.length) {
        code.forEach((item) => {
            descList.push(getArticleTagDesc(item))
        })
    }
    return descList

}


export {
    articleTagEnums, getArticleTagDesc, getArticleTagDescList
}