#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

ESP8266WebServer server(80);

int lamppin1 = 0; //GPIO0;
int dotyk1 = 2; //GPIO2;

int dotyk1delay = 300;
int dotyk1timetochange=200;

String maincode = "4a4cDety8jMoKyqwNQ8zZ7vmorhquZ";

String privcode = " ";
String getclientbuttonaddr="http://10.0.2.3/out2";

String datatest = "lipa";

String testermg = "kappa";

boolean lamp1stat = false; // lampa status

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
   WiFiClient client;
   const char* tuhost = "10.0.2.2";
   const int httpPort = 80;

  if (!client.connect(tuhost, httpPort)) {
    Serial.println("connection failed");
    return;
  }

  // We now create a URI for the request
  String url = "/ihome/include/devicehandlers.php?id=5&getdata=ok&maincode=" + maincode;
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

      for(int i=0;i<4;i++){
       datatest = getValue(line,',',i);
       String outname = getValue(datatest,'=',0);
       String outval = getValue(datatest,'=',1);
        testermg+=outname;
       if(outname=="dotyk1delay"){
         dotyk1delay=outval.toInt();
         //testermg = outval;
       }else if(outname=="out1stat"){
         //out1stat=outval.toInt();
         //out1stat!=out1stat;
         if(outval=="1"){
          lamp1stat=true;
         }else{
          lamp1stat=false;
         }
         digitalWrite(lamppin1, lamp1stat);
       }else if(outname=="privcode"){
         privcode=outval;
       }else if(outname=="dotyk1timetochange"){
        dotyk1timetochange=outval.toInt();
       }
      }
  }
}

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

  getdata("ok", maincode);

  server.on("/out1on", []() {   //Swiatlo 1 on

    digitalWrite(lamppin1, HIGH);
    lamp1stat=true;
      server.send(200, "text / plain", "1");
     });

  server.on("/out1off", []() {   //Swiatlo 1 off

    digitalWrite(lamppin1, LOW);
  lamp1stat=false;
      server.send(200, "text / plain", "0");
    });

  server.on("/out1change", []() {   //Swiatlo 1 change

    lamp1stat=!lamp1stat;
    if(lamp1stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
    digitalWrite(lamppin1, lamp1stat);

  });

  server.on("/onall", []() {   //Swiatlo 1 on

    digitalWrite(lamppin1, HIGH);
    lamp1stat=true;
      server.send(200, "text / plain", "1");
     });

  server.on("/offall", []() {   //Swiatlo 1 off

    digitalWrite(lamppin1, LOW);
  lamp1stat=false;
      server.send(200, "text / plain", "0");
    });

      server.on("/statusall", []() {   //Swiatlo 1 off

        if(lamp1stat){
      server.send(200, "text / plain", "1");
    }else{
      server.send(200, "text / plain", "0");
    }
    });

      server.on("/restart", []() {   //datatest
    server.send(200, "text / plain", "Restart");
    ESP.restart();
  });

  server.on("/", handleRootPath);    //Associate the handler function to the path
  server.begin();                    //Start the server
  Serial.println("Server listening");


}


void loop() {


  server.handleClient();         //Handling of incoming requests

  if(digitalRead(dotyk1)==LOW){
      delay(dotyk1timetochange);
      if(digitalRead(dotyk1)==LOW){
      lamp1stat=!lamp1stat;
      digitalWrite(lamppin1, lamp1stat);
      delay(dotyk1delay);
    }
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
