//------------------------ Variables ------------------------

  let reader;
  var lines;
  var listMovements=[];
  var pageMovements;
  var booMoveNext=0;
  var booMovePrevious=0;
  var movValues=[];
  var movPositions=[];
  var movTab=[];
  var colorsTab=[];
  var actualMovement=0;
  var letters= ["A","B","C","D","E","F","G","H"];
  var numbers=["1","2","3","4","5","6","7","8"];
  var namePieces=["WhitePawnA","WhitePawnB","WhitePawnC","WhitePawnD","WhitePawnE","WhitePawnF","WhitePawnG","WhitePawnH","WhiteRookA","WhiteHorseB","WhiteBishopC","WhiteQueen","WhiteKing","WhiteBishopF","WhiteHorseG","WhiteRookH",
                  "BlackPawnA","BlackPawnB","BlackPawnC","BlackPawnD","BlackPawnE","BlackPawnF","BlackPawnG","BlackPawnH","BlackRookA","BlackHorseB","BlackBishopC","BlackQueen","BlackKing","BlackBishopF","BlackHorseG","BlackRookH"];
  var shNamePieces=["WPA","WPB","WPC","WPD","WPE","WPF","WPG","WPH","WRA","WNB","WBC","WQ","WK","WBF","WNG","WRH","BPA","BPB","BPC","BPD","BPE","BPF","BPG","BPH","BRA","BNB","BBC","BQ","BK","BBF","BNG","BRH"];
  var shNameMov=["InitialMovement","firstMovWhite","firstMovBlack","secondMovWhite","secondMovBlack","thirdMovWhite","thirdMovBlack","fourthMovWhite","fourthMovBlack","fifthMovWhite","fifthMovBlack","sixthMovWhite","sixthMovBlack","seventhMovWhite","seventhMovBlack","eighthMovWhite","eighthMovBlack","ninthMovWhite","ninthMovBlack","tenthMovWhite","tenthMovBlack","FinalMovement"]
  var side="W";
  var stateOfPieces=[];
  var numPieces=[];
  var positions;
  var mov;
  var colors;
  var stateP;
  var numP;
  var val;
  var differ;
  var possibleMovements=[];
  var referPiece;
  var site;
  var step=0;
  var filled=1;
  var canDown=0;
  var marLetter=["A031","B074","C117","D160","E203","F246","G289","H332"];
  var marNumber=["8031","7074","6117","5160","4203","3246","2289","1332"];
  var type="White";
  var whPlayer="";
  var blPlayer="";

//--------------------------------------------------------------------------

//-------------------------------- Functions -------------------------------

/** doclick() => void 
 *  @description: This function is used to select the file we want to analize
 *  @returns: None
 *  @param: None
 */
function doClick() {
    var el=document.getElementById("textFile");
    if (el) {
      el.click();
    }
}

/** openFile(event) => void 
 *  @description: This funcion is used to open the file and keep in the program
 *  @returns: None
 *  @param: event
 */
function openFile(event){
    let archive=event.target.files[0];
    if (archive){
        reader=new FileReader();
        reader.readAsText(archive);
        reader.onload=onLoad;
    }
}

window.addEventListener('load', () => {
    document.getElementById('textFile').addEventListener('change', openFile);
});

/** onLoad() => void 
 *  @description: This function is used to enter the additional information on the page.
 *  @returns: None
 *  @param: None
 */
function onLoad(){
  var result=reader.result;
  lines=result.split('\n');
  var cleanData;
  var i=1;
  for(var linea of lines) {
    if(i==1){
      cleanData=linea.slice(7,(linea.length-1));
      document.getElementById("infoEvent").innerText=cleanData;
      i++;
    }else if(i==2){
      cleanData=linea.slice(5,(linea.length-1));
      document.getElementById("infoSite").innerText=cleanData;
      i++;
    }else if(i==3){
      cleanData=linea.slice(5,(linea.length-1));
      document.getElementById("infoDate").innerText=cleanData;
      i++;
    }else if(i==4){
      cleanData=linea.slice(6,(linea.length-1));
      document.getElementById("infoRound").innerText=cleanData;
      i++;
    }else if(i==5){
      cleanData=linea.slice(6,(linea.length-1));
      document.getElementById("infoWhite").innerText=cleanData;
      whPlayer=cleanData;
      i++;
    }else if(i==6){
      cleanData=linea.slice(7,(linea.length-1));
      document.getElementById("infoBlack").innerText=cleanData;
      blPlayer=cleanData;
      i++;
    }else if(i==7){
      cleanData=linea.slice(7,(linea.length-1));
      document.getElementById("infoResult").innerText=cleanData;
      i++;
    }
  }
  obtainMovements();
  showMovements();
  initializeMovements();
  calculateMovementsValues();
  setfirstvalues();
  canDown=1;
}

/** obtainMovements() => void 
 *  @description: This function is used to obtain a list with the game movements
 *  @returns: None
 *  @param: None
 */
function obtainMovements(){
  var j=1;
  var indexOM=0;
  for(var movementsOM of lines){
    if(j<9){
      // The loop only enter here if is additional info so we do not need to store it
      j++;
    }else{
      var onlyMoves=movementsOM.split(" ");
      for(var movOM of onlyMoves){
        if(indexOM!=0){
          if(movOM=="1-0" || movOM=="0-1"){
            // Do nothing
          }else{
          listMovements.push(movOM);
          }
        }
        indexOM++;
        if(indexOM==3) indexOM=0;
      }
    }
  }
}

/** showMovements() => void 
 *  @description: This function is used to fill movements table with the first 10 movements
 *  @returns: None
 *  @param: None
 */
function showMovements(){
  pageMovements=1;
  document.getElementById("firstMovWhite").innerText=listMovements[0];
  document.getElementById("firstMovBlack").innerText=listMovements[1];
  document.getElementById("secondMovWhite").innerText=listMovements[2];
  document.getElementById("secondMovBlack").innerText=listMovements[3];
  document.getElementById("thirdMovWhite").innerText=listMovements[4];
  document.getElementById("thirdMovBlack").innerText=listMovements[5];
  document.getElementById("fourthMovWhite").innerText=listMovements[6];
  document.getElementById("fourthMovBlack").innerText=listMovements[7];
  document.getElementById("fifthMovWhite").innerText=listMovements[8];
  document.getElementById("fifthMovBlack").innerText=listMovements[9];
  document.getElementById("sixthMovWhite").innerText=listMovements[10];
  document.getElementById("sixthMovBlack").innerText=listMovements[11];
  document.getElementById("seventhMovWhite").innerText=listMovements[12];
  document.getElementById("seventhMovBlack").innerText=listMovements[13];
  document.getElementById("eighthMovWhite").innerText=listMovements[14];
  document.getElementById("eighthMovBlack").innerText=listMovements[15];
  document.getElementById("ninthMovWhite").innerText=listMovements[16];
  document.getElementById("ninthMovBlack").innerText=listMovements[17];
  document.getElementById("tenthMovWhite").innerText=listMovements[18];
  document.getElementById("tenthMovBlack").innerText=listMovements[19];
  type="Black";
  document.getElementById("ActualMovementNum").innerText="Mov: 0 Side: " + type;
  document.getElementById("ActualMovement").innerText="Initial State";
  type="White";
}

/** doNextPageMovements() => void 
 *  @description: This function is triggered by a button below the table of movements. It used to fill the table with the next movements
 *  @returns: None
 *  @param: None
 */
