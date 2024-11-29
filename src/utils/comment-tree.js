export function commentTree2TwoLevelTree(tree) {
    let twoLevelTree = [];
    for (let comment of tree) {
        let commentJson = JSON.stringify(comment);
        let newComment = JSON.parse(commentJson);
        newComment.childData = [];
        twoLevelTreeAddNode(comment, newComment)
        packageComment(newComment)
        sortComment(newComment)
        twoLevelTree.push(newComment)
    }
    return twoLevelTree
}


function twoLevelTreeAddNode(curNode, needMountNode) {
    if (curNode.childData && 0 !== curNode.childData.length) {
        for (let childNode of curNode.childData) {
            needMountNode.childData.push(twoLevelTreeAddNode(childNode, needMountNode))
        }
    }
    packageComment(curNode)
    return curNode
}

function packageComment(comment) {
    if (!comment.commentUserAvatar) {
        comment.commentUserAvatar = "https://picsum.photos/200/200"
    }
    if (!comment.commentUserName) {
        comment.commentUserName = "NotLoginUser"
    }
    if (!comment.mainSubUserName) {
        comment.mainSubUserName = "NotLoginUser"
    }
    if (!comment.ipAddressName) {
        comment.ipAddressName = "Unknown"
    }
}

function sortComment(comment) {
    comment.childData.sort(sortCreateTime)
}

function sortCreateTime(a, b) {
    return a.commentTime > b.commentTime ? 1 : -1;
}
