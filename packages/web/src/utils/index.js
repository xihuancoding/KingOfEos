import moment from 'moment'

export const kingOrderToPrice = kingOrder => (1.35 ** kingOrder).toFixed(4)

export const kingdomEndDate = lastClaimTime => moment(lastClaimTime).add(7, `days`)

export function resolveScopedStyles(scope) {
    return {
        className: scope.props.className,
        styles: scope.props.children,
    }
}

export const openUrl = url => {
    const win = window.open(url, `_blank`)
    win.focus()
}

export const floatingImageStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            i {
                float: right;
            }
        `}</style>
    </scope>,
)

export const kingImageTableStyles = resolveScopedStyles(
    <scope>
        <style jsx>{`
            img {
                object-fit: cover;
                height: 2.5em !important;
            }
        `}</style>
    </scope>,
)

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
/* eslint-disable */
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength >>= 0 // truncate if number or convert non-number to 0;
        padString = String(typeof padString !== `undefined` ? padString : ` `)
        if (this.length > targetLength) {
            return String(this)
        }
        targetLength -= this.length
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this)
    }
}
/* eslint-enable */