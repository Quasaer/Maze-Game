let cols, rows, destination;
//w is the length of the lines
let w = 30;
// array to store in my cell objects
let grid= [];
//current cell and also the player as they will both inherit the first grid object.
//no separate player class needed
let current,player,end;
//visited cells are stored in a stack
let stack = [];
//the win history of the player is stored into a queue
let win_history = [];
let move_count = 0;
let reset = false;
let Bool = false;
let start_game = false;
const ALGORITHM_DROPDOWN_DEPTH_FIRST = "Depth First";
const ALGORITHM_DROPDOWN_KRUSKAL = "Kruskal";

function setup(){
  createCanvas(900,600);
  setupUI();
  //set_game();
}


function draw(){
  background(51);
  //displays the grid on canvas
  //this for loop does not do anything with the generation of the maze
  // generation of maze code
  //will only run if the generated property in cell is false as it hasn't been fully generated
  //code will not be ran when stack length == 0
  //this is to modulate my code and so that other parts of the game code will nt be interfered with this part.
  if(current.generated  == false){

    for (let square of grid){
      square.show();
    }
    //visited becomes true when cell has visited
    current.visited = true;
    //current cell is highlighted
    current.highlight();
    //next cell is obtained by going through the checkNeighbours function
    let next = current.checkneighbours();
    if(next){
      //next cell is marked true when visited
      next.visited = true;
      //put current cell in stack array
      stack.push(current);
      //remove walls at current and next cell
      removeWall(current,next);
      //my new current is the next cell
      current = next;
      frameRate(60);
    } else if(stack.length > 0) {
      //while there are cells in stack,current will bw top of stack
      current = stack.pop();
    }
  }
  //maze generation is completed when there are no more items in stack
  if(stack.length == 0 && reset == false){
    //limit frame rate for slower animation when the player moves
    frameRate(10)
    current.generated = true;
    start_game = true

  }
  // once maze has been fully generated, it will highlight player and end at starting position
  if(start_game == true){
    player.highlight();
    end.highlight();
    keydown()
    //grid lines are drawn over the objects so that it is more clear which walls can be entered to the endpoint
    for (let square of grid){
      square.show();

    }
  }
  if(reset == true){
    //still display maze
    for( let maze of grid){
      maze.show();
    }
    //display reset button
    let reset_button = createButton('Reset game')
    reset_button.position(width, 200)
    //go back into set game function
    reset_button.mousePressed(set_game);

  }

}
function set_game(){
  if(reset == true ){
    grid = []
    stack = []
    win_history.push(move_count)
    move_count = 0;
    Bool = false;
    start_game = false;
    reset = false
    removeElements()
  }
  cols = floor(width/w);
  rows = floor(height/w);
  // player = new Player();
  //nested loop that will make 400 cell objects-20x20 grid
  for(let j = 0 ; j < rows; j++){
    for (let i = 0 ; i < cols; i++){
      let cell = new Cell(i,j);
      //putting the cell object into the array using the push fucntion
      grid.push(cell);
    }
  }

  //the current cell starts at first grid cell object
  current = grid[0];
  start_point = grid[0];
  player = new Player();
  player.i = 0;
  player.j = 0;
  let end_num = grid.length -1
  end = grid[end_num];


}
function removeWall (cur,nex){
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
//this function finds the index of the grid array
function index (i,j){
  //validation for edge cases will return a null index
  if (i < 0 || j < 0 || i > cols-1 || j > rows -1){
    return -1;
  }
  return i + j * cols;
}

function keydown(){
  let move_display;
  if(reset == true){
    console.log('completed');
  } else{


    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)){
      if(player.i >= 0){
        let val_move = player.wall_boundary(2)
        if(val_move == true){
          player.i -=1;
          move_count+=1;

        }
      }

    }

    if (keyIsDown(UP_ARROW)|| keyIsDown(87)){
      if(player.j >=0){
        let val_move = player.wall_boundary(3);
        if(val_move == true){

          player.j -=1;
          move_count+=1;

        }

      }


    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)){
      if(player.j < rows -1){
        let val_move = player.wall_boundary(4)
        if(val_move == true){
          player.j +=1;
          move_count+=1;

        }


      }
    }

    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){

      if(player.i < cols -1 ){
        let val_move = player.wall_boundary(1)
        if( val_move == true){

          player.i +=1;
          move_count+=1;
        }
      }


    }


    removeElements();
    if(win_history.length > 0){
      let spacing  = 3

      let history_str = 'Amount of moves won by:'
      let print_header = createElement('h2',history_str);
      print_header.position(width,10);
      for(let i = 0; i < win_history.length; i++){
        let print_win = createElement('p4',win_history[i]);
        print_win.position(width,10*(i+5)+spacing)
        spacing+=3;

      }
    }
    let moveLog_str = 'Move Log: '
    let moveLog_prnt = createElement('h2',moveLog_str)
    moveLog_prnt.position(width ,100)
    move_display = createElement('h2', move_count);
    move_display.position(width,120);
    if(player.i == end.i && player.j == end.j){
      // let win_line = "You're winner"
      // let congratualtion = createElement('h2', win_line);
      // congratualtion.position(width+20,20);
      start_game = false;
      reset = true;
    }
  }

}
function keyPressed(){
  if(start_game == true){
    //key pressed is a function that is entered once a key is pressed
    let move_display;
    if(reset == true){
      //once the game is completed
      //moves will not be logged anymore
      console.log('completed')
    } else{

      if (keyCode == RIGHT_ARROW || keyCode == 68){
        //boundary constraint will be the first validation
        //contrains the player for the right side
        if(player.i < cols -1 ){
          // if player is with in the valid region then launch wall boundary
          //val_move is the returned boolean from wall boundary
          //1 is the key code for right
          let val_move = player.wall_boundary(1)
          //if val_move is true / valid then increment move counter by 1 and move player position
          if( val_move == true){
            player.i +=1;

            move_count+=1;
          }
        }
      }


      if (keyCode == LEFT_ARROW || keyCode == 65){
        //boundary constraint will be the first validation
        //contrains the player for the left side
        if(player.i >= 0){
          // if player is with in the valid region then launch wall boundary
          //val_move is the returned boolean from wall boundary
          //2 is the key code for left
          let val_move = player.wall_boundary(2)
          if(val_move == true){
            //player will move in the negative of right
            player.i -=1;
            move_count+=1;

          }
        }

      }


      if (keyCode == UP_ARROW|| keyCode == 87){
        //boundary constraint will be the first validation
        //contrains the player for the top
        if(player.j >=0){
          // if player is with in the valid region then launch wall boundary
          //val_move is the returned boolean from wall boundary
          //3 is the key code for up
          let val_move = player.wall_boundary(3);
          if(val_move == true){
            //player j will be changed

            player.j -=1;
            move_count+=1;

          }

        }


      }

      if (keyCode == DOWN_ARROW || keyCode == 83){
        //boundary constraint will be the first validation
        //contrains the player for down
        if(player.j < rows -1){
          // if player is with in the valid region then launch wall boundary
          //val_move is the returned boolean from wall boundary
          //4 is the key code for down
          let val_move = player.wall_boundary(4)
          if(val_move == true){
            //player j will change to the negative of up

            player.j +=1;
            move_count+=1;

          }


        }
      }
      removeElements();
      //if there is an element inside win history array then display array
      if(win_history.length > 0){
        //this is an incremental spacing variable to space out each result
        let spacing  = 3
        let history_str = 'Amount of moves won by:'
        let print_header = createElement('h2',history_str);
        print_header.position(width,10);
        //loop through the win history array
        for(let i = 0; i < win_history.length; i++){
          //at each element, make a p4 element
          let print_win = createElement('p4',win_history[i]);
          //the positon of the p4 element would need to change downwards
          print_win.position(width,10*(i+5)+spacing)
          spacing+=3;

        }
      }
      let moveLog_str = 'Move Log: '
      let moveLog_prnt = createElement('h2',moveLog_str)
      moveLog_prnt.position(width,100)
      move_display = createElement('h2', move_count);
      move_display.position(width,120);

      if(player.i == end.i && player.j == end.j){

        reset = true;
        start_game = false;
      }
    }

  }
}

//Function to draw the UI
function setupUI(){
  let algorithmDropDownLabelStr = 'Maze Algorithm Select: ';
  let algorithmDropDownLabel = createElement('label',algorithmDropDownLabelStr);
  algorithmDropDownLabel.position(width+50,50);
  let algorithmDropDown = createSelect();
  algorithmDropDown.position(algorithmDropDownLabel.x+160, 50);
  algorithmDropDown.option(ALGORITHM_DROPDOWN_DEPTH_FIRST);
  algorithmDropDown.option(ALGORITHM_DROPDOWN_KRUSKAL);
  algorithmDropDown.selected(ALGORITHM_DROPDOWN_DEPTH_FIRST);
  //display start button
  let startbutton = createButton('Start game')
  startbutton.position(algorithmDropDown.x+algorithmDropDown.width*4, 50)
  //go back into set game function
  startbutton.mousePressed(set_game(algorithmDropDown.value));
}

// set move log
// removes all html elements and re writes it all out again
