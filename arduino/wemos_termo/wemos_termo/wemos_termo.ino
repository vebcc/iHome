#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server(80);

int ThermistorPin = 0;
int disco = D3;

boolean discostat = false;
int Vo;
float R1 = 11000;
float logR2, R2, T, Tc, Tf;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
int temp;
void setup() {



  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 4); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla", "maslohaslo132");  //Connect to the WiFi network

  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

  pinMode(disco, OUTPUT);

  digitalWrite(disco, discostat);

  server.on("/tempout", []() {   //temp  read
      temperatura();
      temp = Tc*100;
      server.send(200, "text / plain", String(" ") + temp + " ");
     });

     server.on("/discoon", []() {   //Disco on
            discostat = 1;
      digitalWrite(disco, discostat);
      server.send(200, "text / plain", "1");
     });
     server.on("/discooff", []() {   //Disco off
            discostat = 0;
      digitalWrite(disco, discostat);
      server.send(200, "text / plain", "0");
     });
     server.on("/discochange", []() {   //Disco change
     discostat=!discostat;
    digitalWrite(disco, discostat);
    if(discostat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
     });
     server.on("/discostatus", []() {   //Disco  status

     if(discostat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
     });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");

}

int freeRam() {
      extern int __heap_start, *__brkval;
      int v;
      return (int) &v - (__brkval == 0 ? (int) &__heap_start : (int) __brkval);
    }

float temperatura(){
 Vo = analogRead(ThermistorPin);
  R2 = R1 * (1023.0 / (float)Vo - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  Tc = T - 273.15;
  return Tc;
}

void loop() {

  server.handleClient();         //Handling of incoming requests

}

void handleRootPath() {            //Handler for the rooth path

  server.send(200, "text/plain", "Serwer Termo");

}
