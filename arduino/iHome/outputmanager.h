void OutCommand(int id, String value){
  switch(id+1){
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      if(value=="change"){
        inputstatus[id]=!inputstatus[id];
      }else if(value=="on"){
        inputstatus[id] = true;
      }else if(value=="off"){
        inputstatus[id] = false;
      }
      Serial.print(inputnames[id]);
      Serial.print("=");
      Serial.println(inputstatus[id]);
      //Serial.println(inputpin[id]);
    break;

    case 102:
      inputvalues[id] = value.toInt();
    break;

  }
}

void ConsoleCommand(String command, String value){
  for(int i=0;i<sizeof(inputnames);i++){
    if(command==inputnames[i]){OutCommand(i, value);}
  }
}

