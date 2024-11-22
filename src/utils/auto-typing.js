import {useGlobalStateStore} from "@/utils/global-state";

class TypingEffect {
    constructor(options = {}) {
        // Default options
        this.options = {
            element: null,              // DOM element or selector
            text: '',                   // Text to type
            typeSpeed: 100,            // Typing speed in milliseconds
            deleteSpeed: 50,           // Deleting speed in milliseconds
            startDelay: 0,             // Delay before starting
            loop: false,               // Whether to loop the animation
            loopDelay: 2000,          // Delay between loops
            cursor: true,              // Show cursor
            cursorChar: ' |',           // Cursor character
            onComplete: null,          // Callback when typing is complete
            ...options
        };

        // Initialize state
        this.element = typeof this.options.element === 'string'
            ? document.querySelector(this.options.element)
            : this.options.element;
        this.isDeleting = false;
        this.loopNum = 0;
        this.currentText = '';
        this.timeout = null;
        this.cursorElement = null;
        this.isRunning = false;

        if (!this.element) {
            throw new Error('No element specified for TypingEffect');
        }

        this.init();
    }

    init() {
        // Add cursor if enabled
        if (this.options.cursor) {
            this.cursorElement = document.createElement('span');
            this.cursorElement.className = 'typing-cursor';
            this.cursorElement.innerHTML = this.options.cursorChar;
            this.cursorElement.style.animation = 'typing-cursor-blink 1s infinite';
            this.element.parentNode.insertBefore(this.cursorElement, this.element.nextSibling);

            // Add cursor animation style
            if (!document.querySelector('#typing-cursor-style')) {
                const style = document.createElement('style');
                style.id = 'typing-cursor-style';
                style.textContent = `
                    @keyframes typing-cursor-blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
        }

        // 只在初始化时启动一次
        if (this.options.startDelay > 0) {
            this.timeout = setTimeout(() => this.start(), this.options.startDelay);
        } else {
            this.start();
        }
    }

    tick() {

        if (!this.isRunning) return;

        const text = this.options.text;
        const complete = !this.isDeleting && this.currentText === text;
        const empty = this.isDeleting && this.currentText === '';

        // 更新文本
        if (!this.isDeleting) {
            this.currentText = text.substring(0, this.currentText.length + 1);
        } else {
            this.currentText = text.substring(0, this.currentText.length - 1);
        }

        this.element.textContent = this.currentText;

        let delta = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;

        // 处理完成状态
        if (complete) {
            if (this.options.loop) {
                // 循环模式：设置延迟后开始删除
                this.timeout = setTimeout(() => {
                    this.isDeleting = true;
                    this.tick();
                }, this.options.loopDelay);
            } else {
                // 非循环模式：完全停止
                this.stop();
                if (typeof this.options.onComplete === 'function') {
                    this.options.onComplete();
                }
            }
        } else if (empty) {
            // 删除完成后重新开始
            this.isDeleting = false;
            this.loopNum++;
            this.timeout = setTimeout(() => this.tick(), 500);
        } else {
            // 正常打字过程
            this.timeout = setTimeout(() => this.tick(), delta);
        }
    }

    // Public methods
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.tick();
        }
    }

    stop() {
        this.isRunning = false;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    reset(newText = null) {
        this.stop();
        this.currentText = '';
        this.isDeleting = false;
        this.loopNum = 0;
        this.element.textContent = '';
        if (newText) {
            this.options.text = newText;
        }
        this.start();
    }

    destroy() {
        this.stop();
        if (this.cursorElement) {
            this.cursorElement.remove();
        }
    }
}

// Simple function wrapper for basic usage
export function createTypingEffect(element, text, options = {}) {
    return new TypingEffect({
        element,
        text,
        ...options
    });
}