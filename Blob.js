/*
  Adapted from Random SVG Blob Shape Generator (Angular version), by Sergey Rudenko
  code + step by step :
  https://medium.com/better-programming/random-svg-blob-shape-generator-e3d5b9a55f50
  demo: 
  https://stackblitz.com/edit/ionic-v4-angular-tabs-1x83k4?file=src%2Fapp%2Fapp.component.html
*/

let Blob = class Blob {
  constructor(element) {
    this.element = document.querySelector(element);
    this.path = this.element.querySelector('path'); 
    this.pathD = '';
    this.pathCoordinates = {x:0, y:0};

    this.radius = 200;
    this.angle = 0;
    this.centerX = 240;
    this.centerY = 240;
  
    this.vertixCountFactor = GetLevel();
    this.pathStyle = {
      border:'none',
      fill:'transparent',
      stroke: 'grey',
      strokeWidth: 2, 
      strokeDasharray: "none"
    }
  }

  generateCoords() {
    for (let i = 0; i < 2*Math.PI; i+=this.vertixCountFactor) {
      let x = (this.radius*Math.cos(i) + this.centerX) + this.getRandomRadiusModifier();
      let y = (this.radius*Math.sin(i) + this.centerY) + this.getRandomRadiusModifier();
      this.pathCoordinates.push({x,y});
      if (i+this.vertixCountFactor >= 2*Math.PI) {
        this.pathCoordinates.push(this.pathCoordinates[0])
      };
    };
  }

  getRandomRadiusModifier() {
    let num = Math.floor(Math.random()*10) + 1;
    num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    return num;
  }

  resetPathData() {
    this.pathD = "";
    this.pathCoordinates = [];
  }
  
  catmullRom2bezier() {

    let d = "";
    this.pathCoordinates.forEach((coord,index, array) => {
      let p = [];
      if (index === 0) {
        d += `M${coord.x},${coord.y} `;
        p.push(array[array.length - 3]);
        p.push(array[index]);
        p.push(array[index+1]);
        p.push(array[index+2]);
      } else if (index === array.length - 2) {
        p.push(array[index-1]);
        p.push(array[index]);
        p.push(array[index+1]);
        p.push(array[0]);
      } else if (index === array.length - 1) {
        return
      } else {
        p.push(array[index-1]);
        p.push(array[index]);
        p.push(array[index+1]);
        p.push(array[index+2]);
      }
      let bp = [];
      bp.push( { x: p[1].x,  y: p[1].y } );
      bp.push( { x: ((-p[0].x + 6*p[1].x + p[2].x) / 6), y: ((-p[0].y + 6*p[1].y + p[2].y) / 6)} );
      bp.push( { x: ((p[1].x + 6*p[2].x - p[3].x) / 6),  y: ((p[1].y + 6*p[2].y - p[3].y) / 6) } );
      bp.push( { x: p[2].x,  y: p[2].y } );
      d += "C" + bp[1].x + "," + bp[1].y + " " + bp[2].x + "," + bp[2].y + " " + bp[3].x + "," + bp[3].y + " ";

    })

    return d;
  }

  drawCurvyShape() {
    this.pathD = this.catmullRom2bezier();
    this.path.setAttribute('d', this.pathD);
  }

  generateEyes() {
    let EyeL = document.getElementById("eyeL")
    let EyeR = document.getElementById("eyeR")
    EyeL.setAttribute("cx", Math.random(0, 50)*35+150)
    EyeL.setAttribute("cy", Math.random(0, 50)*35+150)

    EyeR.setAttribute("cx", Math.random(0, 50)*35+300)
    EyeR.setAttribute("cy", Math.random(0, 50)*35+150)
  }

  generateCurvyShape() {
    this.resetPathData();
    this.generateCoords();
    this.drawCurvyShape();

    this.generateEyes()

    this.pathStyle = {
      fill: this.randomPastel(),
    }
    Object.assign(this.path.style, this.pathStyle);
  }

  randomPastel() {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var h = randomInt(0, 360);
    var s = 75;
    var l = 50;
    return `hsl(${h},${s}%,${l}%)`;
  }

};

function GetBlobPoint() {
  localStorage.setItem("LivelyImage", document.getElementById("test").innerHTML);
}


function generateBlob(style){
  
  var b = new Blob('#test');
  switch(style){
    case 'curvy':
      b.generateCurvyShape();
      break;
  }
}
