#include <DHT.h>

DHT dht;

byte inputpin[] =       {          4,             10,             2,            7,              9};
String inputnames[] =   {"biurkoled", "glosnikiled", "biurkoright", "biurkodown", "biurkomonitor"};
boolean inputstatus[] = {       false,         true,          true,        false,           false};
int inputvalues[] =     {          0,           100,             0,            0,               0};

boolean refall = false;
int dhttimer = 0;
int wilgotnosc=0;
int temperatura=0;

#include "consoleinput.h"
#include "functions.h"

void setup() {
  Serial.begin(9600);
  Serial.print("Ładowanie seriala: ... ");
  delay(100);
  Serial.println("Gotowe");

  SetDefaultOutput();

  dht.setup(8);

  Serial.println("< Arduino jest gotowe! >");
}

void loop() {
  CheckConsoleInput();
  CheckOutput();
  GetTempWil();
}