function doNextPageMovements(){
  booMoveNext=1;
  if(booMovePrevious==1){
    pageMovements++;
    booMovePrevious=0;
  }
  var index=pageMovements*10;
  pageMovements++;
  if(listMovements[19+(index*2)]==null){
    pageMovements--;
    booMoveNext=0;
  }
  document.getElementById("firstMovWhite").innerText=listMovements[0+(index*2)];
  document.getElementById("firstMovBlack").innerText=listMovements[1+(index*2)];
  document.getElementById("secondMovWhite").innerText=listMovements[2+(index*2)];
  document.getElementById("secondMovBlack").innerText=listMovements[3+(index*2)];
  document.getElementById("thirdMovWhite").innerText=listMovements[4+(index*2)];
  document.getElementById("thirdMovBlack").innerText=listMovements[5+(index*2)];
  document.getElementById("fourthMovWhite").innerText=listMovements[6+(index*2)];
  document.getElementById("fourthMovBlack").innerText=listMovements[7+(index*2)];
  document.getElementById("fifthMovWhite").innerText=listMovements[8+(index*2)];
  document.getElementById("fifthMovBlack").innerText=listMovements[9+(index*2)];
  document.getElementById("sixthMovWhite").innerText=listMovements[10+(index*2)];
  document.getElementById("sixthMovBlack").innerText=listMovements[11+(index*2)];
  document.getElementById("seventhMovWhite").innerText=listMovements[12+(index*2)];
  document.getElementById("seventhMovBlack").innerText=listMovements[13+(index*2)];
  document.getElementById("eighthMovWhite").innerText=listMovements[14+(index*2)];
  document.getElementById("eighthMovBlack").innerText=listMovements[15+(index*2)];
  document.getElementById("ninthMovWhite").innerText=listMovements[16+(index*2)];
  document.getElementById("ninthMovBlack").innerText=listMovements[17+(index*2)];
  document.getElementById("tenthMovWhite").innerText=listMovements[18+(index*2)];
  document.getElementById("tenthMovBlack").innerText=listMovements[19+(index*2)];

  document.getElementById("firstMovNumWhite").innerText=1+index;
  document.getElementById("firstMovNumBlack").innerText=1+index;
  document.getElementById("secondMovNumWhite").innerText=2+index;
  document.getElementById("secondMovNumBlack").innerText=2+index;
  document.getElementById("thirdMovNumWhite").innerText=3+index;
  document.getElementById("thirdMovNumBlack").innerText=3+index;
  document.getElementById("fourthMovNumWhite").innerText=4+index;
  document.getElementById("fourthMovNumBlack").innerText=4+index;
  document.getElementById("fifthMovNumWhite").innerText=5+index;
  document.getElementById("fifthMovNumBlack").innerText=5+index;
  document.getElementById("sixthMovNumWhite").innerText=6+index;
  document.getElementById("sixthMovNumBlack").innerText=6+index;
  document.getElementById("seventhMovNumWhite").innerText=7+index;
  document.getElementById("seventhMovNumBlack").innerText=7+index;
  document.getElementById("eighthMovNumWhite").innerText=8+index;
  document.getElementById("eighthMovNumBlack").innerText=8+index;
  document.getElementById("ninthMovNumWhite").innerText=9+index;
  document.getElementById("ninthMovNumBlack").innerText=9+index;
  document.getElementById("tenthMovNumWhite").innerText=10+index;
  document.getElementById("tenthMovNumBlack").innerText=10+index;
}

/** doPreviousPageMovements() => void 
 *  @description: This function is triggered by a button below the table of movements. It used to fill the table with the previous movements
 *  @returns: None
 *  @param: None
 */
function doPreviousPageMovements(){
  booMovePrevious=1;
  if(booMoveNext==1){
    pageMovements--;
    booMoveNext=0;
  }
  pageMovements--;
  if(pageMovements<0){
    pageMovements=0;
  }
  var Previousindex=pageMovements*10;
  document.getElementById("firstMovWhite").innerText=listMovements[0+(Previousindex*2)];
  document.getElementById("firstMovBlack").innerText=listMovements[1+(Previousindex*2)];
  document.getElementById("secondMovWhite").innerText=listMovements[2+(Previousindex*2)];
  document.getElementById("secondMovBlack").innerText=listMovements[3+(Previousindex*2)];
  document.getElementById("thirdMovWhite").innerText=listMovements[4+(Previousindex*2)];
  document.getElementById("thirdMovBlack").innerText=listMovements[5+(Previousindex*2)];
  document.getElementById("fourthMovWhite").innerText=listMovements[6+(Previousindex*2)];
  document.getElementById("fourthMovBlack").innerText=listMovements[7+(Previousindex*2)];
  document.getElementById("fifthMovWhite").innerText=listMovements[8+(Previousindex*2)];
  document.getElementById("fifthMovBlack").innerText=listMovements[9+(Previousindex*2)];
  document.getElementById("sixthMovWhite").innerText=listMovements[10+(Previousindex*2)];
  document.getElementById("sixthMovBlack").innerText=listMovements[11+(Previousindex*2)];
  document.getElementById("seventhMovWhite").innerText=listMovements[12+(Previousindex*2)];
  document.getElementById("seventhMovBlack").innerText=listMovements[13+(Previousindex*2)];
  document.getElementById("eighthMovWhite").innerText=listMovements[14+(Previousindex*2)];
  document.getElementById("eighthMovBlack").innerText=listMovements[15+(Previousindex*2)];
  document.getElementById("ninthMovWhite").innerText=listMovements[16+(Previousindex*2)];
  document.getElementById("ninthMovBlack").innerText=listMovements[17+(Previousindex*2)];
  document.getElementById("tenthMovWhite").innerText=listMovements[18+(Previousindex*2)];
  document.getElementById("tenthMovBlack").innerText=listMovements[19+(Previousindex*2)];

  document.getElementById("firstMovNumWhite").innerText=1+Previousindex;
  document.getElementById("firstMovNumBlack").innerText=1+Previousindex;
  document.getElementById("secondMovNumWhite").innerText=2+Previousindex;
  document.getElementById("secondMovNumBlack").innerText=2+Previousindex;
  document.getElementById("thirdMovNumWhite").innerText=3+Previousindex;
  document.getElementById("thirdMovNumBlack").innerText=3+Previousindex;
  document.getElementById("fourthMovNumWhite").innerText=4+Previousindex;
  document.getElementById("fourthMovNumBlack").innerText=4+Previousindex;
  document.getElementById("fifthMovNumWhite").innerText=5+Previousindex;
  document.getElementById("fifthMovNumBlack").innerText=5+Previousindex;
  document.getElementById("sixthMovNumWhite").innerText=6+Previousindex;
  document.getElementById("sixthMovNumBlack").innerText=6+Previousindex;
  document.getElementById("seventhMovNumWhite").innerText=7+Previousindex;
  document.getElementById("seventhMovNumBlack").innerText=7+Previousindex;
  document.getElementById("eighthMovNumWhite").innerText=8+Previousindex;
  document.getElementById("eighthMovNumBlack").innerText=8+Previousindex;
  document.getElementById("ninthMovNumWhite").innerText=9+Previousindex;
  document.getElementById("ninthMovNumBlack").innerText=9+Previousindex;
  document.getElementById("tenthMovNumWhite").innerText=10+Previousindex;
  document.getElementById("tenthMovNumBlack").innerText=10+Previousindex;
}

/** doOneMoveForward() => void 
 *  @description: This function is triggered by a button below chess board. It used to fill the table with the next movement values
 *  @returns: None
 *  @param: None
 */
function doOneMoveForward(){
  if(step==movValues.length-1){
    //Does nothing
  }else{
    for(var j=0;j<32;j++){
      if(filled<10){
        var numOMF=filled+1;
        document.getElementById(namePieces[j]+numOMF).innerText=movValues[step+1][j][5];
        document.getElementById(namePieces[j]+numOMF).style.backgroundColor=colorsTab[step+1][j];
        document.getElementById("WhiteOverall"+numOMF).innerText=movValues[step+1][32][0];
        document.getElementById("BlackOverall"+numOMF).innerText=movValues[step+1][32][1];
        document.getElementById("Ecosystem"+numOMF).innerText=movValues[step+1][32][2];
      }else{
        for(var i=0;i<10;i++){
          var numOMF2=i+1;
          document.getElementById(namePieces[j]+numOMF2).innerText=movValues[step-8+i][j][5];
          document.getElementById(namePieces[j]+numOMF2).style.backgroundColor=colorsTab[step-8+i][j];
          document.getElementById("WhiteOverall"+numOMF2).innerText=movValues[step-8+i][32][0];
          document.getElementById("BlackOverall"+numOMF2).innerText=movValues[step-8+i][32][1];
          document.getElementById("Ecosystem"+numOMF2).innerText=movValues[step-8+i][32][2];
        }
      }
      checkTab(step+1);
      checkVisibility(step+1);
    }
    document.getElementById("ActualMovement").innerText=listMovements[step];
    document.getElementById("ActualMovementNum").innerText="Mov: "+Math.round((step+1)/2)+ " Side: " + type;
    if(type=="White"){
      type="Black";
    }else{
      type="White";
    }
    filled++;
    step++;
  }
}

/** doOneMoveBackward() => void 
 *  @description: This function is triggered by a button below chess board. It used to fill the table with the previous movement values
 *  @returns: None
 *  @param: None
 */
