import time
import smtplib 
import string

emailServer = smtplib.SMTP("smtp.ionos.com", 587)


users = [ "80099E1C", "D0BBA61C", "90E99E1C", "90BEA01C" ]

doorAcc = { 
        "0001":[ ("80099E1C", -1) , ("D0BBA61C", -1) ],
        "0002":[],
        "0003":[]
        }

# Returns a list of all users in a CSV string
def getAllUsers() :
        res = ""
        for u in users:
               res =  res + u + ","
        return res
                
# Returns a door ID for a given door
def findId(door, id) :
        ids = doorAcc.get(door)
        if ids == None :
                return []
        else :
                f = list(filter(lambda x : id == x[0], doorAcc.get(door)))
                return list(map(lambda x : x[0], f))

# Returns a userID : time pair for a given user for a given door
def getPairs(door, id): 
        ids = doorAcc.get(door)
        if ids == None:
                return []
        else: 
                return list(filter(lambda x : id == x[0], doorAcc.get(door)))


# Returns a string representing whether a user has access to a door
def query(door,id) :
    print (id + " for door " + door) 
    ids = findId(door,id)
    print (ids) 
    if id in ids :
        return (door + ":true")
    else :
        return(door + ":false")

# Adds a door to the database
def addDoor(door) :
    if door in doorAcc.keys() :
        return "False"
    else :
        doorAcc[door] = []
        return "True"

def addUser(id) :
    if id in users :
        return "False"
    else :
        users.add(id)
        return "True"

# Adds a new user to an existing door, giving them access
def addIDDoor(door, id) :
    ids = findId(door, id) 
    if (id in ids) :
        return
    else :
        doorAcc[door].append((id, -1))

# Remove an ID from a given door, revoking access
def removeIDDoor(door,id) :
    ids = getPairs(door,id)
    for i in ids :
        doorAcc[door].remove(i)
    ids = findId(door,id)
    # id should not be present any more
    if id in ids :
        return "False"
    else:
        return "True" 

# Return a CSV list of all doors
def getAllDoorId () :
        doors = ""
        for door in doorAcc:
                doors = doors + door + ","
        return doors

# Check an ID exists within any doors
def checkID(id) : 
    for door in doorAcc.keys() :
        found = list(filter(lambda x : id == x[0] , doorAcc.get(door)))
    return found

# Give access to a user for a fixed period of time
def addTime(door,id) :
    found = list(filter(lambda x : id == x[0]   , doorAcc.get(door)))
    if found is not None:
        return "False"
    else : 
        doorAcc[door].append((id, time.time() + 600))
        return "True"   

# Checks whether a user has a valid amount of time remaining on their access
def validTime (id) :
    if float(id[1]) < 0.0 :
        return True
    if float(id[1]) > time.time():
        return True
    return False


def shootEmail(door,id,email) :
    emailServer.login("temp@m1k.me","password")
    
    FROM = "<temp@m1k.me>"
    SUB = ("Door access for user %s" % id)
    TO = ("<%s>" % email)

    text = ("User: %s requested access to Door: %s. \r\nPlease confirm at https://programming-things-da9e0.firebaseapp.com"
                % (id, door))

    msg = ("FROM: %s \r\nTO: %s\r\nSubject: %s\r\n\r\n%s" % (FROM, TO, SUB, text))
    print(msg)
    
    emails = [email]
    print(emails)
    emailServer.sendmail("temp@m1k.me", emails, msg)
    print("Sent to %s" % (emails))

def getUsersDoor(door) :
    d = doorAcc.get(door)

    if (d is None) :
        return ""
    st = ""
    for dr in d :
        st += dr[0] + ","
    return st
   




