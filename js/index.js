const { ref, reactive, computed, onUnmounted } = Vue;
const App = {
    setup() {
        // showTime
        const time = ref('');
        const formatTime = () => {
            const date = new Date();
            const timezoneOffset = -date.getTimezoneOffset() / 60;
            const timezone = `GMT${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;
            
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            
            return `${timezone} ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };
        time.value = formatTime();

        const intervalId = setInterval(() => {
            time.value = formatTime(); // 每秒更新
        }, 1000);

        onUnmounted(() => {
            clearInterval(intervalId); // 銷毀時清除定時器
        });

        // language
        const options = ['繁體中文', 'English'];
        const language = ref('繁體中文');

        return {
            time, options, language
        }
    }
}
Vue.createApp(App).mount('#app');