function doOneMoveBackward(){
  if(step==0){
    //Does nothing
  }else{
    for(var j=0;j<32;j++){
      if(filled<10){
        var numOMF=filled;
        document.getElementById(namePieces[j]+numOMF).innerText="----";
        document.getElementById(namePieces[j]+numOMF).style.backgroundColor="White";
        document.getElementById("WhiteOverall"+numOMF).innerText="----";
        document.getElementById("BlackOverall"+numOMF).innerText="----";
        document.getElementById("Ecosystem"+numOMF).innerText="----";
      }else if(filled==10){
        document.getElementById(namePieces[j]+10).innerText="----";
        document.getElementById(namePieces[j]+10).style.backgroundColor="White"
        document.getElementById("WhiteOverall"+10).innerText="----";
        document.getElementById("BlackOverall"+10).innerText="----";
        document.getElementById("Ecosystem"+10).innerText="----";
      }else{
        for(var i=0;i<10;i++){
          var numOMF2=i+1;
          document.getElementById(namePieces[j]+numOMF2).innerText=movValues[step-10+i][j][5];
          document.getElementById("WhiteOverall"+numOMF2).innerText=movValues[step-10+i][32][0];
          document.getElementById(namePieces[j]+numOMF2).style.backgroundColor=colorsTab[step-10+i][j];
          document.getElementById("BlackOverall"+numOMF2).innerText=movValues[step-10+i][32][1];
          document.getElementById("Ecosystem"+numOMF2).innerText=movValues[step-10+i][32][2];
        }
      }
      checkTab(step-1);
      checkVisibility(step-1);
    }
    document.getElementById("ActualMovementNum").innerText="Mov: "+Math.trunc((step)/2)+ " Side: " + type;
    if(listMovements[step-2]==undefined){
      document.getElementById("ActualMovement").innerText="Initial State";
      type="Black";
      document.getElementById("ActualMovementNum").innerText="Mov: 0 Side: " + type;
    }else{
      document.getElementById("ActualMovement").innerText=listMovements[step-2];
    }
    if(type=="White"){
      type="Black";
    }else{
      type="White";
    }
    filled--;
    step--;
  }
}

/** doFirstMove() => void 
 *  @description: This function is triggered by a button below chess board. It used to fill the table with the first movement values
 *  @returns: None
 *  @param: None
 */
function doFirstMove(){
  if(step==0){
    //Does nothing
  }else{
    filled=1;
    step=0;
    setfirstvalues();
    checkTab(0);
    checkVisibility(0);
    type="Black";
    document.getElementById("ActualMovementNum").innerText="Mov: 0  Side: " + type;
    document.getElementById("ActualMovement").innerText="Initial State";
    type="White";
  }
}

/** doLastMove() => void 
 *  @description: This function is triggered by a button below chess board. It used to fill the table with the last movement values
 *  @returns: None
 *  @param: None
 */
function doLastMove(){
  if(step==movValues.length-1){
    //Does nothing
  }else{
    step=movValues.length-1;
    for(var j=0;j<32;j++){
      for(var i=0;i<10;i++){
        var numOMF2=i+1;
        document.getElementById(namePieces[j]+numOMF2).innerText=movValues[step-9+i][j][5];
        document.getElementById(namePieces[j]+numOMF2).style.backgroundColor=colorsTab[step-9+i][j];
        document.getElementById("WhiteOverall"+numOMF2).innerText=movValues[step-9+i][32][0];
        document.getElementById("BlackOverall"+numOMF2).innerText=movValues[step-9+i][32][1];
        document.getElementById("Ecosystem"+numOMF2).innerText=movValues[step-9+i][32][2];
      }
    }
    checkTab(step);
    checkVisibility(step); 
  }
  filled=movValues.length;
  document.getElementById("ActualMovement").innerText=listMovements[step-1];
  if((step-1)%2==0){
    type="White";
    document.getElementById("ActualMovementNum").innerText="Mov: "+Math.trunc((step+1)/2)+ " Side: " + type;
  }else{
    type="Black";
    document.getElementById("ActualMovementNum").innerText="Mov: "+Math.trunc((step)/2)+ " Side: " + type;
  }
  if(type=="White"){
    type="Black";
  }else{
    type="White";
  }
}

/** setfirstvalues() => void 
 *  @description: This function place the first values of each actor in the table
 *  @returns: None
 *  @param: None
 */
function setfirstvalues(){
  for(var j=0;j<32;j++){
    document.getElementById(namePieces[j]+"1").innerText=movValues[0][j][5];
    document.getElementById(namePieces[j]+"1").style.backgroundColor=colorsTab[0][j];
    console.log(colorsTab[0][j]);
    document.getElementById(shNamePieces[j]).style.marginLeft=movTab[0][j].charAt(0)+movTab[0][j].charAt(1)+movTab[0][j].charAt(2)+"px";
    document.getElementById(shNamePieces[j]).style.marginTop=movTab[0][j].charAt(3)+movTab[0][j].charAt(4)+movTab[0][j].charAt(5)+"px";
  }
  document.getElementById("WhiteOverall1").innerText=movValues[0][32][0];
  document.getElementById("BlackOverall1").innerText=movValues[0][32][1];
  document.getElementById("Ecosystem1").innerText=movValues[0][32][2];
  for(var j=0;j<32;j++){
    for(var i=2;i<11;i++){
      document.getElementById(namePieces[j]+i).innerText="----";
      document.getElementById(namePieces[j]+i).style.backgroundColor="White";
      document.getElementById("WhiteOverall"+i).innerText="----";
      document.getElementById("BlackOverall"+i).innerText="----";
      document.getElementById("Ecosystem"+i).innerText="----";
    }
  }
}

/** initializeMovements() => void 
 *  @description: This function inicialize the positions of each piece
 *  @returns: None
 *  @param: None
 */
function initializeMovements(){
  positions=[];
  stateP=[];

  // White team
  positions[0]="A2";
  positions[1]="B2";
  positions[2]="C2";
  positions[3]="D2";
  positions[4]="E2";
  positions[5]="F2";
  positions[6]="G2";
  positions[7]="H2";
  positions[8]="A1";
  positions[9]="B1";
  positions[10]="C1";
  positions[11]="D1";
  positions[12]="E1";
  positions[13]="F1";
  positions[14]="G1";
  positions[15]="H1";

  stateP[0]="A";
  stateP[1]="A";
  stateP[2]="A";
  stateP[3]="A";
  stateP[4]="A";
  stateP[5]="A";
  stateP[6]="A";
  stateP[7]="A";
  stateP[8]="A";
  stateP[9]="A";
  stateP[10]="A";
  stateP[11]="A";
  stateP[12]="A";
  stateP[13]="A";
  stateP[14]="A";
  stateP[15]="A";

  // Black team
  positions[16]="A7";
  positions[17]="B7";
  positions[18]="C7";
  positions[19]="D7";
  positions[20]="E7";
  positions[21]="F7";
  positions[22]="G7";
  positions[23]="H7";
  positions[24]="A8";
  positions[25]="B8";
  positions[26]="C8";
  positions[27]="D8";
  positions[28]="E8";
  positions[29]="F8";
  positions[30]="G8";
  positions[31]="H8";

  stateP[16]="A";
  stateP[17]="A";
  stateP[18]="A";
  stateP[19]="A";
  stateP[20]="A";
  stateP[21]="A";
  stateP[22]="A";
  stateP[23]="A";
  stateP[24]="A";
  stateP[25]="A";
  stateP[26]="A";
  stateP[27]="A";
  stateP[28]="A";
  stateP[29]="A";
  stateP[30]="A";
  stateP[31]="A";

  movPositions[actualMovement]=positions;
  calculateMovTab(positions);
  movTab[actualMovement]=mov;
  numPieces[0]=[16,16];
  stateOfPieces[0]=stateP;
}

/** calculateMovementsValues() => void 
 *  @description: This function fill a map with the values of the pieces, teams and enviroment in each movement
 *  @returns: None
 *  @param: None
 */
function calculateMovementsValues(){
  for(var j=0;j<listMovements.length;j++){
    calculatePositions(listMovements[j]);
  }
  actualMovement=0;
  for(var yo=0;yo<movPositions.length;yo++){
    movValues[yo]=calculateValues(movPositions[yo]);
    calculateValuesActors(movValues[yo]);
    calculateValuesGroups(movValues[yo]);
    actualMovement++;
  }
  colorsTab[0]=calculateColorTabIni(movValues[0]);
  for(var yo=1;yo<movPositions.length;yo++){
    colorsTab[yo]=calculateColorTab(movValues[yo],movValues[yo-1]);
  }
}

/** calculatePositions(move: String) => void 
 *  @description: This function fill a map with the positions of the pieces in each movement
 *  @returns: None
 *  @param: move: String
 */
