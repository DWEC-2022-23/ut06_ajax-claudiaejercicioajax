document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');
  
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');
  
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  /*request();
  url = 'https://my-json-server.typicode.com/DWEC-2022-23/ut06_ajax-claudiaejercicioajax/';

  function request(url) {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.timeout = 2000;
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.status);
            alert("Algo salío mal. ¡Lo sentimos!");
          }
        }
      };
      xhr.ontimeout = function () {
        reject('timeout')
      };
      xhr.open('get', url, true);
      xhr.send();
    });
  }*/

quefuncione(); // obviamente cambiarle el nombre

function quefuncione() // y aqui tambien
{
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      var objeto = JSON.parse(this.responseText);
      xhr.open("GET", objeto, true);
    }
    else
    {
      alert("Algo salió mal. ¡Lo sentimos!")
    }
  }
  xhr.open("GET", "https://my-json-server.typicode.com/DWEC-2022-23/ut06_ajax-claudiaejercicioajax/", true);
  //xhr.responseType = 'json'; 
  //var text = JSON.parse(xhr.responseText); // How do I make this work?? I think it has to be within the readystate and the status thingy
  //console.log(text);
  xhr.send();
}

  /*getXML();
  
  function getXML()
  {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
      console.log("hola1"); // Bua si es que no entra ni aqui xD
      if (xhr.readyState == 4 && xhr.status == 200)
      {
        console.log("hola2");
        xhr.send("https://my-json-server.typicode.com/DWEC-2022-23/ut06_ajax-claudiaejercicioajax/"); // not sure if send should have that or not 
        // Tampoco estoy segura de si deberia ir aqui el xhr.send
      }
      else
      {
        alert("Algo salío mal. ¡Lo sentimos!");
      }
    }
    xhr.open("GET", "https://my-json-server.typicode.com/DWEC-2022-23/ut06_ajax-claudiaejercicioajax/", true); // Creo que esto no tiene por qué estar aquí
  }*/


  /*
  function request(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.status);
        }
      }
    };
    xhr.ontimeout = function () {
      reject('timeout')
    };
    xhr.open('get', url, true);
    xhr.send();
  });
}
  */

  filterLabel.textContent = "Ocultar los que no hayan respondido";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const lis = ul.children;
    if(isChecked) {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';  
        } else {
          li.style.display = 'none';                        
        }
      }
    } else {
      for (let i = 0; i < lis.length; i += 1) {
        let li = lis[i];
        li.style.display = '';
      }                                 
    }
  });
  
  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);  
      element[property] = value; 
      return element;
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);     
      li.appendChild(element); 
      return element;
    }
    
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);     
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));
    appendToLI('button', 'textContent', 'edit');
    appendToLI('button', 'textContent', 'remove');
    return li;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li = createLI(text);
    ul.appendChild(li);
  });
    
  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });
    
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = button.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = 'save';  
        },
        save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input);
          button.textContent = 'edit';        
        }
      };
      
      // select and run action in button's name
      nameActions[action]();
    }
  });  
});  
  
  
  
  
  
  
  
  
  