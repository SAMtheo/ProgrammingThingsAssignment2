#include <SL018.h>
#include <Wire.h>

int RXLED = 17;  // The RX LED has a defined Arduino pin
String IDTag = "0001:";

SL018 rfid;

void setup() {
  Wire.begin();  
  pinMode(RXLED, OUTPUT);

  Serial1.begin(9600);
  Serial.begin(9600);
}

void loop() {
  Serial.println("Searching for ID tag...");
  rfid.seekTag(); // Look for tags
  while(!rfid.available()) {
    doorClose();
  } // Loop here until tag is found
  
  Serial.println("ID tag found");
  String result = rfid.getTagString();
  Serial1.println(IDTag + result);
  Serial.println(IDTag + result );

  while(!checkLoop());

  delay(200);
}

boolean checkLoop() {  
  while(!Serial1.available());

  boolean resolved = false;
  while(Serial1.available()) {
    String inputString = Serial1.readString();

    if (inputString.equals(IDTag+"true")) {
      // open door
      doorOpen();
      resolved = true;
    }
    else if (inputString.equals(IDTag+"false")) {
      // don't open door
      Serial.println("Invalid permissions: ID does not have permission to open this door");
      doorClose();
      resolved = true;
    }
  }

  return resolved;
}

void doorOpen() {
  Serial.println("Door Opening");
  digitalWrite(RXLED, HIGH);   // turn the LED on (HIGH is the voltage level)  
}

void doorClose() {
  digitalWrite(RXLED, LOW);    // turn the LED off by making the voltage LOW  
}
