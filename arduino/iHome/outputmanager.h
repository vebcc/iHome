void OutCommand(int id, String value) {
  int valnow;
  switch (id + 1) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      if (value == "change") {
        inputstatus[id] = !inputstatus[id];
      } else if (value == "on") {
        inputstatus[id] = true;
      } else if (value == "off") {
        inputstatus[id] = false;
      } else {
        valnow = value.toInt();
        if (valnow >= 1 && valnow <= 100) {
          inputvalues[id] = valnow;
        }
      }
      //Serial.print(inputnames[id]);
      //Serial.print("=");
      //Serial.println(inputstatus[id]);
      //Serial.println(inputvalues[id]);
      //Serial.println(inputpin[id]);
      break;

  }
  refall = true;
}

void ConsoleCommand(String command, String value) {
  for (int i = 0; i < sizeof(inputnames); i++) {
    if (command == inputnames[i]) {
      OutCommand(i, value);
    }
  }
  //for (int i = 0; i < sizeof(valnames); i++) {
  //  if (command == valnames[i]) {
  //OutCommand(i, value);
  //  }
  //}
}

void ConsoleWriter(String command, String value){
  for (int i = 0; i < sizeof(inputnames); i++) {
    if (value == inputnames[i]) {
      if(command=="values"){
        //Serial.print("values=");
        Serial.print(inputvalues[i]);
        Serial.println("%");
      }else if(command=="status"){
        Serial.print(inputstatus[i]);
        Serial.println("%");
      }
    }
  }

}

