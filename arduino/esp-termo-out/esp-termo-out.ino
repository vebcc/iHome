#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

DHT dht;

ESP8266WebServer server(80);


String maincode = "ZbvzxZWDRUmJuDwSgPVPZe9QwHaQLS";

String privcode = " ";

String datatest = "lipa";
String testermg = "kappa";

int out1 = D0;
int out4 = D1; //need to add
int out2 = D5;
// D2 - DHT
// D3 - must be high torun program
int dotyk1 = D6; //GPIO6;
int out3 = D7;

boolean out1stat = true;
boolean out2stat = true;
boolean out3stat = false;
boolean out4stat = false;

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

void GetTempWil(){
  if(dhttimer>1000){
    wilgotnosc = dht.getHumidity();
    temperatura = dht.getTemperature();
    dhttimer=0;
  }else{
    dhttimer++;
  }
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

void getdata(String soinit, String code){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;  //Declare an object of class HTTPClient

    String togetherforever = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=6&getdata=" + soinit + "&maincode=" + code;

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
       if(outname=="privcode"){
         privcode=outval;
       }
      }
    }
    http.end();   //Close connection
}
}

void handleRootPath() {            //Handler for the rooth path
    temp = String(temperatura);
    wilg = String(wilgotnosc);
    String wynall = "Serwer iHome id: 6 ip: 10.0.2.6 lamp: 4 button: 1 status lamp: "+temp + "," +wilg;
    server.send(200, "text / plain", wynall);
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

  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection
    delay(500);
    Serial.println("Waiting to connect…");
  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

  getdata("ok", maincode);

   server.on("/gettemp", []() {   //temperatura
      temp = String(temperatura);
      server.send(200, "text / html", temp);
  });
   server.on("/getwil", []() {   //wilgotnosc
    wilg = String(wilgotnosc);
    server.send(200, "text / html", wilg);
  });

  server.on("/statusall", []() {   //status all
    temp = String(temperatura);
    wilg = String(wilgotnosc);
    String wynall = temp + "," +wilg;
    server.send(200, "text / plain", wynall);
  });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");
}

void loop() {
  server.handleClient();         //Handling of incoming requests
  GetTempWil();
}
