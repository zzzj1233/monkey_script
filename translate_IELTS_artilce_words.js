// ==UserScript==
// @name         Translate IELTS artilce unfamiliar word
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Translate IELTS artilce unfamiliar word
// @author       Your Name
// @match        *://ieltsonlinetests.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 创建弹出框的HTML和CSS
    const modalHTML = `
    <div id="customModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:rgba(0,0,0,0.5); justify-content:center; align-items:center; z-index:10000;">
        <div style="background-color:white; padding:20px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.1); width:300px;">
            <h2 style="margin:0 0 15px 0; font-size:18px;">Replace Text</h2>
            <input type="text" id="input1" placeholder="Enter text to replace" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:5px;"/>
            <input type="text" id="input2" placeholder="Enter new text" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:5px;"/>
            <button id="replaceBtn" style="width:100%; padding:10px; background-color:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">Replace</button>
            <button id="closeBtn" style="width:100%; padding:10px; background-color:#ccc; color:white; border:none; border-radius:5px; cursor:pointer;">Close</button>
        </div>
    </div>`;

    // 创建固定在页面上的按钮的HTML和CSS
    const floatingButtonHTML = `
    <div id="floatingButton" style="position:fixed; top:15px; right:30%; z-index:10000;">
        <button style="padding:10px 20px; background-color:#007bff; color:white; border:none; border-radius:5px; cursor:pointer; box-shadow:0 2px 10px rgba(0,0,0,0.1);"> Replace </button>
    </div>`;

    // 将弹出框和按钮的HTML插入到页面中
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = floatingButtonHTML;
    document.body.appendChild(buttonContainer);

    // 显示弹出框
    const showModal = () => {
        document.getElementById('customModal').style.display = 'flex';
    };

    // 隐藏弹出框
    const hideModal = () => {
        document.getElementById('customModal').style.display = 'none';
    };

    // 按钮点击事件处理
    document.getElementById('replaceBtn').addEventListener('click', function () {
        const textToReplace = document.getElementById('input1').value;
        const newText = document.getElementById('input2').value;

        replaceText(textToReplace, newText, true)
    });

    const replaceText = (textToReplace, newText, save) => {
        const container = document.getElementById('split-one');

        if (container && textToReplace && newText) {
            // 遍历所有子孙元素，替换innerText中的内容
            const allDescendants = container.getElementsByTagName("*");
            for (let element of allDescendants) {
                if (element.innerHTML.includes(textToReplace)) {
                    element.innerHTML = element.innerHTML.replace(textToReplace, ' ' + newText + ' ');
                }
            }
            hideModal(); // 完成替换后隐藏弹出框

            if (save) {
                saveToLocal(textToReplace, newText)
            }

        }

    }

    const saveToLocal = (textToReplace, newText) => {
        let saved = localStorage.getItem('zzzj.replace')

        if (!saved)
            saved = "{}"

        const parsed = JSON.parse(saved)

        parsed[textToReplace] = newText

        localStorage.setItem('zzzj.replace', JSON.stringify(parsed))
    }

    const loadFromLocal = () => {
        let saved = localStorage.getItem('zzzj.replace')
        if (saved) {
            const parsed = JSON.parse(saved)
            Object.keys(parsed).forEach(key => replaceText(key, parsed[key], false))
        }
    }

    // 点击浮动按钮时显示弹出框
    document.querySelector('#floatingButton button').addEventListener('click', showModal);

    document.getElementById('closeBtn').addEventListener('click', hideModal);

    window.addEventListener('load', function () {
        loadFromLocal()
    })
})();
