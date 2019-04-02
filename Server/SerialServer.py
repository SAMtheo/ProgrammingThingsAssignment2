import serial
import Server

ser = serial.Serial("/dev/ttyUSB0", 9600, timeout=None)

ser.flushInput()

while 1 :
    #0001:FFFFFF

    res = (str(ser.readline()))
    
    resSplit = res[2:-5].split(":")

    answer = Server.query(resSplit[0], resSplit[1])
    ser.write(bytes(answer,'utf-8'))



ser.close()


