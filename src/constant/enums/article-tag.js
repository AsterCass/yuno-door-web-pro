const articleTagEnums = [
    {
        name: "Docker",
        code: 1,
        color: "blue-5",
        rbg: "#42A5F5",
    },
    {
        name: "Linux",
        code: 2,
        color: "red-5",
        rbg: "#EF5350",

    },
    {
        name: "Java",
        code: 4,
        color: "green-5",
        rbg: "#66BB6A",
    },
    {
        name: "C/C++",
        code: 8,
        color: "grey-10",
        rbg: "#212121",
    },
    {
        name: "SQL",
        code: 16,
        color: "orange-5",
        rbg: "#FFA726",
    },
    {
        name: "Windows",
        code: 32,
        color: "blue-grey-5",
        rbg: "#78909C",
    },
    {
        name: "Shell",
        code: 64,
        color: "purple-5",
        rbg: "#AB47BC",
    },
    {
        name: "Tool",
        code: 128,
        color: "yellow-10",
        rbg: "#F57F17",
    },
    {
        name: "Android",
        code: 256,
        color: "deep-orange-5",
        rbg: "#FF7043",
    },
    {
        name: "Qt",
        code: 512,
        color: "brown-5",
        rbg: "#8D6E63",
    },
    {
        name: "Spring",
        code: 1024,
        color: "light-green-5",
        rbg: "#9CCC65",
    },
    {
        name: "Kotlin",
        code: 2048,
        color: "amber-5",
        rbg: "#FFCA28",
    },
    {
        name: "Vue",
        code: 4096,
        color: "green-10",
        rbg: "#1B5E20",
    },
    {
        name: "Html/Css/Js",
        code: 8192,
        color: "blue-10",
        rbg: "#0D47A1",
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