function calculatePositions(move){
  positions=new Array(32);
  numP=new Array(2);
  stateP=new Array(32);
  mov=new Array(32);
  for(var yu=0;yu<32;yu++){
    positions[yu]=movPositions[actualMovement][yu];
  }
  for(var yu=0;yu<32;yu++){
    stateP[yu]=stateOfPieces[actualMovement][yu];
  }
  numP[0]=numPieces[actualMovement][0];
  numP[1]=numPieces[actualMovement][1];
  var movLen=move.length;
  var ch;
  //console.warn("Longuitud del movimiento "+movLen);
  //console.warn("Numero de movimiento "+actualMovement);
  //console.warn("Movimiento "+move);
  switch(movLen){
    case 1:
      // Not possible
      break; 
    case 2:
      // Only pawn movement
      var n=parseInt(move.charAt(1));
      if(side=="W") {
        n=n-1;
      }else{
        n=n+1;
      }
      if(positions[findPosPiece(side+"P"+move.charAt(0).toUpperCase())]=="-"){
        positions[findPosPiece(searchPiece(move.charAt(0).toUpperCase()+n))]=move.charAt(0).toUpperCase()+move.charAt(1);
      }else{
        if(searchPiece(move.charAt(0).toUpperCase()+n)==""){
          positions[findPosPiece(side+"P"+move.charAt(0).toUpperCase())]=move.charAt(0).toUpperCase()+move.charAt(1);
        }else{
          positions[findPosPiece(searchPiece(move.charAt(0).toUpperCase()+n))]=move.charAt(0).toUpperCase()+move.charAt(1);
        }
      }
      break;
    case 3:
      // Can be piece movement - pawn movement and check - Castling Kingside
      if(move.charAt(0)=="O"){
        // Castling Kingside
        if(side=="W"){
          // WHiTE SIDE
          ch=calculeLetter("E",2);
          ch=ch + "1";
          positions[findPosPiece("WK")]=ch;

          ch=calculeLetter("H",-2);
          ch=ch + "1";
          positions[findPosPiece("WRH")]=ch;
        }else{
          // BLACK SIDE
          ch=calculeLetter("E",2);
          ch=ch + "8";
          positions[findPosPiece("BK")]=ch;

          ch=calculeLetter("H",-2);
          ch=ch + "8";
          positions[findPosPiece("BRH")]=ch;
        }
      }else if(move.charAt(2)=="+" || move.charAt(3)=="#"){
        // Pawn movement and check
        var n=parseInt(move.charAt(1));
        if(side=="W") {
          n=n-1;
        }else{
          n=n+1;
        }
        if(positions[findPosPiece(side+"P"+move.charAt(0).toUpperCase())]=="-"){
          positions[findPosPiece(searchPiece(move.charAt(0).toUpperCase()+n))]=move.charAt(0).toUpperCase()+move.charAt(1);
        }else{
          if(searchPiece(move.charAt(0).toUpperCase()+n)==""){
            positions[findPosPiece(side+"P"+move.charAt(0).toUpperCase())]=move.charAt(0).toUpperCase()+move.charAt(1);
          }else{
            positions[findPosPiece(searchPiece(move.charAt(0).toUpperCase()+n))]=move.charAt(0).toUpperCase()+move.charAt(1);
          }
        }
        // Trait check
      }else{
        // Piece movement
        if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
          evalPiece(move.charAt(0),move);
          positions[findPosPiece(side+move.charAt(0).toUpperCase())]=move.charAt(1).toUpperCase()+move.charAt(2);
        }else{
          var difPie=evalPiece(move.charAt(0),move.charAt(1)+move.charAt(2));
          positions[findPosPiece(side+move.charAt(0).toUpperCase()+difPie)]=move.charAt(1).toUpperCase()+move.charAt(2);
        }
      }
      break; 
    case 4:
      // Can be pawn capture - piece capture - Piece movement with differentiation - Piece movement and check - Pawn Promotion - Castling Kingside and check
      if(move.charAt(0)=="O"){
        // Castling Kingside and check
        if(side=="W"){
          // WHiTE SIDE
          ch=calculeLetter("E",2);
          ch=ch + "1";
          positions[findPosPiece("WK")]=ch;

          ch=calculeLetter("H",-2);
          ch=ch + "1";
          positions[findPosPiece("WRH")]=ch;
        }else{
          // BLACK SIDE
          ch=calculeLetter("E",2);
          ch=ch + "8";
          positions[findPosPiece("BK")]=ch;

          ch=calculeLetter("H",-2);
          ch=ch + "8";
          positions[findPosPiece("BRH")]=ch;
        }
        // Trait check
      }else if(move.charAt(2)=="="){
        // Pawn promotion
        var n = parseInt(move.charAt(1));
        if(side=="W") {
          n=n-1;
        }else{
          n=n+1;
        }
        positions[findPosPiece(searchPiece(move.charAt(0).toUpperCase()+n))]=move.charAt(0).toUpperCase()+move.charAt(1);
        // Trait promotion
        stateP[findPosPiece(side+"P"+move.charAt(0).toUpperCase())]="P"+move.charAt(3);
        //document.getElementById(searchPiece(move.charAt(0).toUpperCase()+n)).src="img/WQ.png";
      }else if(move.charAt(3)=="+" || move.charAt(3)=="#"){
        // Piece movement and check
        // Piece movement
        if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
          evalPiece(move.charAt(0),move);
          positions[findPosPiece(side+move.charAt(0).toUpperCase())]=move.charAt(1).toUpperCase()+move.charAt(2);
        }else{
          var difPie = evalPiece(move.charAt(0),move.charAt(1)+move.charAt(2));
          positions[findPosPiece(side+move.charAt(0).toUpperCase()+difPie)]=move.charAt(1).toUpperCase()+move.charAt(2);
        }
        // Trait check       
      }else if(move.charAt(1)=="x"){
        // Can be Pawn capture or Piece capture
        var l=move.charAt(0);
        if(l === l.toLowerCase()){
          var state=[];
          if(side=="W"){
            var sta=parseInt(move.charAt(3))-1;
            state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
            state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
          }else{
            var sta=parseInt(move.charAt(3))+1;
            state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
            state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
          }
          var pawn=searchPawn(state,side);
          var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
          positions[findPosPiece(pieceCapture)]="-";
          stateP[findPosPiece(pieceCapture)]="D";
          if(side=="W"){
            numP[1]--;
          }else{
            numP[0]--;
          }
          positions[findPosPiece(pawn)]=move.charAt(2).toUpperCase() + move.charAt(3);
        }else{
          if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
            evalPiece(move.charAt(0),move.charAt(2).toUpperCase()+move.charAt(3));
            var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
            positions[findPosPiece(pieceCapture)]="-";
            stateP[findPosPiece(pieceCapture)]="D";
            if(side=="W"){
              numP[1]--;
            }else{
              numP[0]--;
            }
            positions[findPosPiece(side+move.charAt(0))]=move.charAt(2).toUpperCase()+move.charAt(3);
          }else{
            differPieces(move.charAt(0));
            var difPie=evalPiece(move.charAt(0),move.charAt(2).toUpperCase()+move.charAt(3));
            var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
            positions[findPosPiece(pieceCapture)]="-";
            stateP[findPosPiece(pieceCapture)]="D";
            if(side=="W"){
              numP[1]--;
            }else{
              numP[0]--;
            }
            positions[findPosPiece(side+move.charAt(0)+difPie)]=move.charAt(2).toUpperCase()+move.charAt(3);
          }
        }
      }else{
        // Piece movement with differentation
        if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
          evalPiece(move.charAt(0),move);
          positions[findPosPiece(side+move.charAt(0))]=move.charAt(1).toUpperCase()+move.charAt(2).toUpperCase();
        }else{
          positions[findPosPiece(searchPieceDiff(move.charAt(1).toUpperCase(),move.charAt(0)))]=move.charAt(2).toUpperCase()+move.charAt(3);
        }
      }
      break;
    case 5:
      // Can be piece movement with differentiation and check - piece capture and check - pawn capture and check - Pawn promotion and check - Castling Queenside - Piece capture with differentation
      if(move.charAt(0)=="O"){
        // Castling Queenside
        if(side=="W"){
          // WHiTE SIDE
          ch=calculeLetter("E",-2);
          ch=ch + "1";
          positions[findPosPiece("WK")]=ch;
      
          ch=calculeLetter("A",3);
          ch=ch + "1";
          positions[findPosPiece("WRA")]=ch;
        }else{
          // BLACK SIDE
          ch=calculeLetter("E",-2);
          ch=ch + "8";
          positions[findPosPiece("BK")]=ch;
      
          ch=calculeLetter("A",3);
          ch=ch + "8";
          positions[findPosPiece("BRA")]=ch;
        }
      }else if(move.charAt(2)=="="){
        // Pawn promotion
        positions[findPosPiece(side+"P"+move.charAt(0))]=move.charAt(0)+move.charAt(1);
        // Trait promotion
        stateP[findPosPiece(side+"P"+move.charAt(0))]="P"+move.charAt(3);
        // Trait check
      }else if(move.charAt(1)=="x"){
        // Can be Pawn capture and check or Piece capture and check
        var l=move.charAt(0);
        if(l === l.toLowerCase()){
          var state=[];
          if(side=="W"){
            var sta=parseInt(move.charAt(3))-1;
            state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
            state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
          }else{
            var sta=parseInt(move.charAt(3))+1;
            state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
            state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
          }
          var pawn=searchPawn(state,side);
          var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
          positions[findPosPiece(pieceCapture)]="-";
          stateP[findPosPiece(pieceCapture)]="D";
          if(side=="W"){
            numP[1]--;
          }else{
            numP[0]--;
          }
          positions[findPosPiece(pawn)]=move.charAt(2).toUpperCase() + move.charAt(3);
          //Trait Check 
        }else{
          if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
            evalPiece(move.charAt(0),move.charAt(2).toUpperCase()+move.charAt(3));
            var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
            positions[findPosPiece(pieceCapture)]="-";
            stateP[findPosPiece(pieceCapture)]="D";
            if(side=="W"){
              numP[1]--;
            }else{
              numP[0]--;
            }
            positions[findPosPiece(side+move.charAt(0))]=move.charAt(2).toUpperCase()+move.charAt(3);
            //Trait Check   
          }else{    
            differPieces(move.charAt(0));
            var difPie=evalPiece(move.charAt(0),move.charAt(2).toUpperCase()+move.charAt(3));
            var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
            positions[findPosPiece(pieceCapture)]="-";
            stateP[findPosPiece(pieceCapture)]="D";
            if(side=="W"){
              numP[1]--;
            }else{
              numP[0]--;
            }
            positions[findPosPiece(side+move.charAt(0)+difPie)]=move.charAt(2).toUpperCase()+move.charAt(3);
            //Trait Check
          }
        }
      }else if(move.charAt(2)=="x"){
        // Piece capture with differentiation
        if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
          evalPiece(move.charAt(0),move.charAt(2).toUpperCase()+move.charAt(3));
          var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
          positions[findPosPiece(pieceCapture)]="-";
          stateP[findPosPiece(pieceCapture)]="D";
          if(side=="W"){
            numP[1]--;
          }else{
            numP[0]--;
          }
          positions[findPosPiece(side+move.charAt(0))]=move.charAt(2).toUpperCase()+move.charAt(3);
        }else{
          var pieceCapture=searchPiece(move.charAt(3).toUpperCase()+move.charAt(4));
          positions[findPosPiece(pieceCapture)]="-";
          stateP[findPosPiece(pieceCapture)]="D";
          if(side=="W"){
            numP[1]--;
          }else{
            numP[0]--;
          }
          positions[findPosPiece(searchPieceDiff(move.charAt(1).toUpperCase(),move.charAt(0)))]=move.charAt(3).toUpperCase()+move.charAt(4);
        }
      }else{
        // Piece movement with differentiation and check
        // Piece movement
        if(move.charAt(0)=="K" || move.charAt(0)=="Q"){
          evalPiece(move.charAt(0),move);
          positions[findPosPiece(side+move.charAt(0))]=move.charAt(1).toUpperCase()+move.charAt(2);       
        }else{
          positions[findPosPiece(side+move.charAt(0)+move.charAt(1))]=move.charAt(2).toUpperCase()+move.charAt(3);       
        }
        // Trait check
      }
      break;  
    case 6:
      // Can be pawn capture and promotion - Castling Queenside and check
      if(move.charAt(0)=="O"){
        // Castling Queenside and check
        if(side=="W"){
          // WHiTE SIDE
          ch=calculeLetter("E",-2);
          ch=ch + "1";
          positions[findPosPiece("WK")]=ch;

          ch=calculeLetter("A",3);
          ch=ch + "1";
          positions[findPosPiece("WRA")]=ch;
        }else{
          // BLACK SIDE
          ch=calculeLetter("E",-2);
          ch=ch + "8";
          positions[findPosPiece("BK")]=ch;
      
          ch=calculeLetter("A",3);
          ch=ch + "8";
          positions[findPosPiece("BRA")]=ch;
        }
        // Trait check 
      }else{
        // Pawn capture and promotion
        var state=[];
        if(side=="W"){
          var sta=parseInt(move.charAt(3))-1;
          state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
          state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
        }else{
          var sta=parseInt(move.charAt(3))+1;
          state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
          state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
        }
        var pawn=searchPawn(state,side);
        var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
        positions[findPosPiece(pieceCapture)]="-";
        stateP[findPosPiece(pieceCapture)]="D";
        if(side=="W"){
          numP[1]--;
        }else{
          numP[0]--;
        }
        positions[findPosPiece(pawn)]=move.charAt(2).toUpperCase() + move.charAt(3);
        // Trait promotion
        stateP[findPosPiece(pawn)]="P"+move.charAt(5);
      }
      break;
    case 7:
      // Can be pawn capture, promotion and check -
      console.log("Case 7");
      var state=[];
      if(side=="W"){
        var sta=parseInt(move.charAt(3))-1;
        state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
        state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
      }else{
        var sta=parseInt(move.charAt(3))+1;
        state[0]=calculeLetter(move.charAt(2).toUpperCase(),-1) + sta;
        state[1]=calculeLetter(move.charAt(2).toUpperCase(),1) + sta;
      }
      var pawn=searchPawn(state,side);
      var pieceCapture=searchPiece(move.charAt(2).toUpperCase()+move.charAt(3));
      positions[findPosPiece(pieceCapture)]="-";
      stateP[findPosPiece(pieceCapture)]="D";
      if(side=="W"){
        numP[1]--;
      }else{
        numP[0]--;
      }
      positions[findPosPiece(pawn)]=move.charAt(2).toUpperCase() + move.charAt(3);
      // Trait promotion
      stateP[findPosPiece(pawn)]="P"+move.charAt(5);
      //Trait check
      break;
    default:
      //Not possible
      break;
  }
  changeSide();
  movPositions[++actualMovement]=positions;
  stateOfPieces[actualMovement]=stateP;
  numPieces[actualMovement]=numP;
  calculateMovTab(positions);
  movTab[actualMovement]=mov;
}

