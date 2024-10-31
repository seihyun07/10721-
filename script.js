let expr;

function plotGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';

    let functionInput = document.getElementById('functionInput').value.trim();

    if (functionInput.startsWith('y = ')) {
        functionInput = functionInput.slice(4);
    }

    expr = math.parse(functionInput).compile();

    drawGraph();
}

function drawGraph() {
    const graph = document.getElementById('graph');
    const xValues = math.range(-100, 100, 0.1)._data;
    const yValues = xValues.map(x => expr.evaluate({ x }));

    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'lines',
    };

    const layout = {
        xaxis: { title: 'X축' },
        yaxis: { title: 'Y축' },
        autosize: true,
        margin: { l: 40, r: 40, t: 40, b: 40 },
    };

    Plotly.newPlot(graph, [trace], layout);
}

window.addEventListener('resize', drawGraph);

setInterval(drawGraph, 100);
