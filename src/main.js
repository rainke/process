import * as d3 from 'd3';
import Databus from './databus';

window.d3 = d3;
const databus = new Databus();
const svg = d3.select('#draw').append('svg').attr('width', 1000).attr('height', 800);
const mg = svg.append('g');
let current;
d3.select('#shape')
    .selectAll('.item')
    .on('dragover', function(){
        d3.event.preventDefault();
    })
    .on('dragstart', function(){
        d3.event.dataTransfer.setData('shape',this.dataset.shape)
        databus.drag = true;
        databus.shape = this.dataset.shape;
    })
    .on('dragend', function(){
        databus.drag = false;
        const [cx, cy] = d3.mouse(svg.node());
        if(cx < 0 || cy < 0) {
            current && current.remove();
        }
        console.log('dragend')
    })
svg.on('dragenter', function(){
    console.log(databus.shape)
    let [cx, cy] = d3.mouse(this);
    if(!current) {
        switch(databus.shape) {
            case '0': 
            case '2': current = mg.append('rect'); break;
            case '1': current = mg.append('circle');break;
        }
        current.style('fill', 'transparent').style('stroke', 'blue').style('cursor', 'move')
    }
}).on('dragover', function(){
    d3.event.preventDefault();
    let [cx, cy] = d3.mouse(this);
    let r = 40;
    if(current) {
        switch(databus.shape) {
            case '1': 
                current
                    .attr('cx', cx)
                    .attr('cy', cy)
                    .attr('r', r);
                break;
            case '0':
            case '2':
                current
                    .attr('x', cx - r)
                    .attr('y', cy - r)
                    .attr('width', r * 2)
                    .attr('height', r * 2)
        }
        if(databus.shape == 2) {
            current.attr('transform', `rotate(45, ${cx}, ${cy})`)
        }
    }
}).on('dragleave', function(){

}).on('drop', function(){
    let shape = databus.shape;
    const drag = d3.drag()
        .on('drag', function(){
            const dThis = d3.select(this);
            if(shape === '1') {
                let cx = dThis.attr('cx');
                let cy = dThis.attr('cy');
                dThis.attr('cx', cx * 1 + d3.event.dx).attr('cy', cy * 1 + d3.event.dy)
            } else {
                let x = dThis.attr('x');
                let y = dThis.attr('y');
                dThis.attr('x',x * 1 + d3.event.dx).attr('y',y * 1 +  d3.event.dy);
                if(shape == '2') {
                    dThis.attr('transform', `rotate(45, ${x * 1 + d3.event.dx}, ${y * 1 +  d3.event.dy})`)
                }
            }
        })
    current.call(drag)
    current = null;
})