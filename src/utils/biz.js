import {getStarEmojiList} from "@/api/file";
import {customLargePage} from "@/utils/page";
import {useGlobalStateStore} from "@/utils/global-state";


export function updateStarEmoji(isForce) {
    const globalState = useGlobalStateStore()

    if (!isForce && globalState.starEmojiList && globalState.starEmojiList.length > 0) {
        return
    }

    if (!globalState.isLogin) {
        globalState.starEmojiList = []
        return
    }

    getStarEmojiList(customLargePage({})).then(res => {
        if (!res || !res.data || !res.data.data) {
            return
        }
        globalState.starEmojiList = res.data.data.fileEmojis
    })
}
