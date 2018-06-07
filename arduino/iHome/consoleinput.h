#include "outputmanager.h"

char inputchar;
int incomingByte = 0;
boolean newvalue = false;
boolean nowprint = false;
String serialcommand = "";
String serialvalue = "";
int outcommand;
String lastvalue;
boolean nowyoucan = false;

void CheckConsoleInput(){
  if (Serial.available() > 0) {
                incomingByte = Serial.read();
                inputchar = char(incomingByte);
               if(nowyoucan){
                if(incomingByte!=61 && newvalue==false){

                    serialcommand += inputchar;
                    //Serial.println("----------");

                }else if(newvalue){
                  if(inputchar == '#'){
                    nowprint = true;
                  }else{
                    serialvalue += inputchar;
                  }
                  //Serial.println("++++++++++");
                }else{
                  newvalue=true;
                  //Serial.println("WWWWWWWW");
                }
            }else{
                    if(inputchar == '$'){
                      nowyoucan = true;
                    }
                  }
        }else if(nowprint==true){
           Serial.print("Command: ");
           Serial.println(serialcommand);
           Serial.print("Value: ");
           Serial.println(serialvalue);
           lastvalue = serialcommand + serialvalue;
           Serial.println(lastvalue);
           ConsoleCommand(serialcommand, serialvalue);
           serialcommand="";
           serialvalue="";
           nowprint=false;
           newvalue=false;
           nowyoucan = false;
           Serial.flush();
        }
}