/** calculateValues(list: int[]) => void 
 *  @description: This function calculate the values of each actor at any given time.
 *  @returns: None
 *  @param: list: int[]
 */
function calculateValues(list){
  values=new Array(32);
  values=incialiceValues();
  site="W";
  for(var au=0;au<32;au++){
    if(au==16){
      site="B";
    } 
    pieceMovement(findPiece(au).charAt(1),list[au]);
    for(var j=0;j<possibleMovements.length;j++){
      if(havepiece(possibleMovements[j])){
        var pie = findPiece(referPiece);
        //Same team
        if(pie.charAt(0)==findPiece(au).charAt(0)){
          //Defense-In
          values[referPiece][0]++;
          values[referPiece][4]++;
          //Defense-Out
          values[au][2]++;
          values[au][4]++;
        }else{
          // Different team
          //Atack-In
          values[referPiece][1]++;
          values[referPiece][4]++;
          //Atack-Out
          values[au][3]++;
          values[au][4]++;
        }
      }
    }
  }
  return values;
}

/** calculateValuesActors(lista: int[][]) => void 
 *  @description: This function calculate the values of each actor
 *  @returns: None
 *  @param: lista: int[][]
 */
function calculateValuesActors(lista){
  for(var i=0;i<32;i++){
    if(stateOfPieces[actualMovement][i]=="D"){
      lista[i][5]= "D";
    }else{
      if(lista[i][4]==0){
        lista[i][5]=0.00.toFixed(2);
      }else{
        lista[i][5]=((lista[i][0]-lista[i][1])/lista[i][4]).toFixed(2);
      }
    }
  }
}

/** calculateValuesGroups(lista: int[][]) => void 
 *  @description: This function calculate the group values
 *  @returns: None
 *  @param: lista: int[][]
 */
function calculateValuesGroups(lista){
  var sum=0;
  var sumtot=0
  var numWhite=numPieces[actualMovement][0];
  var numBlack=numPieces[actualMovement][1];
  var numAll=numPieces[actualMovement][1]+numPieces[actualMovement][0];
  for(var i=0;i<16;i++){
    if(lista[i][5]=="D"){
      sum=sum+0.00;
    }else{
      sum=sum+Number.parseFloat(lista[i][5]);
    }
  }
  lista[32][0]=(sum/(numWhite*(numWhite-1))).toFixed(2);
  sumtot=sum;
  sum=0;
  for(var i=16;i<32;i++){
    if(lista[i][5]=="D"){
      sum=sum+0.00;
    }else{
      sum=sum+Number.parseFloat(lista[i][5]);
    }
  }
  lista[32][1]=(sum/(numBlack*(numBlack-1))).toFixed(2);
  sumtot=sumtot+sum;
  lista[32][2]=(sumtot/(numAll*(numAll-1))).toFixed(2);
}

/** incialiceValues() => values: int[]
 *  @description: This function inicialize the matrix with the values
 *  @returns: values: int[]
 *  @param: None
 */
function incialiceValues(){
  var values=[];
  for(var i=0;i<32;i++){
    // 1: Defense-In 2:Atack-In 3: Defense-Out 4: Atack-Out 5: Relationships 6: Actor balance
    values[i]=[0,0,0,0,0,0];
  }
  values[32]=[0,0,0];
  return values;
}

/** calculeLetter(str: String, i: number) => str: String
 *  @description: This function calculates the new letter. If the letter goes beyond the index it will be filled with a value indicating that it went outside the borders.
 *  @returns: str: String
 *  @param: str: String, i: number
 */
function calculeLetter(str,i){
  var boo=true;
  str=str.toUpperCase();
  if(!(str=="-")){
    for(var j=0;j<letters.length && boo;j++){
      if(str==letters[j]){
        if((j+i)>=letters.length || (j+i)<0){
          str="OutBound";
        }else{
          str=letters[j+i];
        }
        boo=false;
      }
    }
  }else{
    str="OutBound";
  }
  return str;
}

