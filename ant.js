class Ant {
  constructor(x, y, limit, colors = { "black": "l", "gray": "r" }) {
    this.x = x;
    this.y = y;
    this.limit = limit;
    this.colors = colors;

    this.dir = 0;
    this.rows = document.querySelectorAll("tr");
    this.setCell();
  }

  go() {
    const successed = this.turnAround();

    if(successed) {
      this.setCell();
    }

    return new Promise((resolve, reject) => resolve(successed));
  }

  turnAround() {
    switch(this.colors[this.cell.style.backgroundColor]) {
      case "l":
        this.dir = (this.dir + 1) % 4;
        break;
      case "r":
        this.dir = (this.dir + 3) % 4;
        break;
      default:
    }
    
    switch(this.dir) {
      case 0: // n
        this.y -= 1;
        break;
      case 1: // e
        this.x += 1;
        break;
      case 2: // s
        this.y += 1;
        break;
      case 3: // w
        this.x -= 1;
        break;
      default:
    }
    
    return this.x > -1 && this.x < this.limit && this.y > -1 && this.y < this.limit;
  }

  setCell() {
    this.cell = this.rows[this.x].querySelectorAll("td")[this.y];
    const backgroundColor = this.cell.style.backgroundColor;
    let next;
    let flag = false;

    for(let color in this.colors) {
      if(!next) {
        next = color;
      }
      if(flag) {
        next = color;
        break;
      }
      if(next && color === backgroundColor) {
        flag = true;
        continue;
      }
    }
    
    this.cell.style.backgroundColor = next;
  }
}