var elements = document.querySelectorAll('.kudo .header');
Array.prototype.forEach.call(elements, function(el, i){
    el.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});