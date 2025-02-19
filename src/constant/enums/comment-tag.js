export const commentTagEnums = [
    {
        name: "main_comment_type_log",
        code: 1,
        color: "red-8",
        rbg: "rgb(211, 47, 47)",
    },
    {
        name: "main_comment_type_comments",
        code: 0,
        color: "green-8",
        rbg: "rgb(56, 142, 60)",
    },
]

export function getCommentTagDesc(code) {
    return commentTagEnums[Math.log2(code)]
}

export function getCommentTagDescList(code) {
    let descList = []
    if (null !== code && 0 !== code.length) {
        code.forEach((item) => {
            descList.push(getCommentTagDesc(item))
        })
    }
    return descList

}