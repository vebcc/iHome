#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

ESP8266WebServer server(80);

byte out1 = D5;
byte out2 = D6;
byte out3 = D7;

String maincode = "cjeeHYh9UWc8oT3Xp7jYJLSAbmHnuZ";

String privcode = " ";

String datatest = "lipa";
String testermg = "kappa";

boolean out1stat = false;
boolean out2stat = false;
boolean out3stat = false;

String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void getdata(String soinit, String code){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;  //Declare an object of class HTTPClient

    String togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=3&getdata=" + soinit + "&maincode=" + code;

    http.begin(togetherforever);

    int httpCode = http.GET();                                                                  //Send the request

    if (httpCode > 0) { //Check the returning code

      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload

      for(int i=0;i<9;i++){
       datatest = getValue(payload,',',i);
       String outname = getValue(datatest,'=',0);
       String outval = getValue(datatest,'=',1);
        testermg+=outname;
       if(outname=="out1stat"){
         //out1stat=outval.toInt();
         //out1stat!=out1stat;
         if(outval=="0"){
          out1stat=false;
         }else{
          out1stat=true;
         }
         digitalWrite(out1, out1stat);
       }else if(outname=="out2stat"){
         //out2stat=outval.toInt();
         //out2stat!=out2stat;
         if(outval=="0"){
          out2stat=false;
         }else{
          out2stat=true;
         }
         digitalWrite(out2, out2stat);
       }else if(outname=="out3stat"){
         //out3stat=outval.toInt();
         if(outval=="1"){
          out3stat=true;
         }else{
          out3stat=false;
         }
         digitalWrite(out3, out3stat);
       }else if(outname=="privcode"){
         privcode=outval;
       }
      }
    }
    http.end();   //Close connection
}
}

void setup() {

  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 3); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla", "maslohaslo132");  //Connect to the WiFi network

  pinMode(out1, OUTPUT);
  pinMode(out2, OUTPUT);
  pinMode(out3, OUTPUT);

  digitalWrite(out1, out1stat);
  digitalWrite(out2, out2stat);
  digitalWrite(out3, out3stat);


  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

 getdata("ok", maincode);

   //digitalWrite(out1,out1stat);
   //digitalWrite(out2,out2stat);
   //digitalWrite(out3,out3stat);
   //digitalWrite(out4,out4stat);

  server.on("/out1on", []() {   //out 1 on
    out1stat=true;
    digitalWrite(out1, out1stat);
    server.send(200, "text / plain", "1");
  });
  server.on("/out2on", []() {   //out 2 on
    out2stat=true;
    digitalWrite(out2, out2stat);
    server.send(200, "text / plain", "1");
  });
  server.on("/out3on", []() {   //out 3 on
    out3stat=true;
    digitalWrite(out3, out3stat);
    server.send(200, "text / plain", "1");
  });

  server.on("/out1off", []() {   //out 1 off
    out1stat=false;
    digitalWrite(out1, out1stat);
    server.send(200, "text / plain", "0");
  });
  server.on("/out2off", []() {   //out 2 off
    out2stat=false;
    digitalWrite(out2, out2stat);
    server.send(200, "text / plain", "0");
  });
  server.on("/out3off", []() {   //out 3 off
    out3stat=false;
    digitalWrite(out3, out3stat);
    server.send(200, "text / plain", "0");
  });

  server.on("/out1change", []() {   //out 1 change
    //out1stat!=out1stat;
    if(out1stat==true){
      out1stat=false;
    }else{
      out1stat=true;
    }
    digitalWrite(out1, out1stat);
    if(out1stat){
      server.send(200, "text / plain", "0");
    }else{
      server.send(200, "text / plain", "1");
    }
  });
  server.on("/out2change", []() {   //out 2 change
    //out2stat!=out2stat;
    if(out2stat==true){
      out2stat=false;
    }else{
      out2stat=true;
    }
    digitalWrite(out2, out2stat);
    if(out2stat){
      server.send(200, "text / plain", "0");
    }else{
      server.send(200, "text / plain", "1");
    }
  });
  server.on("/out3change", []() {   //out 3 change
    //out3stat!=out3stat;
    if(out3stat==true){
      out3stat=false;
    }else{
      out3stat=true;
    }
    digitalWrite(out3, out3stat);
    if(out3stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
  });

  server.on("/out1status", []() {   //out 1 status
    if(out1stat){
      server.send(200, "text / plain", "0");
    }else{
      server.send(200, "text / plain", "1");
    }
  });
  server.on("/out2status", []() {   //out 2 status
    if(out2stat){
      server.send(200, "text / plain", "0");
    }else{
      server.send(200, "text / plain", "1");
    }
  });
  server.on("/out3status", []() {   //out 3 status
    if(out3stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
  });

  server.on("/statusall", []() {   //status all
    String allwynik = String(out1stat) + "," + String(out2stat)+ "," + String(out3stat);
    server.send(200, "text / plain", allwynik);
  });

  server.on("/offall", []() {   //on all
     out1stat=false;
     digitalWrite(out1, out1stat);
     out2stat=false;
     digitalWrite(out2, out2stat);
     out3stat=false;
     digitalWrite(out3, out3stat);
     server.send(200, "text / plain", "0");
  });
  server.on("/onall", []() {   //off all
     out1stat=true;
     digitalWrite(out1, out1stat);
     out2stat=true;
     digitalWrite(out2, out2stat);
     out3stat=true;
     digitalWrite(out3, out3stat);
     server.send(200, "text / plain", "1");
  });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");

}

void loop() {

  server.handleClient();         //Handling of incoming requests

}

void handleRootPath() {            //Handler for the rooth path

    String allwynik = "Serwer iHome id: 3 ip: 10.0.2.3 lamp: 3 status lamp: "+ String(out1stat) + "," + String(out2stat)+ "," + String(out3stat);
    server.send(200, "text / plain", allwynik);

}
