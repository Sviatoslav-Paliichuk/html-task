var sold_chart = c3.generate({
    bindto: d3.select('.chart-left'),
    data: {
        columns: [
            ['Sold by category', 0, 10, 18, 29, 51]
        ],
        type: 'spline'
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Jeans', 'Coats', 'Sweaters', 'Wear to work', 'Active wear']
        },
        y: {
            show: true,
            max: 60,
            min: 0,
            ticks: 10
        }
    }, legend: {
        show: false
    }
});

var revenue_chart = c3.generate({
    bindto: d3.select('.chart-right'),
    data: {
        columns: [
            ['Sold by category', 0, 100, 2800, 2600, 2650]
        ], type: 'spline'
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Jeans', 'Coats', 'Sweaters', 'Wear to work', 'Active wear']
        },
        y: {
            show: true,
            max: 3000,
            min: 0,
            ticks: 500
        }
    }, legend: {
        show: false
    }
});