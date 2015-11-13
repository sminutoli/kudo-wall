var elements = document.querySelectorAll('.kudo .header');
Array.prototype.forEach.call(elements, function(el, i){
    console.log(el);
    console.log(Math.floor(Math.random()*16777215).toString(16));
    el.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});