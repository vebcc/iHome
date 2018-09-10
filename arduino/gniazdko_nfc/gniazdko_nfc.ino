#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

DHT dht;

// INFOOOOOOOOOOOOO

// out2 i out1 dzialaja na odwrot XD reaguja na mase nie vcc!

ESP8266WebServer server(80);

unsigned long previousMillis = 0;        // will store last temp was read
unsigned long currentMillis;

long interval = 10000;

unsigned long prevupdate = 0;
long intervalupdate = 60000;
long timetofirstinterval = 0;

//int lamppin1 = D5; //GPIO5;

String maincode = "ZbvzxZWDRUmJuDwSgPVPZe9QwHaQLS";

String privcode = " ";
int dotyk1delay=500;
int dotyk1timetochange=100;
String getclientbuttonaddr="http://10.0.2.3/out2";



String minutenow = "0";

String datatest = "lipa";

String testermg = "kappa";

int out1 = D0;
int out4 = D1; //need to add
// D2 - DHT
// D3 - must be high torun program
int motionsensor = D4;
int out2 = D5;
int dotyk1 = D6; //GPIO6;
int out3 = D7;

boolean out1stat = true;
boolean out2stat = true;
boolean out3stat = false;
boolean out4stat = false;

boolean sensorpick = false;

boolean motionsensorstat = false;

int dhttimer = 0;
int wilgotnosc=0;
int temperatura=0;

int out1val = true;
int out2val = true;
int out3val = true;
int out4val = true;

String temp;
String wilg;

String lampg = "0";

//boolean lamp1stat = false; // lampa status

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

void GetTempHumi(){
    wilgotnosc = dht.getHumidity();
    temperatura = dht.getTemperature();
}

void getclient(int what){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;  //Declare an object of class HTTPClient

    switch(what){
      case 0:
        http.begin(getclientbuttonaddr + "off");
        break;
      case 1:
        http.begin(getclientbuttonaddr + "on");
        break;
      case 2:
        http.begin(getclientbuttonaddr + "change");
        break;
    }

    int httpCode = http.GET();                                                                  //Send the request

    if (httpCode > 0) { //Check the returning code

      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload
      lampg = payload;
    }
    http.end();   //Close connection
}
}

void uploadtempwil(int auid, String getval){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    String togetherforever = "";

    HTTPClient http;  //Declare an object of class HTTPClient

    switch(auid){
      case 1:
        togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=6&privcode="+privcode+"&commandid=1&commandvalue="+getval;
      break;
      case 2:
        togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=6&privcode="+privcode+"&commandid=2&commandvalue="+getval;
      break;
      case 3:
        togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=6&privcode="+privcode+"&commandid=3&commandvalue="+getval;
      break;
      case 4:
        togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=6&privcode="+privcode+"&commandid=4&commandvalue="+getval;
      break;
    }
    http.begin(togetherforever);

    int httpCode = http.GET();                                                                  //Send the request


    if (httpCode > 0) { //Check the returning code

      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload
      //lampg = payload;
      if(auid==3){
        minutenow = payload;
        int czasowo = minutenow.toInt() * 60 * 1000;
        while(czasowo>=intervalupdate){
          czasowo = czasowo-intervalupdate;
          Serial.println(czasowo);
          //console.log(czasowo);
        }
        timetofirstinterval = intervalupdate-czasowo;
      }
    }
    http.end();   //Close connection
}
}

