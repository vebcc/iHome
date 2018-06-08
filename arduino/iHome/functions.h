void SetDefaultOutput(){
    int last;
    Serial.println("Ustawianie pinow oraz ladowanie domyslnych satusow: ... ");
    for(int i=0; i<sizeof(inputstatus);i++){
      pinMode(inputpin[i], OUTPUT);
      digitalWrite(inputpin[i], inputstatus[i]);
      //Serial.print("Def:");
      last = i;
    }
    Serial.print("Załadowano: ");
    Serial.println(last+1);
}

void CheckOutput(){
  int inpval;
  if(refall==true){
    for(int i=0; i<sizeof(inputstatus);i++){
      if(inputvalues[i]!=0){
        inpval = map(inputvalues[i], 1, 100, 1, 255);
        if(inputstatus[i]){
          analogWrite(inputpin[i], inpval);
        }else{
          digitalWrite(inputpin[i], inputstatus[i]);
        }
      }else{
        digitalWrite(inputpin[i], inputstatus[i]);
        //Serial.println("checkoutput");
      }
    }
    refall=false;
  }
}

