function copyAll(){
    var toCopy = document.createElement('div');
    toCopy.contentEditable = true;
    
    var canvas = document.getElementsByTagName("canvas");
    for (var c of canvas){
      var img = document.createElement('img');
      img.src = c.toDataURL();
      toCopy.appendChild(img);
    }
    
    for (i = 0; i < 5; i++) { 
        var img = document.createElement("img");        
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAg8AAAHZCAIAAACOyE9aAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAZfSURBVHhe7dUxAYAwEMDAB6n4d9ABlq40Bu6WSMi1nncA4OjeBYB/bgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQDNLQBobgFAcwsAmlsA0NwCgOYWADS3AKC5BQBl5gNWMQYO4xppdQAAAABJRU5ErkJggg==";
        toCopy.appendChild(img);
    }

    document.body.appendChild(toCopy);
    SelectText(toCopy);
    document.execCommand('Copy');
    document.body.removeChild(toCopy);
  }

  function SelectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}