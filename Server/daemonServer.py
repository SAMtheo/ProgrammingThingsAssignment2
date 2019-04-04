import paho.mqtt.client as mqtt # import client
import Server
import serial

broker = "localhost"
port = 9001
sub_topic = "#"

def on_subscribe(client, userdata, mid, granted_qos):
    print("subbed")

def on_message(client, userdata, message):

    if (str(message.payload.decode('utf-8'))[0] != '#') :
        print (message.topic)
        print ("message " + str(message.payload.decode("utf-8")))
        topic = message.topic
        m = str(message.payload.decode("utf-8"))
        m = m.split(":")

        if (topic == "removeAccess") : 
            res = Server.removeIDDoor(m[0],m[1])
            if res :
                response = "True"
            else: 
                response = "Are you happy now :rage:"
            client.publish(topic,"#"+response)

        elif (topic == "requestAccess") :
            Server.addIDDoor(m[0], m[1])
            res = Server.query(m[0], m[1])
            client.publish(topic, "#"+res)

        elif (topic == "requestTempAccess") :
            res = Server.addTime(m[0],m[1])
            client.publish(topic, "#"+res)

        elif (topic == "checkAccess") :
            print(m[0] + "?" + m[1]+ "?")
            res = Server.query(m[0],m[1])
            client.publish(topic, "#"+res)
        elif (topic == "getRooms") : 
                res = Server.getAllDoorId()
                client.publish(topic, "#"+res)
        elif (topic == "getUsers"):
                res = Server.getAllUsers()
                client.publish(topic, "#"+res)
        else : 
            pass
    
def on_publish(client, userdata, mid):
    print("data published mid=",mid,"\n")

def on_disconnect(client,userdata,rc):
    print("client disconnected")

client= mqtt.Client("Server",transport='websockets')
client.on_subscribe = on_subscribe
client.on_publish = on_publish
client.on_message= on_message
client.on_disconnect = on_disconnect

print("connecting")
client.connect(broker, port)
client.loop_start()
client.subscribe(sub_topic)


###############################################
# Serial
ser = serial.Serial("/dev/ttyUSB0", 9600)
ser.flushInput()


while 1 :
        res = (str(ser.readline()))
        # remove EOL chars and 'b('
        resSplit = res[2:-5].split(":")
        
        answer = Server.query(resSplit[0], resSplit[1])
        ser.write(bytes(answer, 'utf-8'))
        
ser.close()
