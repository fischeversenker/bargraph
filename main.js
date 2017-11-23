class Bar {

    constructor(id, color, y) {
        this.id = id;
        this.color = color;
        this.y = y;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#container');
    const CENTER_X = container.clientWidth / 2;
    const MAX_HEIGHT = container.clientHeight;

    const MAX_Y = 200000;
    const MIN_Y = 30000;

    const BAR_COUNT = 4;

    let bars = [];
    let max, min, threshold;

    init();

    function init() {
            
        for(let i = 0; i < BAR_COUNT; i++) {
            bars.push(new Bar(i, getRandomColor(), getRandomHeight()));
        }

        bars.sort((a, b) => a.y <= b.y);
        bars.forEach((b, i) => b.id = i);
        
        max = findMax(bars);
        min = findMin(bars);

        threshold = min * 0.5;

        container.appendChild(getMeanLine());
        container.appendChild(getMeanLine(threshold));

        for(let b of bars) {
            container.appendChild(getBarDomEl(b));
        }
    }

    function getMeanLine(m) {
        let mean = m || findMean(bars);
        let el = document.createElement('div');
        el.classList.add('mean');
        el.dataset.val = '€ ' + mean;
        el.style.bottom = getBarHeight(new Bar(null, null, mean)) + 'px';
        return el;
    }

    function getBarDomEl(bar) {
        let el = document.createElement('div');
        let direction = (bar.id % 2 == 0 ? 1 : -1); 
        let leftOffset = direction * (bar.id + (bar.id % 2)) * 5;
        let left = CENTER_X + leftOffset;
        el.classList.add('bar', (direction > 0 ? 'label-right' : 'label-left'));
        el.style.left = left + 'px';
        el.style.backgroundColor = bar.color;
        el.style.height = getBarHeight(bar) + 'px';
        el.dataset.val = '€ ' + bar.y;
        return el;
    }

    function getRandomHeight() {
        let h = MIN_Y + Math.random() * (MAX_Y - MIN_Y);
        return Math.round(h / 100) * 100;
    }

    function getRandomColor() {
        let r = Math.round(100 + Math.random() * 100);
        let g = Math.round(100 + Math.random() * 100);
        let b = Math.round(100 + Math.random() * 100);
        return '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }

    function getBarHeight(bar) {
        return ((bar.y - threshold) / (max - threshold)) * MAX_HEIGHT;
    }

    function findMax(bars) {
        return bars.reduce((acc, el) => el.y > acc ? el.y : acc, bars[0].y);
    }

    function findMin(bars) {
        return bars.reduce((acc, el) => el.y < acc ? el.y : acc, bars[0].y);
    }

    function findMean(bars) {
        return bars.reduce((acc, el) => acc + el.y, 0) / bars.length;
    }
});
