// スクロール時
document.addEventListener('scroll', function () {
  activeItem()
})

let app = new Vue({
  el: '#app',
  data: {
    items: exItems,
    shownItems: [],
    selectedCategory: "web",
    options: [
      { category: 'Web', value: 'web' },
      { category: 'iOS App', value: 'iOS' },
      { category: 'Space design', value: 'space' },
      { category: 'flower', value: 'flower' }
    ]
  },
  methods: {
    //選択されたcategoryのitemを抽出
    pickItems: function () {
      // console.log(this.selectedCategory);
      shownItems = this.items.filter(function (el) {
        return el.category == this.selectedCategory
      }, this)
      console.log(shownItems);
    }
  }
})

const y0 = 250 //上から

// activeな要素を検出
function activeItem() {
  // liを検索
  let ul = document.getElementById('items')
  let elems = ul.getElementsByTagName('li')
  let activeEl = null
  for (let i = 0; i < elems.length; i++)
  {
    let el = elems.item(i)
    let rect = el.getBoundingClientRect()
    let top = rect.y
    let bottom = rect.y + rect.height
    if ((top < y0) && (y0 < bottom)) //指定範囲内
    {
      addActive(el)
      activeEl = el;
    } else
    {
      removeActive(el)
    }
  }
  if (activeEl == null)
  {
    clearDisplay()
  }
}

// activeクラスの付与
function addActive(el) {
  el.classList.add('active')
  el.classList.add('done')
  changeDisplay(el)
}

// activeクラスの除去
function removeActive(el) {
  el.classList.remove('active')
}

let dIcon = document.getElementById('display-icon')
let dTitle = document.getElementById('display-title')
let dBody = document.getElementById('display-body')
let dDate = document.getElementById('display-date')

// diplayエリアの表示
function changeDisplay(li) { //elはactiveな<li>
  // icon
  let path = li.classList[0]
  dIcon.style.backgroundImage = "url(./img/" + path + ".png)";
  // title
  let itemTitle = li.getElementsByClassName('item-title')
  dTitle.textContent = itemTitle[0].textContent
  let id = li.getAttribute("data-id")
  // body
  dBody.innerHTML = app.items[id].description
  // date
  dDate.innerHTML = app.items[id].date
}

function clearDisplay() {
  dIcon.style.backgroundImage = "";
  dTitle.innerHTML = "";
  dBody.innerHTML = "";
  dDate.innerHTML = ""
}