/** inicializeStates() => void 
 *  @description: This function inicialize the states in the beggining of the game
 *  @returns: None
 *  @param: None
 */
function  inicializeStates(){
  // White team
  stateOfPieces.set("WPA", "A");
  stateOfPieces.set("WPB", "A");
  stateOfPieces.set("WPC", "A");
  stateOfPieces.set("WPD", "A");
  stateOfPieces.set("WPE", "A");
  stateOfPieces.set("WPF", "A");
  stateOfPieces.set("WPG", "A");
  stateOfPieces.set("WPH", "A");
  stateOfPieces.set("WRA", "A");
  stateOfPieces.set("WNB", "A");
  stateOfPieces.set("WBC", "A");
  stateOfPieces.set("WQ", "A");
  stateOfPieces.set("WK", "A");
  stateOfPieces.set("WBF", "A");
  stateOfPieces.set("WNG", "A");
  stateOfPieces.set("WRH", "A");

  // Black team
  stateOfPieces.set("BPA", "A");
  stateOfPieces.set("BPB", "A");
  stateOfPieces.set("BPC", "A");
  stateOfPieces.set("BPD", "A");
  stateOfPieces.set("BPE", "A");
  stateOfPieces.set("BPF", "A");
  stateOfPieces.set("BPG", "A");
  stateOfPieces.set("BPH", "A");
  stateOfPieces.set("BRA", "A");
  stateOfPieces.set("BNB", "A");
  stateOfPieces.set("BBC", "A");
  stateOfPieces.set("BQ", "A");
  stateOfPieces.set("BK", "A");
  stateOfPieces.set("BBF", "A");
  stateOfPieces.set("BNG", "A");
  stateOfPieces.set("BRH", "A");
}

/** changeSide() => void 
 *  @description: This function change the team
 *  @returns: None
 *  @param: None
 */
function changeSide(){
  if(side=="W"){
    side="B";
  }else{
    side="W";
  }
}

/** differPieces(type: String) => void 
 *  @description: This function fill a string with the possible pieces.
 *  @returns: None
 *  @param: type: String
 */
function differPieces(type){
  switch(type){
    case "N":
      differ="B G";
      break;
    case "R":
      differ="A H";
      break;
    case "B":
      differ="C F"; 
      break;
  }
}

/** evalPiece(type: String, state: String) => x: String
 *  @description: This function evaluate what piece has to move and what moves can do
 *  @returns: x: String
 *  @param: type: String, state: String
 */
function evalPiece(type,move){
  var x="";
  var mov=move.charAt(0).toUpperCase()+move.charAt(1);
  if (type=="Q" || type=="K"){
    pieceMovement(positions[findPosPiece(side+type)],mov);
  }else{
    differPieces(type);
    var valDif1=positions[findPosPiece(side+type+differ.charAt(0))];
    pieceMovement(type,valDif1);
    var end=false;
    for(var j=0; j<possibleMovements.length && !end;j++){
      if(mov==possibleMovements[j]){
        end=true;
        x=differ.charAt(0);
      }
    }
    if(!end){
      var valDif2 = positions[findPosPiece(side+type+differ.charAt(2))];
      pieceMovement(type,valDif2);
      x=differ.charAt(2);
    }
  }
  return x;
}

/** pieceMovement(type: String, state: String) => void 
 *  @description: This function give the possible movement of the specified piece in a specified location
 *  @returns: None
 *  @param: type: String, state: String
 */
