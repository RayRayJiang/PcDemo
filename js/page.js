function Page(str, json) {
    this.ele = document.querySelector(str);
    this.PageIndex = 1;
    this.option = {
        count: 100, // 数据总数
        shownum: 5, // 每页显示数
        showpage: 7 // 底下连续显示页数
    };
    Object.assign(this.option, json) // 前面对象里有的，会直接修改，没有的会给它
    this.creat(); // 结构生成
    this.bindDate(); // 生成数据到结构中
}

Page.prototype.bindEvent = function () {
    var that = this; // 方便在点击事件中使用
    this.upBtn.className = "";
    this.upBtn.onclick = function () {
        that.PageIndex--;
        that.bindDate();
    }
    this.nextBtn.className = "";
    this.nextBtn.onclick = function () {
        that.PageIndex++;
        that.bindDate();
    }
    if (this.PageIndex == 1) {
        this.upBtn.className = "disabled";
        this.upBtn.onclick = null;
    }
    if (this.PageIndex == this.allPage) {
        this.nextBtn.className = "disabled";
        this.nextBtn.onclick = null;
    }
}

Page.prototype.bindDate = function () {
    var that = this;
    var allPage = Math.ceil(this.option["count"] / this.option["shownum"]);
    this.allPage = allPage;
    var start = 1;
    var end = allPage > this.option["showpage"] ? this.option["showpage"] : allPage;

    var middleNum = Math.floor(this.option["showpage"] / 2);
    if (this.PageIndex > middleNum) {
        start = this.PageIndex - middleNum;
        end = this.PageIndex + middleNum;
    }
    if (this.PageIndex > allPage - middleNum) {
        start = allPage - 2 * middleNum;
        end = allPage;
    }
    start = start < 1 ? 1 : start; // 防止开始出现负数

    this.content.innerHTML = "";
    for (var i = start; i <= end; i++) {
        var li = document.createElement("li");
        li.innerHTML = i;
        li.index = i;
        if (i == this.PageIndex) {
            li.className = "active";
        }
        this.content.appendChild(li);
        li.onclick = function () { // 点击li之后
            that.PageIndex = this.index;
            that.bindDate();
        }
    }
    this.option["callBack"](this.PageIndex);
    this.bindEvent();
}

Page.prototype.creat = function () {
    this.upBtn = document.createElement("span");
    this.upBtn.className = "page-up";
    this.ele.appendChild(this.upBtn);
    this.upBtn.innerHTML = "上一页";

    this.content = document.createElement("ul");
    this.content.className = "page-content";
    this.ele.appendChild(this.content);

    this.nextBtn = document.createElement("span");
    this.nextBtn.className = "page-next";
    this.ele.appendChild(this.nextBtn);
    this.nextBtn.innerHTML = "下一页";
}