void getdata(String soinit, String code){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;  //Declare an object of class HTTPClient

    String togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=6&getdata=" + soinit + "&maincode=" + code;

    http.begin(togetherforever);

    int httpCode = http.GET();                                                                  //Send the request

    if (httpCode > 0) { //Check the returning code

      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload

      for(int i=0;i<14;i++){
       datatest = getValue(payload,',',i);
       String outname = getValue(datatest,'=',0);
       String outval = getValue(datatest,'=',1);
        testermg+=outname;
       if(outname=="dotyk1delay"){
         dotyk1delay=outval.toInt();
         //testermg = outval;
       }else if(outname=="getclientbuttonaddr"){
         getclientbuttonaddr=outval;
       }else if(outname=="out1stat"){
         //out1stat=outval.toInt();
         //out1stat!=out1stat;
         if(outval=="1"){
          out1stat=false;
         }else{
          out1stat=true;
         }
         digitalWrite(out1, out1stat);
       }else if(outname=="out1val"){
         out1val=outval.toInt();
       }else if(outname=="out2stat"){
         //out2stat=outval.toInt();
         //out2stat!=out2stat;
         if(outval=="1"){
          out2stat=false;
         }else{
          out2stat=true;
         }
         digitalWrite(out2, out2stat);
       }else if(outname=="out2val"){
         out2val=outval.toInt();
       }else if(outname=="out3stat"){
         //out3stat=outval.toInt();
         if(outval=="1"){
          out3stat=true;
         }else{
          out3stat=false;
         }
         digitalWrite(out3, out3stat);
       }else if(outname=="out3val"){
         out3val=outval.toInt();
       }else if(outname=="out4stat"){
         //out4stat=outval.toInt();
         if(outval=="1"){
          out4stat=true;
         }else{
          out4stat=false;
         }
         digitalWrite(out4, out4stat);
       }else if(outname=="out4val"){
         out4val=outval.toInt();
       }else if(outname=="privcode"){
         privcode=outval;
       }else if(outname=="wiltempinterval"){
         interval=outval.toInt();
       }else if(outname=="intervalupdate"){
         intervalupdate=outval.toInt();
       }else if(outname=="dotyk1timetochange"){
        dotyk1timetochange=outval.toInt();
       }
      }
    }
    http.end();   //Close connection
}
}

void handleRootPath() {            //Handler for the rooth path
   String allwynik = "Serwer iHome id: 6 ip: 10.0.2.6 lamp: 4 button: 1 status lamp: "+String(out1stat) + "," + String(out2stat)+ "," + String(out3stat)+ "," + String(out4stat) + "," + String(temperatura) + "," + String(wilgotnosc);
   server.send(200, "text / plain", allwynik);
}

