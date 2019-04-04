#include <SL018.h>
#include <Wire.h>
#include <Servo.h>

Servo doorServo;
SL018 rfid;

int RXLED = 17;  // The RX LED has a defined Arduino pin
int servoPos = 0; // current position of the servo
String IDTag = "0001:";

void setup() {
  Wire.begin();  
  pinMode(RXLED, OUTPUT);
  doorServo.attach(10);
  doorServo.write(servoPos);

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
  // move open
  for (servoPos; servoPos <= 90; servoPos += 1) {
    doorServo.write(servoPos);
    delay(15);    
  }
}

void doorClose() {
  digitalWrite(RXLED, LOW);    // turn the LED off by making the voltage LOW  
  // move shut
  for (servoPos; servoPos >= 0; servoPos -= 1) {
    doorServo.write(servoPos);
    delay(15);
  }
}
