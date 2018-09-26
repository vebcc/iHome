#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>
DHT dht;

ESP8266WebServer server(80);

byte out1 = D5;
//byte in1 = D6; DHT
int motionsensor = D7;

String maincode = "pYFQWS3ffzhX9rMPZHvTQj6NM";

unsigned long previousMillis = 0;        // will store last temp was read
unsigned long currentMillis;

unsigned long prevdig = 0;

long interval = 10000;

long actualsensortime = 0;

int sunrise = 0;
int sunset = 0;
int sensordaydec = 0;

long timetofirstinterval = 0;

boolean start = 1;

boolean lamptype = 0;

int sensortime = 240000;

unsigned long prevupdate = 0;

String minutenow = "0";

String sunsetatime = "0";
String sunriseatime = "0";
long sunsetinttime = 0;
long sunriseinttime = 0;

String temp;
String wilg;

String lampg = "0";

long intervalupdate = 600000;

String privcode = " ";

String datatest = "lipa";

String testermg = "kappa";

boolean out1stat = false;

boolean sensorpick = false;

boolean motionsensorstat = false;

int dhttimer = 0;
int wilgotnosc=0;
int temperatura=0;

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



void uploadtempwil(int auid, String getval){
 WiFiClient client;
   const char* tuhost = "10.0.2.2";
   const int httpPort = 80;
   String url = " ";

  if (!client.connect(tuhost, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  switch(auid){
    case 1:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=8&privcode="+privcode+"&commandid=1&commandvalue="+getval;
    break;
    case 2:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=8&privcode="+privcode+"&commandid=2&commandvalue="+getval;
    break;
    case 3:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=8&privcode="+privcode+"&commandid=3&commandvalue="+getval;
    break;
    case 4:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=8&privcode="+privcode+"&commandid=4&commandvalue="+getval;
    break;
    case 5:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=8&privcode="+privcode+"&commandid=5&commandvalue="+getval;
    break;
    case 6:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=8&privcode="+privcode+"&commandid=6&commandvalue="+getval;
    break;
  }
  Serial.print("Requesting URL: ");
  Serial.println(url);

  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + tuhost + "\r\n" +
               "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
    if(auid==3){
        minutenow = line;
        int czasowo = minutenow.toInt() * 60 * 1000;
        while(czasowo>=intervalupdate){
          czasowo = czasowo-intervalupdate;
          Serial.print("czasowo: ");
          Serial.println(czasowo);
          //console.log(czasowo);
        }
        timetofirstinterval = intervalupdate-czasowo;
      }else if(auid==6){
        if(getval=="sunrise"){
          sunriseatime = line;
          sunriseinttime = sunriseatime.toInt();
          Serial.print("sunriseinttime: ");
          Serial.println(sunriseinttime);
        }else{
          sunsetatime = line;
          sunsetinttime = sunsetatime.toInt();
          Serial.print("sunsetinttime: ");
          Serial.println(sunsetinttime);
        }
      }else if(auid==5){
          actualsensortime = line.toInt();
          Serial.print("actualsensortime: ");
          Serial.println(actualsensortime);
      }
  }
}

void getdata(String soinit, String code){
   WiFiClient client;
   const char* tuhost = "10.0.2.2";
   const int httpPort = 80;

  if (!client.connect(tuhost, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  String url = "/ihome/include/devicehandlers.php?id=8&getdata=" + soinit + "&maincode=" + code;
  Serial.print("Requesting URL: ");
  Serial.println(url);

  // This will send the request to the server
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + tuhost + "\r\n" +
               "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println(">>> Client Timeout !");
      client.stop();
      return;
    }
  }

  // Read all the lines of the reply from server and print them to Serial
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
    for(int i=0;i<9;i++){
       datatest = getValue(line,',',i);
      String outname = getValue(datatest,'=',0);
      String outval = getValue(datatest,'=',1);
      testermg+=outname+": "+outval+" | ";
       if(outname=="out1stat"){
         //out1stat=outval.toInt();
         //out1stat!=out1stat;
         if(outval=="1"){
          out1stat=true;
         }else{
          out1stat=false;
         }
         digitalWrite(out1, out1stat);
       }else if(outname=="privcode"){
         privcode=outval;
       }else if(outname=="wiltempinterval"){
         interval=outval.toInt();
       }else if(outname=="intervalupdate"){
         intervalupdate=outval.toInt();
       }else if(outname=="lamptype"){
         lamptype=outval.toInt();
       }else if(outname=="sensortime"){
          sensortime=outval.toInt();
       }else if(outname=="sensorsunrise"){
         sunrise=outval.toInt();
       }else if(outname=="sensorsunset"){
          sunset=outval.toInt();
       }else if(outname=="sensordaydec"){
          sensordaydec=outval.toInt();
       }
      }
  }
}

