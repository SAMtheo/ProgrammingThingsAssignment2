import paho.mqtt.client as mqtt # import client
import Server
import serial


# Initial values needed for mqtt connections
broker = "localhost"
port = 9001
sub_topic = "#"
#



# Callback for when a topic is subscribed to
def on_subscribe(client, userdata, mid, granted_qos):
    print("subbed")


# Callback for when a message is posted an a subscribed topic
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
    

# Callback for when a message is published to a subscribed topic by this client
def on_publish(client, userdata, mid):
    print("data published mid=",mid,"\n")


# Callback for when a client disconnects
def on_disconnect(client,userdata,rc):
    print("client disconnected")


# Create the web connection to listen for requests from the frontend
client= mqtt.Client("Server",transport='websockets')
client.on_subscribe = on_subscribe
client.on_publish = on_publish
client.on_message= on_message
client.on_disconnect = on_disconnect

print("connecting")
client.connect(broker, port)
client.loop_start()
client.subscribe(sub_topic)
##


###############################################
# Serial
##############################################

# As the callbacks defined above are spun into different thread, the "meat" of the daemon will be an infinite loop of listening for Serial commands over /dev/ttyUSB0
ser = serial.Serial("/dev/ttyUSB0", 9600)
ser.flushInput()


while 1 :
        res = (str(ser.readline()))
        # remove EOL chars and 'b('
        resSplit = res[2:-5].split(":")
        
        answer = Server.query(resSplit[0], resSplit[1])
        ser.write(bytes(answer, 'utf-8'))
        
ser.close()
