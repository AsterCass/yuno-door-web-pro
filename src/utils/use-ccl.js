export function loadCCL() {
    return new Promise((resolve, reject) => {
        if (window.CommentManager) {
            resolve(window);
            return;
        }
        const script = document.createElement('script');
        script.src = '/lib/CommentCoreLibrary.min.js';
        script.onload = () => resolve(window);
        script.onerror = () => reject(new Error('Failed to load CommentCoreLibrary'));
        document.body.appendChild(script);
    });
}