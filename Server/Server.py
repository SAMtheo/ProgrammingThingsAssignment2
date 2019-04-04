import time

users = [ "8009E1C", "D0BBA61C"]

doorAcc = { 
        "0001":[ ("80099E1C", -1) , ("D0BBA61C", -1) ]
        }


def getAllUsers() :
        res = ""
        for u in users:
               res =  res + u + ","
        return res
                

def findId(door, id) :
        ids = doorAcc.get(door)
        if ids == None :
                return []
        else :
                f = list(filter(lambda x : id == x[0], doorAcc.get(door)))
                return list(map(lambda x : x[0], f))

def getPairs(door, id): 
        ids = doorAcc.get(door)
        if ids == None:
                return []
        else: 
                return list(filter(lambda x : id == x[0], doorAcc.get(door)))

def query(door,id) :
    print (id + " for door " + door) 
    ids = findId(door,id)
    print (ids) 
    if id in ids :
        return (door + ":true")
    else :
        return(door + ":false")

def addDoor(door) :
    if door in doorAcc.keys() :
        return
    else :
        doorAcc[door] = []

def addIDDoor(door, id) :
    ids = findId(door, id) 
    if (id in ids) :
        return
    else :
        doorAcc[door].append((id, -1))

def removeIDDoor(door,id) :
    ids = getPairs(door,id)
    for i in ids :
        doorAcc[door].remove(i)
    ids = findId(door,id)
    # id should not be present any more
    if id in ids :
        return False
    else:
        return True 

def getAllDoorId () :
        doors = ""
        for door in doorAcc:
                doors = doors + door + ","
        return doors

def checkID(id) : 
    for door in doorAcc.keys() :
        found = list(filter(lambda x : id == x[0] , doorAcc.get(door)))
    return found

def addTime(door,id) :
    found = list(filter(lambda x : id == x[0]   , doorAcc.get(door)))
    if found is not None:
        return False
    else : 
        doorAcc[door].append((id, time.time() + 600))
        return True   

def validTime (id) :
    if float(id[1]) < 0.0 :
        return True
    if float(id[1]) > time.time():
        return True
    return False

def t1() :
        temp ("0001", "80099E1C")

def temp(door,id) :
    found = list(filter(lambda x : x[0]==id and validTime(x) , doorAcc.get(door)))
    print (found)
