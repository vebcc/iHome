#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server(80);

int lamppin1 = 0; //GPIO0;
int dotyk1 = 2; //GPIO2;

boolean lamp1stat = false; // lampa status

void setup() {

  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 5); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla_Mlody", "maslohaslo132");  //Connect to the WiFi network


 pinMode(lamppin1, OUTPUT);
 pinMode(dotyk1, INPUT);
 digitalWrite(dotyk1,HIGH);

  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

  server.on("/lamp1on", []() {   //Swiatlo 1 on

    digitalWrite(lamppin1, HIGH);
    lamp1stat=true;
      server.send(200, "text / plain", "1");
     });

  server.on("/lamp1off", []() {   //Swiatlo 1 off

    digitalWrite(lamppin1, LOW);
  lamp1stat=false;
      server.send(200, "text / plain", "0");
    });

  server.on("/lamp1change", []() {   //Swiatlo 1 change

    lamp1stat=!lamp1stat;
    if(lamp1stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
    digitalWrite(lamppin1, lamp1stat);

  });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");


}


void loop() {


  server.handleClient();         //Handling of incoming requests

  if(digitalRead(dotyk1)==LOW){
    lamp1stat=!lamp1stat;
    digitalWrite(lamppin1, lamp1stat);
    delay(300);
  }

}

void handleRootPath() {            //Handler for the rooth path

  server.send(200, "text/plain", "Serwer Lampy id: 5 ip: 10.0.2.5 lamp: 1 button: 1 status lamp1: ");
  if(lamp1stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }

}
