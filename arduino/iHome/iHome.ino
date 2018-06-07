//#include <SoftwareSerial.h>
//SoftwareSerial mySerial(10, 11);

byte inputpin[] =       {          4,             5,             6,            7,               8};
String inputnames[] =   {"biurkoled", "biurkofront", "biurkoright", "biurkodown", "biurkomonitor"};
boolean inputstatus[] = {       false,         true,         false,        false,           false};
int inputvalues[] =     {          0,             0,             0,            0,               0};

boolean refall = false;

#include "consoleinput.h"
#include "functions.h"

void setup() {
  Serial.begin(9600);
  Serial.print("Ładowanie seriala: ... ");
  delay(100);
  //mySerial.begin(9600);
  Serial.println("Gotowe");

  SetDefaultOutput();

  Serial.println("< Arduino jest gotowe! >");
}

void loop() {
  CheckConsoleInput();
  CheckOutput();
  //Serial.println("nope");

  //if (mySerial.available())
    //Serial.print((char)mySerial.read());
  //if (Serial.available())
    //mySerial.print((char)Serial.read());

}
