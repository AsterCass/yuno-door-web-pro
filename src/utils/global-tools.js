import {onMounted, onBeforeUnmount} from 'vue';

export function resizeEvent(callback) {
    const handleResize = () => {
        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
        console.log("[op:resize] resizeEvent end");
        window.removeEventListener('resize', handleResize);
    });
}