function pieceMovement(type,state){
  possibleMovements=[];
  var letter=state.charAt(0);
  var num=parseInt(state.charAt(1));
  var numNew;
  var newState;
  var pieceUp=false;
  var pieceDown=false;
  var pieceRigth=false;
  var pieceLeft=false;
  var pieceUpRigth=false;
  var pieceUpLeft=false;
  var pieceDownRigth=false;
  var pieceDownLeft=false;
  switch(type){
    case "N":
      numNew=num + 1;
      newState=calculeLetter(letter,2) + numNew;
      if(!verifyOutbounds(numNew, letter,2)){
        possibleMovements.push(newState);
      }
      numNew=num - 1;
      newState=calculeLetter(letter,2) + numNew;
      if(!verifyOutbounds(numNew, letter,2)){
        possibleMovements.push(newState);
      }
      numNew=num + 1;
      newState=calculeLetter(letter,-2) + numNew;
      if(!verifyOutbounds(numNew, letter,-2)){
        possibleMovements.push(newState);
      }
      numNew=num - 1;
      newState=calculeLetter(letter,-2) + numNew;
      if(!verifyOutbounds(numNew, letter,-2)){
        possibleMovements.push(newState);
      }
      numNew=num + 2;
      newState=calculeLetter(letter,1) + numNew;
      if(!verifyOutbounds(numNew, letter,1)){
        possibleMovements.push(newState);
      }
      numNew=num - 2;
      newState=calculeLetter(letter,1) + numNew;
      if(!verifyOutbounds(numNew, letter,1)){
        possibleMovements.push(newState);
      }
      numNew=num + 2;
      newState=calculeLetter(letter,-1) + numNew;
      if(!verifyOutbounds(numNew, letter,-1)){
        possibleMovements.push(newState);
      }
      numNew=num - 2;
      newState=calculeLetter(letter,-1) + numNew;
      if(!verifyOutbounds(numNew, letter,-1)){
        possibleMovements.push(newState);
      }
      break;
    case "R":
      var ind=1;
      while(ind<8){
        numNew=num;
        newState=calculeLetter(letter,ind) + numNew;
        if(!verifyOutbounds(numNew, letter,ind)){
          if(!pieceRigth){
            if(havepiece(newState)){
              pieceRigth=true;
            }
          possibleMovements.push(newState);
          }
        }
        numNew=num;
        newState=calculeLetter(letter,-ind) + numNew;
        if(!verifyOutbounds(numNew, letter,-ind)){
          if(!pieceLeft){
            if(havepiece(newState)){
              pieceLeft=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num + ind;
        newState=calculeLetter(letter,0) + numNew;
        if(!verifyOutbounds(numNew, letter,0)){
          if(!pieceUp){
            if(havepiece(newState)){
              pieceUp=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num - ind;
        newState=calculeLetter(letter,0) + numNew;
        if(!verifyOutbounds(numNew, letter,0)){
          if(!pieceDown){
            if(havepiece(newState)){
              pieceDown=true;
            }
            possibleMovements.push(newState);
          }
        }
        ind++;
      }
      break;
    case "B":
      var ind=1;
      while(ind<8){
        numNew=num + ind;
        newState=calculeLetter(letter,ind) + numNew;
        if(!verifyOutbounds(numNew, letter,ind)){
          if(!pieceUpRigth){
            if(havepiece(newState)){
              pieceUpRigth=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num + ind;
        newState=calculeLetter(letter,-ind) + numNew;
        if(!verifyOutbounds(numNew, letter,-ind)){
          if(!pieceUpLeft){
            if(havepiece(newState)){
              pieceUpLeft=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num - ind;
        newState=calculeLetter(letter,ind) + numNew;
        if(!verifyOutbounds(numNew, letter,ind)){
          if(!pieceDownRigth){
            if(havepiece(newState)){
              pieceDownRigth=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num - ind;
        newState=calculeLetter(letter,-ind) + numNew;
        if(!verifyOutbounds(numNew, letter,-ind)){
          if(!pieceDownLeft){
            if(havepiece(newState)){
              pieceDownLeft=true;
            }
            possibleMovements.push(newState);
          }
        }
        ind++;
      }    
      break;
    case "Q":
      var ind=1;
      while(ind<8){
        numNew=num + ind;
        newState=calculeLetter(letter,ind) + numNew;
        if(!verifyOutbounds(numNew, letter,ind)){
          if(!pieceUpRigth){
            if(havepiece(newState)){
              pieceUpRigth=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num + ind;
        newState=calculeLetter(letter,-ind) + numNew;
        if(!verifyOutbounds(numNew, letter,-ind)){
          if(!pieceUpLeft){
            if(havepiece(newState)){
              pieceUpLeft=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num - ind;
        newState=calculeLetter(letter,ind) + numNew;
        if(!verifyOutbounds(numNew, letter,ind)){
          if(!pieceDownRigth){
            if(havepiece(newState)){
              pieceDownRigth=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num - ind;
        newState=calculeLetter(letter,-ind) + numNew;
        if(!verifyOutbounds(numNew, letter,-ind)){
          if(!pieceDownLeft){
            if(havepiece(newState)){
              pieceDownLeft=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num;
        newState=calculeLetter(letter,ind) + numNew;
        if(!verifyOutbounds(numNew, letter,ind)){
          if(!pieceRigth){
            if(havepiece(newState)){
              pieceRigth=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num;
        newState=calculeLetter(letter,-ind) + numNew;
        if(!verifyOutbounds(numNew, letter,-ind)){
          if(!pieceLeft){
            if(havepiece(newState)){
              pieceLeft=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num + ind;
        newState=calculeLetter(letter,0) + numNew;
        if(!verifyOutbounds(numNew, letter,0)){
          if(!pieceUp){
            if(havepiece(newState)){
              pieceUp=true;
            }
            possibleMovements.push(newState);
          }
        }
        numNew=num - ind;
        newState=calculeLetter(letter,0) + numNew;
        if(!verifyOutbounds(numNew, letter,0)){
          if(!pieceDown){
            if(havepiece(newState)){
              pieceDown=true;
            }
            possibleMovements.push(newState);
          }
        }
        ind++;
      }
      break;
    case "K":
      numNew=num + 1;
      newState=calculeLetter(letter,1) + numNew;
      if(!verifyOutbounds(numNew, letter,1)){
        possibleMovements.push(newState);
      }
      numNew=num + 1;
      newState=calculeLetter(letter,-1) + numNew;
      if(!verifyOutbounds(numNew, letter,-1)){
        possibleMovements.push(newState);
      }
      numNew=num - 1;
      newState=calculeLetter(letter,1) + numNew;
      if(!verifyOutbounds(numNew, letter,1)){
        possibleMovements.push(newState);
      }
      numNew=num - 1;
      newState=calculeLetter(letter,-1) + numNew;
      if(!verifyOutbounds(numNew, letter,-1)){
        possibleMovements.push(newState);
      }
      numNew=num;
      newState=calculeLetter(letter,1) + numNew;
      if(!verifyOutbounds(numNew, letter,1)){
        possibleMovements.push(newState);
      }
      numNew=num;
      newState=calculeLetter(letter,-1) + numNew;
      if(!verifyOutbounds(numNew, letter,-1)){
        possibleMovements.push(newState);
      }
      numNew=num + 1;
      newState=calculeLetter(letter,0) + numNew;
      if(!verifyOutbounds(numNew, letter,0)){
        possibleMovements.push(newState);
      }
      numNew=num - 1;
      newState=calculeLetter(letter,0) + numNew;
      if(!verifyOutbounds(numNew, letter,0)){
        possibleMovements.push(newState);
      }     
      break;
    case "P":
      if(site=="W"){
        numNew=num + 1;
        newState=calculeLetter(letter,1) + numNew;
        possibleMovements.push(newState);
        numNew=num + 1;
        newState=calculeLetter(letter,-1) + numNew;
        possibleMovements.push(newState);
      }else{
        numNew=num - 1;
        newState=calculeLetter(letter,1) + numNew;
        possibleMovements.push(newState);
        numNew=num - 1;
        newState=calculeLetter(letter,-1) + numNew;
        possibleMovements.push(newState);
      }
    break;
  }
}

/** verifyOutbounds(number: number, letter: String, num:number) => out: boolean
 *  @description: This function detect if the move goes outside the board
 *  @returns: out: boolean
 *  @param: number: number, letter: String, num:number
 */
function verifyOutbounds(number,letter,num){
  var out=false;
  if(number<=0 || number >8 || (calculeLetter(letter,num)=="OutBound")){
    out=true;
  }
  return out;
}

/** eliminateJumpingMovements(type: String) => listNoJumps: String[]
 *  @description: This function eliminates moves that go beyond allied or enemy pieces.
 *  @returns: listNoJumps: String[]
 *  @param: type: String
 */
function eliminateJumpingMovements(type){
  if(!type=="N"){
    var posJM;
    for(var j=0;j<possibleMovements.length;j++){
      posJM=possibleMovement[j];
    }
  }
}

/** havepiece(pos: String) => boo: boolean
 *  @description: This function look if the position
 *  @returns: boo: boolean
 *  @param: pos: String
 */
function havepiece(pos){
  var boo = false;
  var list = movPositions[actualMovement];
  for(var p=0;p<32;p++){
    if(list[p]==pos){
      referPiece=p;
      boo=true;
    }
  }
  return boo;
}

/** searchPawn(state: String) => found: String
 *  @description: This function search a pawn that is in a specific position
 *  @returns: found: String
 *  @param: state: String
 */
function searchPawn(state,side){
  var found="";
  var list=movPositions[actualMovement];
  console.log("stados: "+state[0]+" y " +state[1]+" lado "+ side);
  if(side=="W"){
    for(var po=0;po<8;po++){
      console.log(list[po]);
      if(list[po]==state[0] || list[po]==state[1]){
        found=findPiece(po);
      }
    }
  }else{
    for(var po=16;po<24;po++){
      if(list[po]==state[0] || list[po]==state[1]){
        found=findPiece(po);
      }
    }
  }
  console.log("Encontro "+found);
  return found;
}

/** searchPiece(state: String) => oldPos: String
 *  @description: This function search a piece that is in a specific position
 *  @returns: oldPos: String
 *  @param: state: String
 */
function searchPiece(state){
  var oldPos="";
  var list=movPositions[actualMovement];
  for(var po=0;po<32;po++){
    if(list[po]==state){
      oldPos=findPiece(po);
    }
  }
  return oldPos;
}

/** findPiece(pos: number) => posFind: String
 *  @description: This function return the name associated to the position of the actor
 *  @returns: posFind: String
 *  @param: pos: number
 */
function findPiece(pos){
  var posFind;
  switch(pos){
    case 0: 
      posFind="WPA";
      break;
    case 1: 
      posFind="WPB";
      break;
    case 2: 
      posFind="WPC";
      break;
    case 3: 
      posFind="WPD";
      break;
    case 4: 
      posFind="WPE";
      break;
    case 5: 
      posFind="WPF";
      break;
    case 6: 
      posFind="WPG";
      break;
    case 7: 
      posFind="WPH";
      break;
    case 8: 
      posFind="WRA";
      break;
    case 9: 
      posFind="WNB";
      break;
    case 10: 
      posFind="WBC";
      break;
    case 11: 
      posFind="WQ";
      break;
    case 12: 
      posFind="WK";
      break;
    case 13: 
      posFind="WBF";
      break;
    case 14: 
      posFind="WNG";
      break;
    case 15: 
      posFind="WRH";
      break;
    case 16: 
      posFind="BPA";
      break;
    case 17: 
      posFind="BPB";
      break;
    case 18: 
      posFind="BPC";
      break;
    case 19: 
      posFind="BPD";
      break;
    case 20: 
      posFind="BPE";
      break;
    case 21: 
      posFind="BPF";
      break;
    case 22: 
      posFind="BPG";
      break;
    case 23: 
      posFind="BPH";
      break;
    case 24: 
      posFind="BRA";
      break;
    case 25: 
      posFind="BNB";
      break;
    case 26: 
      posFind="BBC";
      break;
    case 27: 
      posFind="BQ";
      break;
    case 28: 
      posFind="BK";
      break;
    case 29: 
      posFind="BBF";
      break;
    case 30: 
      posFind="BNG";
      break;
    case 31: 
      posFind="BRH";
      break;
    default:
      //console.warn("Entro en el default de buscar la pieza");
      //console.log(pos);
      posFind="-";
  }
  return posFind;
}

/** findPosPiece(name: String) => posFind: number
 *  @description: This function return the number associated to an actor
 *  @returns: posFind: number
 *  @param: name: String
 */
function findPosPiece(name){
  var posFind;
  switch(name){
    case "WPA": 
      posFind=0;
      break;
    case "WPB": 
      posFind=1;
      break;
    case "WPC": 
      posFind=2;
      break;
    case "WPD": 
      posFind=3;
      break;
    case "WPE": 
      posFind=4;
      break;
    case "WPF": 
      posFind=5;
      break;
    case "WPG": 
      posFind=6;
      break;
    case "WPH": 
      posFind=7;
      break;
    case "WRA": 
      posFind=8;
      break;
    case "WNB": 
      posFind=9;
      break;
    case "WBC": 
      posFind=10;
      break;
    case "WQ": 
      posFind=11;
      break;
    case "WK": 
      posFind=12;
      break;
    case "WBF": 
      posFind=13;
      break;
    case "WNG": 
      posFind=14;
      break;
    case "WRH": 
      posFind=15;
      break;
    case "BPA": 
      posFind=16;
      break;
    case "BPB": 
      posFind=17;
      break;
    case "BPC": 
      posFind=18;
      break;
    case "BPD": 
      posFind=19;
      break;
    case "BPE": 
      posFind=20;
      break;
    case "BPF": 
      posFind=21;
      break;
    case "BPG": 
      posFind=22;
      break;
    case "BPH": 
      posFind=23;
      break;
    case "BRA": 
      posFind=24;
      break;
    case "BNB": 
      posFind=25;
      break;
    case "BBC": 
      posFind=26;
      break;
    case "BQ": 
      posFind=27;
      break;
    case "BK": 
      posFind=28;
      break;
    case "BBF": 
      posFind=29;
      break;
    case "BNG": 
      posFind=30;
      break;
    case "BRH": 
      posFind=31;
      break;
    default:
      //console.warn("Entro en el default de findoPosPiece buscar la pieza");
      //console.log(name);
      posFind=-1;
  }
  return posFind;
}

/** searchPieceDiff(letter: String, type: String) => oldPos: String
 *  @description: This function return the piece asociated to a movement with differentation
 *  @returns: oldPos: String
 *  @param: letter: String, type: String
 */
function searchPieceDiff(letter,type){
  var oldPos="";
  var fouPie=true;
  var list=movPositions[actualMovement];
  var isNum=false;
  for(var i=0;i<8;i++){
    if(letter==numbers[i]){
      isNum=true;
    }
  }
  if(isNum){
    if(side=="W"){
      for(var po=0;po<16 && fouPie;po++){
        if(list[po].charAt(1)==letter){
          oldPos=findPiece(po);
          if(oldPos.charAt(1)==type){
            fouPie=false;
          }
        }
      }
    }else{
      for(var po=16;po<32 && fouPie;po++){
        if(list[po].charAt(1)==letter){
          oldPos=findPiece(po);
          if(oldPos.charAt(1)==type){
            fouPie=false;
          }
        }
      }
    }
  }else{
    if(side=="W"){
      for(var po=0;po<16 && fouPie;po++){
        if(list[po].charAt(0)==letter){
          oldPos=findPiece(po);
          if(oldPos.charAt(1)==type){
            fouPie=false;
          }
        }
      }
    }else{
      for(var po=16;po<32 && fouPie;po++){
        if(list[po].charAt(0)==letter){
          oldPos=findPiece(po);
          if(oldPos.charAt(1)==type){
            fouPie=false;
          }
        }
      }
    }
  }
  return oldPos;
}

/** calculateMovTab(position: String[]) => void
 *  @description: This function calculate the positions of all the chess pieces in a movement
 *  @returns: void
 *  @param: position: String[]
 */
function calculateMovTab(position){
  mov=new Array(32);
  for(var i=0;i<32;i++){
    var tab="";
    var tab2="";
    if(position[i]=="-"){
      mov[i]="000000";
    }else{
      for(var j=0;j<8;j++){
        if(marLetter[j].charAt(0)==position[i].charAt(0)){
          tab=marLetter[j].charAt(1)+marLetter[j].charAt(2)+marLetter[j].charAt(3);
        }
        if(marNumber[j].charAt(0)==position[i].charAt(1)){
          tab2=marNumber[j].charAt(1)+marNumber[j].charAt(2)+marNumber[j].charAt(3);
        }
      }
      mov[i]=tab+tab2;
    }
  }
}

/** checkTab(step: number) => void
 *  @description: This function check the positions of the pieces
 *  @returns: void
 *  @param: step: number
 */
function checkTab(step){
  for(var i=0;i<32;i++){
    document.getElementById(shNamePieces[i]).style.marginLeft=movTab[step][i].charAt(0)+movTab[step][i].charAt(1)+movTab[step][i].charAt(2)+"px";
    document.getElementById(shNamePieces[i]).style.marginTop=movTab[step][i].charAt(3)+movTab[step][i].charAt(4)+movTab[step][i].charAt(5)+"px";
  }
}



/** checkVisibility(step: number) => void
 *  @description: This function check the visibility of the pieces
 *  @returns: void
 *  @param: step: number
 */
function checkVisibility(step){
  for(var i=0;i<32;i++){
    if(movTab[step][i]=="000000"){
      document.getElementById(shNamePieces[i]).style.visibility="hidden";
    }else{
      document.getElementById(shNamePieces[i]).style.visibility="visible";
    }
  }
}

/** calculateColorTabIni(values: String[][]) => colors: String[]
 *  @description: This function calculate the initial colors of the values on the table
 *  @returns: colors: String[]
 *  @param: values: String[][]
 */
function calculateColorTabIni(values){
  colors=new Array(32);
  for(var i=0;i<32;i++){
    var numCol=Number(values[i][5]);
    if(values[i][5]=="D"){
      colors[i]="Gray";
    }else if(numCol<=0.0){
      colors[i]="Salmon";
    }else{
      colors[i]="White";
    }
  }
  return colors;
}

/** calculateColorTab(values: String[][], prevValues: String[][]) => colors: String[]
 *  @description: This function calculate the colors of the values on the table
 *  @returns: colors: String[]
 *  @param: values: String[][], prevValues: String[][]
 */
function calculateColorTab(values,prevValues){
  colors=new Array(32);
  for(var i=0;i<32;i++){
    var numCol=Number(values[i][5]);
    var numColPrev=Number(prevValues[i][5]);
    if(values[i][5]=="D"){
      colors[i]="Gray";
    }else if(numCol<=0.0){
      colors[i]="Salmon";
    }else if(numColPrev>numCol){
      colors[i]="Gold";
    }else if(numColPrev<numCol){
      colors[i]="Lime";
    }else{
      colors[i]="White";
    }
  }
  return colors;
}

function arrayObjToCsv(ar) {
	//comprobamos compatibilidad
	if(window.Blob && (window.URL || window.webkitURL)){
		var contenido = "",
			d=new Date(),
			blob,
			reader,
			save,
			clicEvent;
		//creamos contenido del archivo
		for (var i=0;i<ar.length;i++) {
			//construimos cabecera del csv
			//resto del contenido
			contenido+=Object.keys(ar[i]).map(function(key){
							return ar[i][key];
						}).join(";") + "\n";
		}
		//creamos el blob
		blob=new Blob(["\ufeff", contenido], {type: 'text/csv'});
		//creamos el reader
		var reader=new FileReader();
		reader.onload=function (event) {
			//escuchamos su evento load y creamos un enlace en dom
			save=document.createElement('a');
			save.href=event.target.result;
			save.target='_blank';
			//aquí le damos nombre al archivo
			save.download="Values"+whPlayer+"_vs_"+blPlayer+".csv";
			try{
				//creamos un evento click
				clicEvent=new MouseEvent('click', {
					'view': window,
					'bubbles': true,
					'cancelable': true
				});
			}catch(e){
				//si llega aquí es que probablemente implemente la forma antigua de crear un enlace
				clicEvent = document.createEvent("MouseEvent");
				clicEvent.initEvent('click', true, true);
			}
			//disparamos el evento
			save.dispatchEvent(clicEvent);
			//liberamos el objeto window.URL
			(window.URL || window.webkitURL).revokeObjectURL(save.href);
		}
		//leemos como url
		reader.readAsDataURL(blob);
	}else {
		//el navegador no admite esta opción
		alert("Su navegador no permite esta acción");
	}
};

function doDownloadTable() {
  var heading=[movPositions.length+1];
  var lineMov=[];
  var miArrayDeObjetos=[100];
  miArrayDeObjetos[0]=heading
  heading[0]="Chess pieces balance";
  for(var i=1;i<movPositions.length+1;i++){
    var num=i-1;
    heading[i]="M"+num;
  }
  miArrayDeObjetos[0]=heading;
  for(var i=0;i<16;i++){
    lineMov=new Array(movPositions.length+1);
    lineMov[0]=namePieces[i];
    for(var j=0;j<movPositions.length;j++){
      lineMov[j+1]=movValues[j][i][5];
    }
    miArrayDeObjetos[i+1]=lineMov;
  }
  //White group values
  lineMov=new Array(movPositions.length+1);
  lineMov[0]="White Overall";
  for(var j=0;j<movPositions.length;j++){
    lineMov[j+1]=movValues[j][32][0];
  }
  miArrayDeObjetos[17]=lineMov;
  lineMov=new Array(movPositions.length+1);
  lineMov[0]="";
  miArrayDeObjetos[18]=lineMov;
  for(var i=16;i<32;i++){
    lineMov=new Array(movPositions.length+1);
    lineMov[0]=namePieces[i];
    for(var j=0;j<movPositions.length;j++){
      lineMov[j+1]=movValues[j][i][5];
    }
    miArrayDeObjetos[i+3]=lineMov;
  }
  //Black group values
  lineMov=new Array(movPositions.length+1);
  lineMov[0]="Black Overall";
  for(var j=0;j<movPositions.length;j++){
    lineMov[j+1]=movValues[j][32][1];
  }
  miArrayDeObjetos[35]=lineMov;
  lineMov=new Array(movPositions.length+1);
  lineMov[0]="";
  miArrayDeObjetos[36]=lineMov;
  //Ecosystem group values
  lineMov=new Array(movPositions.length+1);
  lineMov[0]="Ecosystem balance";
  for(var j=0;j<movPositions.length;j++){
    lineMov[j+1]=movValues[j][32][2];
  }
  miArrayDeObjetos[37]=lineMov;
	arrayObjToCsv(miArrayDeObjetos);
}


//--------------------------------------------------------------------------