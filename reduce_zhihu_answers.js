// ==UserScript==
// @name         Delete List-item Script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  删除多余的 List-item ，使其剩下 10 个
// @author       YourName
// @match        https://www.zhihu.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    // 插入按钮的样式
    GM_addStyle(`
        #deleteButton {
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        #deleteButton:hover {
            background-color: #45a049;
        }
    `);

    // 创建按钮元素
    var button = document.createElement('button');
    button.id = 'deleteButton';
    button.innerText = 'Clear';
    document.body.appendChild(button);

    // 按钮点击事件，执行删除逻辑
    button.addEventListener('click', function () {
        // 获取父节点 List
        var list = document.getElementsByClassName('List')[0];

        if (list) {
            // 获取所有的 List-item 子孙节点
            var listItems = list.querySelectorAll('.List-item');

            // 将获取的 List-item NodeList 转换为数组
            var itemsArray = Array.from(listItems);

            // 检查 List-item 数量是否大于 10
            if (itemsArray.length > 10) {
                // 需要删除的数量是总数量减去 10
                var deleteCount = itemsArray.length - 10;

                // 删除多余的 List-item 元素
                for (var i = 0; i < deleteCount; i++) {
                    itemsArray[i].parentNode.removeChild(itemsArray[i]);
                }

                // alert('删除了 ' + deleteCount + ' 个 List-item，剩下 10 个。');
            } else {
                // alert('List-item 的数量少于等于 10，无需删除。');
            }
        } else {
            // alert('未找到包含 List-item 的父节点 List。');
        }
    });
})();