void setup() {

  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 8); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla_Garaz", "maslohaslo132");  //Connect to the WiFi network

  pinMode(out1, OUTPUT);

  digitalWrite(out1, out1stat);

  dht.setup(D6);

  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

 getdata("ok", maincode);
 Serial.println("ok1");


 uploadtempwil(3, "ok");

 uploadtempwil(6, "sunrise");
 uploadtempwil(6, "sunset");
 uploadtempwil(5, "1");

  server.on("/out1on", []() {   //out 1 on
    if(lamptype==0){
      lamptype=1;
    }
    out1stat=true;
    digitalWrite(out1, out1stat);
    server.send(200, "text / plain", "1");
  });

  server.on("/out1off", []() {   //out 1 off
    if(lamptype==0){
      lamptype=1;
    }
    out1stat=false;
    digitalWrite(out1, out1stat);
    server.send(200, "text / plain", "0");
  });

    server.on("/lamptypestatus", []() {   //out 1 status
    if(lamptype){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
  });
	server.on("/sensordaydecstatus", []() {   //out 1 status
		if(sensordaydec){
			server.send(200, "text / plain", "1");
		}else{
			server.send(200, "text / plain", "0");
		}
	});

    server.on("/lamptype0", []() {   //out 1 off
    lamptype=0;
    server.send(200, "text / plain", "0");
  });

  server.on("/lamptype1", []() {   //out 1 off
    lamptype=1;
    server.send(200, "text / plain", "1");
  });
  server.on("/lamptypechange", []() {   //out 1 off
    if(lamptype==true){
      lamptype=false;
    }else{
      lamptype=true;
    }
    if(lamptype){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
  });
  server.on("/sensordaydec0", []() {   //out 1 off
    sensordaydec=0;
    server.send(200, "text / plain", "0");
  });

  server.on("/sensordaydec1", []() {   //out 1 off
    sensordaydec=1;
    server.send(200, "text / plain", "1");
  });

  server.on("/sensordaydecchange", []() {   //out 1 off
    if(sensordaydec==true){
      sensordaydec=false;
    }else{
      sensordaydec=true;
    }
    if(sensordaydec){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
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

  server.on("/out1status", []() {   //out 1 status
    if(out1stat){
      server.send(200, "text / plain", "0");
    }else{
      server.send(200, "text / plain", "1");
    }
  });

  server.on("/statusall", []() {   //status all
    temp = String(temperatura);
    wilg = String(wilgotnosc);
	  String allwynik = String(out1stat) + "," + temp + "," +wilg + "," +String(sensordaydec) + "," +String(lamptype) + "," +String(sensortime);
    server.send(200, "text / plain", allwynik);
  });

  server.on("/offall", []() {   //on all
     out1stat=false;
     digitalWrite(out1, out1stat);
     server.send(200, "text / plain", "0");
  });
  server.on("/onall", []() {   //off all
     out1stat=true;
     digitalWrite(out1, out1stat);
     server.send(200, "text / plain", "1");
  });

  server.on("/gettemp", []() {   //temperatura
      temp = String(temperatura);
      server.send(200, "text / html", temp);
  });
   server.on("/getwil", []() {   //wilgotnosc
    wilg = String(wilgotnosc);
    server.send(200, "text / html", wilg);
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

  server.on("/test", []() {   //datatest
    server.send(200, "text / plain", testermg);
  });

  server.on("/restart", []() {   //datatest
    server.send(200, "text / plain", "Restart");
    ESP.restart();
  });

  server.on("/refdata", []() {   //datatest
    server.send(200, "text / plain", "newdata");
    getdata("ok", maincode);
    uploadtempwil(3, "ok");
    uploadtempwil(6, "sunrise");
    uploadtempwil(6, "sunset");
    uploadtempwil(5, "1");
  });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");

}

void loop() {

  server.handleClient();         //Handling of incoming requests
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

      uploadtempwil(6, "sunrise");
      uploadtempwil(6, "sunset");
      uploadtempwil(5, "1");
    }
  }

    if(digitalRead(motionsensor)==HIGH){
    if(sensorpick==false){
      Serial.println("Sensor HIGH");
      motionsensorstat = true;
      if(lamptype==0){
          if(sensordaydec==0){
            if(sunriseinttime>=actualsensortime || actualsensortime >= sunsetinttime){
              out1stat=true;
              digitalWrite(out1, out1stat);
              prevdig=currentMillis;
            }else{

            }
          }else{
            out1stat=true;
            digitalWrite(out1, out1stat);
            prevdig=currentMillis;
          }
      }
      uploadtempwil(4, "1");
      sensorpick=true;
    }
  }else{
      if(currentMillis - prevdig >= sensortime) {
        prevdig = currentMillis;
      if(sensorpick==true){
        Serial.println("Sensor LOW");
        motionsensorstat = false;
        if(lamptype==0){
          out1stat=false;
          digitalWrite(out1, out1stat);
        }
        uploadtempwil(4, "0");
        sensorpick=false;
      }
    }
  }

}

void handleRootPath() {            //Handler for the rooth path

	String allwynik = "Serwer iHome id: 8 ip: 10.0.2.8 out1stat,temp,wilg,sensordaydec,lamptype "+ String(out1stat) + "," + temp + "," +wilg + "," +String(sensordaydec) + "," +String(lamptype);
    server.send(200, "text / plain", allwynik);

}
