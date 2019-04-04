#include <SL018.h>
#include <Wire.h>
#include <Servo.h>

Servo doorServo;
SL018 rfid;

int RXLED = 17;  // The RX LED has a defined Arduino pin
int servoPos = 0; // current position of the servo
String doorID = "0001";

void setup() {
  Wire.begin(); // Begins the wirte module for RFID library
  pinMode(RXLED, OUTPUT); // Sets the pin for the rx led light
  doorServo.attach(10); // Attaches the servo to pin 10 for signalling our servo motor
  doorServo.write(servoPos); // Adjusts the postion of the servo to default before starting

  Serial1.begin(9600); // Opens the serial port for writing to the zigbee
  Serial.begin(9600); // Opens the serial port for writing debug to the serial console
}

void loop() {
  Serial.println("Searching for ID tag...");
  rfid.seekTag(); // Looks for RFID tags
  while(!rfid.available()) {
    doorClose();
  } // Loop here until tag is found
  
  Serial.println("ID tag found");
  String result = rfid.getTagString(); // Gets the UID of the RFID tag
  Serial1.println(doorID + ":" + result);
  Serial.println(doorID + ":" + result );

  while(!checkLoop()); // Runs in a loop until the server has confirmed the door status

  delay(200); // Waits to close the door again
}

boolean checkLoop() {  
  while(!Serial1.available());

  boolean resolved = false;
  while(Serial1.available()) {
    String inputString = Serial1.readString();

    if (inputString.equals(doorID + ":" + "true")) {
      // open door
      doorOpen();
      resolved = true;
    }
    else if (inputString.equals(doorID + ":" + "false")) {
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
