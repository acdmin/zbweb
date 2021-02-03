export const _alert = (name) => {
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}

export const _confirm = (name) => {
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var result=window.frames[0].window.confirm(name);
    iframe.parentNode.removeChild(iframe);
    return result;
}

/**
 *
 * @param {*} number //需要倒计的时间 正整数
 * @param {*} countTing //倒计时中回调，携带了倒计时后的时间数
 * @param {*} countEnd //结束回调
 */
export const timeCountDown = (number, countTing, countEnd) => {
	if(number<0)return 0
    number--
    countTing&&countTing(number)
    let timeCountDownTimer = setInterval(() => {
        number--
        countTing&&countTing(number)
        if( number >= 0 ){
            if( number == 0 ){
                clearInterval(timeCountDownTimer)
                timeCountDownTimer = null
                countEnd&&countEnd(number)
                return
            }
        }else{
            clearInterval(timeCountDownTimer)
            timeCountDownTimer = null
        }
    }, 1000)
    return timeCountDownTimer
}

export const secondsToTime = seconds => {
    let h = parseInt(seconds / 3600)
    seconds -= (h * 3600)
    let m = parseInt(seconds / 60)
    seconds -= (m * 60)
    let s = seconds
    return `${fileZero(h)}:${fileZero(m)}:${fileZero(s)}`
}

export const fileZero = (num) => {
    return num < 10 ? '0' + num : num;
}

export const reg = {
    isEmail(str){
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str)
    },
    isPhone(str){
        return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str)
    }
}