// ==UserScript==
// @name         Check leetcode tags
// @namespace    http://tampermonkey.net/
// @version      2024-10-31
// @description  try to take over the world!
// @author       You
// @match        https://leetcode.cn/problems/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.cn
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function () {

    function checkTags() {
        var textDifficulty = document.querySelectorAll('[class*="text-difficulty"]')[0]

        clearTimeout(timer)

        if (!textDifficulty) {
            timer = clearTimeout(checkTags(), 2000)
            return
        }

        var parent = document.querySelectorAll('[class*="text-difficulty"]')[0].parentElement

        console.log('parent = ', parent);

        if (document.body.innerText.indexOf("数学") >= 0) {
            let node = document.createElement('div')
            node.textContent = '数学'
            // node.style.cursor = 'pointer'
            node.style.color = 'rgb(255,45, 85,.7)'
            parent.appendChild(node)
        }

        if (document.body.innerText.indexOf("脑筋急转弯") >= 0) {
            let node = document.createElement('div')
            node.textContent = '脑筋急转弯'
            // node.style.cursor = 'pointer'
            node.style.color = 'rgb(255,45, 85,.7)'
            parent.appendChild(node)
        }
    }

    timer = setTimeout(
        checkTags,
        2000
    )

})();