#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
//#include <ESP8266HTTPClient.h>
#include <DHT.h>

DHT dht;

// INFOOOOOOOOOOOOO

// out2 i out1 dzialaja na odwrot XD reaguja na mase nie vcc!

ESP8266WebServer server(80);

unsigned long previousMillis = 0;        // will store last temp was read
unsigned long currentMillis;

long interval = 10000;

unsigned long prevupdate = 0;
long intervalupdate = 600000;

boolean start = 1;
String maincode = "a2MRccWsFVW4hqZb34hsRYWvSTwaC2";

String privcode = "";

String datatest = "lipa";

String testermg = "kappa";



int dhttimer = 0;
int wilgotnosc=0;
int temperatura=0;

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

void uploadtempwil(int auid, String getval){
 WiFiClient client;
    String tuhost = "10.0.2.2";
   const int httpPort = 80;
   String url = " ";

  if (!client.connect(tuhost, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  switch(auid){
    case 1:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=7&privcode="+privcode+"&commandid=1&commandvalue="+getval;
    break;
    case 2:
      url = "http://cloud.maslowski.it/ihome/include/devicehandlers.php?id=7&privcode="+privcode+"&commandid=2&commandvalue="+getval;
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

  }
}

void getdata(String soinit, String code){
   WiFiClient client;
    String tuhost = "10.0.2.2";
   const int httpPort = 80;

  if (!client.connect(tuhost, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  String url = "/ihome/include/devicehandlers.php?id=7&getdata=ok&maincode=" + maincode;
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
    for(int i=0;i<3;i++){
      datatest = getValue(line,',',i);
      String outname = getValue(datatest,'=',0);
      String outval = getValue(datatest,'=',1);
      testermg+=outname;
      if(outname=="privcode"){
        privcode=outval;
      }else if(outname=="wiltempinterval"){
        interval=outval.toInt();
      }else if(outname=="intervalupdate"){
        intervalupdate=outval.toInt();
      }
    }
  }
}
void handleRootPath() {            //Handler for the rooth path
   String allwynik = "Serwer iHome id: 7 ip: 10.0.2.7  temp: 1 wilg: 1 status: "+ String(temperatura) + "," + String(wilgotnosc);
   server.send(200, "text / plain", allwynik);
}

void setup() {

  Serial.begin(115200);

  IPAddress ip(10, 0, 2, 7); //
  IPAddress gateway(10, 0, 0, 1); //
  Serial.print(F("Setting static ip to : "));
  Serial.println(ip);
  IPAddress subnet(255, 255, 252, 0); // set subnet mask to match your
  WiFi.config(ip, gateway, subnet);
  WiFi.begin("Internety_Masla", "maslohaslo132");  //Connect to the WiFi network

  dht.setup(2);

 //digitalWrite(dotyk1,LOW);



  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP
  delay(1000);
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
    String allwynik = String(temperatura) + "," + String(wilgotnosc);
    server.send(200, "text / plain", allwynik);
  });

  server.on("/test", []() {   //datatest
    server.send(200, "text / plain", testermg);
  });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");

}

void loop() {
  server.handleClient();         //Handling of incoming requests

  if(start==1){
    start=0;
    GetTempHumi();
    delay(500);
    uploadtempwil(1, String(temperatura));
    uploadtempwil(2, String(wilgotnosc));
  }

  currentMillis = millis();
  if(currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    GetTempHumi();
  }

  if(currentMillis - prevupdate >= intervalupdate) {
    prevupdate = currentMillis;
    uploadtempwil(1, String(temperatura));
    uploadtempwil(2, String(wilgotnosc));
  }
}
