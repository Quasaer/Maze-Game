//Put cell in a separate .js file to make the code more cleaner to interpret
//this is my cell class
class Cell{
    constructor(i , j){
      //i is rows and j is cols
      //this.gen = false;
      this.i = i;
      this.j = j;
      //A wall is drawn if true
      this.walls=[true,true,true,true];
      //visited is false when cell has not been visited
      this.visited = false;
      this.generated = false;
  
    }
    show(){
      // x and y is position
      let x = this.i * w;
      let y = this.j * w;
      stroke(255);
      noFill();
      //north wall - draw wall when true
      if(this.walls[0]){
        line(x, y, x + w, y);
      }
      //south wall
      if(this.walls[1]){
        line(x + w, y + w, x , y + w);
  
      }
      //west wall
      if(this.walls[2]){
        line(x , y + w, x , y);
      }
      //east wall
      if(this.walls[3]){
        line(x + w, y , x + w, y + w);
  
      }
  
  
    }
  
    checkneighbours(){
      let neighbours = [];
  
      //these are the cell neighbours
      let top = grid[index(this.i, this.j -1)];
      let bottom = grid[index(this.i, this.j +1)];
      let left = grid[index(this.i -1, this.j)];
      let right = grid[index(this.i +1, this.j)];
  
      //if a neighbour cell has not been visited then put cell into neighbour array
      if (top && !top.visited){
        neighbours.push(top);
      }
      if (bottom &&!bottom.visited){
        neighbours.push(bottom);
      }
      if (left && !left.visited){
        neighbours.push(left);
      }
      if (right && !right.visited){
        neighbours.push(right);
      }
      if(neighbours.length > 0){
        let ran = floor(random(0,neighbours.length));
        return neighbours[ran];
  
      }else{
        return undefined;
      }
    }
    highlight(){
      if(this.generated == false){
  
        noStroke();
        let x = this.i * w ;
        let y = this.j * w;
        fill(255,10,24);
        rect(x,y,w,w);
      }
  
    }
    removeWall(cur,nex){
      // left or right for the difference between the current cell and next cell
      let x = cur.i - nex.i;
  
      if(x == 1){
        cur.walls[2] = false;
        nex.walls[3] = false;
      } else if(x == -1){
        cur.walls[3] = false;
        nex.walls[2] = false;
      }
  
      // above or below for the difference between the current cell and next cell
      let y = cur.j - nex.j;
  
      if(y == 1){
        cur.walls[0] = false;
        nex.walls[1] = false;
      } else if(y == -1){
        cur.walls[1] = false;
        nex.walls[0] = false;
      }
  
    }
  
  }