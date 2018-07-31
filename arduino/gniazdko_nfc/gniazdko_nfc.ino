#include <ESP8266WiFi.h>
//#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

//ESP8266WebServer server(80);

//int lamppin1 = D5; //GPIO5;
int dotyk1 = D6; //GPIO6;

//boolean lamp1stat = false; // lampa status

void getclient(){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;  //Declare an object of class HTTPClient

    http.begin("http://10.0.2.3/lamp1change");  //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request

    if (httpCode > 0) { //Check the returning code

      String payload = http.getString();   //Get the request response payload
      Serial.println(payload);                     //Print the response payload

    }

    http.end();   //Close connection
}
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


 //pinMode(lamppin1, OUTPUT);
 pinMode(dotyk1, INPUT);
 digitalWrite(dotyk1,LOW);

  while (WiFi.status() != WL_CONNECTED) {  //Wait for connection

    delay(500);
    Serial.println("Waiting to connect…");

  }

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //Print the local IP

}

void loop() {
  //getclient();
  //delay(3000);

  if(digitalRead(dotyk1)==HIGH){
    getclient();
    delay(300);
  }

}
