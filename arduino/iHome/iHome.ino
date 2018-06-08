byte inputpin[] =       {          4,             10,             6,            7,               8};
String inputnames[] =   {"biurkoled", "glosnikiled", "biurkoright", "biurkodown", "biurkomonitor"};
boolean inputstatus[] = {       false,         true,         false,        false,           false};
int inputvalues[] =     {          0,           100,             0,            0,               0};

boolean refall = false;

#include "consoleinput.h"
#include "functions.h"

void setup() {
  Serial.begin(9600);
  Serial.print("Ładowanie seriala: ... ");
  delay(100);
  Serial.println("Gotowe");

  SetDefaultOutput();

  Serial.println("< Arduino jest gotowe! >");
}

void loop() {
  CheckConsoleInput();
  CheckOutput();
}
