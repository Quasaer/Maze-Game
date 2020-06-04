class Player{
    constructor(){
      this.i
      this.j
    }
  
  
    highlight(){
      stroke(255);
      fill(25,22,88);
      let x = player.i * w;
      let y = player.j * w;
      ellipse(x + (w/2),y + (w/2),w/2);
  
    }
    wall_boundary(move){
      //defines the neighbours to the current cell the player is at.
      let top = grid[index(player.i, player.j -1)];
      let bottom = grid[index(player.i, player.j +1)];
      let left = grid[index(player.i -1, player.j)];
      let right = grid[index(player.i +1, player.j)];
      let current = grid[index(player.i, player.j)];
      let move_code = move
  
      //right side validation
      if(move_code == 1){
        if(current.walls[3] == false && right.walls[2] == false){
          //the right wall of current cell needs to be false
          //as well as the left wall of the desiered cell needs to be false as well
          //this is for further validation
          return true;
        } else{
          return false;
        }
  
      }
  
  
      //left side validation
      if(move_code == 2){
        if(current.walls[2] == false && left.walls[3] == false){
          //the left wall of current cell needs to be false
          //as well as the right wall of the desiered cell needs to be false as well
          //this is for further validation
          return true;
        } else{
          return false;
        }
  
      }
  
      //top side validation
      if(move_code == 3){
        if(current.walls[0] == false && top.walls[1] == false){
          //the top wall of current cell needs to be false
          //as well as the bottom wall of the desiered cell needs to be false as well
          //this is for further validation
          return true;
        } else{
          return false;
        }
  
      }
      //bottom side validation
      if(move_code == 4){
        if(current.walls[1] == false && bottom.walls[0] == false){
          //the bottom wall of current cell needs to be false
          //as well as the top wall of the desiered cell needs to be false as well
          //this is for further validation
          return true;
        } else{
          return false;
        }
      }
    }
  
  
  
  
  }
  