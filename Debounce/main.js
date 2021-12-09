const initApp = () => {
    const button = document.querySelector('button');
    button.addEventListener('click', throttle(clickOrder, 3000))
}

const clickOrder = () => {
    console.log('Bắt đầu gọi API Order')
}

document.addEventListener('DOMContentLoaded', initApp)

// Triển khai THROTTLE 
// Cứ 3s sẽ gọi 1 lần
const throttle = (fn, delay) => {
    delay = delay || 0
    let last = 0

    return () => {
        let now = new Date().getTime()
        // Trong vòng 0 - 3s nếu click thì sẽ không làm gì cả
        if(now - last < delay){
            return
        }

        last = now
        fn()
    }
}


// Cú pháp của DEBOUNCE
// debounce (fn, delay)
const debounce = (fn, delay) => {
    delay = delay || 0
    let timerId;

    console.log('timerId immediate load:::', timerId);
    return () => {
        console.log(`timerId previous at:::${timerId}`);
        if(timerId){
            // Nếu thời gian chưa đạt 2s sau mỗi lần click
            // Sẽ vào đây và clearTimeout trở về 0s
            clearTimeout(timerId)
            timerId = null
        }

        timerId = setTimeout(() =>{
            fn()
        }, delay)
    }
}



