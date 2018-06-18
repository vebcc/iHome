#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

ESP8266WebServer server(80);

byte lampa1 = D5;
byte lampa2 = D6;
byte lampa3 = D7;

int lampa1stat = false;
int lampa2stat = false;
int lampa3stat = false;
void setup() {

  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 3); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla", "maslohaslo132");  //Connect to the WiFi network

  pinMode(lampa1, OUTPUT);
  pinMode(lampa2, OUTPUT);
  pinMode(lampa3, OUTPUT);

  digitalWrite(lampa1, lampa1stat);
  digitalWrite(lampa2, lampa2stat);
  digitalWrite(lampa3, lampa3stat);


  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

  server.on("/lamp1on", []() {   //Swiatlo 1 on

    digitalWrite(lampa1, HIGH);
    lampa1stat=1;
      server.send(200, "text / plain", "1");
     });

  server.on("/lamp1off", []() {   //Swiatlo 1 off

    digitalWrite(lampa1, LOW);
  lampa1stat=0;
      server.send(200, "text / plain", "0");
    });

  server.on("/lamp1change", []() {   //Swiatlo 1 change

    lampa1stat=!lampa1stat;
    if(lampa1stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
    digitalWrite(lampa1, lampa1stat);

  });
   server.on("/lamp1status", []() {   //Swiatlo 1 on

  if(lampa1stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
     });

    server.on("/lamp2on", []() {   //Swiatlo 2 on

    digitalWrite(lampa2, HIGH);
    server.send(200, "text / plain", "1");

  });

  server.on("/lamp2off", []() {   //Swiatlo 2 off

    digitalWrite(lampa2, LOW);
    server.send(200, "text / plain", "0");

  });

  server.on("/lamp2change", []() {   //Swiatlo 2 change

    lampa2stat=!lampa2stat;
    digitalWrite(lampa2, lampa2stat);
    if(lampa2stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }

  });
     server.on("/lamp2status", []() {   //Swiatlo 1 on

  if(lampa2stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
     });

    server.on("/lamp3on", []() {   //Swiatlo 3 on

    digitalWrite(lampa3, HIGH);
    server.send(200, "text / plain", "1");

  });

  server.on("/lamp3off", []() {   //Swiatlo 3 off

    digitalWrite(lampa3, LOW);
    server.send(200, "text / plain", "0");

  });

  server.on("/lamp3change", []() {   //Swiatlo 3 change

    lampa3stat=!lampa3stat;
    digitalWrite(lampa3, lampa3stat);
    if(lampa3stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }

  });
     server.on("/lamp3status", []() {   //Swiatlo 1 on

  if(lampa3stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
     });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");

}

void loop() {

  server.handleClient();         //Handling of incoming requests

}

void handleRootPath() {            //Handler for the rooth path

  server.send(200, "text/plain", "Serwer Lampy");

}