void setup() {

  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 6); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla", "maslohaslo132");  //Connect to the WiFi network

  dht.setup(D2);

 //pinMode(lamppin1, OUTPUT);
 pinMode(dotyk1, INPUT);
 pinMode(motionsensor, INPUT);

 pinMode(out1, OUTPUT);
 pinMode(out2, OUTPUT);
 pinMode(out3, OUTPUT);
 pinMode(out4, OUTPUT);


 digitalWrite(out1, out1stat);
 digitalWrite(out2, out2stat);
 digitalWrite(out3, out3stat);
 digitalWrite(out4, out4stat);

 //digitalWrite(dotyk1,LOW);



  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

  getdata("ok", maincode);



  uploadtempwil(3, "ok");
   //digitalWrite(out1,out1stat);
   //digitalWrite(out2,out2stat);
   //digitalWrite(out3,out3stat);
   //digitalWrite(out4,out4stat);

  server.on("/out1on", []() {   //out 1 on
    out1stat=false;
    digitalWrite(out1, out1stat);
    server.send(200, "text / plain", "1");
  });
  server.on("/out2on", []() {   //out 2 on
    out2stat=false;
    digitalWrite(out2, out2stat);
    server.send(200, "text / plain", "1");
  });
  server.on("/out3on", []() {   //out 3 on
    out3stat=true;
    digitalWrite(out3, out3stat);
    server.send(200, "text / plain", "1");
  });
  server.on("/out4on", []() {   //out 4 on
    out4stat=true;
    digitalWrite(out4, out4stat);
    server.send(200, "text / plain", "1");
  });

  server.on("/out1off", []() {   //out 1 off
    out1stat=true;
    digitalWrite(out1, out1stat);
    server.send(200, "text / plain", "0");
  });
  server.on("/out2off", []() {   //out 2 off
    out2stat=true;
    digitalWrite(out2, out2stat);
    server.send(200, "text / plain", "0");
  });
  server.on("/out3off", []() {   //out 3 off
    out3stat=false;
    digitalWrite(out3, out3stat);
    server.send(200, "text / plain", "0");
  });
  server.on("/out4off", []() {   //out 4 off
    out4stat=false;
    digitalWrite(out4, out4stat);
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
  server.on("/out4change", []() {   //out 3 change
    //out4stat!=out4stat;
    if(out4stat==true){
      out4stat=false;
    }else{
      out4stat=true;
    }
    digitalWrite(out4, out4stat);
    if(out4stat){
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
  server.on("/out4status", []() {   //out 4 status
    if(out4stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
  });

   server.on("/gettemp", []() {   //temperatura
      temp = String(temperatura);
      server.send(200, "text / html", temp);
  });
   server.on("/getwil", []() {   //wilgotnosc
    wilg = String(wilgotnosc);
    server.send(200, "text / html", wilg);
  });

  server.on("/statusall", []() {   //status all
    String allwynik = String(out1stat) + "," + String(out2stat)+ "," + String(out3stat)+ "," + String(out4stat);
    server.send(200, "text / plain", allwynik);
  });


  server.on("/out3val", []() {   //out 3 value
      server.send(200, "text / plain", server.arg(0));
      //out3val = toInt(server.arg(0));
      digitalWrite(out3, out3val);
  });
  server.on("/out4val", []() {   //out 4 value
      server.send(200, "text / plain", server.arg(0));
      //out3val = toInt(server.arg(0));
      digitalWrite(out4, out4val);
  });

    server.on("/out5on", []() {   //out 4 on
    getclient(1);
    server.send(200, "text / plain", lampg);
  });
    server.on("/out5off", []() {   //out 4 on
    getclient(0);
    server.send(200, "text / plain", lampg);
  });
    server.on("/out5change", []() {   //out 4 on
    getclient(2);
    server.send(200, "text / plain", lampg);
  });

  server.on("/test", []() {   //datatest
    server.send(200, "text / plain", testermg);
  });

    server.on("/minnow", []() {   //datatest
    server.send(200, "text / plain", String(minutenow));
  });

  server.on("/motionsensor", []() {   //datatest
    server.send(200, "text / plain", String(motionsensorstat));
  });

      server.on("/czasowo", []() {   //datatest
    server.send(200, "text / plain", String(timetofirstinterval));
  });

  server.on("/restart", []() {   //datatest
    server.send(200, "text / plain", "Restart");
    ESP.restart();
  });

    server.on("/offall", []() {   //datatest
    out1stat=true;
    digitalWrite(out1, out1stat);
    out2stat=true;
    digitalWrite(out2, out2stat);
    out3stat=false;
    digitalWrite(out3, out3stat);
    out4stat=false;
    digitalWrite(out4, out4stat);
    server.send(200, "text / plain", "1");
  });

  server.on("/onall", []() {   //datatest
    out1stat=false;
    digitalWrite(out1, out1stat);
    out2stat=false;
    digitalWrite(out2, out2stat);
    out3stat=true;
    digitalWrite(out3, out3stat);
    out4stat=true;
    digitalWrite(out4, out4stat);
    server.send(200, "text / plain", "0");
  });


  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");

}

void loop() {
  //getclient();
  //delay(3000);
  server.handleClient();         //Handling of incoming requests

  if(digitalRead(dotyk1)==HIGH){
    delay(dotyk1timetochange);
    if(digitalRead(dotyk1)==HIGH){
      getclient(2);
    }
    delay(dotyk1delay);
  }

  currentMillis = millis();
  if(currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    GetTempHumi();
  }

  if(currentMillis>=timetofirstinterval){
    if(currentMillis - prevupdate >= intervalupdate) {
      prevupdate = currentMillis;
      uploadtempwil(1, String(temperatura));
      uploadtempwil(2, String(wilgotnosc));
    }
  }

  if(digitalRead(motionsensor)==HIGH){
    if(sensorpick==false){
      Serial.println("Sensor HIGH");
      motionsensorstat = true;
      uploadtempwil(4, "1");
      sensorpick=true;
    }
  }else{
    if(sensorpick==true){
      Serial.println("Sensor LOW");
      motionsensorstat = false;
      uploadtempwil(4, "0");
      sensorpick=false;
    }
  }
}
